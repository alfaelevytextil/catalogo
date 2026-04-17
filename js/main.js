/* ═══════════════════════════════════════════════════════════════
   MAIN — js/main.js
   Inicialização geral: scroll reveal + abertura via URL ?fabric=
   Depende de: fabrics-data.js e modal.js (carregados antes)
   ═══════════════════════════════════════════════════════════════ */

// ── Scroll reveal ─────────────────────────────────────────────
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) en.target.classList.add('visible');
  });
}, { threshold: 0.07 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Abre tecido automaticamente via URL ?fabric=CHAVE ─────────
window.addEventListener('DOMContentLoaded', () => {
  const params     = new URLSearchParams(location.search);
  const fabricKey  = params.get('fabric');
  if (fabricKey && FABRICS[fabricKey]) {
    setTimeout(() => openFabric(fabricKey), 300);
  }
});