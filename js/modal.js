/* ═══════════════════════════════════════════════════════════════
   MODAL + LIGHTBOX — js/modal.js
   ► Zoom de lente na foto de capa
   ► Color chips CSS (sem foto) para tecidos com f.colors definido
   ► Tooltip no hover da cor (estilo Rosset)
   ► Fotos nos swatches mantidas apenas para ESTAMPADOS / variações
   ═══════════════════════════════════════════════════════════════ */

const USO_ICONS = ['01.FITNESS.jpg','02.PRAIA2.jpg','04.MODA.jpg','10.LINGERIE.jpg','25.ESPORTIVO.jpg','02.DRY.jpg'];

let currentLightboxImages = [];
let currentLightboxIndex  = 0;

/* ── Helpers ───────────────────────────────────────────────── */
function pageFile(n) {
  return 'page-' + String(n).padStart(2, '0') + '.jpg';
}

function renderAttrIcons(list) {
  return list.map(attr => {
    const label = attr
      .replace(/^\d+\./, '').replace(/\.jpg$/i, '')
      .replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    return `<div class="attr-icon-wrap"><img src="images/icons/${attr}" alt="${label}"></div>`;
  }).join('');
}
function normalizeHex(value) {
  if (!value) return '';
  return value.toString().trim().toLowerCase().replace(/[^0-9a-f]/g, '');
}

function findSupplierEntry(palette, candidate) {
  if (!palette || !palette.length || !candidate) return null;
  const needle = candidate.toString().trim().toLowerCase();
  const needleHex = normalizeHex(candidate);

  return palette.find(entry => {
    if (entry.hex && normalizeHex(entry.hex) === needleHex) return true;
    if (entry.code && entry.code.toString().trim().toLowerCase() === needle) return true;
    if (entry.name && entry.name.toString().trim().toLowerCase() === needle) return true;
    if (entry.code && entry.name) {
      const combined = `${entry.code} ${entry.name}`.trim().toLowerCase();
      if (combined === needle) return true;
    }
    return false;
  }) || null;
}

function resolveSupplierColors(f) {
  if (!f || !f.supplier) return;
  const palette = (window.SUPPLIER_COLOR_PALETTES || {})[f.supplier];
  if (!Array.isArray(palette) || !palette.length) return;

  if (!Array.isArray(f.colors) || f.colors.length === 0) {
    if (Array.isArray(f.supplierColors) && f.supplierColors.length) {
      f.colors = f.supplierColors.map(item => {
        if (typeof item === 'string') {
          const match = findSupplierEntry(palette, item);
          return match ? { ...match } : { name: item };
        }
        const itemKey = item.name || item.code || item.hex;
        const match = findSupplierEntry(palette, itemKey);
        return match ? { ...match, ...item } : item;
      }).filter(Boolean);
    }
  }

  if (!Array.isArray(f.colors)) return;

  f.colors = f.colors.map(color => {
    const current = typeof color === 'string' ? { name: color } : { ...color };
    const match = findSupplierEntry(palette, current.hex || current.name || current.code);
    if (match) {
      return {
        ...match,
        ...current,
        hex: current.hex || match.hex,
        name: current.name || match.name,
        code: current.code || match.code,
      };
    }
    return current;
  });
}
/* ═══════════════════════════════════════════════════════════════
   ZOOM DE LENTE — segue o mouse na foto de capa
   ═══════════════════════════════════════════════════════════════ */
