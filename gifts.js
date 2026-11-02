/**
 * TINKERBELL — THE SECRET LANGUAGE OF FLOWERS
 * Gift Presentation & Preview Controller (gifts.js)
 */

document.addEventListener('DOMContentLoaded', async () => {
  const previewContainer = document.getElementById('preview-container');
  const codeDisplayEl = document.getElementById('preview-gift-code');
  const copyBtn = document.getElementById('copy-code-btn');
  const recipientEl = document.getElementById('preview-recipient');
  const occasionEl = document.getElementById('preview-occasion');
  const messageEl = document.getElementById('preview-message');
  const flowersListEl = document.getElementById('preview-flowers-list');
  const visualContainerEl = document.getElementById('preview-visual-box');
  const testUnlockLink = document.getElementById('test-unlock-link');
  const decodeLink = document.getElementById('preview-decode-link');

  // Determine code from URL query param or active gift in storage
  const urlParams = new URLSearchParams(window.location.search);
  let code = urlParams.get('code') || window.StorageEngine.getActiveGiftCode();

  if (!code) {
    if (previewContainer) {
      previewContainer.innerHTML = `
        <div style="text-align: center; padding: 4rem 1.5rem; background: var(--color-surface); border-radius: var(--radius-lg); border: 1px solid var(--color-border); max-width: 600px; margin: 3rem auto;">
          <div style="font-size: 3rem; margin-bottom: 1rem;">🥀</div>
          <h2 style="font-size: 2rem; margin-bottom: 0.75rem;">No Bouquet Selected</h2>
          <p style="color: var(--color-botanical-muted); margin-bottom: 2rem;">It seems you haven’t crafted a bouquet yet or the link is missing a code.</p>
          <a href="create.html" class="btn btn-primary">Create a Bouquet Now</a>
        </div>
      `;
    }
    return;
  }

  code = code.trim().toUpperCase();

  // Fetch gift record
  const gift = await window.StorageEngine.getGiftByCode(code);
  if (!gift) {
    if (previewContainer) {
      previewContainer.innerHTML = `
        <div style="text-align: center; padding: 4rem 1.5rem; background: var(--color-surface); border-radius: var(--radius-lg); border: 1px solid var(--color-border); max-width: 600px; margin: 3rem auto;">
          <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
          <h2 style="font-size: 2rem; margin-bottom: 0.75rem;">Bouquet Not Found</h2>
          <p style="color: var(--color-botanical-muted); margin-bottom: 2rem;">We couldn't locate any floral gift matching code <strong>${code}</strong> in this browser.</p>
          <a href="create.html" class="btn btn-primary">Create a Bouquet</a>
        </div>
      `;
    }
    return;
  }

  // Populate preview metadata
  if (codeDisplayEl) codeDisplayEl.textContent = gift.code;
  if (recipientEl) recipientEl.textContent = gift.recipient;
  if (occasionEl) occasionEl.textContent = gift.occasion;
  if (messageEl) messageEl.textContent = `"${gift.message}"`;

  if (testUnlockLink) testUnlockLink.href = `unlock.html?code=${gift.code}`;
  if (decodeLink) decodeLink.href = `decode.html?code=${gift.code}`;

  // Copy Code Button
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      window.copyToClipboard(gift.code, `Gift code ${gift.code} copied! Share it with ${gift.recipient} 🌸`);
    });
  }

  // Render Visual Composition
  if (visualContainerEl) {
    if (gift.visualMode === 'photo' && (gift.customPhotoDataUrl || gift.customPhotoId)) {
      let photoUrl = gift.customPhotoDataUrl;
      if (!photoUrl && gift.customPhotoId) {
        photoUrl = await window.StorageEngine.getImage(gift.customPhotoId);
      }
      visualContainerEl.innerHTML = `
        <img src="${photoUrl}" alt="Arranged Bouquet" style="width: 100%; height: 100%; object-fit: cover;" />
      `;
    } else {
      // Arrangement Mode: Recreate layered visual
      const catalog = await window.getCompleteFlowerCatalog();
      const wrapClass = `wrap-${gift.wrapping || 'ivory'}`;
      
      let stemsHTML = '';
      const stemTokens = [];
      (gift.flowers || []).forEach(item => {
        const flower = catalog.find(f => f.id === item.flowerId);
        if (flower) {
          for (let i = 0; i < item.quantity; i++) {
            stemTokens.push(flower);
          }
        }
      });

      const count = stemTokens.length;
      stemTokens.forEach((flower, index) => {
        const t = count === 1 ? 0.5 : (index / (count - 1));
        const angle = (t - 0.5) * 50;
        const leftOffset = 20 + t * 50;
        const arcBonus = Math.sin(t * Math.PI) * 40;
        const topOffset = 110 - arcBonus + ((index % 3) * 10);
        const scale = 0.85 + ((index % 2) * 0.12);

        let inner = '';
        if (flower.photoDataUrl) {
          inner = `
            <div style="position: relative; display: flex; flex-direction: column; align-items: center;">
              <img src="${flower.photoDataUrl}" alt="${flower.name}" style="width: 75px; height: 75px; border-radius: 50%; border: 2px solid #fff; object-fit: cover;" />
              <div style="width: 3px; height: 130px; background: #3E5A38; border-radius: 2px; margin-top: -6px;"></div>
            </div>
          `;
        } else if (flower.svg) {
          inner = `
            <div style="position: relative; display: flex; flex-direction: column; align-items: center;">
              <div style="width: 90px; height: 90px;">${flower.svg}</div>
              <div style="width: 3px; height: 130px; background: #3E5A38; border-radius: 2px; margin-top: -20px; z-index: -1;"></div>
            </div>
          `;
        }

        stemsHTML += `
          <div style="position: absolute; left: calc(${leftOffset}% - 45px); top: ${topOffset}px; transform: rotate(${angle}deg) scale(${scale}); z-index: ${Math.floor(10 + arcBonus)}; pointer-events: none;">
            ${inner}
          </div>
        `;
      });

      visualContainerEl.innerHTML = `
        <div style="position: relative; width: 100%; height: 100%; overflow: hidden; background: radial-gradient(circle at 50% 30%, #FDFBF7 0%, #EFE5D5 100%);">
          <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
            ${stemsHTML}
          </div>
          <div class="bouquet-wrapper-paper ${wrapClass}" style="transform: translateX(-50%) scale(0.95); bottom: -10px;"></div>
          <div class="bouquet-ribbon-bow" style="bottom: 40px;">
            <div class="ribbon-loop-left"></div>
            <div class="ribbon-knot"></div>
            <div class="ribbon-loop-right"></div>
          </div>
        </div>
      `;
    }
  }

  // Render Selected Flowers and Floriography Meanings
  if (flowersListEl && gift.flowers) {
    const catalog = await window.getCompleteFlowerCatalog();
    flowersListEl.innerHTML = gift.flowers.map(item => {
      const flower = catalog.find(f => f.id === item.flowerId);
      if (!flower) return '';

      return `
        <div class="accordion-flower-row">
          <div style="width: 34px; height: 34px; border-radius: 50%; background: #fff; overflow: hidden; display: flex; align-items: center; justify-content: center; flex-shrink: 0; border: 1px solid var(--color-border);">
            ${flower.photoDataUrl ? `<img src="${flower.photoDataUrl}" style="width: 100%; height: 100%; object-fit: cover;" />` : flower.svg}
          </div>
          <div style="flex: 1;">
            <div style="font-weight: 600; font-size: 0.92rem;">
              ${flower.name} <span style="font-size: 0.8rem; font-weight: 400; color: var(--color-botanical-muted);">(${item.quantity} stem${item.quantity === 1 ? '' : 's'})</span>
            </div>
            <div style="font-size: 0.82rem; color: var(--color-botanical-dark);">
              <strong>Message:</strong> "${flower.meaning}"
            </div>
          </div>
        </div>
      `;
    }).join('');
  }
});

