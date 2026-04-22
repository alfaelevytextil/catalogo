/* ═══════════════════════════════════════════════════════════════
   BOOK MAIN — js/book-main.js
   Lógica do lookbook: renderização, navegação, zoom, menu.
   Depende de: book-data.js e vendedores.js (carregados antes)
   ═══════════════════════════════════════════════════════════════ */

const CAT_LABELS = { LISOS:'Lisos', TEXTURIZADOS:'Texturizados', TRAMAS:'Tramas Abertas', ESTAMPADOS:'Estampados' };

let pages = [], currentSpread = 0, totalSpreads = 0, isAnimating = false, activeCategory = null;
let isMobileView = false, mobilePages = [], mobilePage = 0;
let _returnFabricKey = null;

function pad(n) { return String(n).padStart(2, '0'); }
function checkMobile() { isMobileView = window.innerWidth < 700; }

/* ── Geração de páginas ─────────────────────────────────────── */
function generatePages(category) {
  const result = [];
  result.push({ type:'blank', isOpening:true });
  result.push({ type:'book-cover', category });
  const entries = Object.entries(BOOK_DATA).filter(([, f]) => f.category === category);
  entries.forEach(([key, fabric], idx) => {
    if (result.length % 2 !== 0) result.push({ type:'blank' });
    result.push({ type:'fabric-intro', key, fabric, fabricIndex:idx });
    result.push({ type:'fabric-cover', key, fabric, src:`images/tecidos/${category}/${key}/page-01.jpg` });
    for (let i = 1; i <= (fabric.bookPages || 0); i++) {
      result.push({ type:'fabric-photo', key, fabric, src:`images/book/${category}/${key}/photo-${pad(i)}.jpg`, n:i });
    }
    if (result.length % 2 !== 0) result.push({ type:'blank' });
  });
  return result;
}

/* ── Renderizadores de página ───────────────────────────────── */
function renderPage(page) {
  if (!page || page.type === 'blank') return renderBlank(page);
  switch (page.type) {
    case 'book-cover':   return renderCover(page);
    case 'fabric-intro': return renderIntro(page);
    case 'fabric-cover':
    case 'fabric-photo': return renderPhoto(page);
    default:             return renderBlank(page);
  }
}

function renderBlank(page) {
  if (page && page.isOpening) {
    return `<div class="pg pg-blank pg-blank--opening">
      <div class="pg-blank-center">
        <div class="pg-blank-watermark">Alfa <em>&</em> Levy</div>
        <div class="pg-blank-tagline">Tecidos Especiais · São Paulo</div>
      </div>
    </div>`;
  }
  return `<div class="pg pg-blank"><div class="pg-blank-watermark">Alfa <em>&</em> Levy</div></div>`;
}

function renderCover(page) {
  const label = CAT_LABELS[page.category] || page.category;
  const count = Object.values(BOOK_DATA).filter(f => f.category === page.category).length;
  return `<div class="pg pg-cover">
    <div class="pg-cover-inner">
      <div class="pg-cover-eyebrow">Lookbook Digital · 2026</div>
      <div class="pg-cover-line"></div>
      <div class="pg-cover-brand">Alfa <em>&</em> Levy</div>
      <div class="pg-cover-cat">${label}</div>
      <div class="pg-cover-count">${count} tecidos</div>
      <div class="pg-cover-line"></div>
      <div class="pg-cover-footer">São Paulo · Brasil</div>
    </div>
  </div>`;
}

