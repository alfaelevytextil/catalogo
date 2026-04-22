/* ═══════════════════════════════════════════════════════════════
   VENDEDORES — js/vendedores.js
   Compartilhado entre index.html e book.html.

   Para adicionar/editar vendedores, altere apenas VENDEDORES.
   A chave deve corresponder ao arquivo em /vendedores/CHAVE.html

   Expõe globalmente:
     window.VENDEDOR_ATIVO  → { tel, nome, msg }
     window.buildWppLink(fabricName?) → URL wa.me completa
   ═══════════════════════════════════════════════════════════════ */

const VENDEDORES = {
  vinicius: { nome: 'Vinicius', tel: '5511919050956' },
  mikael:   { nome: 'Mikael',   tel: '5511934527816' },
  ricardo:  { nome: 'Ricardo',  tel: '5511949492913' },
  heitor:   { nome: 'Heitor',   tel: '5511955841996' },
  junior:   { nome: 'Junior',   tel: '5511988245385' },
  giuliano: { nome: 'Giuliano', tel: '5511932124107' },
  mara:     { nome: 'Mara',     tel: '5511914932913' },
};

const WPP_DEFAULT_TEL  = '5511957717470';
const WPP_DEFAULT_NOME = 'Lucas Cardillo';

/* ── Monta URL wa.me personalizada ──────────────────────────────
   fabricName (opcional): inclui o nome do tecido na mensagem.
   ─────────────────────────────────────────────────────────────── */
window.buildWppLink = function(fabricName) {
  const v        = window.VENDEDOR_ATIVO || { tel: WPP_DEFAULT_TEL, nome: WPP_DEFAULT_NOME };
  const saudacao = v.nome ? `Olá%20${encodeURIComponent(v.nome)}!` : 'Olá!';
  const corpo    = fabricName
    ? `%20Tenho%20interesse%20no%20tecido%20${encodeURIComponent(fabricName)}%20da%20Alfa%20%26%20Levy.`
    : `%20Vi%20o%20catálogo%20da%20Alfa%20%26%20Levy%20e%20gostaria%20de%20saber%20mais.`;
  return `https://wa.me/${v.tel}?text=${saudacao}${corpo}`;
};

(function initVendedor() {
  const params = new URLSearchParams(location.search);
  const keyURL = (params.get('vendedor') || '').toLowerCase().trim();

  if (keyURL) sessionStorage.setItem('vendedor', keyURL);

  const key = keyURL || (sessionStorage.getItem('vendedor') || '').toLowerCase().trim();
  const v   = VENDEDORES[key] || { nome: WPP_DEFAULT_NOME, tel: WPP_DEFAULT_TEL };

  /* Expõe para modal.js e book-main.js */
  window.VENDEDOR_ATIVO = {
    tel:  v.tel,
    nome: v.nome,
    msg:  v.nome
      ? `Olá%20${encodeURIComponent(v.nome)}!%20Vi%20o%20catálogo%20da%20Alfa%20%26%20Levy%20e%20gostaria%20de%20saber%20mais.`
      : `Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20tecidos.`,
  };

  const genericLink = `https://wa.me/${v.tel}?text=${window.VENDEDOR_ATIVO.msg}`;

  /* Atualiza todos os links wa.me estáticos */
  document.querySelectorAll('a[href*="wa.me"]').forEach(a => {
    a.href = genericLink;
  });

  /* Botão flutuante */
  const floatBtn = document.getElementById('wppFloat');
  if (floatBtn) floatBtn.href = genericLink;

  /* Propaga ?vendedor= para book.html */
  if (key) {
    document.querySelectorAll('a[href*="book.html"]').forEach(a => {
      try { const u = new URL(a.href, location.href); u.searchParams.set('vendedor', key); a.href = u.toString(); } catch (e) {}
    });
  }

  /* Propaga ?vendedor= para index.html */
  if (key) {
    document.querySelectorAll('a[href*="index.html"]').forEach(a => {
      try { const u = new URL(a.href, location.href); u.searchParams.set('vendedor', key); a.href = u.toString(); } catch (e) {}
    });
  }
})();