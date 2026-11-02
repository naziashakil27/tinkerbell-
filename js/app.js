/**
 * TINKERBELL — THE SECRET LANGUAGE OF FLOWERS
 * Core Application UI Enhancements & Shared Utilities
 */

// Toast Notification Engine
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  const icon = type === 'success' ? '✦' : (type === 'error' ? '⚠' : '✿');
  toast.innerHTML = `<span style="color: var(--color-gold); font-size: 1.1rem;">${icon}</span> <span>${message}</span>`;
  
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 400);
  }, 3200);
}

// Falling Petals Animation Controller
const PetalsManager = (() => {
  let isEnabled = localStorage.getItem('tinkerbell_petals_enabled') !== 'false';
  let petalInterval = null;
  const container = document.getElementById('petal-canvas-container');

  function createPetal() {
    if (!isEnabled || !container) return;
    const petal = document.createElement('div');
    petal.className = 'floating-petal';

    const size = Math.random() * 12 + 8; // 8px to 20px
    const startX = Math.random() * window.innerWidth;
    const duration = Math.random() * 6 + 6; // 6s to 12s
    const delay = Math.random() * 2;

    petal.style.width = `${size}px`;
    petal.style.height = `${size * 1.3}px`;
    petal.style.left = `${startX}px`;
    petal.style.animationDuration = `${duration}s`;
    petal.style.animationDelay = `${delay}s`;

    // Slight color variations (blush pink to peach)
    const hueVariation = Math.random() > 0.5 ? '#FADBD8' : '#F5CBA7';
    petal.style.background = `radial-gradient(circle at 30% 30%, #FFFFFF, ${hueVariation})`;

    container.appendChild(petal);

    setTimeout(() => {
      petal.remove();
    }, (duration + delay) * 1000);
  }

  function start() {
    if (petalInterval) clearInterval(petalInterval);
    petalInterval = setInterval(createPetal, 700);
    // Create an initial burst
    for (let i = 0; i < 6; i++) {
      setTimeout(createPetal, i * 200);
    }
  }

  function stop() {
    if (petalInterval) clearInterval(petalInterval);
    if (container) container.innerHTML = '';
  }

  function toggle() {
    isEnabled = !isEnabled;
    localStorage.setItem('tinkerbell_petals_enabled', isEnabled);
    if (isEnabled) {
      start();
      showToast('Fairy petals sprinkled into the garden ✨', 'success');
    } else {
      stop();
      showToast('Fairy petals rested 🌿', 'info');
    }
    updateToggleButtons();
  }

  function updateToggleButtons() {
    const btns = document.querySelectorAll('.sparkle-toggle-btn');
    btns.forEach(btn => {
      btn.setAttribute('title', isEnabled ? 'Pause floating petals' : 'Sprinkle floating petals');
      btn.style.opacity = isEnabled ? '1' : '0.5';
    });
  }

  function init() {
    if (isEnabled) start();
    updateToggleButtons();
    
    // Attach click listeners to any toggle buttons
    document.querySelectorAll('.sparkle-toggle-btn').forEach(btn => {
      btn.addEventListener('click', toggle);
    });
  }

  return { init, toggle };
})();

// Mobile Menu Navigation Toggle
function initMobileNavigation() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      toggleBtn.setAttribute('aria-expanded', isOpen);
    });
  }
}

// Active Nav Link Highlighter
function highlightActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Generate Unique Gift Code (e.g., TINK-A7B92C)
function generateGiftCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let randomPart = '';
  for (let i = 0; i < 6; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `TINK-${randomPart}`;
}

// Copy Text to Clipboard Helper
async function copyToClipboard(text, successMessage = 'Copied to clipboard!') {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
    }
    showToast(successMessage, 'success');
    return true;
  } catch (err) {
    showToast('Failed to copy. Please select and copy manually.', 'error');
    return false;
  }
}

// DOM Ready initialization
document.addEventListener('DOMContentLoaded', () => {
  PetalsManager.init();
  initMobileNavigation();
  highlightActiveNavLink();
});

// Expose utilities globally
window.showToast = showToast;
window.generateGiftCode = generateGiftCode;
window.copyToClipboard = copyToClipboard;
window.PetalsManager = PetalsManager;