function renderIntro(page) {
  const num         = pad(page.fabricIndex + 1);
  const fabricName  = page.fabric.name;
  const washItems   = WASH_DATA[page.key] || WASH_DEFAULT;
  const washHTML    = washItems.map(w =>
    `<div class="pg-intro-wash-item">
       <div class="pg-intro-wash-icon"><img src="${w.img}" alt="${w.label}"></div>
       <span>${w.label}</span>
     </div>`
  ).join('');

  /* Link WhatsApp personalizado com vendedor + nome do tecido */
  const wppHref = window.buildWppLink ? window.buildWppLink(fabricName)
    : `https://wa.me/5511957717470?text=Olá!%20Tenho%20interesse%20no%20tecido%20${encodeURIComponent(fabricName)}.`;

  return `<div class="pg pg-intro">
    <div class="pg-intro-num">${num}</div>
    <div class="pg-intro-body">
      <div class="pg-intro-cat">${CAT_LABELS[page.fabric.category] || page.fabric.category}</div>
      <div class="pg-intro-name">${fabricName}</div>
      <div class="pg-intro-divider"></div>
      <div class="pg-intro-tag">${page.fabric.tag}</div>
      <div class="pg-intro-wash">
        <div class="pg-intro-wash-title">Especificações de Lavagem</div>
        <div class="pg-intro-wash-icons">${washHTML}</div>
      </div>
    </div>
    <div class="pg-intro-icons">
      <a href="${wppHref}" target="_blank" class="pg-intro-icon-btn pg-intro-icon-btn--wpp" title="Pedir Amostra via WhatsApp">
        <svg style="width:16px;height:16px;fill:currentColor"><use href="#ico-whatsapp"/></svg>
      </a>
      <a href="https://www.instagram.com/levytextil456?igsh=MTBrZHpmNmk1cnc5Yg==" target="_blank" class="pg-intro-icon-btn pg-intro-icon-btn--ig pg-intro-icon-btn--levy" title="Instagram @levytextil456">
        <svg style="width:16px;height:16px;fill:currentColor"><use href="#ico-instagram"/></svg>
      </a>
      <a href="https://www.instagram.com/alfatextil/" target="_blank" class="pg-intro-icon-btn pg-intro-icon-btn--ig pg-intro-icon-btn--alfa" title="Instagram @alfatextil">
        <svg style="width:16px;height:16px;fill:currentColor"><use href="#ico-instagram"/></svg>
      </a>
      <a href="index.html?fabric=${page.key}" class="pg-intro-btn-cores" title="Ver cores no catálogo">
        <svg style="width:11px;height:11px;fill:currentColor" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
        Cores
      </a>
    </div>
    <div class="pg-intro-wm">Alfa & Levy</div>
  </div>`;
}

function renderPhoto(page) {
  const isCover = page.type === 'fabric-cover';
  const label   = isCover ? page.fabric.name : `Foto ${page.n}`;
  const safeSrc = page.src.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  return `<div class="pg pg-photo ${isCover ? 'pg-photo-cover' : ''}" onclick="openZoom('${safeSrc}')">
    <img src="${page.src}" alt="${page.fabric.name}" loading="${isCover ? 'eager' : 'lazy'}">
    <div class="pg-photo-overlay">
      <span class="pg-photo-label">${label}</span>
      ${!isCover ? `<span class="pg-photo-n">${page.n}</span>` : ''}
    </div>
    ${isCover ? `<div class="pg-photo-tag">${page.fabric.tag}</div>` : ''}
    <div class="pg-zoom-hint"><svg style="width:14px;height:14px;fill:currentColor"><use href="#ico-zoom"/></svg></div>
  </div>`;
}

/* ── Abre / fecha book ──────────────────────────────────────── */
function openBook(category, jumpToFabric) {
  checkMobile();
  activeCategory = category;
  pages          = generatePages(category);
  totalSpreads   = pages.length / 2;

  let startSpread = 0;
  if (jumpToFabric) {
    for (let i = 0; i < pages.length; i++) {
      if (pages[i].key === jumpToFabric && pages[i].type === 'fabric-intro') {
        startSpread = Math.floor(i / 2); break;
      }
    }
  }

  mobilePages = pages.filter(p => p && p.type !== 'blank');
  mobilePage  = 0;
  if (jumpToFabric) {
    for (let i = 0; i < mobilePages.length; i++) {
      if (mobilePages[i].key === jumpToFabric) { mobilePage = i; break; }
    }
  }

  document.getElementById('landing').style.display = 'none';
  document.getElementById('reader').style.display  = 'flex';

  const xBtn = document.getElementById('btnReturnCatalog');
  if (xBtn && _returnFabricKey) xBtn.style.display = 'flex';

  document.getElementById('brHeaderCat').textContent   = CAT_LABELS[category] || category;
  document.getElementById('fmCatLabel').textContent     = CAT_LABELS[category] || category;

  const catLink = window.buildWppLink
    ? window.buildWppLink()
    : `https://wa.me/5511957717470?text=Olá!%20Vi%20o%20lookbook%20de%20${encodeURIComponent(CAT_LABELS[category] || category)}%20e%20gostaria%20de%20mais%20informações.`;
  document.getElementById('brWpp').href = catLink;

  currentSpread = startSpread;
  buildFabricMenu(category);
  if (isMobileView) renderMobile(mobilePage); else renderSpread(startSpread);
}

