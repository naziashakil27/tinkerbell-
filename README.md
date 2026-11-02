# TINKERBELL — THE SECRET LANGUAGE OF FLOWERS
> *"Speak in Blooms. Whisper in Petals."*

A fairy-inspired botanical gifting platform where users craft bespoke digital flower arrangements, tuck in secret personal messages, and share them through encrypted gift codes. Recipient friends unlock their bouquets on the site, revealing genuine floral arrangements, personal letters, and the hidden Victorian Floriography meanings of each blossom.

Built as a college mini-project in frontend & full-stack web development.

---

## 🗂️ Project Directory Structure

```text
tinkerbell1/
├── index.html               # Whimsical Landing Page & Concept Guide
├── flowers.html             # Master Flower Library (20 default + custom uploads)
├── create.html              # Interactive Bouquet Atelier (layering, wrapping, ribbon)
├── preview.html             # Bouquet Presentation & Gift Code Generator
├── unlock.html              # Gift Unlock Page with magical envelope unsealing
├── decode.html              # Victorian Floriography Decoder & Sentiment Dictionary
│
├── css/
│   └── style.css            # Master Design System (botanical palette, animations, layout)
│
├── js/
│   ├── storage.js           # Centralized Storage Engine (IndexedDB + fallback + backup)
│   ├── flowers-data.js      # 20 Master Botanical Specimens with SVG art & meanings
│   ├── flowers.js           # Library controller: search, category filters, upload modal
│   ├── bouquet.js           # Atelier controller: stem layering, wrap selector, photo mode
│   ├── gifts.js             # Presentation controller: code lookup, visual recreation
│   ├── unlock.js            # Unlock controller: code verification, reveal animation
│   ├── decode.js            # Floriography controller: composite sentiment breakdown
│   └── app.js               # Shared utilities: petals manager, toasts, navigation
│
├── backend/                 # Full-Stack Extension (PHP + MySQL for cross-device sharing)
│   ├── schema.sql           # Complete MySQL database creation & seed data
│   ├── db_connect.php       # PDO database connection handler
│   ├── api.php              # RESTful JSON API endpoints
│   └── README_BACKEND.md    # Guide for running with XAMPP
│
├── react-version/           # Optional React Component Showcase
│   ├── index.html           # Standalone browser-runnable React 18 Demo
│   └── BouquetBuilder.jsx   # Clean React component demonstrating hooks & state
│
└── README.md                # Master Documentation & Verification Guide
```

---

## 🌸 Master Flower Catalog (20 Botanical Specimens Included)

1. **Red Rose** (*Rosa damascena*) — *Passionate Love & Timeless Devotion*
2. **Tulip** (*Tulipa gesneriana*) — *Declaration of Perfect Love*
3. **Sunflower** (*Helianthus annuus*) — *Adoration, Loyalty & Radiant Joy*
4. **White Lily** (*Lilium candidum*) — *Purity of Soul & Refined Grace*
5. **Daisy** (*Bellis perennis*) — *Innocence, Simplicity & Cheerful Hope*
6. **Orchid** (*Phalaenopsis amabilis*) — *Exotic Beauty, Refinement & Strength*
7. **Peony** (*Paeonia lactiflora*) — *Deep Affection, Prosperity & Flourishing Fortune*
8. **Lavender** (*Lavandula angustifolia*) — *Serenity, Peace & Undivided Devotion*
9. **Hydrangea** (*Hydrangea macrophylla*) — *Heartfelt Gratitude & Deep Understanding*
10. **Carnation** (*Dianthus caryophyllus*) — *Fascination, Distinction & Motherly Love*
11. **Baby's Breath** (*Gypsophila paniculata*) — *Everlasting Love, Innocence & Pure Spirit*
12. **Chrysanthemum** (*Chrysanthemum morifolium*) — *Longevity, Fidelity, Joy & Optimism*
13. **Daffodil** (*Narcissus pseudonarcissus*) — *Rebirth, New Beginnings & Bright Sunshine*
14. **Blue Iris** (*Iris germanica*) — *Wisdom, Valor, Hope & Sacred Messages*
15. **Cherry Blossom** (*Prunus serrulata*) — *Gentle Renewal, Fleeting Beauty & Spiritual Grace*
16. **Star Jasmine** (*Jasminum officinale*) — *Sweet Intimacy, Heavenly Grace & Sensual Charm*
17. **Marigold** (*Tagetes erecta*) — *Warm Passion, Creative Spark & Golden Protection*
18. **Camellia** (*Camellia japonica*) — *Adoration, Perfection & Quiet Longing*
19. **Anemone** (*Anemone coronaria*) — *Anticipation, Fragility & Magic Protection*
20. **Forget-me-not** (*Myosotis sylvatica*) — *True Everlasting Love & Cherished Memories*

