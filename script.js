/**
 * Bali Apostille B2B Interactive Scripts
 * Multilingual Engine (ID / EN / ZH) with Auto-Detection
 * PT Sinar Heksa Edukasi
 */

let currentLang = 'id';

/**
 * 1. Detect User Language based on localStorage and Browser Profile
 */
function detectUserLanguage() {
  // Check if user previously made an explicit selection
  try {
    const saved = localStorage.getItem('bali_apostille_lang');
    if (saved && ['id', 'en', 'zh'].includes(saved)) {
      return saved;
    }
  } catch (e) {
    console.warn('localStorage access failed:', e);
  }

  // Detect browser profile language
  const browserLangs = navigator.languages || [navigator.language || navigator.userLanguage || ''];
  for (const lang of browserLangs) {
    if (!lang) continue;
    const lower = lang.toLowerCase();
    // Indonesian
    if (lower.startsWith('id')) {
      return 'id';
    }
    // Chinese / Mandarin (zh, zh-CN, zh-TW, zh-HK, etc.)
    if (lower.startsWith('zh')) {
      return 'zh';
    }
  }

  // Default to English for all foreign visitors outside Mandarin
  return 'en';
}

/**
 * 2. Set Language and Apply Translations across the DOM
 */
function setLanguage(lang) {
  if (typeof translations === 'undefined' || !translations[lang]) {
    console.warn(`Translation pack for "${lang}" not found.`);
    return;
  }

  currentLang = lang;
  try {
    localStorage.setItem('bali_apostille_lang', lang);
  } catch (e) {
    // Ignore storage errors in restricted contexts
  }

  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang;

  // Apply translations for text elements
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key] !== undefined) {
      el.innerHTML = translations[lang][key];
    }
  });

  // Apply translations for input placeholders
  const placeholderEls = document.querySelectorAll('[data-i18n-placeholder]');
  placeholderEls.forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[lang][key] !== undefined) {
      el.setAttribute('placeholder', translations[lang][key]);
    }
  });

  // Update UI flags and selectors
  updateLanguageUI(lang);

  // Close dropdown menu if open
  const dropdown = document.getElementById('lang-dropdown');
  if (dropdown) {
    dropdown.classList.add('hidden');
    const menuBtn = document.getElementById('lang-menu-btn');
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
  }

  // Re-render Lucide icons if any were replaced
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

/**
 * 3. Update Language Selector Display in Header & Mobile Drawer
 */
function updateLanguageUI(lang) {
  const meta = {
    id: { flag: '🇮🇩', label: 'ID', name: 'Indonesia' },
    en: { flag: '🇬🇧', label: 'EN', name: 'English' },
    zh: { flag: '🇨🇳', label: '中文', name: '中文' }
  };

  const selected = meta[lang] || meta.en;

  // Header Dropdown Trigger Display
  const currentFlag = document.getElementById('current-lang-flag');
  const currentCode = document.getElementById('current-lang-code');
  if (currentFlag) currentFlag.textContent = selected.flag;
  if (currentCode) currentCode.textContent = selected.label;

  // Checkmark in dropdown items
  document.querySelectorAll('.lang-opt').forEach(btn => {
    const optLang = btn.getAttribute('data-lang');
    const check = btn.querySelector('.lang-check');
    if (check) {
      if (optLang === lang) {
        check.classList.remove('hidden');
        btn.classList.add('bg-slate-50', 'font-bold', 'text-brand-900');
      } else {
        check.classList.add('hidden');
        btn.classList.remove('bg-slate-50', 'font-bold', 'text-brand-900');
      }
    }
  });

  // Mobile Drawer Pills
  document.querySelectorAll('.mobile-lang-pill').forEach(pill => {
    const pillLang = pill.getAttribute('data-lang');
    if (pillLang === lang) {
      pill.className = 'mobile-lang-pill px-3 py-1.5 rounded-lg text-xs font-bold bg-brand-900 text-white shadow-xs';
    } else {
      pill.className = 'mobile-lang-pill px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200';
    }
  });
}

