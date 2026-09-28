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

  // 5. Initial Calculator Run
  updateB2BCalculator();
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

/**
 * Calculate B2B Timeline & Projections dynamically
 */
function updateB2BCalculator() {
  const service = document.getElementById('calc-service')?.value || 'apostille_standard';
  const language = document.getElementById('calc-language')?.value || 'id_en';
  const docCount = parseInt(document.getElementById('calc-doc-count')?.value || '1', 10);
  const location = document.getElementById('calc-location')?.value || 'bali';

  const timelineDisplay = document.getElementById('calc-timeline-display');
  const noteDisplay = document.getElementById('calc-note-display');

  if (!timelineDisplay || !noteDisplay) return;

  let timelineText = '';
  let noteText = '';

  switch (service) {
    case 'apostille_priority':
      timelineText = '1 – 2 Hari Kerja (Express Priority)';
      noteText = `*Jalur kilat prioritas bisnis untuk ${docCount} dokumen. Didukung kurir dedicated & pengawasan langsung di sistem Ditjen AHU Kemenkumham RI.`;
      break;

    case 'apostille_standard':
      if (location === 'jakarta') {
        timelineText = '3 – 5 Hari Kerja';
      } else {
        timelineText = '4 – 7 Hari Kerja';
      }
      noteText = `*Jalur reguler standar Kemenkumham untuk ${docCount} dokumen. Termasuk pencetakan sertifikat ber-barcode & verifikasi spesimen pejabat.`;
      break;

    case 'sworn_translation':
      if (docCount <= 5) {
        timelineText = '1 – 2 Hari Kerja';
      } else if (docCount <= 20) {
        timelineText = '2 – 4 Hari Kerja';
      } else {
        timelineText = '4 – 6 Hari Kerja (Batch Corporate)';
      }
      noteText = `*Dikerjakan langsung oleh Penerjemah Tersumpah terdaftar SK Kemenkumham. Termasuk cap basah, materai, dan file PDF terenkripsi.`;
      break;

    case 'bundle_complete':
      timelineText = '4 – 6 Hari Kerja (Paket Terpadu)';
      noteText = `*Solusi terpadu: Penerjemahan Tersumpah resmi dilanjutkan langsung dengan Sertifikasi Apostille Kemenkumham RI tanpa jeda birokrasi.`;
      break;

    case 'embassy_legalization':
      timelineText = '7 – 12 Hari Kerja (Non-Hague)';
      noteText = `*Alur legalisasi bertahap: Kemenkumham RI ➔ Kementerian Luar Negeri RI ➔ Kedutaan Besar Asing (UAE, Qatar, China, dll.) di Jakarta.`;
      break;

    case 'notarization_only':
      timelineText = '1 Hari Kerja (Same-Day / Next-Day)';
      noteText = `*Legalisasi tanda tangan / Waarmerking / Salinan Sesuai Asli oleh Notaris rekanan resmi di Bali atau Jakarta.`;
      break;

    default:
      timelineText = '3 – 5 Hari Kerja';
      noteText = '*Estimasi standar pengerjaan terhitung sejak berkas lengkap dan terverifikasi.';
  }

  // Extra notes for location
  if (location === 'international') {
    noteText += ' Ditambah estimasi 3–5 hari pengiriman internasional via DHL Express.';
  } else if (location === 'bali') {
    noteText += ' Free penjemputan fisik berkas di area Bali (Tuban / Denpasar).';
  } else if (location === 'jakarta') {
    noteText += ' Free penjemputan fisik berkas di wilayah Jakarta Pusat & sekitarnya.';
  } else if (location === 'malang') {
    noteText += ' Free penjemputan fisik berkas di wilayah Malang & Jawa Timur.';
  }

  timelineDisplay.textContent = timelineText;
  noteDisplay.textContent = noteText;
}

/**
 * Send calculated quote from Interactive Calculator to WhatsApp
 */
function sendCalculatedQuoteToWhatsApp() {
  const serviceEl = document.getElementById('calc-service');
  const serviceName = serviceEl ? serviceEl.options[serviceEl.selectedIndex].text : 'Apostille';

  const langEl = document.getElementById('calc-language');
  const langName = langEl ? langEl.options[langEl.selectedIndex].text : 'Standar';

  const docCount = document.getElementById('calc-doc-count')?.value || '1';
  
  const locEl = document.getElementById('calc-location');
  const locName = locEl ? locEl.options[locEl.selectedIndex].text : 'Bali';

  const timeline = document.getElementById('calc-timeline-display')?.textContent || '3-5 Hari Kerja';

  const waNumber = '62817322287';

  let message = `*SIMULASI PENAWARAN DOKUMEN B2B — BALI APOSTILLE*\n`;
  message += `_PT Sinar Heksa Edukasi_\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
  message += `📌 *Layanan:* ${serviceName}\n`;
  message += `🗣️ *Bahasa:* ${langName}\n`;
  message += `📑 *Volume:* ${docCount} Dokumen\n`;
  message += `📍 *Lokasi:* ${locName}\n`;
  message += `⏱️ *Estimasi Timeline:* ${timeline}\n\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `Halo Tim Corporate Bali Apostille, kami ingin meminta rincian penawaran biaya resmi dan ketersediaan slot pengerjaan.`;

  const encodedUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
  window.open(encodedUrl, '_blank');
}