---

## 🛠️ Technology Architecture

- **HTML5 & Semantic Elements:** Accessible, clean semantic structure (`<nav>`, `<header>`, `<main>`, `<article>`, `<section>`, `<footer>`).
- **CSS3 Design System:** Custom botanical variables, soft sage green (`#6C8B74`), warm cream (`#FAF7F2`), blush pink (`#E8B4B8`), delicate gold accents (`#C59E3F`), natural shadows, and floating SVG fairy petals.
- **Vanilla JavaScript (ES6+):** Zero external framework dependencies required for the core app.
- **Centralized Storage Engine (`js/storage.js`):**
  - **IndexedDB (`TinkerbellBotanicalDB`):**
    - `flowers`: Stores user-uploaded custom flowers persistently.
    - `gifts`: Stores created bouquets keyed by unique gift code (`TINK-XXXXXX`).
    - `images`: Normalized image store for high-resolution base64 photos to eliminate data duplication and prevent quota issues.
  - **Safe LocalStorage Fallback:** If IndexedDB is blocked or private, falls back seamlessly to LocalStorage.
  - **Draft Resilience:** Bouquet drafts auto-save continuously so progress is never lost on refresh.
  - **Zero Destructive Calls:** Never executes `localStorage.clear()` or drops databases.
- **Full-Stack Backend (PHP + MySQL):**
  - Included under `backend/` with PDO connection, schema, and JSON API for college instructors who require a full-stack submission.
- **React 18 Component Showcase:**
  - Included under `react-version/` to demonstrate React state and props handling without any build step or NPM requirements.

---

## 🚀 How to Run the Project Locally

### Option 1: Visual Studio Code & Live Server (Zero-Configuration, Recommended)

1. Open **Visual Studio Code**.
2. Select **File > Open Folder...** and choose this `tinkerbell1` folder.
3. Install the **Live Server** extension (by Ritwick Dey) from the VS Code Extensions tab (`Ctrl+Shift+X`) if you haven't already.
4. Right-click on `index.html` in the file explorer and click **"Open with Live Server"** (or click **"Go Live"** in the bottom status bar).
5. Your browser will automatically launch at `http://127.0.0.1:5500/index.html`.

### Option 2: Full-Stack Mode with XAMPP (Apache + PHP + MySQL)

1. Copy the `tinkerbell1` folder into your XAMPP web root: `C:\xampp\htdocs\tinkerbell1`.
2. Open XAMPP Control Panel and start **Apache** and **MySQL**.
3. Go to `http://localhost/phpmyadmin/` in your browser.
4. Click **Import**, select `backend/schema.sql`, and click **Go**.
5. Open `http://localhost/tinkerbell1/index.html` in your browser.

---

## 📖 Step-by-Step User Guides

### 1. How to Upload Custom Flower Photographs
1. Navigate to **Flower Library** (`flowers.html`).
2. Click the **"+ Upload Custom Flower"** button in the top action bar.
3. Fill in the Flower Name, Victorian Meaning, and Category.
4. Click or drag-and-drop your flower photo into the dropzone (JPG, PNG, or WebP up to 5MB).
5. A live preview will instantly appear.
6. Click **"Save to My Garden ✨"**.
7. Your custom flower is saved to IndexedDB, survives page reloads, and is immediately available in the bouquet creator!

### 2. How to Create and Arrange a Bouquet
1. Navigate to **Create Bouquet** (`create.html`).
2. **Choose Mode:** Toggle between **"Flower Arrangement"** (layered individual stems) or **"Bouquet Photograph"** (upload your own complete bouquet photo).
3. **Select Wrapping Paper:** Click between Ivory Silk, Blush Pink, Sage Leaf, Kraft Brown, or Floral Print.
4. **Add Stems:** In the flower picker, click **"+ Add"** next to any flower. You can increase or decrease stems (1 to 10) in the summary box. Watch the bouquet visual update in real time with natural angles, heights, and shadows!
5. **Enter Details:** Fill in the Recipient's Name, select an Occasion, and write your personal secret letter.
6. Click **"Save Bouquet & Generate Gift Code ✨"**.

### 3. How to Share and Unlock a Gift
1. After crafting a bouquet, you are taken to **Bouquet Preview** (`preview.html`).
2. A unique secret gift code is displayed (e.g., `TINK-A7B92C`).
3. Click the copy icon next to the code to copy it to your clipboard.
4. Share the code with your friend.
5. Have your friend go to **Unlock Gift** (`unlock.html`).
6. Enter or paste the code into the field and press **Enter** (or click **"Unseal Secret Bouquet"**).
7. The magical envelope will unseal with sparkling fairy animations, revealing the exact saved arrangement, the recipient's name, occasion, personal note, and flower meanings!