/**
 * Initialize DOM Events on Load
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Set Dynamic Year
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 3. Setup Language Switcher Dropdown Click Handlers
  const langMenuBtn = document.getElementById('lang-menu-btn');
  const langDropdown = document.getElementById('lang-dropdown');
  const langContainer = document.getElementById('lang-selector-container');

  if (langMenuBtn && langDropdown) {
    langMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isHidden = langDropdown.classList.contains('hidden');
      if (isHidden) {
        langDropdown.classList.remove('hidden');
        langMenuBtn.setAttribute('aria-expanded', 'true');
      } else {
        langDropdown.classList.add('hidden');
        langMenuBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (langContainer && !langContainer.contains(e.target)) {
        langDropdown.classList.add('hidden');
        langMenuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 4. Mobile Navigation Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // 5. FAQ Accordion Toggle
  const faqButtons = document.querySelectorAll('.faq-accordion-btn');
  faqButtons.forEach(button => {
    button.addEventListener('click', () => {
      const content = button.nextElementSibling;
      const isExpanded = button.getAttribute('aria-expanded') === 'true';

      button.setAttribute('aria-expanded', !isExpanded);
      if (content) {
        content.classList.toggle('hidden');
      }

      const icon = button.querySelector('svg');
      if (icon) {
        if (!isExpanded) {
          icon.style.transform = 'rotate(180deg)';
        } else {
          icon.style.transform = 'rotate(0deg)';
        }
      }
    });
  });

  // 6. Detect and Apply Initial Language Automatically
  const initialLang = detectUserLanguage();
  setLanguage(initialLang);
});

/**
 * Handle Hero Quick Quotation Form Submit (Multilingual Routing)
 */
function handleQuickQuoteSubmit(event) {
  event.preventDefault();

  const company = document.getElementById('company-name')?.value || 'Client';
  const service = document.getElementById('service-needed')?.value || 'General Consultation';
  const docType = document.getElementById('doc-type')?.value || 'Corporate Documents';
  const country = document.getElementById('country-target')?.value || 'Unspecified';
  const urgency = document.getElementById('urgency-option')?.value || 'Standard';

  const waNumber = '62817322287';
  let message = '';

  if (currentLang === 'zh') {
    message += `*企业涉外业务报价申请 — BALI APOSTILLE*\n`;
    message += `_PT Sinar Heksa Edukasi 印尼官方涉外法律翻译认证_\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    message += `🏢 *企业/机构名称:* ${company}\n`;
    message += `📑 *办理业务:* ${service}\n`;
    message += `📄 *文件类型:* ${docType}\n`;
    message += `🌍 *使用国家:* ${country}\n`;
    message += `⚡ *时效要求:* ${urgency}\n\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `您好，我们希望申请正式官方报价单（Quotation PDF）、核定办理周期及所需材料明细。谢谢！`;
  } else if (currentLang === 'en') {
    message += `*OFFICIAL B2B QUOTATION REQUEST — BALI APOSTILLE*\n`;
    message += `_PT Sinar Heksa Edukasi Corporate Translation & Legalization_\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    message += `🏢 *Company / Institution:* ${company}\n`;
    message += `📑 *Service Needed:* ${service}\n`;
    message += `📄 *Document Type:* ${docType}\n`;
    message += `🌍 *Destination Country:* ${country}\n`;
    message += `⚡ *Turnaround Priority:* ${urgency}\n\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `Hello Bali Apostille Team, please provide official quotation details, turnaround timeline, and formal procedure requirements. Thank you.`;
  } else {
    // Default Indonesian
    message += `*PERMINTAAN PENAWARAN RESMI B2B — BALI APOSTILLE*\n`;
    message += `_PT Sinar Heksa Edukasi_\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    message += `🏢 *Nama Perusahaan/Institusi:* ${company}\n`;
    message += `📑 *Layanan Dibutuhkan:* ${service}\n`;
    message += `📄 *Jenis Dokumen:* ${docType}\n`;
    message += `🌍 *Negara Tujuan:* ${country}\n`;
    message += `⚡ *Prioritas Timeline:* ${urgency}\n\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `Mohon informasi rincian prosedur, estimasi timeline, dan penawaran biaya formal. Terima kasih.`;
  }

  const encodedUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
  window.open(encodedUrl, '_blank');
}