function closeBook() {
  document.getElementById('reader').style.display  = 'none';
  document.getElementById('landing').style.display = 'flex';
  const btn = document.getElementById('btnReturnCatalog');
  if (btn) btn.style.display = 'none';
  isAnimating = false;
  document.getElementById('brFlipper').style.display = 'none';
  closeFabricMenu();
  closeZoom();
  /* Reverte botão flutuante para mensagem genérica */
  const floatBtn = document.getElementById('wppFloat');
  if (floatBtn && window.buildWppLink) floatBtn.href = window.buildWppLink();
}

/* ── Renderiza spread (desktop) ─────────────────────────────── */
function renderSpread(idx) {
  currentSpread = Math.max(0, Math.min(idx, totalSpreads - 1));
  document.getElementById('pageLeft').innerHTML  = renderPage(pages[currentSpread * 2]);
  document.getElementById('pageRight').innerHTML = renderPage(pages[currentSpread * 2 + 1]);
  document.getElementById('brFlipper').style.display = 'none';
  updateUI();
}

/* ── Atualiza UI (progresso, counter, nomes, botões) ─────────── */
function updateUI() {
  const left  = pages[currentSpread * 2];
  const right = pages[currentSpread * 2 + 1];
  let fabricName = '';
  for (const p of [right, left]) { if (p && p.fabric) { fabricName = p.fabric.name; break; } }

  const headerFabric = document.getElementById('brHeaderFabric');
  if (headerFabric) headerFabric.textContent = fabricName ? '— ' + fabricName : '';
  document.getElementById('brFooterFabric').textContent = fabricName;

  const pct = totalSpreads > 1 ? (currentSpread / (totalSpreads - 1)) * 100 : 100;
  document.getElementById('brProgressFill').style.width  = pct + '%';
  document.getElementById('brProgressThumb').style.left  = pct + '%';
  document.getElementById('brProgressLabel').textContent = `${currentSpread + 1} / ${totalSpreads}`;
  document.getElementById('brCounter').textContent       = `${currentSpread + 1} / ${totalSpreads}`;
  document.getElementById('btnPrev').disabled = currentSpread <= 0;
  document.getElementById('btnNext').disabled = currentSpread >= totalSpreads - 1;

  document.querySelectorAll('.fm-item').forEach(el => el.classList.remove('fm-item--active'));
  if (fabricName) {
    const active = document.querySelector(`.fm-item[data-name="${fabricName.replace(/"/g, '&quot;')}"]`);
    if (active) { active.classList.add('fm-item--active'); active.scrollIntoView({ block:'nearest', behavior:'smooth' }); }

    /* Atualiza brWpp e botão flutuante com tecido atual */
    const fabricLink = window.buildWppLink ? window.buildWppLink(fabricName) : '';
    if (fabricLink) {
      document.getElementById('brWpp').href = fabricLink;
      const floatBtn = document.getElementById('wppFloat');
      if (floatBtn) floatBtn.href = fabricLink;
    }
  }
}

/* ── Animação de virada ─────────────────────────────────────── */
function nextPage() {
  if (isMobileView) { nextMobile(); return; }
  if (isAnimating || currentSpread >= totalSpreads - 1) return;
  const next = currentSpread + 1;
  const eL = document.getElementById('pageLeft'), eR = document.getElementById('pageRight');
  const eF = document.getElementById('brFlipper'), eFr = document.getElementById('flipFront'), eBk = document.getElementById('flipBack');
  eFr.innerHTML = eR.innerHTML; eBk.innerHTML = renderPage(pages[next * 2]); eR.innerHTML = renderPage(pages[next * 2 + 1]);
  Object.assign(eF.style, { left:'50%', top:'0', width:'50%', height:'100%', transformOrigin:'0% 50%', transform:'rotateY(0deg)', display:'block' });
  isAnimating = true; void eF.offsetHeight; eF.classList.add('br-flipping');
  setTimeout(() => { eL.innerHTML = renderPage(pages[next * 2]); }, 360);
  setTimeout(() => { eF.classList.remove('br-flipping'); eF.style.display = 'none'; currentSpread = next; isAnimating = false; updateUI(); }, 720);
}

