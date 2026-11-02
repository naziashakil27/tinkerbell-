/**
 * TINKERBELL — THE SECRET LANGUAGE OF FLOWERS
 * Default Flower Collection (20 Master Botanical Specimens)
 * 
 * Features:
 * - High-fidelity embedded SVG illustrations (100% offline, never broken).
 * - Victorian Floriography meanings, symbolism, and botanical metadata.
 * - Categorized by emotional sentiments and colors.
 */

const DEFAULT_FLOWERS = [
  {
    id: 'flower-rose',
    name: 'Red Rose',
    botanicalName: 'Rosa damascena',
    category: 'Deep Affection',
    colorHex: '#C0392B',
    accentHex: '#FADBD8',
    meaning: 'Deep Affection & Timeless Devotion',
    symbolism: 'In the Victorian language of flowers, the deep red rose reigned supreme as the ultimate confession of deep, unwavering love and eternal deep affection.',
    description: 'Velvety crimson petals unfurl in spiraling layers, exuding a classical fragrance whispered by woodland nymphs and devoted poets alike.',
    svg: `<svg viewBox="0 0 100 100" class="flower-art" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="roseGrad" cx="45%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#E74C3C" />
          <stop offset="60%" stop-color="#C0392B" />
          <stop offset="100%" stop-color="#781E15" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="38" fill="url(#roseGrad)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.15))"/>
      <path d="M50 20 C60 15 75 30 70 45 C65 60 55 60 50 60 C45 60 35 60 30 45 C25 30 40 15 50 20 Z" fill="#922B21" opacity="0.6"/>
      <path d="M38 35 C42 22 58 22 62 35 C68 48 55 68 50 72 C45 68 32 48 38 35 Z" fill="#B03A2E"/>
      <path d="M44 42 C46 36 54 36 56 42 C58 50 52 56 50 58 C48 56 42 50 44 42 Z" fill="#F1948A"/>
      <path d="M48 46 Q50 44 52 46 Q51 50 48 46" fill="#FADBD8"/>
      <path d="M50 72 Q50 95 50 98" stroke="#3D5A3A" stroke-width="3" stroke-linecap="round" fill="none"/>
      <path d="M50 82 Q65 78 70 85 Q58 88 50 84" fill="#4B6F44"/>
    </svg>`
  },
  {
    id: 'flower-tulip',
    name: 'Tulip',
    botanicalName: 'Tulipa gesneriana',
    category: 'Deep Affection',
    colorHex: '#AF7AC5',
    accentHex: '#E8DAEF',
    meaning: 'Declaration of Deep Affection',
    symbolism: 'Tulips signify an earnest vow of deep affection. A gift of tulips signifies that your affection is gentle, unpretentious, yet completely wholehearted.',
    description: 'Sleek, cup-shaped petals holding fairy dew, rising with royal poise and graceful charm upon tall spring stems.',
    svg: `<svg viewBox="0 0 100 100" class="flower-art" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="tulipGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#D7BDE2" />
          <stop offset="50%" stop-color="#9B59B6" />
          <stop offset="100%" stop-color="#6C3483" />
        </linearGradient>
      </defs>
      <path d="M50 80 Q50 98 50 99" stroke="#3D5A3A" stroke-width="3" stroke-linecap="round" fill="none"/>
      <path d="M50 85 Q30 75 25 85 Q40 90 50 88" fill="#4B6F44"/>
      <path d="M30 45 C25 25 45 20 48 48 C45 68 35 68 30 45 Z" fill="#884EA0"/>
      <path d="M70 45 C75 25 55 20 52 48 C55 68 65 68 70 45 Z" fill="#7D3C98"/>
      <path d="M50 22 C38 25 36 65 50 76 C64 65 62 25 50 22 Z" fill="url(#tulipGrad)"/>
      <path d="M46 32 C48 28 52 28 54 32 C55 45 45 45 46 32 Z" fill="#F4ECF7" opacity="0.7"/>
    </svg>`
  },
  {
    id: 'flower-sunflower',
    name: 'Sunflower',
    botanicalName: 'Helianthus annuus',
    category: 'Joy',
    colorHex: '#F39C12',
    accentHex: '#FEF9E7',
    meaning: 'Adoration, Loyalty & Radiant Joy',
    symbolism: 'Facing the golden sun with absolute faith, the sunflower symbolizes unending loyalty, warmth, happiness, and sunny positivity that lifts the soul.',
    description: 'A radiant corona of cheerful golden petals orbiting a rich seed center, bringing summer sunshine into any enchanted sanctuary.',
    svg: `<svg viewBox="0 0 100 100" class="flower-art" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sunCenter" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#5B3E1F"/>
          <stop offset="85%" stop-color="#36220F"/>
        </radialGradient>
      </defs>
      <!-- Petals around circle -->
      <g fill="#F1C40F" stroke="#D68910" stroke-width="0.5">
        <ellipse cx="50" cy="18" rx="6" ry="14"/>
        <ellipse cx="50" cy="82" rx="6" ry="14"/>
        <ellipse cx="18" cy="50" rx="14" ry="6"/>
        <ellipse cx="82" cy="50" rx="14" ry="6"/>
        <ellipse cx="28" cy="28" rx="7" ry="13" transform="rotate(-45 28 28)"/>
        <ellipse cx="72" cy="28" rx="7" ry="13" transform="rotate(45 72 28)"/>
        <ellipse cx="28" cy="72" rx="7" ry="13" transform="rotate(45 28 72)"/>
        <ellipse cx="72" cy="72" rx="7" ry="13" transform="rotate(-45 72 72)"/>
        <ellipse cx="38" cy="20" rx="5" ry="13" transform="rotate(-20 38 20)"/>
        <ellipse cx="62" cy="20" rx="5" ry="13" transform="rotate(20 62 20)"/>
        <ellipse cx="80" cy="38" rx="13" ry="5" transform="rotate(-20 80 38)"/>
        <ellipse cx="80" cy="62" rx="13" ry="5" transform="rotate(20 80 62)"/>
        <ellipse cx="38" cy="80" rx="5" ry="13" transform="rotate(20 38 80)"/>
        <ellipse cx="62" cy="80" rx="5" ry="13" transform="rotate(-20 62 80)"/>
      </g>
      <circle cx="50" cy="50" r="22" fill="url(#sunCenter)"/>
      <circle cx="50" cy="50" r="16" fill="#4A3018" stroke="#7A5229" stroke-dasharray="2,2"/>
    </svg>`
  },
  {
    id: 'flower-lily',
    name: 'White Lily',
    botanicalName: 'Lilium candidum',
    category: 'Elegance',
    colorHex: '#FDFEFE',
    accentHex: '#EAECEE',
    meaning: 'Purity of Soul & Refined Grace',
    symbolism: 'Revered throughout the centuries, the lily represents pristine purity, sacred rebirth, and stately majesty.',
    description: 'Graceful, curved alabaster petals sweeping gracefully outwards with delicate golden stamens that dance in gentle woodland breezes.',
    svg: `<svg viewBox="0 0 100 100" class="flower-art" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="lilyGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#D5F5E3"/>
          <stop offset="40%" stop-color="#FBFCFC"/>
          <stop offset="100%" stop-color="#EAEDED"/>
        </radialGradient>
      </defs>
      <path d="M50 50 C40 20 50 10 50 10 C50 10 60 20 50 50 Z" fill="url(#lilyGrad)" stroke="#BDC3C7" stroke-width="0.5"/>
      <path d="M50 50 C20 40 10 50 10 50 C10 50 20 60 50 50 Z" fill="url(#lilyGrad)" stroke="#BDC3C7" stroke-width="0.5"/>
      <path d="M50 50 C80 40 90 50 90 50 C90 50 80 60 50 50 Z" fill="url(#lilyGrad)" stroke="#BDC3C7" stroke-width="0.5"/>
      <path d="M50 50 C30 75 25 85 25 85 C25 85 45 80 50 50 Z" fill="url(#lilyGrad)" stroke="#BDC3C7" stroke-width="0.5"/>
      <path d="M50 50 C70 75 75 85 75 85 C75 85 55 80 50 50 Z" fill="url(#lilyGrad)" stroke="#BDC3C7" stroke-width="0.5"/>
      <!-- Stamens -->
      <path d="M50 50 Q45 35 42 30" stroke="#F1C40F" stroke-width="1.5" fill="none"/>
      <circle cx="42" cy="30" r="2.5" fill="#B7950B"/>
      <path d="M50 50 Q55 35 58 30" stroke="#F1C40F" stroke-width="1.5" fill="none"/>
      <circle cx="58" cy="30" r="2.5" fill="#B7950B"/>
      <path d="M50 50 Q50 32 50 26" stroke="#2ECC71" stroke-width="2" fill="none"/>
    </svg>`
  },
  {
    id: 'flower-daisy',
    name: 'Daisy',
    botanicalName: 'Bellis perennis',
    category: 'Friendship',
    colorHex: '#F7DC6F',
    accentHex: '#FEF9E7',
    meaning: 'Innocence, Simplicity & Cheerful Hope',
    symbolism: 'Daisies embody loyal love, cheerful thoughts, and childlike wonder. An emblem of wholesome beginnings and loyal friendships.',
    description: 'Crisp white radiating petals encircling a sun-kissed disc of bright amber joy, resting softly among garden moss.',
    svg: `<svg viewBox="0 0 100 100" class="flower-art" xmlns="http://www.w3.org/2000/svg">
      <g fill="#FFFFFF" stroke="#D5DBDB" stroke-width="0.8">
        <path d="M50 50 Q48 20 50 15 Q52 20 50 50 Z"/>
        <path d="M50 50 Q48 80 50 85 Q52 80 50 50 Z"/>
        <path d="M50 50 Q20 48 15 50 Q20 52 50 50 Z"/>
        <path d="M50 50 Q80 48 85 50 Q80 52 50 50 Z"/>
        <path d="M50 50 Q28 26 23 23 Q26 28 50 50 Z"/>
        <path d="M50 50 Q72 26 77 23 Q74 28 50 50 Z"/>
        <path d="M50 50 Q28 74 23 77 Q26 72 50 50 Z"/>
        <path d="M50 50 Q72 74 77 77 Q74 72 50 50 Z"/>
        <path d="M50 50 Q36 21 34 17 Q39 24 50 50 Z"/>
        <path d="M50 50 Q64 21 66 17 Q61 24 50 50 Z"/>
        <path d="M50 50 Q21 36 17 34 Q24 39 50 50 Z"/>
        <path d="M50 50 Q79 36 83 34 Q76 39 50 50 Z"/>
      </g>
      <circle cx="50" cy="50" r="14" fill="#F4D03F" stroke="#D4AC0D" stroke-width="1"/>
      <circle cx="50" cy="50" r="8" fill="#F39C12" opacity="0.6"/>
    </svg>`
  },
  {
    id: 'flower-orchid',
    name: 'Orchid',
    botanicalName: 'Phalaenopsis amabilis',
    category: 'Elegance',
    colorHex: '#C39BD3',
    accentHex: '#F5EEF8',
    meaning: 'Exotic Beauty, Refinement & Strength',
    symbolism: 'Rare and majestic, orchids celebrate exquisite elegance, rare beauty, mature grace, and unshakeable inner resilience.',
    description: 'Delicate butterfly-wing blossoms blooming gracefully along arching botanical boughs, tinted in imperial twilight violet.',
    svg: `<svg viewBox="0 0 100 100" class="flower-art" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="orchidGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#F5EEF8"/>
          <stop offset="60%" stop-color="#BB8FCE"/>
          <stop offset="100%" stop-color="#884EA0"/>
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="30" rx="14" ry="18" fill="url(#orchidGrad)"/>
      <ellipse cx="30" cy="45" rx="18" ry="14" fill="url(#orchidGrad)" transform="rotate(-15 30 45)"/>
      <ellipse cx="70" cy="45" rx="18" ry="14" fill="url(#orchidGrad)" transform="rotate(15 70 45)"/>
      <ellipse cx="38" cy="68" rx="12" ry="15" fill="#A569BD"/>
      <ellipse cx="62" cy="68" rx="12" ry="15" fill="#A569BD"/>
      <!-- Orchid Lip / Center -->
      <path d="M45 52 C45 46 55 46 55 52 C58 58 55 64 50 66 C45 64 42 58 45 52 Z" fill="#E74C3C"/>
      <circle cx="50" cy="53" r="3" fill="#F4D03F"/>
    </svg>`
  },
  {
    id: 'flower-peony',
    name: 'Peony',
    botanicalName: 'Paeonia lactiflora',
    category: 'Deep Affection',
    colorHex: '#F1948A',
    accentHex: '#FDEDEC',
    meaning: 'Deep Affection, Prosperity & Flourishing Fortune',
    symbolism: 'In ancient botanical lore, the luxurious peony represents happy unions, abundant fortunes, feminine grace, and boundless deep affection.',
    description: 'An explosion of lush, ruffled tissue-thin blush petals that resemble billowing silken skirts twirling in fairy balls.',
    svg: `<svg viewBox="0 0 100 100" class="flower-art" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="peonyGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FADBD8"/>
          <stop offset="70%" stop-color="#F1948A"/>
          <stop offset="100%" stop-color="#CD6155"/>
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="36" fill="url(#peonyGrad)" opacity="0.4"/>
      <path d="M30 40 C30 25 50 22 60 30 C70 40 68 55 60 65 C48 75 32 65 30 40 Z" fill="#F5B7B1" opacity="0.8"/>
      <path d="M40 35 C42 28 58 28 60 35 C65 45 55 58 50 60 C45 58 35 45 40 35 Z" fill="#EC7063" opacity="0.9"/>
      <path d="M45 42 Q50 38 55 42 Q53 48 50 50 Q47 48 45 42" fill="#FADBD8"/>
      <path d="M36 50 C38 60 48 65 54 62" stroke="#E74C3C" stroke-width="1" fill="none"/>
      <path d="M42 32 C48 30 52 32 54 36" stroke="#FFFFFF" stroke-width="1.2" fill="none"/>
    </svg>`
  },
  {
    id: 'flower-lavender',
    name: 'Lavender',
    botanicalName: 'Lavandula angustifolia',
    category: 'Serenity',
    colorHex: '#9B59B6',
    accentHex: '#EBDEF0',
    meaning: 'Serenity, Peace & Undivided Devotion',
    symbolism: 'Lavender carries the calming spirit of gentle relaxation, silence of the heart, sweet memories, and soothing tranquility.',
    description: 'Slender spires studded with dozens of fragrant purple florets, beloved by bees and fairies for its heavenly soothing aura.',
    svg: `<svg viewBox="0 0 100 100" class="flower-art" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 15 L50 95" stroke="#4A6544" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Floret clusters -->
      <g fill="#8E44AD">
        <ellipse cx="44" cy="22" rx="5" ry="3.5" transform="rotate(-20 44 22)"/>
        <ellipse cx="56" cy="24" rx="5" ry="3.5" transform="rotate(20 56 24)"/>
        <ellipse cx="43" cy="32" rx="6" ry="4" transform="rotate(-25 43 32)"/>
        <ellipse cx="57" cy="34" rx="6" ry="4" transform="rotate(25 57 34)"/>
        <ellipse cx="42" cy="44" rx="6" ry="4.5" transform="rotate(-20 42 44)"/>
        <ellipse cx="58" cy="46" rx="6" ry="4.5" transform="rotate(20 58 46)"/>
        <ellipse cx="43" cy="56" rx="6" ry="4" transform="rotate(-15 43 56)"/>
        <ellipse cx="57" cy="58" rx="6" ry="4" transform="rotate(15 57 58)"/>
        <ellipse cx="50" cy="16" rx="4" ry="5"/>
      </g>
      <g fill="#D2B4DE">
        <circle cx="44" cy="22" r="1.5"/>
        <circle cx="56" cy="24" r="1.5"/>
        <circle cx="43" cy="32" r="1.8"/>
        <circle cx="57" cy="34" r="1.8"/>
        <circle cx="42" cy="44" r="1.8"/>
      </g>
    </svg>`
  },
  {
    id: 'flower-hydrangea',
    name: 'Hydrangea',
    botanicalName: 'Hydrangea macrophylla',
    category: 'Gratitude',
    colorHex: '#5DADE2',
    accentHex: '#EBF5FB',
    meaning: 'Heartfelt Gratitude & Deep Understanding',
    symbolism: 'Hydrangeas express sincere appreciation, deep gratitude for being understood, and harmonious abundance.',
    description: 'A lavish spherical constellation of soft sky-blue and periwinkle florets gathered together in tender unity.',
    svg: `<svg viewBox="0 0 100 100" class="flower-art" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="hydGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#AED6F1"/>
          <stop offset="100%" stop-color="#5499C7"/>
        </radialGradient>
      </defs>
      <!-- Background mass -->
      <circle cx="50" cy="50" r="35" fill="url(#hydGrad)" opacity="0.3"/>
      <!-- Multiple 4-petaled florets -->
      <g fill="#5DADE2" stroke="#2874A6" stroke-width="0.4">
        <!-- Center floret -->
        <circle cx="47" cy="47" r="4"/>
        <circle cx="53" cy="47" r="4"/>
        <circle cx="47" cy="53" r="4"/>
        <circle cx="53" cy="53" r="4"/>
        <!-- Top floret -->
        <circle cx="47" cy="28" r="4"/>
        <circle cx="53" cy="28" r="4"/>
        <circle cx="47" cy="34" r="4"/>
        <circle cx="53" cy="34" r="4"/>
        <!-- Left floret -->
        <circle cx="28" cy="47" r="4"/>
        <circle cx="34" cy="47" r="4"/>
        <circle cx="28" cy="53" r="4"/>
        <circle cx="34" cy="53" r="4"/>
        <!-- Right floret -->
        <circle cx="66" cy="47" r="4"/>
        <circle cx="72" cy="47" r="4"/>
        <circle cx="66" cy="53" r="4"/>
        <circle cx="72" cy="53" r="4"/>
        <!-- Bottom floret -->
        <circle cx="47" cy="66" r="4"/>
        <circle cx="53" cy="66" r="4"/>
        <circle cx="47" cy="72" r="4"/>
        <circle cx="53" cy="72" r="4"/>
      </g>
      <circle cx="50" cy="50" r="1.5" fill="#F4D03F"/>
      <circle cx="50" cy="31" r="1.5" fill="#F4D03F"/>
      <circle cx="31" cy="50" r="1.5" fill="#F4D03F"/>
      <circle cx="69" cy="50" r="1.5" fill="#F4D03F"/>
      <circle cx="50" cy="69" r="1.5" fill="#F4D03F"/>
    </svg>`
  },
  {
    id: 'flower-carnation',
    name: 'Carnation',
    botanicalName: 'Dianthus caryophyllus',
    category: 'Deep Affection',
    colorHex: '#F1948A',
    accentHex: '#FADBD8',
    meaning: 'Fascination, Distinction & Motherly Love',
    symbolism: 'Carnations symbolize pure unconditional love, distinction, deep affection, and a mother’s eternal warm embrace.',
    description: 'Frilled serrated petals tightly bunched with delicate clove-like sweetness, dressed in soft vintage coral blush.',
    svg: `<svg viewBox="0 0 100 100" class="flower-art" xmlns="http://www.w3.org/2000/svg">
      <!-- Calyx -->
      <path d="M42 75 L58 75 L55 88 L45 88 Z" fill="#3D5A3A"/>
      <path d="M50 88 L50 98" stroke="#3D5A3A" stroke-width="3"/>
      <!-- Serrated ruffled flower -->
      <path d="M25 50 Q30 35 40 40 Q45 28 50 32 Q55 28 60 40 Q70 35 75 50 Q80 62 70 68 Q58 78 50 75 Q42 78 30 68 Q20 62 25 50 Z" fill="#E59866"/>
      <path d="M30 48 Q35 38 45 42 Q50 34 55 42 Q65 38 70 48 Q75 58 65 65 Q50 72 35 65 Q25 58 30 48 Z" fill="#EDBB99"/>
      <path d="M38 46 Q45 40 50 45 Q55 40 62 46 Q64 54 58 58 Q50 62 42 58 Q36 54 38 46 Z" fill="#FADBD8"/>
    </svg>`
  },
  {
    id: 'flower-babys-breath',
    name: "Baby's Breath",
    botanicalName: 'Gypsophila paniculata',
    category: 'Serenity',
    colorHex: '#EAEDED',
    accentHex: '#FBFCFC',
    meaning: 'Everlasting Love, Innocence & Pure Spirit',
    symbolism: 'Baby’s breath embodies celestial innocence, pure, deep affection, and the gentle whisper of true love that never fades.',
    description: 'An airy, ethereal cloud of tiny snowy starry florets floating like magical fairy dust between larger blossoms.',
    svg: `<svg viewBox="0 0 100 100" class="flower-art" xmlns="http://www.w3.org/2000/svg">
      <!-- Fine twiggy stems -->
      <path d="M50 95 Q48 65 45 40" stroke="#7D9978" stroke-width="1.5" fill="none"/>
      <path d="M48 65 Q30 50 22 35" stroke="#7D9978" stroke-width="1" fill="none"/>
      <path d="M46 52 Q68 42 78 30" stroke="#7D9978" stroke-width="1" fill="none"/>
      <path d="M25 40 Q15 30 14 20" stroke="#7D9978" stroke-width="0.8" fill="none"/>
      <path d="M72 35 Q85 25 86 15" stroke="#7D9978" stroke-width="0.8" fill="none"/>
      <!-- Tiny white pompom stars -->
      <g fill="#FFFFFF" stroke="#BDC3C7" stroke-width="0.5">
        <circle cx="45" cy="38" r="4.5"/>
        <circle cx="22" cy="34" r="4"/>
        <circle cx="78" cy="28" r="4.5"/>
        <circle cx="14" cy="18" r="3.5"/>
        <circle cx="86" cy="14" r="3.5"/>
        <circle cx="34" cy="25" r="4"/>
        <circle cx="62" cy="22" r="4"/>
        <circle cx="46" cy="16" r="4.5"/>
      </g>
      <g fill="#F7DC6F">
        <circle cx="45" cy="38" r="1"/>
        <circle cx="22" cy="34" r="1"/>
        <circle cx="78" cy="28" r="1"/>
        <circle cx="34" cy="25" r="1"/>
        <circle cx="62" cy="22" r="1"/>
        <circle cx="46" cy="16" r="1"/>
      </g>
    </svg>`
  },
  {
    id: 'flower-chrysanthemum',
    name: 'Chrysanthemum',
    botanicalName: 'Chrysanthemum morifolium',
    category: 'Joy',
    colorHex: '#D35400',
    accentHex: '#EDBB99',
    meaning: 'Longevity, Fidelity, Joy & Optimism',
    symbolism: 'In ancient oriental and Victorian lore, chrysanthemums represent nobility, longevity, cheerfulness, and truthful friendship.',
    description: 'Dozens of slender curling florets radiating with fiery autumn tones of copper, amber, and molten bronze.',
    svg: `<svg viewBox="0 0 100 100" class="flower-art" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="mumGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#F39C12"/>
          <stop offset="70%" stop-color="#D35400"/>
          <stop offset="100%" stop-color="#900C3F"/>
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="38" fill="url(#mumGrad)"/>
      <!-- Layered radiating thin petals -->
      <g stroke="#FAD7A0" stroke-width="1.2" fill="none">
        <path d="M50 50 Q40 25 50 14"/>
        <path d="M50 50 Q60 25 50 14"/>
        <path d="M50 50 Q25 40 14 50"/>
        <path d="M50 50 Q75 40 86 50"/>
        <path d="M50 50 Q30 30 22 22"/>
        <path d="M50 50 Q70 30 78 22"/>
        <path d="M50 50 Q30 70 22 78"/>
        <path d="M50 50 Q70 70 78 78"/>
        <path d="M50 50 Q40 75 50 86"/>
      </g>
      <circle cx="50" cy="50" r="10" fill="#F1C40F"/>
    </svg>`
  },
  {
    id: 'flower-daffodil',
    name: 'Daffodil',
    botanicalName: 'Narcissus pseudonarcissus',
    category: 'New Beginnings',
    colorHex: '#F4D03F',
    accentHex: '#FCF3CF',
    meaning: 'Rebirth, New Beginnings & Bright Sunshine',
    symbolism: 'As the proud first herald of spring, the trumpet daffodil signifies renewal, fresh chapters, awakening hope, and joyful resilience.',
    description: 'Six starry golden outer petals framing an assertive fluted trumpet that heralds the coming of warm sunny days.',
    svg: `<svg viewBox="0 0 100 100" class="flower-art" xmlns="http://www.w3.org/2000/svg">
      <g fill="#F9E79F" stroke="#F1C40F" stroke-width="0.8">
        <path d="M50 50 L50 16 L42 32 Z"/>
        <path d="M50 50 L50 16 L58 32 Z"/>
        <path d="M50 50 L20 34 L32 46 Z"/>
        <path d="M50 50 L80 34 L68 46 Z"/>
        <path d="M50 50 L24 70 L38 60 Z"/>
        <path d="M50 50 L76 70 L62 60 Z"/>
      </g>
      <!-- Center Trumpet -->
      <ellipse cx="50" cy="50" rx="14" ry="12" fill="#F39C12"/>
      <circle cx="50" cy="50" r="9" fill="#D68910"/>
      <circle cx="50" cy="50" r="4" fill="#7E5109"/>
    </svg>`
  },
  {
    id: 'flower-iris',
    name: 'Blue Iris',
    botanicalName: 'Iris germanica',
    category: 'Elegance',
    colorHex: '#2E86C1',
    accentHex: '#D4E6F1',
    meaning: 'Wisdom, Valor, Hope & Sacred Messages',
    symbolism: 'Named after the Greek goddess of the rainbow who served as messenger of the gods, the iris carries deep messages of wisdom, valor, and enduring faith.',
    description: 'Architectural sword-like petals cascading with royal indigo falls and golden beards, crowned in celestial elegance.',
    svg: `<svg viewBox="0 0 100 100" class="flower-art" xmlns="http://www.w3.org/2000/svg">
      <!-- Upper upright petals (standards) -->
      <path d="M50 48 C42 22 58 22 50 48 Z" fill="#5DADE2"/>
      <path d="M42 45 C32 25 45 20 44 45 Z" fill="#3498DB"/>
      <path d="M58 45 C68 25 55 20 56 45 Z" fill="#2E86C1"/>
      <!-- Lower cascading petals (falls) -->
      <path d="M50 52 C35 60 30 75 40 82 C48 75 48 62 50 52 Z" fill="#1B4F72"/>
      <path d="M50 52 C65 60 70 75 60 82 C52 75 52 62 50 52 Z" fill="#2874A6"/>
      <path d="M50 52 C45 65 45 78 50 85 C55 78 55 65 50 52 Z" fill="#1F618D"/>
      <!-- Golden beard -->
      <path d="M48 56 Q50 62 52 56" stroke="#F1C40F" stroke-width="2.5" fill="none"/>
    </svg>`
  },
  {
    id: 'flower-cherry-blossom',
    name: 'Cherry Blossom',
    botanicalName: 'Prunus serrulata',
    category: 'Deep Affection',
    colorHex: '#F5B7B1',
    accentHex: '#FDEDEC',
    meaning: 'Gentle Renewal, Fleeting Beauty & Spiritual Grace',
    symbolism: 'Cherished in folklore, sakura blossoms capture the precious, fleeting beauty of life, mindfulness, and the gentle awakening of spring.',
    description: 'Delicate five-petaled porcelain pink blossom with notched edges and fine dancing filaments that flutter on fairy breezes.',
    svg: `<svg viewBox="0 0 100 100" class="flower-art" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sakuraGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FADBD8"/>
          <stop offset="70%" stop-color="#F5B7B1"/>
          <stop offset="100%" stop-color="#E8A7A1"/>
        </radialGradient>
      </defs>
      <!-- 5 petals with notched tips -->
      <g fill="url(#sakuraGrad)" stroke="#E6B0AA" stroke-width="0.5">
        <path d="M50 50 C44 32 38 18 50 16 C62 18 56 32 50 50 Z"/>
        <path d="M50 50 C32 44 18 38 16 50 C18 62 32 56 50 50 Z"/>
        <path d="M50 50 C56 68 62 82 50 84 C38 82 44 68 50 50 Z"/>
        <path d="M50 50 C68 56 82 62 84 50 C82 38 68 44 50 50 Z"/>
        <path d="M50 50 C62 34 76 24 80 34 C82 46 66 48 50 50 Z"/>
      </g>
      <!-- Center ring & pistils -->
      <circle cx="50" cy="50" r="5" fill="#E74C3C" opacity="0.7"/>
      <circle cx="50" cy="50" r="2.5" fill="#F4D03F"/>
    </svg>`
  },
  {
    id: 'flower-jasmine',
    name: 'Star Jasmine',
    botanicalName: 'Jasminum officinale',
    category: 'Deep Affection',
    colorHex: '#FBFCFC',
    accentHex: '#EAEDED',
    meaning: 'Sweet Intimacy, Heavenly Grace & Sensual Charm',
    symbolism: 'Known as the Queen of the Night, star jasmine conveys profound, deep affection, heavenly charm, and sweet unspoken feelings.',
    description: 'Pinwheel star blossoms releasing intoxicating floral perfume under starry moonlit woodland skies.',
    svg: `<svg viewBox="0 0 100 100" class="flower-art" xmlns="http://www.w3.org/2000/svg">
      <g fill="#FFFFFF" stroke="#BDC3C7" stroke-width="0.8">
        <!-- 5 pinwheel petals -->
        <path d="M50 50 C45 35 46 20 54 18 C58 24 55 38 50 50 Z"/>
        <path d="M50 50 C35 55 20 54 18 46 C24 42 38 45 50 50 Z"/>
        <path d="M50 50 C55 65 54 80 46 82 C42 76 45 62 50 50 Z"/>
        <path d="M50 50 C65 45 80 46 82 54 C76 58 62 55 50 50 Z"/>
        <path d="M50 50 C60 62 72 70 76 64 C76 56 64 52 50 50 Z"/>
      </g>
      <circle cx="50" cy="50" r="3.5" fill="#F4D03F"/>
    </svg>`
  },
  {
    id: 'flower-marigold',
    name: 'Marigold',
    botanicalName: 'Tagetes erecta',
    category: 'Joy',
    colorHex: '#E67E22',
    accentHex: '#FDEBD0',
    meaning: 'Warm Passion, Creative Spark & Golden Protection',
    symbolism: 'Shining like sunlight, marigolds symbolize passionate warmth, creative courage, celebration of life, and protective blessings.',
    description: 'Lush golden-orange pompom heads bursting with frilled ruffled vibrancy, revered for festival blessings.',
    svg: `<svg viewBox="0 0 100 100" class="flower-art" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="marigoldGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#F39C12"/>
          <stop offset="60%" stop-color="#E67E22"/>
          <stop offset="100%" stop-color="#BA4A00"/>
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="38" fill="url(#marigoldGrad)"/>
      <g fill="#F5B041" opacity="0.7">
        <circle cx="50" cy="30" r="10"/>
        <circle cx="34" cy="42" r="10"/>
        <circle cx="66" cy="42" r="10"/>
        <circle cx="38" cy="62" r="10"/>
        <circle cx="62" cy="62" r="10"/>
      </g>
      <circle cx="50" cy="50" r="14" fill="#F39C12" stroke="#B9770E" stroke-width="1"/>
      <circle cx="50" cy="50" r="7" fill="#D35400"/>
    </svg>`
  },
  {
    id: 'flower-camellia',
    name: 'Camellia',
    botanicalName: 'Camellia japonica',
    category: 'Deep Affection',
    colorHex: '#E74C3C',
    accentHex: '#FADBD8',
    meaning: 'Adoration, Perfection & Quiet Longing',
    symbolism: 'With petals fitting together in perfect symmetry, camellias honor flawless admiration, deep devotion, and timeless perfection.',
    description: 'Geometric perfection of spiral rose-red petals framed by glossy dark evergreen leaves, glistening in morning dew.',
    svg: `<svg viewBox="0 0 100 100" class="flower-art" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="camGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#F1948A"/>
          <stop offset="60%" stop-color="#E74C3C"/>
          <stop offset="100%" stop-color="#922B21"/>
        </radialGradient>
      </defs>
      <!-- Symmetrical spiral layers -->
      <circle cx="50" cy="50" r="37" fill="url(#camGrad)"/>
      <circle cx="50" cy="50" r="28" fill="#CB4335" stroke="#F5B7B1" stroke-width="1.2"/>
      <circle cx="50" cy="50" r="19" fill="#B03A2E" stroke="#F5B7B1" stroke-width="1.2"/>
      <circle cx="50" cy="50" r="10" fill="#922B21" stroke="#FADBD8" stroke-width="1.2"/>
      <circle cx="50" cy="50" r="4" fill="#F4D03F"/>
    </svg>`
  },
  {
    id: 'flower-anemone',
    name: 'Anemone',
    botanicalName: 'Anemone coronaria',
    category: 'Elegance',
    colorHex: '#4A235A',
    accentHex: '#E8DAEF',
    meaning: 'Anticipation, Fragility & Magic Protection',
    symbolism: 'Known as the windflower, anemone symbolizes sweet anticipation, fairy protection against ill fortune, and delicate wonder.',
    description: 'Velvety purple-blue wide petals centered by a dramatic dark button eye fringed with ethereal stamens.',
    svg: `<svg viewBox="0 0 100 100" class="flower-art" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="anemoneGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#8E44AD"/>
          <stop offset="70%" stop-color="#5B2C6F"/>
          <stop offset="100%" stop-color="#2C3E50"/>
        </radialGradient>
      </defs>
      <g fill="url(#anemoneGrad)" stroke="#4A235A" stroke-width="0.5">
        <ellipse cx="50" cy="24" rx="14" ry="18"/>
        <ellipse cx="74" cy="38" rx="17" ry="14" transform="rotate(30 74 38)"/>
        <ellipse cx="68" cy="72" rx="16" ry="15" transform="rotate(-30 68 72)"/>
        <ellipse cx="32" cy="72" rx="16" ry="15" transform="rotate(30 32 72)"/>
        <ellipse cx="26" cy="38" rx="17" ry="14" transform="rotate(-30 26 38)"/>
      </g>
      <!-- Dark dramatic center -->
      <circle cx="50" cy="50" r="14" fill="#17202A"/>
      <circle cx="50" cy="50" r="8" fill="#1C2833"/>
      <!-- Fringed stamens dots -->
      <g fill="#A569BD">
        <circle cx="50" cy="38" r="1.5"/>
        <circle cx="60" cy="42" r="1.5"/>
        <circle cx="62" cy="52" r="1.5"/>
        <circle cx="56" cy="60" r="1.5"/>
        <circle cx="44" cy="60" r="1.5"/>
        <circle cx="38" cy="52" r="1.5"/>
        <circle cx="40" cy="42" r="1.5"/>
      </g>
    </svg>`
  },
  {
    id: 'flower-forget-me-not',
    name: 'Forget-me-not',
    botanicalName: 'Myosotis sylvatica',
    category: 'Friendship',
    colorHex: '#3498DB',
    accentHex: '#D4E6F1',
    meaning: 'True Everlasting Love & Cherished Memories',
    symbolism: 'The legendary flower of eternal remembrance. Pledges that though miles or years may lie between, memories of true affection will never fade.',
    description: 'Charming sky-blue five-petaled woodland stars adorned with a delicate yellow fairy eye at their warm center.',
    svg: `<svg viewBox="0 0 100 100" class="flower-art" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="fmnGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#85C1E9"/>
          <stop offset="80%" stop-color="#3498DB"/>
          <stop offset="100%" stop-color="#2471A3"/>
        </radialGradient>
      </defs>
      <!-- 5 rounded petals -->
      <g fill="url(#fmnGrad)" stroke="#2980B9" stroke-width="0.6">
        <circle cx="50" cy="28" r="12"/>
        <circle cx="69" cy="42" r="12"/>
        <circle cx="62" cy="66" r="12"/>
        <circle cx="38" cy="66" r="12"/>
        <circle cx="31" cy="42" r="12"/>
      </g>
      <!-- Center white star & golden eye -->
      <circle cx="50" cy="50" r="7" fill="#FFFFFF"/>
      <circle cx="50" cy="50" r="4.5" fill="#F4D03F" stroke="#D4AC0D" stroke-width="0.8"/>
    </svg>`
  }
];

