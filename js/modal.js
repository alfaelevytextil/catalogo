/* ═══════════════════════════════════════════════════════════════
   MODAL + LIGHTBOX — js/modal.js
   Controla a abertura/fechamento do modal de tecido e do lightbox.
   Depende de: fabrics-data.js (deve ser carregado antes)
   ═══════════════════════════════════════════════════════════════ */

// Ícones que representam "indicado para" (uso)
const USO_ICONS = ['01.FITNESS.jpg','02.PRAIA2.jpg','04.MODA.jpg','10.LINGERIE.jpg','25.ESPORTIVO.jpg','02.DRY.jpg'];

let currentLightboxImages = [];
let currentLightboxIndex  = 0;

// ── Helpers ──────────────────────────────────────────────────
function pageFile(n) {
  return 'page-' + String(n).padStart(2, '0') + '.jpg';
}

function renderAttrIcons(list) {
  return list.map(attr => {
    const label = attr
      .replace(/^\d+\./, '')
      .replace(/\.jpg$/i, '')
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase());
    return `<div class="attr-icon-wrap"><img src="images/icons/${attr}" alt="${label}"></div>`;
  }).join('');
}

// ── Abre o modal de um tecido ─────────────────────────────────
function openFabric(key) {
  const f = FABRICS[key];
  if (!f) return;

  // Capa e textos básicos
  document.getElementById('fabricModalCover').src = `images/tecidos/${f.category}/${key}/${pageFile(1)}`;
  document.getElementById('fabricModalName').innerHTML = f.name;
  document.getElementById('fabricModalTag').textContent = f.tag;

  // Descrição — divide em parágrafos para legibilidade
  const rawDesc = f.desc || '';
  const sentences = rawDesc.split(/(?<=[.!?])\s+/);
  const mid = Math.ceil(sentences.length / 2);
  const descHTML = sentences.length > 3
    ? `<p>${sentences.slice(0, mid).join(' ')}</p><p>${sentences.slice(mid).join(' ')}</p>`
    : `<p>${rawDesc}</p>`;
  document.getElementById('fabricModalDesc').innerHTML = descHTML;

  // Especificações técnicas
  const largura     = f.largura || null;
  const larguraLine = document.getElementById('specLarguraLine');
  if (largura) {
    document.getElementById('specLargura').innerText = largura;
    larguraLine.style.display = '';
  } else {
    larguraLine.style.display = 'none';
  }
  document.getElementById('specRendimento').innerText = f.rendimento  || '-';
  document.getElementById('specGramatura').innerText  = f.gramatura   || '-';
  document.getElementById('specComposicao').innerText = f.composicao  || '-';

  // Ícones de atributos
  const attrs    = f.attributes || [];
  const indicado = attrs.filter(a =>  USO_ICONS.some(u => a.toUpperCase().includes(u.split('.')[1].toUpperCase())));
  const atributos= attrs.filter(a => !USO_ICONS.some(u => a.toUpperCase().includes(u.split('.')[1].toUpperCase())));

  document.getElementById('attr-indicado').innerHTML  = renderAttrIcons(indicado);
  document.getElementById('attr-atributos').innerHTML = renderAttrIcons(atributos);
  document.getElementById('attrIndicadoSection').style.display  = indicado.length  ? '' : 'none';
  document.getElementById('attrAtributosSection').style.display = atributos.length ? '' : 'none';

  // Link WhatsApp — será atualizado pelo vendedores.js se houver vendedor ativo
  document.getElementById('fabricModalWpp').href =
    `https://wa.me/5511957717470?text=Olá!%20Tenho%20interesse%20no%20tecido%20${encodeURIComponent(f.name)}.`;

  // Botão Book
  const bookBtn  = document.getElementById('fabricModalBook');
  bookBtn.href   = `book.html?category=${f.category}&fabric=${key}`;
  bookBtn.style.display = 'inline-flex';

  // Grid de cores/variações (páginas 2 em diante)
  const grid          = document.getElementById('fabricModalGrid');
  const colorsSection = document.getElementById('fabricColorsSection');
  grid.innerHTML      = '';
  currentLightboxImages = [];

  const colorPages = f.pages - 1;
  if (colorPages > 0) {
    document.getElementById('fabricColorTitle').childNodes[0].textContent =
      f.colorsTitle + ' ';
    document.getElementById('fabricColorCount').textContent =
      colorPages + ' ' + (colorPages === 1 ? 'item' : 'itens');
    colorsSection.style.display = 'block';

    for (let i = 2; i <= f.pages; i++) {
      const src = `images/tecidos/${f.category}/${key}/${pageFile(i)}`;
      currentLightboxImages.push(src);
      const idx = currentLightboxImages.length - 1;
      const div = document.createElement('div');
      div.className = 'fabric-modal-swatch';
      div.innerHTML = `<img src="${src}" alt="${f.name} cor ${i - 1}" loading="lazy">
        <div class="fabric-modal-swatch-n">${i - 1}</div>`;
      div.onclick = () => openLightbox(idx);
      grid.appendChild(div);
    }
  } else {
    colorsSection.style.display = 'none';
  }

  document.getElementById('fabricModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

// ── Fecha o modal ─────────────────────────────────────────────
function closeFabricModal(e) {
  if (e.target === document.getElementById('fabricModal')) closeFabricModalDirect();
}
function closeFabricModalDirect() {
  document.getElementById('fabricModal').classList.remove('open');
  document.body.style.overflow = '';
}

// ── Lightbox ──────────────────────────────────────────────────
function openLightbox(idx) {
  currentLightboxIndex = idx;
  document.getElementById('lightboxImg').src = currentLightboxImages[idx];
  document.getElementById('lightbox').classList.add('open');
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
}
function lightboxNav(dir) {
  currentLightboxIndex =
    (currentLightboxIndex + dir + currentLightboxImages.length) % currentLightboxImages.length;
  document.getElementById('lightboxImg').src = currentLightboxImages[currentLightboxIndex];
}

// ── Atalhos de teclado ────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.key === 'Escape')      { closeLightbox(); closeFabricModalDirect(); }
  if (e.key === 'ArrowLeft')   lightboxNav(-1);
  if (e.key === 'ArrowRight')  lightboxNav(1);
});