/**
 * TINKERBELL — THE SECRET LANGUAGE OF FLOWERS
 * Floriography Decoder Controller (decode.js)
 * 
 * Features:
 * - Decodes secret meanings for specific bouquets (via ?code=TINK-...).
 * - Synthesizes a holistic composite message of deep affection from all selected flowers.
 * - Standalone Floriography Dictionary search for exploring any flower's meaning.
 */

document.addEventListener('DOMContentLoaded', async () => {
  const bouquetDecoderSection = document.getElementById('bouquet-decoder-section');
  const bouquetInfoTitle = document.getElementById('decoded-bouquet-title');
  const bouquetMessageSummary = document.getElementById('decoded-message-summary');
  const decodedCardsContainer = document.getElementById('decoded-flowers-cards');

  const dictSearchInput = document.getElementById('dict-search-input');
  const dictListContainer = document.getElementById('dict-list-container');

  const catalog = await window.getCompleteFlowerCatalog();

  // Check if a code is passed in URL
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');

  if (code && bouquetDecoderSection) {
    const gift = await window.StorageEngine.getGiftByCode(code.trim().toUpperCase());
    if (gift) {
      renderBouquetDecoding(gift);
    } else {
      bouquetDecoderSection.innerHTML = `
        <div style="background: var(--color-surface); padding: 2rem; border-radius: var(--radius-md); border: 1px solid var(--color-border); text-align: center; margin-bottom: 3rem;">
          <h3 style="color: var(--color-botanical-dark); margin-bottom: 0.5rem;">Bouquet ${code} Not Found</h3>
          <p style="color: var(--color-botanical-muted);">You can still explore the secret floral meanings below in our master botanical dictionary.</p>
        </div>
      `;
    }
  } else if (bouquetDecoderSection) {
    bouquetDecoderSection.style.display = 'none';
  }

  // Render Bouquet Decoding
  function renderBouquetDecoding(gift) {
    bouquetDecoderSection.style.display = 'block';
    if (bouquetInfoTitle) {
      bouquetInfoTitle.textContent = `Secret Language of ${gift.recipient}'s Bouquet (${gift.occasion})`;
    }

    const includedFlowers = [];
    (gift.flowers || []).forEach(item => {
      const f = catalog.find(flow => flow.id === item.flowerId);
      if (f) includedFlowers.push({ ...f, qty: item.quantity });
    });

    if (includedFlowers.length === 0) return;

    // Compose a poetic summary of the combined meanings
    const meaningsList = includedFlowers.map(f => f.meaning).join(' • ');
    if (bouquetMessageSummary) {
      bouquetMessageSummary.innerHTML = `
        <div class="floriography-banner" style="margin-bottom: 2rem; padding: 2.5rem;">
          <div class="eyebrow" style="color: var(--color-gold);">Secret Floral Cipher Decoded</div>
          <h3 style="color: #fff; font-size: 1.8rem; margin-bottom: 1rem;">The Unspoken Message Carried by These Blooms:</h3>
          <div class="quote-highlight" style="color: #FDEBD0; border-color: var(--color-gold);">
            "${includedFlowers.map(f => f.name).join(', ')} together convey: ${meaningsList}."
          </div>
          <p style="color: #E5E8E8; font-size: 0.95rem;">
            Recipient: <strong>${gift.recipient}</strong> &bull; Occasion: <strong>${gift.occasion}</strong> &bull; Secret Code: <strong>${gift.code}</strong>
          </p>
        </div>
      `;
    }

    // Render individual flower meaning cards
    if (decodedCardsContainer) {
      decodedCardsContainer.innerHTML = includedFlowers.map(flower => {
        return `
          <div class="flower-card" style="margin-bottom: 1.5rem;">
            <div style="display: flex; flex-direction: row; flex-wrap: wrap;">
              <div class="card-image-box" style="width: 200px; height: 180px; flex-shrink: 0;">
                ${flower.photoDataUrl ? `<img src="${flower.photoDataUrl}" alt="${flower.name}" class="card-custom-img" />` : flower.svg}
              </div>
              <div class="card-body" style="flex: 1; min-width: 250px;">
                <div style="display: flex; justify-content: space-between; align-items: baseline;">
                  <h3 class="flower-name">${flower.name}</h3>
                  <span class="badge-tag">${flower.qty} Stems</span>
                </div>
                <div class="botanical-latin">${flower.botanicalName || 'Floriography Specimen'}</div>
                <div class="flower-meaning-pill" style="margin-bottom: 0.75rem;">
                  <strong>Meaning:</strong> ${flower.meaning}
                </div>
                <p style="font-size: 0.88rem; color: var(--color-botanical-text); line-height: 1.6;">
                  ${flower.symbolism || flower.description}
                </p>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  // Dictionary Search & List
  function renderDictionary(filter = '') {
    if (!dictListContainer) return;

    const q = filter.toLowerCase().trim();
    const filtered = catalog.filter(f => {
      return !q 
        || f.name.toLowerCase().includes(q)
        || (f.botanicalName && f.botanicalName.toLowerCase().includes(q))
        || f.meaning.toLowerCase().includes(q)
        || (f.symbolism && f.symbolism.toLowerCase().includes(q));
    });

    if (filtered.length === 0) {
      dictListContainer.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem; color: var(--color-botanical-muted);">
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">📜</div>
          <h3>No matching botanical meanings</h3>
          <p>Try searching for words like 'love', 'loyalty', 'purity', or 'serenity'.</p>
        </div>
      `;
      return;
    }

    dictListContainer.innerHTML = filtered.map(flower => {
      return `
        <div class="step-card" style="text-align: left; padding: 1.5rem; display: flex; gap: 1.25rem; align-items: center; margin-bottom: 1rem;">
          <div style="width: 60px; height: 60px; border-radius: 50%; background: var(--color-bg); flex-shrink: 0; display: flex; align-items: center; justify-content: center; overflow: hidden; border: 1px solid var(--color-border);">
            ${flower.photoDataUrl ? `<img src="${flower.photoDataUrl}" style="width: 100%; height: 100%; object-fit: cover;" />` : flower.svg}
          </div>
          <div style="flex: 1;">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;">
              <h4 style="font-size: 1.2rem; margin-bottom: 0.2rem;">${flower.name}</h4>
              <span class="badge-tag" style="position: static;">${flower.category}</span>
            </div>
            <div style="font-size: 0.82rem; font-style: italic; color: var(--color-botanical-muted); margin-bottom: 0.4rem;">${flower.botanicalName || 'Floriography'}</div>
            <div style="font-size: 0.92rem; color: var(--color-sage-hover); font-weight: 600;">
              Secret Language: "${flower.meaning}"
            </div>
            <p style="font-size: 0.84rem; color: var(--color-botanical-muted); margin-top: 0.4rem; line-height: 1.5;">
              ${flower.symbolism}
            </p>
          </div>
        </div>
      `;
    }).join('');
  }

  if (dictSearchInput) {
    dictSearchInput.addEventListener('input', (e) => {
      renderDictionary(e.target.value);
    });
  }

  // Initial Dictionary Render
  renderDictionary();
});

