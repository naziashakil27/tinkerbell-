/**
 * TINKERBELL — THE SECRET LANGUAGE OF FLOWERS
 * Bouquet Creator Controller (bouquet.js)
 * 
 * Features:
 * - Dynamic layered visual arrangement with realistic rotations, stems, and heights.
 * - Wrapping paper style switcher (Ivory, Blush Pink, Sage Green, Kraft Brown, Floral).
 * - Full Bouquet Photo Upload Mode toggle.
 * - Real-time stem quantity modifier and flower selector.
 * - Draft auto-persistence to LocalStorage.
 * - Validation & saving to IndexedDB with unique secret gift code.
 */

document.addEventListener('DOMContentLoaded', async () => {
  // DOM Elements
  const stemsContainer = document.getElementById('bouquet-stems-container');
  const wrapperPaper = document.getElementById('bouquet-wrapper-paper');
  const fullPhotoView = document.getElementById('bouquet-full-photo-view');
  const fullPhotoImg = document.getElementById('full-photo-img');
  const visualArrangementStage = document.getElementById('visual-arrangement-stage');
  
  const modeArrangeBtn = document.getElementById('mode-arrange-btn');
  const modePhotoBtn = document.getElementById('mode-photo-btn');
  const wrapOptionPills = document.querySelectorAll('.wrap-option-pill');
  
  const flowerPickerList = document.getElementById('flower-picker-list');
  const selectedFlowersList = document.getElementById('selected-flowers-list');
  const totalStemsCountEl = document.getElementById('total-stems-count');
  const bouquetPhotoFileInput = document.getElementById('bouquet-photo-file');
  const photoUploadSection = document.getElementById('photo-upload-section');

  const recipientInput = document.getElementById('recipient-name');
  const occasionSelect = document.getElementById('occasion-select');
  const messageInput = document.getElementById('personal-message');
  const bouquetForm = document.getElementById('bouquet-form');

  let catalog = [];
  let currentMode = 'arrange'; // 'arrange' or 'photo'
  let currentWrap = 'ivory';
  let selectedFlowers = []; // array of { flowerId, quantity }
  let uploadedBouquetPhotoDataUrl = null;
  let uploadedBouquetPhotoId = null;

  // Initialize
  async function init() {
    catalog = await window.getCompleteFlowerCatalog();
    renderFlowerPicker();

    // Check for existing draft or previous selection from flowers.html
    const draft = window.StorageEngine.getDraftBouquet();
    if (draft) {
      currentMode = draft.visualMode || 'arrange';
      currentWrap = draft.wrapping || 'ivory';
      selectedFlowers = draft.flowers || [];
      if (draft.recipientName && recipientInput) recipientInput.value = draft.recipientName;
      if (draft.occasion && occasionSelect) occasionSelect.value = draft.occasion;
      if (draft.message && messageInput) messageInput.value = draft.message;
      if (draft.customPhotoDataUrl) {
        uploadedBouquetPhotoDataUrl = draft.customPhotoDataUrl;
      }
    }

    // If still empty, add 3 default stems for lovely initial presentation
    if (selectedFlowers.length === 0 && !uploadedBouquetPhotoDataUrl) {
      selectedFlowers = [
        { flowerId: 'flower-rose', quantity: 2 },
        { flowerId: 'flower-babys-breath', quantity: 3 },
        { flowerId: 'flower-peony', quantity: 1 }
      ];
    }

    applyModeUI();
    applyWrapUI();
    renderSelectedList();
    renderBouquetVisual();
    setupListeners();
  }

  // Render Available Flowers to add
  function renderFlowerPicker() {
    if (!flowerPickerList) return;

    flowerPickerList.innerHTML = catalog.map(flower => {
      let iconHTML = '';
      if (flower.photoDataUrl) {
        iconHTML = `<img src="${flower.photoDataUrl}" alt="${flower.name}" style="width: 100%; height: 100%; object-fit: cover;" />`;
      } else if (flower.svg) {
        iconHTML = flower.svg;
      } else {
        iconHTML = `🌸`;
      }

      return `
        <div class="picker-flower-item" data-id="${flower.id}">
          <div class="picker-flower-info">
            <div class="picker-flower-thumb">${iconHTML}</div>
            <div>
              <div style="font-weight: 600; font-size: 0.92rem;">${flower.name}</div>
              <div style="font-size: 0.78rem; color: var(--color-botanical-muted);">${flower.meaning}</div>
            </div>
          </div>
          <button type="button" class="btn btn-secondary btn-sm picker-add-btn" data-id="${flower.id}">
            + Add
          </button>
        </div>
      `;
    }).join('');

    // Picker add event listeners
    flowerPickerList.querySelectorAll('.picker-add-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        addStem(id);
      });
    });
  }

  // Add Stem
  function addStem(flowerId) {
    const existing = selectedFlowers.find(f => f.flowerId === flowerId);
    if (existing) {
      if (existing.quantity < 10) existing.quantity++;
      else showToast('Maximum 10 stems per flower type.', 'info');
    } else {
      selectedFlowers.push({ flowerId, quantity: 1 });
    }
    syncAndRender();
  }

  // Remove Stem or Decrease Quantity
  function decreaseStem(flowerId) {
    const idx = selectedFlowers.findIndex(f => f.flowerId === flowerId);
    if (idx >= 0) {
      if (selectedFlowers[idx].quantity > 1) {
        selectedFlowers[idx].quantity--;
      } else {
        selectedFlowers.splice(idx, 1);
      }
    }
    syncAndRender();
  }

  function removeFlowerEntirely(flowerId) {
    selectedFlowers = selectedFlowers.filter(f => f.flowerId !== flowerId);
    syncAndRender();
  }

  function syncAndRender() {
    saveDraft();
    renderSelectedList();
    renderBouquetVisual();
  }

  // Render Selected Flowers List
  function renderSelectedList() {
    if (!selectedFlowersList) return;

    if (selectedFlowers.length === 0) {
      selectedFlowersList.innerHTML = `
        <div style="text-align: center; padding: 1.5rem; color: var(--color-botanical-muted); font-size: 0.9rem; border: 1px dashed var(--color-border); border-radius: 8px;">
          Your bouquet currently has no flowers. Pick stems from the list above!
        </div>
      `;
      if (totalStemsCountEl) totalStemsCountEl.textContent = '0 stems';
      return;
    }

    let totalStems = 0;
    selectedFlowersList.innerHTML = selectedFlowers.map(item => {
      const flower = catalog.find(f => f.id === item.flowerId);
      if (!flower) return '';
      totalStems += item.quantity;

      return `
        <div class="selected-flower-row">
          <div>
            <div style="font-weight: 600; font-size: 0.92rem;">${flower.name}</div>
            <div style="font-size: 0.78rem; color: var(--color-sage); font-style: italic;">${flower.meaning}</div>
          </div>
          <div class="qty-control">
            <button type="button" class="qty-btn qty-minus" data-id="${item.flowerId}">−</button>
            <span class="qty-number">${item.quantity}</span>
            <button type="button" class="qty-btn qty-plus" data-id="${item.flowerId}">+</button>
            <button type="button" class="btn btn-secondary btn-sm qty-del" data-id="${item.flowerId}" style="padding: 0.2rem 0.5rem; margin-left: 0.5rem; color: #C0392B;">✕</button>
          </div>
        </div>
      `;
    }).join('');

    if (totalStemsCountEl) {
      totalStemsCountEl.textContent = `${totalStems} stem${totalStems === 1 ? '' : 's'}`;
    }

    // Attach row listeners
    selectedFlowersList.querySelectorAll('.qty-minus').forEach(b => {
      b.addEventListener('click', () => decreaseStem(b.dataset.id));
    });
    selectedFlowersList.querySelectorAll('.qty-plus').forEach(b => {
      b.addEventListener('click', () => addStem(b.dataset.id));
    });
    selectedFlowersList.querySelectorAll('.qty-del').forEach(b => {
      b.addEventListener('click', () => removeFlowerEntirely(b.dataset.id));
    });
  }

  // Render Visual Arrangement with Realistic Layering
  function renderBouquetVisual() {
    if (!stemsContainer) return;

    if (currentMode === 'photo') {
      visualArrangementStage.style.display = 'none';
      fullPhotoView.style.display = 'flex';
      if (uploadedBouquetPhotoDataUrl) {
        fullPhotoImg.src = uploadedBouquetPhotoDataUrl;
        fullPhotoImg.style.display = 'block';
      } else {
        fullPhotoImg.style.display = 'none';
      }
      return;
    }

    visualArrangementStage.style.display = 'block';
    fullPhotoView.style.display = 'none';

    stemsContainer.innerHTML = '';

    // Flatten all stems into an arrangement list
    const stemTokens = [];
    selectedFlowers.forEach(item => {
      const flower = catalog.find(f => f.id === item.flowerId);
      if (flower) {
        for (let i = 0; i < item.quantity; i++) {
          stemTokens.push(flower);
        }
      }
    });

    if (stemTokens.length === 0) {
      stemsContainer.innerHTML = `
        <div style="position: absolute; top: 40%; left: 0; width: 100%; text-align: center; color: var(--color-botanical-muted);">
          <div style="font-size: 2.5rem; opacity: 0.4;">💐</div>
          <div style="font-family: var(--font-serif); font-style: italic;">Add flowers below to compose your arrangement</div>
        </div>
      `;
      return;
    }

    // Natural fan-out angle and height calculations
    const count = stemTokens.length;
    stemTokens.forEach((flower, index) => {
      const el = document.createElement('div');
      el.className = 'arranged-flower-item';

      // Distribute evenly in a fan/dome formation
      const t = count === 1 ? 0.5 : (index / (count - 1)); // 0 to 1
      const angle = (t - 0.5) * 54; // -27 deg to +27 deg
      const leftOffset = 18 + t * 54; // 18% to 72%
      
      // Arc height: center flowers sit higher, edges lower
      const arcBonus = Math.sin(t * Math.PI) * 45;
      const topOffset = 135 - arcBonus + ((index % 3) * 12);
      const scale = 0.88 + ((index % 2) * 0.14);

      el.style.left = `calc(${leftOffset}% - 55px)`;
      el.style.top = `${topOffset}px`;
      el.style.transform = `rotate(${angle}deg) scale(${scale})`;
      el.style.zIndex = Math.floor(10 + arcBonus);

      // Flower visual (photo thumbnail or SVG)
      if (flower.photoDataUrl) {
        el.innerHTML = `
          <div style="position: relative; display: flex; flex-direction: column; align-items: center;">
            <img src="${flower.photoDataUrl}" alt="${flower.name}" />
            <div style="width: 4px; height: 160px; background: #3E5A38; border-radius: 2px; margin-top: -6px;"></div>
          </div>
        `;
      } else if (flower.svg) {
        // Render flower head with extended stem
        el.innerHTML = `
          <div style="position: relative; display: flex; flex-direction: column; align-items: center;">
            ${flower.svg}
            <div style="width: 4px; height: 160px; background: linear-gradient(180deg, #3E5A38, #283C25); border-radius: 2px; margin-top: -20px; z-index: -1;"></div>
          </div>
        `;
      }

      stemsContainer.appendChild(el);
    });
  }

  // Visual Mode Switcher
  function applyModeUI() {
    if (currentMode === 'arrange') {
      modeArrangeBtn.classList.add('active');
      modePhotoBtn.classList.remove('active');
      photoUploadSection.style.display = 'none';
    } else {
      modePhotoBtn.classList.add('active');
      modeArrangeBtn.classList.remove('active');
      photoUploadSection.style.display = 'block';
    }
  }

  // Wrapper Paper Switcher
  function applyWrapUI() {
    if (!wrapperPaper) return;
    wrapperPaper.className = `bouquet-wrapper-paper wrap-${currentWrap}`;

    wrapOptionPills.forEach(pill => {
      pill.classList.toggle('active', pill.dataset.wrap === currentWrap);
    });
  }

  // Save in-progress draft to LocalStorage
  function saveDraft() {
    const draft = {
      visualMode: currentMode,
      wrapping: currentWrap,
      flowers: selectedFlowers,
      recipientName: recipientInput ? recipientInput.value.trim() : '',
      occasion: occasionSelect ? occasionSelect.value : 'Friendship',
      message: messageInput ? messageInput.value.trim() : '',
      customPhotoDataUrl: uploadedBouquetPhotoDataUrl
    };
    window.StorageEngine.saveDraftBouquet(draft);
  }

  // Event Listeners
  function setupListeners() {
    // Mode toggle
    modeArrangeBtn.addEventListener('click', () => {
      currentMode = 'arrange';
      applyModeUI();
      renderBouquetVisual();
      saveDraft();
    });

    modePhotoBtn.addEventListener('click', () => {
      currentMode = 'photo';
      applyModeUI();
      renderBouquetVisual();
      saveDraft();
    });

    // Wrapping option pills
    wrapOptionPills.forEach(pill => {
      pill.addEventListener('click', () => {
        currentWrap = pill.dataset.wrap;
        applyWrapUI();
        saveDraft();
      });
    });

    // Form inputs auto-save
    [recipientInput, occasionSelect, messageInput].forEach(el => {
      if (el) el.addEventListener('input', saveDraft);
    });

    // Complete bouquet photo upload dropzone
    const bouquetDropzone = document.getElementById('bouquet-dropzone');
    const bouquetDropEmpty = document.getElementById('bouquet-dropzone-empty');
    const bouquetDropPreview = document.getElementById('bouquet-dropzone-preview');
    const bouquetThumb = document.getElementById('bouquet-preview-thumb');
    const bouquetFileName = document.getElementById('bouquet-file-name');
    const browseBouquetBtn = document.getElementById('browse-bouquet-photo-btn');
    const changeBouquetBtn = document.getElementById('change-bouquet-photo-btn');
    const removeBouquetBtn = document.getElementById('remove-bouquet-photo-btn');

    async function processBouquetFile(file) {
      if (!file || (!file.type.startsWith('image/') && !/\.(jpe?g|png|webp|gif|bmp|avif)$/i.test(file.name))) {
        showToast('Please select a valid image file (JPG, PNG, WebP).', 'error');
        return;
      }

      showToast('Optimizing bouquet photograph...', 'info');

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = async () => {
          try {
            const MAX_DIM = 1000;
            let width = img.naturalWidth || img.width;
            let height = img.naturalHeight || img.height;

            if (width > MAX_DIM || height > MAX_DIM) {
              if (width > height) {
                height = Math.round((height * MAX_DIM) / width);
                width = MAX_DIM;
              } else {
                width = Math.round((width * MAX_DIM) / height);
                height = MAX_DIM;
              }
            }

            const canvas = document.createElement('canvas');
            canvas.width = Math.max(width, 1);
            canvas.height = Math.max(height, 1);
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            uploadedBouquetPhotoDataUrl = canvas.toDataURL('image/jpeg', 0.88);
          } catch (err) {
            uploadedBouquetPhotoDataUrl = e.target.result;
          }

          uploadedBouquetPhotoId = await window.StorageEngine.saveImage(null, uploadedBouquetPhotoDataUrl, { name: file.name || 'bouquet-photo' });
          currentMode = 'photo';
          applyModeUI();
          renderBouquetVisual();

          if (bouquetThumb) bouquetThumb.src = uploadedBouquetPhotoDataUrl;
          if (bouquetFileName) bouquetFileName.textContent = file.name;
          if (bouquetDropEmpty) bouquetDropEmpty.style.display = 'none';
          if (bouquetDropPreview) bouquetDropPreview.style.display = 'flex';
          if (bouquetDropzone) bouquetDropzone.classList.add('has-file');

          saveDraft();
          showToast('Bouquet photograph uploaded! 💐', 'success');
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }

    if (bouquetDropzone) {
      bouquetDropzone.addEventListener('click', (e) => {
        if (e.target.closest('#change-bouquet-photo-btn') || e.target.closest('#remove-bouquet-photo-btn')) return;
        if (bouquetPhotoFileInput) bouquetPhotoFileInput.click();
      });

      ['dragenter', 'dragover'].forEach(eventName => {
        bouquetDropzone.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          bouquetDropzone.classList.add('dragover');
        });
      });

      ['dragleave', 'dragend'].forEach(eventName => {
        bouquetDropzone.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          bouquetDropzone.classList.remove('dragover');
        });
      });

      bouquetDropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();
        bouquetDropzone.classList.remove('dragover');
        if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
          processBouquetFile(e.dataTransfer.files[0]);
        }
      });
    }

    if (browseBouquetBtn) {
      browseBouquetBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (bouquetPhotoFileInput) bouquetPhotoFileInput.click();
      });
    }

    if (changeBouquetBtn) {
      changeBouquetBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (bouquetPhotoFileInput) bouquetPhotoFileInput.click();
      });
    }

    if (removeBouquetBtn) {
      removeBouquetBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        uploadedBouquetPhotoDataUrl = null;
        uploadedBouquetPhotoId = null;
        if (bouquetPhotoFileInput) bouquetPhotoFileInput.value = '';
        if (bouquetThumb) bouquetThumb.src = '';
        if (bouquetDropEmpty) bouquetDropEmpty.style.display = 'block';
        if (bouquetDropPreview) bouquetDropPreview.style.display = 'none';
        if (bouquetDropzone) bouquetDropzone.classList.remove('has-file');
        currentMode = 'arrange';
        applyModeUI();
        renderBouquetVisual();
        saveDraft();
        showToast('Bouquet photo removed. Returned to arrangement mode.', 'info');
      });
    }

    if (bouquetPhotoFileInput) {
      bouquetPhotoFileInput.addEventListener('change', (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) processBouquetFile(file);
      });
    }

    // Submit & Save Final Bouquet Gift
    if (bouquetForm) {
      bouquetForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const recipient = recipientInput.value.trim();
        const occasion = occasionSelect.value;
        const message = messageInput.value.trim();

        if (!recipient) {
          showToast('Please enter the recipient’s name.', 'error');
          recipientInput.focus();
          return;
        }

        if (!message) {
          showToast('Please write a heartfelt secret message.', 'error');
          messageInput.focus();
          return;
        }

        if (currentMode === 'arrange' && selectedFlowers.length === 0) {
          showToast('Please choose at least one flower for your arrangement.', 'error');
          return;
        }

        if (currentMode === 'photo' && !uploadedBouquetPhotoDataUrl) {
          showToast('Please select a bouquet photograph or switch to Arrangement Mode.', 'error');
          return;
        }

        // Generate guaranteed unique gift code
        let uniqueCode = window.generateGiftCode();
        let isAvailable = await window.StorageEngine.isGiftCodeAvailable(uniqueCode);
        while (!isAvailable) {
          uniqueCode = window.generateGiftCode();
          isAvailable = await window.StorageEngine.isGiftCodeAvailable(uniqueCode);
        }

        // Prepare gift object
        const gift = {
          code: uniqueCode,
          recipient,
          occasion,
          message,
          visualMode: currentMode,
          wrapping: currentWrap,
          flowers: selectedFlowers,
          customPhotoId: uploadedBouquetPhotoId || null,
          customPhotoDataUrl: uploadedBouquetPhotoDataUrl || null,
          createdAt: new Date().toISOString()
        };

        try {
          await window.StorageEngine.saveGift(gift);
          window.StorageEngine.setActiveGiftCode(uniqueCode);
          window.StorageEngine.clearDraftBouquet();
          showToast('✨ Bouquet crafted and gift code generated!', 'success');
          
          // Redirect to Preview page
          setTimeout(() => {
            window.location.href = `preview.html?code=${uniqueCode}`;
          }, 600);
        } catch (err) {
          console.error(err);
          showToast('Failed to save bouquet. Please try again.', 'error');
        }
      });
    }
  }

  // Run initialization
  await init();
});

