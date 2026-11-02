-- ============================================================================
-- TINKERBELL — THE SECRET LANGUAGE OF FLOWERS
-- MySQL Database Schema for Full-Stack Deployment
-- ============================================================================

CREATE DATABASE IF NOT EXISTS `tinkerbell_db` 
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE `tinkerbell_db`;

-- 1. Table: Custom and Stored Flowers
CREATE TABLE IF NOT EXISTS `flowers` (
  `id` VARCHAR(64) PRIMARY KEY,
  `name` VARCHAR(128) NOT NULL,
  `botanical_name` VARCHAR(128) DEFAULT NULL,
  `category` VARCHAR(64) NOT NULL DEFAULT 'Custom',
  `meaning` TEXT NOT NULL,
  `symbolism` TEXT DEFAULT NULL,
  `description` TEXT DEFAULT NULL,
  `photo_data_url` LONGTEXT DEFAULT NULL,
  `is_custom` TINYINT(1) DEFAULT 1,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Table: Saved Bouquet Gifts
CREATE TABLE IF NOT EXISTS `gifts` (
  `code` VARCHAR(32) PRIMARY KEY,
  `recipient` VARCHAR(128) NOT NULL,
  `occasion` VARCHAR(64) NOT NULL DEFAULT 'Friendship',
  `message` TEXT NOT NULL,
  `visual_mode` VARCHAR(32) NOT NULL DEFAULT 'arrange',
  `wrapping` VARCHAR(32) NOT NULL DEFAULT 'ivory',
  `custom_photo_id` VARCHAR(64) DEFAULT NULL,
  `custom_photo_data_url` LONGTEXT DEFAULT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Table: Bouquet Flower Items (Many-to-Many Relationship)
CREATE TABLE IF NOT EXISTS `gift_flowers` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `gift_code` VARCHAR(32) NOT NULL,
  `flower_id` VARCHAR(64) NOT NULL,
  `quantity` INT NOT NULL DEFAULT 1,
  FOREIGN KEY (`gift_code`) REFERENCES `gifts`(`code`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Sample Seed Data for Test
INSERT IGNORE INTO `gifts` (`code`, `recipient`, `occasion`, `message`, `visual_mode`, `wrapping`) 
VALUES ('TINK-DEMO01', 'Lily', 'Friendship', 'May this enchanted bouquet bring warmth and fairy blessings to your day.', 'arrange', 'ivory');

INSERT IGNORE INTO `gift_flowers` (`gift_code`, `flower_id`, `quantity`) 
VALUES 
('TINK-DEMO01', 'flower-rose', 2),
('TINK-DEMO01', 'flower-babys-breath', 3),
('TINK-DEMO01', 'flower-lavender', 1);

