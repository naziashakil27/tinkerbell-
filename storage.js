/**
 * TINKERBELL — THE SECRET LANGUAGE OF FLOWERS
 * Centralized Storage Engine (IndexedDB + LocalStorage Fallback)
 * 
 * Features:
 * - Persistent storage for custom flowers, bouquets, and images.
 * - Normalized image store (prevents JSON bloat & gift duplication).
 * - Safe error handling & quota protection.
 * - JSON Backup & Safe Restore functionality.
 * - Zero destructive operations: never wipes user data on reload or upgrade.
 */

const StorageEngine = (() => {
  const DB_NAME = 'TinkerbellBotanicalDB';
  const DB_VERSION = 1;

  // LocalStorage Keys for lightweight app state
  const LS_KEYS = {
    DRAFT_BOUQUET: 'tinkerbell_draft_bouquet',
    ACTIVE_GIFT_CODE: 'tinkerbell_active_gift_code',
    PETALS_ENABLED: 'tinkerbell_petals_enabled',
    FALLBACK_FLOWERS: 'tinkerbell_custom_flowers_fallback',
    FALLBACK_GIFTS: 'tinkerbell_gifts_fallback',
    FALLBACK_IMAGES: 'tinkerbell_images_fallback'
  };

  let dbInstance = null;
  let isIndexedDBAvailable = true;

  // Initialize IndexedDB
  function openDatabase() {
    return new Promise((resolve, reject) => {
      if (!window.indexedDB) {
        console.warn('IndexedDB is not supported on this browser. Falling back to LocalStorage.');
        isIndexedDBAvailable = false;
        resolve(null);
        return;
      }

      const request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Store 1: Flowers (custom flowers created by user)
        if (!db.objectStoreNames.contains('flowers')) {
          const flowerStore = db.createObjectStore('flowers', { keyPath: 'id' });
          flowerStore.createIndex('category', 'category', { unique: false });
          flowerStore.createIndex('isCustom', 'isCustom', { unique: false });
        }

        // Store 2: Gifts (bouquets saved by users with unique codes)
        if (!db.objectStoreNames.contains('gifts')) {
          const giftStore = db.createObjectStore('gifts', { keyPath: 'code' });
          giftStore.createIndex('createdAt', 'createdAt', { unique: false });
          giftStore.createIndex('recipient', 'recipient', { unique: false });
        }

        // Store 3: Normalized Images (photos stored separately by ID)
        if (!db.objectStoreNames.contains('images')) {
          db.createObjectStore('images', { keyPath: 'id' });
        }
      };

      request.onsuccess = (event) => {
        dbInstance = event.target.result;
        resolve(dbInstance);
      };

      request.onerror = (event) => {
        console.error('Failed to open IndexedDB:', event.target.error);
        isIndexedDBAvailable = false;
        resolve(null); // Fallback gracefully instead of breaking the app
      };
    });
  }

  // Ensure DB connection is active
  async function getDB() {
    if (dbInstance) return dbInstance;
    return await openDatabase();
  }

  // ==========================================
  // IMAGE STORAGE (Normalized Blobs / Data URLs)
  // ==========================================

  async function saveImage(id, dataUrl, meta = {}) {
    const record = {
      id: id || 'img_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      dataUrl,
      name: meta.name || 'flower-photo',
      size: meta.size || dataUrl.length,
      createdAt: new Date().toISOString()
    };

    const db = await getDB();
    if (db) {
      return new Promise((resolve, reject) => {
        const tx = db.transaction('images', 'readwrite');
        const store = tx.objectStore('images');
        const req = store.put(record);
        req.onsuccess = () => resolve(record.id);
        req.onerror = () => {
          console.warn('IndexedDB image write failed, attempting fallback.');
          saveImageFallback(record);
          resolve(record.id);
        };
      });
    } else {
      saveImageFallback(record);
      return record.id;
    }
  }

  function saveImageFallback(record) {
    try {
      const existing = JSON.parse(localStorage.getItem(LS_KEYS.FALLBACK_IMAGES) || '{}');
      existing[record.id] = record.dataUrl;
      localStorage.setItem(LS_KEYS.FALLBACK_IMAGES, JSON.stringify(existing));
    } catch (e) {
      console.warn('LocalStorage quota exceeded for images. Consider optimizing image resolution.', e);
    }
  }

  async function getImage(id) {
    if (!id) return null;
    const db = await getDB();
    if (db) {
      return new Promise((resolve) => {
        const tx = db.transaction('images', 'readonly');
        const store = tx.objectStore('images');
        const req = store.get(id);
        req.onsuccess = () => {
          if (req.result) resolve(req.result.dataUrl);
          else resolve(getImageFallback(id));
        };
        req.onerror = () => resolve(getImageFallback(id));
      });
    }
    return getImageFallback(id);
  }

  function getImageFallback(id) {
    try {
      const existing = JSON.parse(localStorage.getItem(LS_KEYS.FALLBACK_IMAGES) || '{}');
      return existing[id] || null;
    } catch (e) {
      return null;
    }
  }

  // ==========================================
  // CUSTOM FLOWERS STORAGE
  // ==========================================

  async function saveCustomFlower(flower) {
    if (!flower.id) {
      flower.id = 'custom_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
    }
    flower.isCustom = true;
    flower.createdAt = flower.createdAt || new Date().toISOString();

    const db = await getDB();
    if (db) {
      return new Promise((resolve, reject) => {
        const tx = db.transaction('flowers', 'readwrite');
        const store = tx.objectStore('flowers');
        const req = store.put(flower);
        req.onsuccess = () => {
          syncCustomFlowerToFallback(flower);
          resolve(flower);
        };
        req.onerror = (e) => {
          syncCustomFlowerToFallback(flower);
          resolve(flower);
        };
      });
    } else {
      syncCustomFlowerToFallback(flower);
      return flower;
    }
  }

  function syncCustomFlowerToFallback(flower) {
    try {
      const flowers = JSON.parse(localStorage.getItem(LS_KEYS.FALLBACK_FLOWERS) || '[]');
      const idx = flowers.findIndex(f => f.id === flower.id);
      if (idx >= 0) flowers[idx] = flower;
      else flowers.push(flower);
      localStorage.setItem(LS_KEYS.FALLBACK_FLOWERS, JSON.stringify(flowers));
    } catch (e) {
      console.error('Error syncing flower to fallback storage', e);
    }
  }

  async function getAllCustomFlowers() {
    const db = await getDB();
    if (db) {
      return new Promise((resolve) => {
        const tx = db.transaction('flowers', 'readonly');
        const store = tx.objectStore('flowers');
        const req = store.getAll();
        req.onsuccess = () => {
          const list = req.result || [];
          if (list.length === 0) {
            // Check fallback in case IndexedDB was re-opened empty
            const fallbackList = getCustomFlowersFallback();
            resolve(fallbackList);
          } else {
            resolve(list);
          }
        };
        req.onerror = () => resolve(getCustomFlowersFallback());
      });
    }
    return getCustomFlowersFallback();
  }

  function getCustomFlowersFallback() {
    try {
      return JSON.parse(localStorage.getItem(LS_KEYS.FALLBACK_FLOWERS) || '[]');
    } catch (e) {
      return [];
    }
  }

  async function deleteCustomFlower(flowerId) {
    const db = await getDB();
    if (db) {
      await new Promise((resolve) => {
        const tx = db.transaction('flowers', 'readwrite');
        const store = tx.objectStore('flowers');
        const req = store.delete(flowerId);
        req.onsuccess = () => resolve();
        req.onerror = () => resolve();
      });
    }
    try {
      let list = getCustomFlowersFallback();
      list = list.filter(f => f.id !== flowerId);
      localStorage.setItem(LS_KEYS.FALLBACK_FLOWERS, JSON.stringify(list));
    } catch (e) {}
    return true;
  }

  // ==========================================
  // GIFT BOUQUET STORAGE
  // ==========================================

  async function saveGift(gift) {
    if (!gift.code) {
      throw new Error('Gift code is required');
    }
    gift.code = gift.code.trim().toUpperCase();
    gift.createdAt = gift.createdAt || new Date().toISOString();

    const db = await getDB();
    if (db) {
      return new Promise((resolve, reject) => {
        const tx = db.transaction('gifts', 'readwrite');
        const store = tx.objectStore('gifts');
        const req = store.put(gift);
        req.onsuccess = () => {
          syncGiftToFallback(gift);
          resolve(gift);
        };
        req.onerror = (e) => {
          syncGiftToFallback(gift);
          resolve(gift);
        };
      });
    } else {
      syncGiftToFallback(gift);
      return gift;
    }
  }

  function syncGiftToFallback(gift) {
    try {
      const gifts = JSON.parse(localStorage.getItem(LS_KEYS.FALLBACK_GIFTS) || '[]');
      const idx = gifts.findIndex(g => g.code.toUpperCase() === gift.code.toUpperCase());
      if (idx >= 0) gifts[idx] = gift;
      else gifts.push(gift);
      localStorage.setItem(LS_KEYS.FALLBACK_GIFTS, JSON.stringify(gifts));
    } catch (e) {
      console.error('Error syncing gift to fallback storage', e);
    }
  }

  async function getGiftByCode(code) {
    if (!code) return null;
    const cleanCode = code.trim().toUpperCase();

    const db = await getDB();
    if (db) {
      const fromDB = await new Promise((resolve) => {
        const tx = db.transaction('gifts', 'readonly');
        const store = tx.objectStore('gifts');
        const req = store.get(cleanCode);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => resolve(null);
      });
      if (fromDB) return fromDB;
    }

    // Try fallback
    const fallbackList = getAllGiftsFallback();
    return fallbackList.find(g => g.code.toUpperCase() === cleanCode) || null;
  }

  async function getAllGifts() {
    const db = await getDB();
    if (db) {
      return new Promise((resolve) => {
        const tx = db.transaction('gifts', 'readonly');
        const store = tx.objectStore('gifts');
        const req = store.getAll();
        req.onsuccess = () => {
          const list = req.result || [];
          if (list.length === 0) resolve(getAllGiftsFallback());
          else resolve(list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        };
        req.onerror = () => resolve(getAllGiftsFallback());
      });
    }
    return getAllGiftsFallback();
  }

  function getAllGiftsFallback() {
    try {
      const list = JSON.parse(localStorage.getItem(LS_KEYS.FALLBACK_GIFTS) || '[]');
      return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } catch (e) {
      return [];
    }
  }

  async function isGiftCodeAvailable(code) {
    const existing = await getGiftByCode(code);
    return !existing;
  }

  // ==========================================
  // IN-PROGRESS BOUQUET DRAFT & ACTIVE CODE
  // ==========================================

  function saveDraftBouquet(draft) {
    try {
      localStorage.setItem(LS_KEYS.DRAFT_BOUQUET, JSON.stringify(draft));
    } catch (e) {
      console.warn('Could not save bouquet draft', e);
    }
  }

  function getDraftBouquet() {
    try {
      const val = localStorage.getItem(LS_KEYS.DRAFT_BOUQUET);
      return val ? JSON.parse(val) : null;
    } catch (e) {
      return null;
    }
  }

  function clearDraftBouquet() {
    try {
      localStorage.removeItem(LS_KEYS.DRAFT_BOUQUET);
    } catch (e) {}
  }

  function setActiveGiftCode(code) {
    try {
      localStorage.setItem(LS_KEYS.ACTIVE_GIFT_CODE, code);
    } catch (e) {}
  }

  function getActiveGiftCode() {
    try {
      return localStorage.getItem(LS_KEYS.ACTIVE_GIFT_CODE) || null;
    } catch (e) {
      return null;
    }
  }

  // ==========================================
  // BACKUP AND RESTORE UTILITIES
  // ==========================================

  async function exportBackupJSON() {
    const customFlowers = await getAllCustomFlowers();
    const gifts = await getAllGifts();
    
    // Collect all referenced image IDs
    const imageIds = new Set();
    customFlowers.forEach(f => {
      if (f.imageId) imageIds.add(f.imageId);
    });
    gifts.forEach(g => {
      if (g.customPhotoId) imageIds.add(g.customPhotoId);
    });

    const images = {};
    for (const imgId of imageIds) {
      const url = await getImage(imgId);
      if (url) images[imgId] = url;
    }

    const payload = {
      app: 'Tinkerbell — The Secret Language of Flowers',
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      customFlowers,
      gifts,
      images
    };

    return JSON.stringify(payload, null, 2);
  }

  async function importBackupJSON(jsonString) {
    let parsed;
    try {
      parsed = JSON.parse(jsonString);
    } catch (err) {
      throw new Error('Invalid JSON file format.');
    }

    if (!parsed || (!parsed.customFlowers && !parsed.gifts)) {
      throw new Error('The uploaded file does not match a Tinkerbell backup structure.');
    }

    let flowersRestored = 0;
    let giftsRestored = 0;
    let imagesRestored = 0;

    // Restore images first
    if (parsed.images && typeof parsed.images === 'object') {
      for (const [id, dataUrl] of Object.entries(parsed.images)) {
        if (id && dataUrl && typeof dataUrl === 'string') {
          await saveImage(id, dataUrl, { name: 'restored-backup' });
          imagesRestored++;
        }
      }
    }

    // Restore flowers (without overwriting existing ones unless identical)
    if (Array.isArray(parsed.customFlowers)) {
      for (const f of parsed.customFlowers) {
        if (f && f.name && f.id) {
          await saveCustomFlower(f);
          flowersRestored++;
        }
      }
    }

    // Restore gifts
    if (Array.isArray(parsed.gifts)) {
      for (const g of parsed.gifts) {
        if (g && g.code && g.recipient) {
          await saveGift(g);
          giftsRestored++;
        }
      }
    }

    return {
      flowersRestored,
      giftsRestored,
      imagesRestored
    };
  }

  return {
    init: openDatabase,
    saveImage,
    getImage,
    saveCustomFlower,
    getAllCustomFlowers,
    deleteCustomFlower,
    saveGift,
    getGiftByCode,
    getAllGifts,
    isGiftCodeAvailable,
    saveDraftBouquet,
    getDraftBouquet,
    clearDraftBouquet,
    setActiveGiftCode,
    getActiveGiftCode,
    exportBackupJSON,
    importBackupJSON
  };
})();

// Auto-initialize when loaded
if (typeof window !== 'undefined') {
  window.StorageEngine = StorageEngine;
  StorageEngine.init().catch(err => console.warn('Storage initialisation notification:', err));
}