function prevPage() {
  if (isMobileView) { prevMobile(); return; }
  if (isAnimating || currentSpread <= 0) return;
  const prev = currentSpread - 1;
  const eL = document.getElementById('pageLeft'), eR = document.getElementById('pageRight');
  const eF = document.getElementById('brFlipper'), eFr = document.getElementById('flipFront'), eBk = document.getElementById('flipBack');
  eFr.innerHTML = eL.innerHTML; eBk.innerHTML = renderPage(pages[prev * 2 + 1]); eL.innerHTML = renderPage(pages[prev * 2]);
  Object.assign(eF.style, { left:'0', top:'0', width:'50%', height:'100%', transformOrigin:'100% 50%', transform:'rotateY(0deg)', display:'block' });
  isAnimating = true; void eF.offsetHeight; eF.classList.add('br-flipping-back');
  setTimeout(() => { eR.innerHTML = renderPage(pages[prev * 2 + 1]); }, 360);
  setTimeout(() => { eF.classList.remove('br-flipping-back'); eF.style.display = 'none'; currentSpread = prev; isAnimating = false; updateUI(); }, 720);
}

/* ── Mobile (uma página por vez) ───────────────────────────── */
function renderMobile(idx) {
  mobilePage = Math.max(0, Math.min(idx, mobilePages.length - 1));
  const page = mobilePages[mobilePage];
  const eR   = document.getElementById('pageRight');
  eR.innerHTML = renderPage(page); eR.style.width = '100%';
  document.getElementById('pageLeft').style.display = 'none';

  const fabricName = page && page.fabric ? page.fabric.name : '';
  const headerFabric = document.getElementById('brHeaderFabric');
  if (headerFabric) headerFabric.textContent = fabricName ? '— ' + fabricName : '';
  document.getElementById('brFooterFabric').textContent = fabricName;

  const pct = mobilePages.length > 1 ? (mobilePage / (mobilePages.length - 1)) * 100 : 100;
  document.getElementById('brProgressFill').style.width  = pct + '%';
  document.getElementById('brProgressThumb').style.left  = pct + '%';
  document.getElementById('brProgressLabel').textContent = `${mobilePage + 1} / ${mobilePages.length}`;
  document.getElementById('brCounter').textContent       = `${mobilePage + 1} / ${mobilePages.length}`;
  document.getElementById('btnPrev').disabled = mobilePage <= 0;
  document.getElementById('btnNext').disabled = mobilePage >= mobilePages.length - 1;

  /* Atualiza brWpp e botão flutuante */
  if (fabricName) {
    const fabricLink = window.buildWppLink ? window.buildWppLink(fabricName) : '';
    if (fabricLink) {
      document.getElementById('brWpp').href = fabricLink;
      const floatBtn = document.getElementById('wppFloat');
      if (floatBtn) floatBtn.href = fabricLink;
    }
  }
}
function nextMobile() { if (mobilePage < mobilePages.length - 1) renderMobile(mobilePage + 1); }
function prevMobile() { if (mobilePage > 0) renderMobile(mobilePage - 1); }

/* ── Menu de tecidos ────────────────────────────────────────── */
function buildFabricMenu(category) {
  const entries = Object.entries(BOOK_DATA).filter(([, f]) => f.category === category);
  document.getElementById('fmList').innerHTML = entries.map(([key, fabric], idx) => `
    <button class="fm-item" data-key="${key}" data-name="${fabric.name.replace(/"/g, '&quot;')}" onclick="goToFabric('${key}')">
      <span class="fm-item-num">${pad(idx + 1)}</span>
      <div class="fm-item-info">
        <span class="fm-item-name">${fabric.name}</span>
        <span class="fm-item-tag">${fabric.tag}</span>
      </div>
      <svg style="width:12px;height:12px;fill:currentColor;flex-shrink:0;opacity:.35"><use href="#ico-arrow"/></svg>
    </button>`).join('');
}
function filterFabricMenu(q) {
  const term = q.toLowerCase();
  document.querySelectorAll('.fm-item').forEach(el => {
    el.style.display = el.dataset.name.toLowerCase().includes(term) ? '' : 'none';
  });
}
function openFabricMenu() {
  document.getElementById('fmDrawer').classList.add('fm-drawer--open');
  document.getElementById('fmOverlay').classList.add('fm-overlay--show');
  document.getElementById('fmSearch').value = ''; filterFabricMenu('');
}
function closeFabricMenu() {
  document.getElementById('fmDrawer').classList.remove('fm-drawer--open');
  document.getElementById('fmOverlay').classList.remove('fm-overlay--show');
}
function goToFabric(key) {
  closeFabricMenu();
  if (isMobileView) {
    const idx = mobilePages.findIndex(p => p.key === key);
    if (idx !== -1) renderMobile(idx);
  } else {
    for (let i = 0; i < pages.length; i++) {
      if (pages[i].key === key && pages[i].type === 'fabric-intro') { renderSpread(Math.floor(i / 2)); break; }
    }
  }
}