function setupCoverZoom(imgEl) {
  const wrap = imgEl.closest('.fabric-modal-cover');
  if (!wrap) return;

  const ZOOM      = 3;        // fator de ampliação
  const LENS_SIZE = 150;      // tamanho da lente em px

  // Cria lente UMA vez; reutiliza nas próximas aberturas
  let lens = wrap.querySelector('.zoom-lens');
  if (!lens) {
    lens = document.createElement('div');
    lens.className = 'zoom-lens';
    lens.style.cssText = `
      display:none;position:absolute;
      width:${LENS_SIZE}px;height:${LENS_SIZE}px;
      border:2px solid rgba(200,160,58,0.7);
      border-radius:4px;
      pointer-events:none;
      background-repeat:no-repeat;
      box-shadow:0 4px 20px rgba(0,0,0,0.5);
      z-index:10;
    `;
    wrap.appendChild(lens);
  }

  function moveLens(e) {
    // Aguarda imagem carregada para ter dimensões corretas
    if (!imgEl.naturalWidth) return;

    const rect = wrap.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Posição da lente (clampeada para não sair da div)
    const lx = Math.max(0, Math.min(rect.width  - LENS_SIZE, x - LENS_SIZE / 2));
    const ly = Math.max(0, Math.min(rect.height - LENS_SIZE, y - LENS_SIZE / 2));
    lens.style.left = lx + 'px';
    lens.style.top  = ly + 'px';

    // Background = imagem em tamanho ampliado
    const bw = rect.width  * ZOOM;
    const bh = rect.height * ZOOM;
    const bgX = -(x * ZOOM - LENS_SIZE / 2);
    const bgY = -(y * ZOOM - LENS_SIZE / 2);

    lens.style.backgroundImage    = `url('${imgEl.src}')`;
    lens.style.backgroundSize     = `${bw}px ${bh}px`;
    lens.style.backgroundPosition = `${bgX}px ${bgY}px`;
    lens.style.display            = 'block';
  }

  // Remove listeners antigos para não acumular (troca de tecido)
  wrap._zoomMove && wrap.removeEventListener('mousemove', wrap._zoomMove);
  wrap._zoomLeave && wrap.removeEventListener('mouseleave', wrap._zoomLeave);

  wrap._zoomMove  = moveLens;
  wrap._zoomLeave = () => { lens.style.display = 'none'; };

  wrap.addEventListener('mousemove', wrap._zoomMove);
  wrap.addEventListener('mouseleave', wrap._zoomLeave);
}

/* ═══════════════════════════════════════════════════════════════
   GRID DE CORES — chips CSS  ou  fotos (variações/estampados)
   ═══════════════════════════════════════════════════════════════ */
function renderColorGrid(f, key) {
  const grid          = document.getElementById('fabricModalGrid');
  const colorsSection = document.getElementById('fabricColorsSection');
  grid.innerHTML      = '';
  currentLightboxImages = [];

  resolveSupplierColors(f);

  /* ── MODO 1: color chips (f.colors definido) ── */
  if (f.colors && f.colors.length > 0) {
    document.getElementById('fabricColorTitle').childNodes[0].textContent = (f.colorsTitle || 'Cores Disponíveis') + ' ';
    document.getElementById('fabricColorCount').textContent =
      f.colors.length + ' ' + (f.colors.length === 1 ? 'cor' : 'cores');
    colorsSection.style.display = 'block';

    // Grid menor para chips
    grid.classList.add('grid-chips');

    f.colors.forEach(cor => {
      const chip = document.createElement('div');
      chip.className = 'color-chip';
      chip.setAttribute('data-name', cor.name);
      chip.title = cor.name;

      const blockStyles = Array.isArray(cor.hex)
        ? `background: linear-gradient(90deg, ${cor.hex[0]} 50%, ${cor.hex[1]} 50%);`
        : `background: ${cor.hex};`;

      chip.innerHTML = `
        <span class="color-chip-block" style="${blockStyles}"></span>
        <span class="color-chip-label">${cor.name}</span>
      `;
      grid.appendChild(chip);
    });

    return;
  }


  // Sem colors e sem pages extras → esconde seção
  grid.classList.remove('grid-chips');
  const colorPages = (f.pages || 1) - 1;
  if (colorPages <= 0) {
    colorsSection.style.display = 'none';
    return;
  }

  /* ── MODO 2: fotos (estampados / variações com imagem) ── */
  document.getElementById('fabricColorTitle').childNodes[0].textContent = (f.colorsTitle || 'Variações') + ' ';
  document.getElementById('fabricColorCount').textContent =
    colorPages + ' ' + (colorPages === 1 ? 'item' : 'itens');
  colorsSection.style.display = 'block';

  for (let i = 2; i <= f.pages; i++) {
    const src = `images/tecidos/${f.category}/${key}/${pageFile(i)}`;
    currentLightboxImages.push(src);
    const idx = currentLightboxImages.length - 1;
    const div = document.createElement('div');
    div.className = 'fabric-modal-swatch';
    div.innerHTML = `<img src="${src}" alt="${f.name} variação ${i - 1}" loading="lazy">
      <div class="fabric-modal-swatch-n">${i - 1}</div>`;
    div.onclick = () => openLightbox(idx);
    grid.appendChild(div);
  }
}

