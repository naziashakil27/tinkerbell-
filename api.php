<?php
/**
 * TINKERBELL — THE SECRET LANGUAGE OF FLOWERS
 * RESTful API Backend (PHP + MySQL)
 * 
 * Enables genuine cross-device sharing of secret gift codes!
 */

require_once __DIR__ . '/db_connect.php';

header('Content-Type: application/json; charset=utf-8');

$action = $_GET['action'] ?? '';

switch ($action) {
    case 'get_gift':
        $code = trim($_GET['code'] ?? '');
        if (empty($code)) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Gift code is required']);
            exit;
        }

        $stmt = $pdo->prepare("SELECT * FROM gifts WHERE UPPER(code) = UPPER(:code) LIMIT 1");
        $stmt->execute([':code' => $code]);
        $gift = $stmt->fetch();

        if (!$gift) {
            http_response_code(404);
            echo json_encode(['status' => 'error', 'message' => 'Bouquet not found for code ' . htmlspecialchars($code)]);
            exit;
        }

        // Fetch associated flowers
        $stmtFlowers = $pdo->prepare("SELECT flower_id AS flowerId, quantity FROM gift_flowers WHERE gift_code = :code");
        $stmtFlowers->execute([':code' => $gift['code']]);
        $gift['flowers'] = $stmtFlowers->fetchAll();

        echo json_encode(['status' => 'success', 'gift' => $gift]);
        break;

    case 'save_gift':
        $raw = file_get_contents('php://input');
        $data = json_decode($raw, true);

        if (!$data || empty($data['code']) || empty($data['recipient']) || empty($data['message'])) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Missing required bouquet parameters']);
            exit;
        }

        $pdo->beginTransaction();
        try {
            $stmt = $pdo->prepare("
                INSERT INTO gifts (code, recipient, occasion, message, visual_mode, wrapping, custom_photo_data_url)
                VALUES (:code, :recipient, :occasion, :message, :visual_mode, :wrapping, :photo)
                ON DUPLICATE KEY UPDATE 
                    recipient = VALUES(recipient),
                    occasion = VALUES(occasion),
                    message = VALUES(message),
                    visual_mode = VALUES(visual_mode),
                    wrapping = VALUES(wrapping),
                    custom_photo_data_url = VALUES(custom_photo_data_url)
            ");
            $stmt->execute([
                ':code' => strtoupper($data['code']),
                ':recipient' => $data['recipient'],
                ':occasion' => $data['occasion'] ?? 'Friendship',
                ':message' => $data['message'],
                ':visual_mode' => $data['visualMode'] ?? 'arrange',
                ':wrapping' => $data['wrapping'] ?? 'ivory',
                ':photo' => $data['customPhotoDataUrl'] ?? null
            ]);

            // Save stems
            $stmtDel = $pdo->prepare("DELETE FROM gift_flowers WHERE gift_code = :code");
            $stmtDel->execute([':code' => strtoupper($data['code'])]);

            if (!empty($data['flowers']) && is_array($data['flowers'])) {
                $stmtInsertFlower = $pdo->prepare("
                    INSERT INTO gift_flowers (gift_code, flower_id, quantity) 
                    VALUES (:code, :flower_id, :qty)
                ");
                foreach ($data['flowers'] as $f) {
                    $stmtInsertFlower->execute([
                        ':code' => strtoupper($data['code']),
                        ':flower_id' => $f['flowerId'],
                        ':qty' => (int)($f['quantity'] ?? 1)
                    ]);
                }
            }

            $pdo->commit();
            echo json_encode(['status' => 'success', 'message' => 'Gift saved successfully', 'code' => strtoupper($data['code'])]);
        } catch (Exception $e) {
            $pdo->rollBack();
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Failed to save gift: ' . $e->getMessage()]);
        }
        break;

    case 'list_flowers':
        $stmt = $pdo->query("SELECT * FROM flowers ORDER BY created_at DESC");
        $flowers = $stmt->fetchAll();
        echo json_encode(['status' => 'success', 'flowers' => $flowers]);
        break;

    case 'save_custom_flower':
        $raw = file_get_contents('php://input');
        $data = json_decode($raw, true);

        if (!$data || empty($data['name']) || empty($data['meaning'])) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Flower name and meaning are required']);
            exit;
        }

        $id = $data['id'] ?? ('custom_' . time());
        $stmt = $pdo->prepare("
            INSERT INTO flowers (id, name, botanical_name, category, meaning, symbolism, description, photo_data_url, is_custom)
            VALUES (:id, :name, :botanical, :category, :meaning, :symbolism, :description, :photo, 1)
            ON DUPLICATE KEY UPDATE
                name = VALUES(name),
                botanical_name = VALUES(botanical_name),
                category = VALUES(category),
                meaning = VALUES(meaning),
                symbolism = VALUES(symbolism),
                description = VALUES(description),
                photo_data_url = VALUES(photo_data_url)
        ");
        $stmt->execute([
            ':id' => $id,
            ':name' => $data['name'],
            ':botanical' => $data['botanicalName'] ?? null,
            ':category' => $data['category'] ?? 'Custom',
            ':meaning' => $data['meaning'],
            ':symbolism' => $data['symbolism'] ?? null,
            ':description' => $data['description'] ?? null,
            ':photo' => $data['photoDataUrl'] ?? null
        ]);

        echo json_encode(['status' => 'success', 'flower' => ['id' => $id, 'name' => $data['name']]]);
        break;

    default:
        echo json_encode([
            'status' => 'online',
            'api' => 'Tinkerbell Floriography API v1.0',
            'endpoints' => [
                'GET ?action=get_gift&code=TINK-XXXXXX',
                'POST ?action=save_gift',
                'GET ?action=list_flowers',
                'POST ?action=save_custom_flower'
            ]
        ]);
        break;
}