/* ── Progresso clicável ──────────────────────────────────────── */
function jumpFromProgress(e) {
  const bar    = document.getElementById('brProgressBar');
  const rect   = bar.getBoundingClientRect();
  const pct    = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  const total  = isMobileView ? mobilePages.length : totalSpreads;
  const target = Math.round(pct * (total - 1));
  if (isMobileView) renderMobile(target); else renderSpread(target);
}

/* ── Input de página ─────────────────────────────────────────── */
let _cpit = null;
function togglePageInput() {
  const jump = document.getElementById('brPageJump');
  if (jump.classList.contains('br-page-jump--open')) { closePageInput(); return; }
  const total = isMobileView ? mobilePages.length : totalSpreads;
  const inp   = document.getElementById('brPageInput');
  inp.max   = total;
  inp.value = isMobileView ? mobilePage + 1 : currentSpread + 1;
  jump.classList.add('br-page-jump--open');
  setTimeout(() => { inp.focus(); inp.select(); }, 30);
}
function closePageInput() { document.getElementById('brPageJump').classList.remove('br-page-jump--open'); }
function closePageInputDelay() { _cpit = setTimeout(closePageInput, 200); }
function commitPageInput() {
  if (_cpit) { clearTimeout(_cpit); _cpit = null; }
  const val   = parseInt(document.getElementById('brPageInput').value);
  const total = isMobileView ? mobilePages.length : totalSpreads;
  if (!isNaN(val) && val >= 1 && val <= total) {
    if (isMobileView) renderMobile(val - 1); else renderSpread(val - 1);
  }
  closePageInput();
}
function pageInputKey(e) {
  if (e.key === 'Enter') { e.preventDefault(); commitPageInput(); }
  if (e.key === 'Escape') closePageInput();
}

/* ── Zoom lightbox ───────────────────────────────────────────── */
let zScale = 1, zOffX = 0, zOffY = 0, zDrag = false, zDragSX = 0, zDragSY = 0, zDragOX = 0, zDragOY = 0, zTouchD = 0;

function openZoom(src) {
  const img = document.getElementById('zoomImg');
  img.src = src; img.style.transition = 'none'; img.style.transform = 'translate(0,0) scale(1)';
  zScale = 1; zOffX = 0; zOffY = 0;
  document.getElementById('zoomVal').textContent = '100%';
  document.getElementById('zoomOverlay').classList.add('zoom-overlay--open');
  const hint = document.getElementById('zoomHint');
  hint.style.opacity = '1'; clearTimeout(hint._t);
  hint._t = setTimeout(() => hint.style.opacity = '0', 3000);
}
function closeZoom() { document.getElementById('zoomOverlay').classList.remove('zoom-overlay--open'); }
function applyZoom(animate) {
  const img = document.getElementById('zoomImg');
  img.style.transition = animate ? 'transform 0.2s ease' : 'none';
  img.style.transform  = `translate(${zOffX}px,${zOffY}px) scale(${zScale})`;
  document.getElementById('zoomVal').textContent = Math.round(zScale * 100) + '%';
}
function resetZoom() { zScale = 1; zOffX = 0; zOffY = 0; applyZoom(true); }
function zoomStep(d) { zScale = Math.max(0.5, Math.min(5, zScale + d)); if (zScale <= 1) { zOffX = 0; zOffY = 0; } applyZoom(true); }

document.getElementById('zoomOverlay').addEventListener('wheel', e => {
  if (!document.getElementById('zoomOverlay').classList.contains('zoom-overlay--open')) return;
  e.preventDefault();
  const d = e.deltaY < 0 ? 0.15 : -0.15;
  zScale = Math.max(0.5, Math.min(5, zScale + d));
  if (zScale <= 1) { zOffX = 0; zOffY = 0; } applyZoom(false);
}, { passive: false });
document.getElementById('zoomOverlay').addEventListener('click', e => {
  if (e.target === document.getElementById('zoomOverlay')) closeZoom();
});
document.getElementById('zoomStage').addEventListener('dblclick', e => {
  if (zScale > 1) resetZoom(); else { zScale = 2.5; applyZoom(true); } e.stopPropagation();
});
document.getElementById('zoomStage').addEventListener('mousedown', e => {
  if (zScale <= 1) return; e.preventDefault();
  zDrag = true; zDragSX = e.clientX; zDragSY = e.clientY; zDragOX = zOffX; zDragOY = zOffY;
  document.getElementById('zoomStage').style.cursor = 'grabbing';
});
document.addEventListener('mousemove', e => {
  if (!zDrag) return;
  zOffX = zDragOX + (e.clientX - zDragSX); zOffY = zDragOY + (e.clientY - zDragSY); applyZoom(false);
});
document.addEventListener('mouseup', () => {
  if (!zDrag) return; zDrag = false;
  document.getElementById('zoomStage').style.cursor = zScale > 1 ? 'grab' : 'zoom-in';
});
document.getElementById('zoomStage').addEventListener('touchstart', e => {
  if (e.touches.length === 2) zTouchD = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
}, { passive: true });
document.getElementById('zoomStage').addEventListener('touchmove', e => {
  if (e.touches.length === 2) {
    const d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
    zScale = Math.max(0.5, Math.min(5, zScale + (d - zTouchD) / 180));
    zTouchD = d; if (zScale <= 1) { zOffX = 0; zOffY = 0; } applyZoom(false); e.preventDefault();
  }
}, { passive: false });