/* ═══════════════════════════════════════════════════════════════
   ABRE MODAL
   ═══════════════════════════════════════════════════════════════ */
function openFabric(key) {
  const f = FABRICS[key];
  if (!f) return;

  /* Capa — usa f.cover se definido, senão page-01.jpg */
  const coverImg = document.getElementById('fabricModalCover');
  coverImg.src = f.cover
    ? f.cover
    : `images/tecidos/${f.category}/${key}/${pageFile(1)}`;

  /* Activa zoom assim que a imagem carregar */
  coverImg.onload = () => setupCoverZoom(coverImg);
  if (coverImg.complete) setupCoverZoom(coverImg);

  /* Textos */
  document.getElementById('fabricModalName').innerHTML = f.name;
  document.getElementById('fabricModalTag').textContent = f.tag;

  const rawDesc   = f.desc || '';
  const sentences = rawDesc.split(/(?<=[.!?])\s+/);
  const mid       = Math.ceil(sentences.length / 2);
  const descHTML  = sentences.length > 3
    ? `<p>${sentences.slice(0, mid).join(' ')}</p><p>${sentences.slice(mid).join(' ')}</p>`
    : `<p>${rawDesc}</p>`;
  document.getElementById('fabricModalDesc').innerHTML = descHTML;

  /* Specs */
  const larguraLine = document.getElementById('specLarguraLine');
  if (f.largura) {
    document.getElementById('specLargura').innerText = f.largura;
    larguraLine.style.display = '';
  } else {
    larguraLine.style.display = 'none';
  }
  document.getElementById('specRendimento').innerText = f.rendimento  || '-';
  document.getElementById('specGramatura').innerText  = f.gramatura   || '-';
  document.getElementById('specComposicao').innerText = f.composicao  || '-';

  /* Ícones de atributos */
  const attrs     = f.attributes || [];
  const indicado  = attrs.filter(a =>  USO_ICONS.some(u => a.toUpperCase().includes(u.split('.')[1].toUpperCase())));
  const atributos = attrs.filter(a => !USO_ICONS.some(u => a.toUpperCase().includes(u.split('.')[1].toUpperCase())));

  document.getElementById('attr-indicado').innerHTML  = renderAttrIcons(indicado);
  document.getElementById('attr-atributos').innerHTML = renderAttrIcons(atributos);
  document.getElementById('attrIndicadoSection').style.display  = indicado.length  ? '' : 'none';
  document.getElementById('attrAtributosSection').style.display = atributos.length ? '' : 'none';

  /* WhatsApp */
  const wppLink = window.buildWppLink
    ? window.buildWppLink(f.name)
    : `https://wa.me/5511957717470?text=Olá!%20Tenho%20interesse%20no%20tecido%20${encodeURIComponent(f.name)}.`;
  document.getElementById('fabricModalWpp').href = wppLink;
  const floatBtn = document.getElementById('wppFloat');
  if (floatBtn) floatBtn.href = wppLink;

  /* Botão Book */
  const bookBtn  = document.getElementById('fabricModalBook');
  bookBtn.href   = `book.html?category=${f.category}&fabric=${key}`;
  bookBtn.style.display = 'inline-flex';

  /* Grid de cores ou fotos */
  renderColorGrid(f, key);

  document.getElementById('fabricModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

/* ── Fecha modal ─────────────────────────────────────────────── */
function closeFabricModal(e) {
  if (e.target === document.getElementById('fabricModal')) closeFabricModalDirect();
}
function closeFabricModalDirect() {
  document.getElementById('fabricModal').classList.remove('open');
  document.body.style.overflow = '';
  const floatBtn = document.getElementById('wppFloat');
  if (floatBtn && window.buildWppLink) floatBtn.href = window.buildWppLink();
}

/* ── Lightbox ─────────────────────────────────────────────────── */
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

/* ── Atalhos de teclado ──────────────────────────────────────── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape')     { closeLightbox(); closeFabricModalDirect(); }
  if (e.key === 'ArrowLeft')  lightboxNav(-1);
  if (e.key === 'ArrowRight') lightboxNav(1);
});