### 4. How to Decode Secret Flower Meanings
1. From any unlocked bouquet, click **"Decode Secret Story"** (or open `decode.html?code=TINK-...`).
2. The page translates the collective blooms into a synthesized Victorian sentiment narrative.
3. You can also use the **Master Floriography Dictionary** on `decode.html` to search any flower or emotion (e.g., "loyalty", "love", "serenity").

### 5. How to Backup and Restore Flowers & Gifts
1. Go to **Flower Library** (`flowers.html`).
2. Click **"Export Backup 📥"** to download a JSON file containing all your custom flowers, saved bouquets, and image data URLs.
3. To restore on another session or browser, click **"Restore Backup 📤"** and select your JSON backup file. The storage engine validates the data and restores your flowers and gifts without overwriting or deleting existing records.

---

## 🔒 Known Limitations & Honest Architectural Clarification

- **Browser Storage Scope:** In the frontend-only edition running on Live Server, data is stored in the browser's persistent IndexedDB and LocalStorage. Therefore, secret gift codes are retrievable on the same browser origin (`http://127.0.0.1:5500`).
- **Cross-Device Sharing:** Local browser storage cannot communicate across different physical devices (e.g. from your laptop to a friend's phone across the city) without a central server.
- **The Solution Included:** To demonstrate how genuine cross-device sharing works, we have provided a complete MySQL database schema and PHP API in the `backend/` folder. When hosted on a shared server or Apache/XAMPP environment, any device can look up gift codes centrally!

---

## ✅ Comprehensive Test Verification (16 Tests)

| # | Test Case Description | Verified Status | Result |
|---|-----------------------|:---------------:|--------|
| **1** | Open Home page and navigate to Flower Library | ✅ PASS | Navigation bar links transition smoothly between pages with active state indicators. |
| **2** | Confirm all 20 default flowers appear | ✅ PASS | All 20 historical specimens (Rose, Tulip, Sunflower, Lily, Daisy, Orchid, Peony, Lavender, Hydrangea, Carnation, Baby's Breath, Chrysanthemum, Daffodil, Iris, Cherry Blossom, Jasmine, Marigold, Camellia, Anemone, Forget-me-not) load with embedded SVGs. |
| **3** | Upload a custom flower image and save it | ✅ PASS | Form validates image type & size, renders live preview, and commits to IndexedDB. |
| **4** | Refresh Flower Library and confirm custom flower persists | ✅ PASS | Custom flower survives reloads and filter changes without data loss. |
| **5** | Navigate to Create Bouquet and confirm custom flower is available | ✅ PASS | Custom flower appears in the flower picker drawer alongside default blooms. |
| **6** | Create a bouquet using multiple flowers | ✅ PASS | Multi-stem fan-out layout dynamically positions stems with slight rotation and height arc. |
| **7** | Upload a complete bouquet image and verify display | ✅ PASS | Toggle to Photo Mode displays custom photo with wrapping options seamlessly. |
| **8** | Add recipient name, occasion, and personal message | ✅ PASS | Input fields validate required entries and draft auto-saves to LocalStorage. |
| **9** | Save bouquet and generate unique gift code | ✅ PASS | Generates collision-free code (e.g., `TINK-A7B92C`) and redirects to preview. |
| **10** | Refresh browser and confirm all existing flowers remain intact | ✅ PASS | Zero data loss; default catalog and custom flowers are unaffected by bouquet creation. |
| **11** | Open Unlock Gift and enter the generated code | ✅ PASS | Accepts case-insensitive code both via button click and Enter key. |
| **12** | Confirm exact bouquet, photographs, recipient, occasion, and message appear | ✅ PASS | Unlocks genuine bouquet record from IndexedDB (never a generic placeholder). |
| **13** | Enter an invalid code and verify helpful error message | ✅ PASS | Displays clear guidance message with subtle input animation; does not crash. |
| **14** | Open Decode Flowers and verify actual bouquet meanings | ✅ PASS | Decodes the specific flowers in the gift with composite Victorian sentiment narrative. |
| **15** | Create another gift and verify first gift remains intact | ✅ PASS | Separate gift records stored under distinct unique codes without overwriting. |
| **16** | Export backup, verify safe JSON import | ✅ PASS | Exports valid JSON containing custom blooms and bouquets; imports cleanly. |

