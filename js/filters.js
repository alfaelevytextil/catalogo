/* ═══════════════════════════════════════════════════════════════
   FILTROS — js/filters.js
   Sistema de filtros por Segmento e Categoria.
   Depende de: fabrics-data.js (deve ser carregado antes)
   ═══════════════════════════════════════════════════════════════ */

// ── Abre/fecha dropdown de grupo de filtro ────────────────────
function toggleFilterGroup(btn) {
  const group   = btn.closest('.filter-group');
  const wasOpen = group.classList.contains('filter-group--open');
  document.querySelectorAll('.filter-group').forEach(g => g.classList.remove('filter-group--open'));
  if (!wasOpen) group.classList.add('filter-group--open');
}

// Fecha dropdowns ao clicar fora
document.addEventListener('click', e => {
  if (!e.target.closest('.filter-group')) {
    document.querySelectorAll('.filter-group').forEach(g => g.classList.remove('filter-group--open'));
  }
});

// ── Aplica os filtros selecionados ────────────────────────────
function applyFilters() {
  const allChecks = Array.from(
    document.querySelectorAll('#filterBar input[type=checkbox]:checked')
  );

  const segValues = allChecks
    .filter(c => ['Moda Praia','Fitness','Lingerie','Moda Casual','Moda','Forro'].includes(c.value))
    .map(c => c.value);

  const catValues = allChecks
    .filter(c => ['LISOS','TEXTURIZADOS','ESTAMPADOS','TRAMAS'].includes(c.value))
    .map(c => c.value);

  const cards = document.querySelectorAll('.fabric-card[data-key]');

  cards.forEach(card => {
    const key = card.dataset.key;
    const f   = FABRICS[key];
    if (!f) return;

    const tag = f.tag      || '';
    const cat = f.category || '';

    const segMatch = segValues.length === 0 || segValues.some(s => tag.includes(s));
    const catMatch = catValues.length === 0 || catValues.includes(cat);

    card.style.display = (segMatch && catMatch) ? '' : 'none';
  });

  // Mostra/esconde seções de categoria conforme visibilidade
  document.querySelectorAll('.cat-section').forEach(sec => {
    const id   = sec.id; // lisos | texturizados | estampados | tramas
    const wrap = sec.nextElementSibling;
    if (!wrap || !wrap.classList.contains('fabrics-wrap')) return;

    const visible = wrap.querySelectorAll(
      '.fabric-card[data-key]:not([style*="display: none"]):not([style*="display:none"])'
    );
    const shouldHide =
      (catValues.length > 0 && !catValues.map(c => c.toLowerCase()).includes(id)) &&
      visible.length === 0;

    sec.style.display  = shouldHide ? 'none' : '';
    wrap.style.display = visible.length === 0 && allChecks.length > 0 ? 'none' : '';
  });

  // Exibe tags ativas
  const tagsEl = document.getElementById('filterActiveTags');
  tagsEl.innerHTML = allChecks.map(c =>
    `<span class="filter-tag">${c.nextElementSibling.textContent}` +
    `<button onclick="uncheckFilter(this,'${c.value}')">×</button></span>`
  ).join('');

  document.getElementById('btnClearFilters').style.display = allChecks.length ? '' : 'none';
}

// ── Remove um filtro pelo valor ───────────────────────────────
function uncheckFilter(btn, val) {
  const input = document.querySelector(`#filterBar input[value="${val}"]`);
  if (input) { input.checked = false; applyFilters(); }
}

// ── Limpa todos os filtros ────────────────────────────────────
function clearFilters() {
  document.querySelectorAll('#filterBar input[type=checkbox]').forEach(c => c.checked = false);
  applyFilters();
}