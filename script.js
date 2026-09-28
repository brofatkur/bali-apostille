/**
 * Bali Apostille B2B Interactive Scripts
 * PT Sinar Heksa Edukasi
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

  // 3. Mobile Navigation Menu Toggle
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

  // 4. FAQ Accordion Toggle
  const faqButtons = document.querySelectorAll('.faq-accordion-btn');
  faqButtons.forEach(button => {
    button.addEventListener('click', () => {
      const content = button.nextElementSibling;
      const isExpanded = button.getAttribute('aria-expanded') === 'true';

      // Toggle state
      button.setAttribute('aria-expanded', !isExpanded);
      if (content) {
        content.classList.toggle('hidden');
      }

      // Re-trigger icon styling if needed
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
});

/**
 * Handle Hero Quick Quotation Form Submit
 */
function handleQuickQuoteSubmit(event) {
  event.preventDefault();

  const company = document.getElementById('company-name')?.value || 'Perusahaan Klien';
  const service = document.getElementById('service-needed')?.value || 'Konsultasi Umum';
  const docType = document.getElementById('doc-type')?.value || 'Dokumen Korporat';
  const country = document.getElementById('country-target')?.value || 'Tidak Disebutkan';
  const urgency = document.getElementById('urgency-option')?.value || 'Reguler B2B';

  const waNumber = '62817322287';

  let message = `*PERMINTAAN PENAWARAN RESMI B2B — BALI APOSTILLE*\n`;
  message += `_PT Sinar Heksa Edukasi_\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
  message += `🏢 *Nama Perusahaan/Institusi:* ${company}\n`;
  message += `📑 *Layanan Dibutuhkan:* ${service}\n`;
  message += `📄 *Jenis Dokumen:* ${docType}\n`;
  message += `🌍 *Negara Tujuan:* ${country}\n`;
  message += `⚡ *Prioritas Timeline:* ${urgency}\n\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `Mohon informasi rincian prosedur, estimasi timeline, dan penawaran biaya formal. Terima kasih.`;

  const encodedUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
  window.open(encodedUrl, '_blank');
}

