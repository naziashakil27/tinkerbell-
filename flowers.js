/**
 * TINKERBELL — THE SECRET LANGUAGE OF FLOWERS
 * Flower Library Page Controller (flowers.js)
 */

document.addEventListener('DOMContentLoaded', async () => {
  const flowersGrid = document.getElementById('flowers-grid');
  const searchInput = document.getElementById('flower-search');
  const categoryPills = document.querySelectorAll('.filter-pill');
  const flowerCountSpan = document.getElementById('flower-count');

  // Modal Elements
  const detailModal = document.getElementById('flower-detail-modal');
  const detailModalBody = document.getElementById('detail-modal-body');
  const uploadModal = document.getElementById('flower-upload-modal');
  const openUploadBtn = document.getElementById('open-upload-btn');
  const closeDetailBtn = document.getElementById('close-detail-btn');
  const closeUploadBtn = document.getElementById('close-upload-btn');
  const customFlowerForm = document.getElementById('custom-flower-form');
  const photoFileInput = document.getElementById('flower-photo-file');
  const photoPreviewBox = document.getElementById('photo-preview-box');
  const photoPreviewImg = document.getElementById('photo-preview-img');

  // Backup / Restore buttons
  const exportBtn = document.getElementById('export-backup-btn');
  const importBtn = document.getElementById('import-backup-btn');
  const importFileInput = document.getElementById('import-file-input');

  let activeCategory = 'All';
  let searchQuery = '';
  let catalog = [];
  let pendingImageDataUrl = null;

  // Load merged catalog
  async function reloadCatalog() {
    catalog = await window.getCompleteFlowerCatalog();
    renderFlowers();
  }

  // Filter & Render
  function renderFlowers() {
    if (!flowersGrid) return;

    const filtered = catalog.filter(flower => {
      const matchesCategory = activeCategory === 'All' 
        || (activeCategory === 'Custom' && flower.isCustom)
        || flower.category === activeCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q 
        || flower.name.toLowerCase().includes(q)
        || (flower.botanicalName && flower.botanicalName.toLowerCase().includes(q))
        || flower.meaning.toLowerCase().includes(q)
        || (flower.symbolism && flower.symbolism.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });

    if (flowerCountSpan) {
      flowerCountSpan.textContent = `${filtered.length} Botanical Specimen${filtered.length === 1 ? '' : 's'}`;
    }

    if (filtered.length === 0) {
      flowersGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;">
          <div style="font-size: 3rem; margin-bottom: 1rem;">🌸</div>
          <h3>No flowers match your search</h3>
          <p style="color: var(--color-botanical-muted); margin-bottom: 1.5rem;">Try searching for a different sentiment or reset the filter.</p>
          <button class="btn btn-secondary btn-sm" id="reset-filters-btn">Reset All Filters</button>
        </div>
      `;
      const resetBtn = document.getElementById('reset-filters-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          activeCategory = 'All';
          searchQuery = '';
          if (searchInput) searchInput.value = '';
          categoryPills.forEach(p => p.classList.toggle('active', p.dataset.category === 'All'));
          renderFlowers();
        });
      }
      return;
    }

    flowersGrid.innerHTML = filtered.map(flower => createFlowerCardHTML(flower)).join('');

    // Attach card event listeners
    attachCardListeners();
  }

  function createFlowerCardHTML(flower) {
    const isCustom = flower.isCustom;
    const categoryBadge = `<span class="badge-tag">${flower.category || 'Botanical'}</span>`;
    const customBadge = isCustom ? `<span class="badge-tag badge-custom">★ Custom</span>` : '';

    let visualContent = '';
    if (flower.photoDataUrl) {
      visualContent = `<img src="${flower.photoDataUrl}" alt="${flower.name}" class="card-custom-img" loading="lazy" />`;
    } else if (flower.svg) {
      visualContent = flower.svg;
    } else {
      visualContent = `
        <svg viewBox="0 0 100 100" class="flower-art" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="32" fill="${flower.colorHex || '#E8B4B8'}" />
          <circle cx="50" cy="50" r="14" fill="#F4D03F" />
        </svg>
      `;
    }

    return `
      <article class="flower-card" data-id="${flower.id}">
        <div class="card-image-box">
          ${customBadge}
          ${categoryBadge}
          ${visualContent}
        </div>
        <div class="card-body">
          <h3 class="flower-name">${flower.name}</h3>
          <div class="botanical-latin">${flower.botanicalName || 'Floriography Selection'}</div>
          <div class="flower-meaning-pill">
            <strong>Meaning:</strong> ${flower.meaning}
          </div>
          <p class="flower-desc-short">${flower.description || flower.symbolism || ''}</p>
          <div class="card-footer-actions">
            <button class="btn btn-secondary btn-sm view-details-btn" data-id="${flower.id}" style="flex: 1;">
              Learn Story
            </button>
            <button class="btn btn-primary btn-sm add-draft-btn" data-id="${flower.id}" title="Add to Bouquet Creator">
              + Bouquet
            </button>
            ${isCustom ? `
              <button class="btn btn-secondary btn-sm delete-custom-btn" data-id="${flower.id}" title="Delete Custom Flower" style="padding: 0.5rem; color: #C0392B;">
                ✕
              </button>
            ` : ''}
          </div>
        </div>
      </article>
    `;
  }

  function attachCardListeners() {
    // Learn Story Modal
    document.querySelectorAll('.view-details-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const id = e.currentTarget.dataset.id;
        const flower = catalog.find(f => f.id === id);
        if (flower) openDetailModal(flower);
      });
    });

    // Add to Bouquet Draft
    document.querySelectorAll('.add-draft-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const flower = catalog.find(f => f.id === id);
        if (flower) {
          addFlowerToDraft(flower);
        }
      });
    });

    // Delete custom flower
    document.querySelectorAll('.delete-custom-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const id = e.currentTarget.dataset.id;
        if (confirm('Are you sure you want to remove this custom flower?')) {
          await window.StorageEngine.deleteCustomFlower(id);
          showToast('Custom flower removed.', 'info');
          await reloadCatalog();
        }
      });
    });
  }

  function addFlowerToDraft(flower) {
    const draft = window.StorageEngine.getDraftBouquet() || {
      flowers: [],
      wrapping: 'ivory',
      recipientName: '',
      occasion: 'Friendship',
      message: '',
      visualMode: 'arrange'
    };

    const existing = draft.flowers.find(f => f.flowerId === flower.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      draft.flowers.push({ flowerId: flower.id, quantity: 1 });
    }

    window.StorageEngine.saveDraftBouquet(draft);
    showToast(`Added ${flower.name} to bouquet creator! 🌿`, 'success');
  }

  // Open Detailed Flower Modal
  function openDetailModal(flower) {
    let visualHTML = '';
    if (flower.photoDataUrl) {
      visualHTML = `<img src="${flower.photoDataUrl}" alt="${flower.name}" style="width: 100%; height: 260px; object-fit: cover; border-radius: 12px; margin-bottom: 1.5rem;" />`;
    } else if (flower.svg) {
      visualHTML = `<div style="display: flex; justify-content: center; padding: 1.5rem; background: radial-gradient(circle, #FAF5ED 0%, #EFE8DA 100%); border-radius: 12px; margin-bottom: 1.5rem;">${flower.svg.replace('class="flower-art"', 'style="width: 180px; height: 180px;"')}</div>`;
    }

    detailModalBody.innerHTML = `
      ${visualHTML}
      <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.5rem;">
        <h2 style="font-size: 2rem;">${flower.name}</h2>
        <span class="badge-tag">${flower.category}</span>
      </div>
      <p style="font-family: var(--font-serif); font-style: italic; color: var(--color-botanical-muted); margin-bottom: 1.25rem;">
        ${flower.botanicalName || 'Botanical Wonder'}
      </p>

      <div style="background: var(--color-sage-light); border-left: 4px solid var(--color-sage); padding: 1rem; border-radius: 6px; margin-bottom: 1.5rem;">
        <div style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-sage); font-weight: 700; margin-bottom: 0.25rem;">Victorian Meaning</div>
        <div style="font-size: 1.15rem; font-family: var(--font-serif); color: var(--color-botanical-dark); font-weight: 600;">
          "${flower.meaning}"
        </div>
      </div>

      <h4 style="margin-bottom: 0.5rem; font-size: 1.1rem;">Botanical Symbolism & Lore</h4>
      <p style="color: var(--color-botanical-text); line-height: 1.7; margin-bottom: 1.5rem;">
        ${flower.symbolism || flower.description}
      </p>

      ${flower.description && flower.symbolism ? `
        <h4 style="margin-bottom: 0.5rem; font-size: 1.1rem;">Fairy Garden Notes</h4>
        <p style="color: var(--color-botanical-muted); line-height: 1.7; margin-bottom: 1.5rem;">
          ${flower.description}
        </p>
      ` : ''}

      <div style="display: flex; gap: 1rem; margin-top: 2rem; border-top: 1px solid var(--color-border); padding-top: 1.25rem;">
        <button class="btn btn-primary" id="modal-add-to-creator" style="flex: 1;">
          Add to My Bouquet
        </button>
        <a href="create.html" class="btn btn-secondary">Go to Creator</a>
      </div>
    `;

    document.getElementById('modal-add-to-creator').addEventListener('click', () => {
      addFlowerToDraft(flower);
      closeDetailModal();
    });

    detailModal.classList.add('active');
  }

  function closeDetailModal() {
    detailModal.classList.remove('active');
  }

  // Live Search listener
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderFlowers();
    });
  }

  // Category Filter listeners
  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      categoryPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCategory = pill.dataset.category;
      renderFlowers();
    });
  });

  // Modal Close buttons
  if (closeDetailBtn) closeDetailBtn.addEventListener('click', closeDetailModal);
  if (detailModal) {
    detailModal.addEventListener('click', (e) => {
      if (e.target === detailModal) closeDetailModal();
    });
  }

  // Upload Custom Flower Modal
  if (openUploadBtn) {
    openUploadBtn.addEventListener('click', () => {
      uploadModal.classList.add('active');
    });
  }

  if (closeUploadBtn) {
    closeUploadBtn.addEventListener('click', () => {
      uploadModal.classList.remove('active');
    });
  }

  if (uploadModal) {
    uploadModal.addEventListener('click', (e) => {
      if (e.target === uploadModal) uploadModal.classList.remove('active');
    });
  }

  // Dropzone and Photo Upload Elements
  const dropzone = document.getElementById('flower-dropzone');
  const dropzoneEmpty = document.getElementById('dropzone-empty-state');
  const dropzonePreview = document.getElementById('dropzone-preview-state');
  const photoFileName = document.getElementById('photo-file-name');
  const browsePhotoBtn = document.getElementById('browse-photo-btn');
  const changePhotoBtn = document.getElementById('change-photo-btn');
  const removePhotoBtn = document.getElementById('remove-photo-btn');

  // Client-Side Canvas Image Optimizer
  // Resizes any uploaded photo (phone, camera, screenshot) to max 800x800 px.
  // This produces a lightweight ~60-90KB JPEG that fits safely in IndexedDB/LocalStorage with zero quota errors.
  function optimizeImageFile(file) {
    return new Promise((resolve, reject) => {
      if (!file || (!file.type.startsWith('image/') && !/\.(jpe?g|png|webp|gif|bmp|avif)$/i.test(file.name))) {
        reject(new Error('Please choose a valid image file (JPG, PNG, WebP, etc.).'));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          try {
            const MAX_DIM = 800;
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

            const optimizedDataUrl = canvas.toDataURL('image/jpeg', 0.88);
            resolve({
              dataUrl: optimizedDataUrl,
              fileName: file.name,
              sizeStr: Math.round(optimizedDataUrl.length * 0.75 / 1024) + ' KB'
            });
          } catch (canvasErr) {
            // Fallback to original data URL if canvas manipulation is blocked
            resolve({
              dataUrl: e.target.result,
              fileName: file.name,
              sizeStr: Math.round(file.size / 1024) + ' KB'
            });
          }
        };
        img.onerror = () => reject(new Error('Could not decode this image file. Please try another photograph.'));
        img.src = e.target.result;
      };
      reader.onerror = () => reject(new Error('Error reading image from your device.'));
      reader.readAsDataURL(file);
    });
  }

  // Handle Photo File Load
  async function handleSelectedPhoto(file) {
    if (!file) return;
    try {
      showToast('Processing flower photo...', 'info');
      const result = await optimizeImageFile(file);
      pendingImageDataUrl = result.dataUrl;

      // Update Preview UI
      if (photoPreviewImg) photoPreviewImg.src = pendingImageDataUrl;
      if (photoFileName) photoFileName.textContent = `${result.fileName} (${result.sizeStr})`;
      if (dropzoneEmpty) dropzoneEmpty.style.display = 'none';
      if (dropzonePreview) dropzonePreview.style.display = 'flex';
      if (dropzone) dropzone.classList.add('has-file');

      showToast('Photo attached successfully! 🌸', 'success');
    } catch (err) {
      showToast(err.message, 'error');
      clearPhotoInput();
    }
  }

  function clearPhotoInput() {
    pendingImageDataUrl = null;
    if (photoFileInput) photoFileInput.value = '';
    if (photoPreviewImg) photoPreviewImg.src = '';
    if (dropzoneEmpty) dropzoneEmpty.style.display = 'block';
    if (dropzonePreview) dropzonePreview.style.display = 'none';
    if (dropzone) dropzone.classList.remove('has-file');
  }

  // Dropzone Click and Key Events
  if (dropzone) {
    dropzone.addEventListener('click', (e) => {
      // Don't re-trigger if clicking change or remove buttons
      if (e.target.closest('#change-photo-btn') || e.target.closest('#remove-photo-btn')) return;
      if (photoFileInput) photoFileInput.click();
    });

    dropzone.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (photoFileInput) photoFileInput.click();
      }
    });

    // Drag & Drop Listeners
    ['dragenter', 'dragover'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.add('dragover');
      });
    });

    ['dragleave', 'dragend'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.remove('dragover');
      });
    });

    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.remove('dragover');
      const droppedFiles = e.dataTransfer ? e.dataTransfer.files : null;
      if (droppedFiles && droppedFiles.length > 0) {
        handleSelectedPhoto(droppedFiles[0]);
      }
    });
  }

  if (browsePhotoBtn) {
    browsePhotoBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (photoFileInput) photoFileInput.click();
    });
  }

  if (changePhotoBtn) {
    changePhotoBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (photoFileInput) photoFileInput.click();
    });
  }

  if (removePhotoBtn) {
    removePhotoBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      clearPhotoInput();
      showToast('Photo removed.', 'info');
    });
  }

  // Handle Photo File Input Change
  if (photoFileInput) {
    photoFileInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
        handleSelectedPhoto(file);
      }
    });
  }

  // Save Custom Flower Form Submit
  if (customFlowerForm) {
    customFlowerForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('custom-name').value.trim();
      const botanicalName = document.getElementById('custom-botanical').value.trim();
      const category = document.getElementById('custom-category').value;
      const meaning = document.getElementById('custom-meaning').value.trim();
      const symbolism = document.getElementById('custom-symbolism').value.trim();

      if (!name || !meaning) {
        showToast('Please fill in the flower name and meaning.', 'error');
        return;
      }

      let imageId = null;
      if (pendingImageDataUrl) {
        imageId = await window.StorageEngine.saveImage(null, pendingImageDataUrl, { name });
      }

      const newFlower = {
        id: 'custom_' + Date.now(),
        name,
        botanicalName: botanicalName || 'Botanical Wonder',
        category: category || 'Deep Affection',
        meaning,
        symbolism: symbolism || `Carries the sacred sentiment of ${meaning}.`,
        description: 'A personal botanical specimen lovingly added to your enchanted garden.',
        imageId,
        photoDataUrl: pendingImageDataUrl || null,
        isCustom: true
      };

      await window.StorageEngine.saveCustomFlower(newFlower);
      showToast(`✨ ${name} saved to your botanical collection!`, 'success');

      // Reset form & state
      customFlowerForm.reset();
      clearPhotoInput();
      uploadModal.classList.remove('active');

      // Reset category filter to All and clear search so the new flower is immediately visible
      activeCategory = 'All';
      searchQuery = '';
      if (searchInput) searchInput.value = '';
      categoryPills.forEach(p => p.classList.toggle('active', p.dataset.category === 'All'));

      await reloadCatalog();

      // Scroll smoothly to top of flowers grid
      if (flowersGrid) {
        flowersGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // Backup Export
  if (exportBtn) {
    exportBtn.addEventListener('click', async () => {
      try {
        const jsonStr = await window.StorageEngine.exportBackupJSON();
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const dateStr = new Date().toISOString().split('T')[0];
        a.download = `tinkerbell-botanical-backup-${dateStr}.json`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        showToast('Garden backup downloaded safely! 🌿', 'success');
      } catch (err) {
        console.error(err);
        showToast('Failed to export backup.', 'error');
      }
    });
  }

  // Backup Import Trigger
  if (importBtn && importFileInput) {
    importBtn.addEventListener('click', () => {
      importFileInput.click();
    });

    importFileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const result = await window.StorageEngine.importBackupJSON(event.target.result);
          showToast(`Restored: ${result.flowersRestored} flowers, ${result.giftsRestored} gifts. ✨`, 'success');
          await reloadCatalog();
        } catch (err) {
          showToast(`Import error: ${err.message}`, 'error');
        }
        importFileInput.value = '';
      };
      reader.readAsText(file);
    });
  }

  // Initial load
  await reloadCatalog();
});