/* ── Teclado ─────────────────────────────────────────────────── */
document.addEventListener('keydown', e => {
  if (document.getElementById('zoomOverlay').classList.contains('zoom-overlay--open')) {
    if (e.key === 'Escape') closeZoom();
    if (e.key === '+' || e.key === '=') zoomStep(0.3);
    if (e.key === '-') zoomStep(-0.3);
    if (e.key === '0') resetZoom();
    return;
  }
  if (document.getElementById('reader').style.display === 'none') return;
  if (document.getElementById('brPageJump').classList.contains('br-page-jump--open')) return;
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextPage();
  if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   prevPage();
  if (e.key === 'Escape') closeBook();
});

/* ── Swipe ───────────────────────────────────────────────────── */
let tSX = 0, tSY = 0;
document.getElementById('reader').addEventListener('touchstart', e => { tSX = e.touches[0].clientX; tSY = e.touches[0].clientY; }, { passive: true });
document.getElementById('reader').addEventListener('touchend', e => {
  if (document.getElementById('zoomOverlay').classList.contains('zoom-overlay--open')) return;
  const dx = e.changedTouches[0].clientX - tSX, dy = e.changedTouches[0].clientY - tSY;
  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) { if (dx < 0) nextPage(); else prevPage(); }
}, { passive: true });

/* ── Resize ──────────────────────────────────────────────────── */
let rT;
window.addEventListener('resize', () => {
  clearTimeout(rT); rT = setTimeout(() => {
    const was = isMobileView; checkMobile();
    if (activeCategory && was !== isMobileView) {
      if (isMobileView) renderMobile(mobilePage);
      else { document.getElementById('pageLeft').style.display = ''; document.getElementById('pageRight').style.width = ''; renderSpread(currentSpread); }
    }
  }, 200);
});

/* ── Retorno ao catálogo (botão X) ───────────────────────────── */
function returnToCatalog() {
  const v      = sessionStorage.getItem('vendedor');
  const vParam = v ? '&vendedor=' + encodeURIComponent(v) : '';
  if (_returnFabricKey) window.location.href = 'index.html?fabric=' + encodeURIComponent(_returnFabricKey) + vParam;
  else window.location.href = 'index.html' + (v ? '?vendedor=' + encodeURIComponent(v) : '');
}

/* ── Dropbox menu ────────────────────────────────────────────── */
function toggleDropboxMenu() {
  const btn    = document.getElementById('blDropboxBtn');
  const menu   = document.getElementById('blDropboxMenu');
  const isOpen = menu.classList.contains('open');
  if (isOpen) { closeDropboxMenu(); } else { menu.classList.add('open'); btn.classList.add('open'); }
}
function closeDropboxMenu() {
  document.getElementById('blDropboxMenu')?.classList.remove('open');
  document.getElementById('blDropboxBtn')?.classList.remove('open');
}

/* ── DOMContentLoaded: URL params + vendedor ─────────────────── */
window.addEventListener('DOMContentLoaded', () => {
  checkMobile();

  const params = new URLSearchParams(location.search);
  const cat    = params.get('category');
  const fabric = params.get('fabric');

  if (fabric) {
    _returnFabricKey = fabric;
    const btn = document.getElementById('btnReturnCatalog');
    if (btn) btn.style.display = 'flex';
  }

  if (cat) openBook(cat, fabric || null);

  /* Fecha dropbox ao clicar fora */
  document.addEventListener('click', e => {
    if (!e.target.closest('#blDropboxWrap')) closeDropboxMenu();
  });
});