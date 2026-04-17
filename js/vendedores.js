/* ═══════════════════════════════════════════════════════════════
   VENDEDORES — js/vendedores.js
   Sistema de links personalizados por vendedor via ?vendedor=CHAVE
   
   Para adicionar/editar vendedores, altere apenas o objeto VENDEDORES.
   A chave deve corresponder ao arquivo em /vendedores/CHAVE.html
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

(function initVendedor() {
  const params  = new URLSearchParams(location.search);
  const keyURL  = (params.get('vendedor') || '').toLowerCase().trim();

  if (keyURL) sessionStorage.setItem('vendedor', keyURL);

  const key = keyURL || (sessionStorage.getItem('vendedor') || '').toLowerCase().trim();
  const v   = VENDEDORES[key] || { nome: WPP_DEFAULT_NOME, tel: WPP_DEFAULT_TEL };

  const msg = v.nome
    ? `Olá%20${encodeURIComponent(v.nome)}!%20Vi%20o%20catálogo%20da%20Alfa%20%26%20Levy%20e%20gostaria%20de%20saber%20mais.`
    : `Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20os%20tecidos.`;

  // Atualiza todos os links wa.me da página
  document.querySelectorAll('a[href*="wa.me"]').forEach(a => {
    a.href = `https://wa.me/${v.tel}?text=${msg}`;
  });

  // Botão flutuante
  const floatBtn = document.getElementById('wppFloat');
  if (floatBtn) floatBtn.href = `https://wa.me/${v.tel}?text=${msg}`;

  // Propaga ?vendedor= nos links para book.html
  if (key) {
    document.querySelectorAll('a[href*="book.html"]').forEach(a => {
      try {
        const u = new URL(a.href, location.href);
        u.searchParams.set('vendedor', key);
        a.href = u.toString();
      } catch (e) { /* ignora URLs inválidas */ }
    });
  }
})();