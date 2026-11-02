/**
 * TINKERBELL — THE SECRET LANGUAGE OF FLOWERS
 * Gift Unlock Controller (unlock.js)
 * 
 * Features:
 * - Enter key & button unlock support.
 * - Exact saved bouquet retrieval from IndexedDB (no generic placeholders).
 * - Magical envelope opening & fairy sparkles animation.
 * - Full presentation of recipient, occasion, custom photos, and secret message.
 * - Friendly error handling for invalid/missing codes.
 */

document.addEventListener('DOMContentLoaded', async () => {
  const codeInput = document.getElementById('unlock-code-input');
  const unlockBtn = document.getElementById('unlock-submit-btn');
  const errorMessageEl = document.getElementById('unlock-error-message');
  const unlockHeroSection = document.getElementById('unlock-hero-section');
  const giftResultSection = document.getElementById('gift-result-section');
  const envelopeEl = document.getElementById('magic-envelope');

  // Gift Display Elements
  const giftCodeBadge = document.getElementById('unlocked-gift-code');
  const recipientNameEl = document.getElementById('unlocked-recipient');
  const occasionEl = document.getElementById('unlocked-occasion');
  const messageEl = document.getElementById('unlocked-message');
  const visualContainerEl = document.getElementById('unlocked-visual-box');
  const flowersListEl = document.getElementById('unlocked-flowers-list');
  const decodeBtn = document.getElementById('unlocked-decode-btn');

  // Check if code was passed in URL query param
  const urlParams = new URLSearchParams(window.location.search);
  const codeParam = urlParams.get('code');
  if (codeParam && codeInput) {
    codeInput.value = codeParam.trim().toUpperCase();
    handleUnlock();
  }

  // Trigger unlock on button click or Enter key
  if (unlockBtn) {
    unlockBtn.addEventListener('click', handleUnlock);
  }

  if (codeInput) {
    codeInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleUnlock();
      }
    });

    codeInput.addEventListener('input', () => {
      hideError();
    });
  }

  async function handleUnlock() {
    const rawCode = codeInput ? codeInput.value.trim().toUpperCase() : '';
    if (!rawCode) {
      showError('Please enter a secret gift code.');
      if (codeInput) codeInput.focus();
      return;
    }

    // Format validation
    if (!rawCode.startsWith('TINK-') || rawCode.length < 8) {
      showError('Gift codes usually look like "TINK-XXXXXX". Please check your spelling.');
      return;
    }

    // Lookup in StorageEngine
    const gift = await window.StorageEngine.getGiftByCode(rawCode);
    if (!gift) {
      showError(`No secret bouquet found matching code "${rawCode}". Please check with your sender.`);
      return;
    }

    // Found! Run magical reveal animation
    runRevealAnimation(gift);
  }

  function showError(msg) {
    if (errorMessageEl) {
      errorMessageEl.textContent = msg;
      errorMessageEl.style.display = 'block';
    }
    if (codeInput) {
      codeInput.style.borderColor = '#C0392B';
      codeInput.animate([
        { transform: 'translateX(-6px)' },
        { transform: 'translateX(6px)' },
        { transform: 'translateX(-4px)' },
        { transform: 'translateX(4px)' },
        { transform: 'translateX(0)' }
      ], { duration: 300 });
    }
  }

  function hideError() {
    if (errorMessageEl) errorMessageEl.style.display = 'none';
    if (codeInput) codeInput.style.borderColor = 'var(--color-border)';
  }

  async function runRevealAnimation(gift) {
    hideError();

    // Animate envelope
    if (envelopeEl) {
      envelopeEl.classList.add('unlocked');
      showToast('Unsealing your magical bouquet... ✨', 'success');
    }

    setTimeout(async () => {
      if (unlockHeroSection) unlockHeroSection.style.display = 'none';
      if (giftResultSection) {
        giftResultSection.style.display = 'block';
        giftResultSection.scrollIntoView({ behavior: 'smooth' });
      }

      await populateUnlockedGift(gift);
    }, 600);
  }

  async function populateUnlockedGift(gift) {
    if (giftCodeBadge) giftCodeBadge.textContent = gift.code;
    if (recipientNameEl) recipientNameEl.textContent = gift.recipient;
    if (occasionEl) occasionEl.textContent = gift.occasion;
    if (messageEl) messageEl.textContent = `"${gift.message}"`;

    if (decodeBtn) {
      decodeBtn.href = `decode.html?code=${gift.code}`;
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

    // Render Flower Breakdown
    if (flowersListEl && gift.flowers) {
      const catalog = await window.getCompleteFlowerCatalog();
      flowersListEl.innerHTML = gift.flowers.map(item => {
        const flower = catalog.find(f => f.id === item.flowerId);
        if (!flower) return '';

        return `
          <div class="accordion-flower-row">
            <div style="width: 36px; height: 36px; border-radius: 50%; background: #fff; overflow: hidden; display: flex; align-items: center; justify-content: center; flex-shrink: 0; border: 1px solid var(--color-border);">
              ${flower.photoDataUrl ? `<img src="${flower.photoDataUrl}" style="width: 100%; height: 100%; object-fit: cover;" />` : flower.svg}
            </div>
            <div style="flex: 1;">
              <div style="font-weight: 600; font-size: 0.95rem;">
                ${flower.name} <span style="font-size: 0.8rem; font-weight: 400; color: var(--color-botanical-muted);">(${item.quantity} stem${item.quantity === 1 ? '' : 's'})</span>
              </div>
              <div style="font-size: 0.85rem; color: var(--color-botanical-dark);">
                <strong>Secret Meaning:</strong> "${flower.meaning}"
              </div>
            </div>
          </div>
        `;
      }).join('');
    }
  }
});