// Helper to retrieve flower by ID (checks default and custom)
async function getFlowerById(id) {
  if (!id) return null;
  const def = DEFAULT_FLOWERS.find(f => f.id === id);
  if (def) return def;

  // Search custom flowers in StorageEngine if available
  if (window.StorageEngine) {
    const customs = await window.StorageEngine.getAllCustomFlowers();
    const found = customs.find(f => f.id === id);
    if (found) {
      if (!found.photoDataUrl && found.imageId) {
        found.photoDataUrl = await window.StorageEngine.getImage(found.imageId);
      }
      return found;
    }
  }
  return null;
}

// Retrieve complete merged catalog (defaults + custom saved flowers)
async function getCompleteFlowerCatalog() {
  let customFlowers = [];
  if (window.StorageEngine) {
    try {
      customFlowers = await window.StorageEngine.getAllCustomFlowers();
      // Ensure photoDataUrl is populated if imageId exists
      for (const f of customFlowers) {
        if (!f.photoDataUrl && f.imageId) {
          f.photoDataUrl = await window.StorageEngine.getImage(f.imageId);
        }
      }
    } catch (e) {
      console.warn('Could not load custom flowers:', e);
    }
  }
  return [...DEFAULT_FLOWERS, ...customFlowers];
}

// Make globally accessible
if (typeof window !== 'undefined') {
  window.DEFAULT_FLOWERS = DEFAULT_FLOWERS;
  window.getFlowerById = getFlowerById;
  window.getCompleteFlowerCatalog = getCompleteFlowerCatalog;
}

