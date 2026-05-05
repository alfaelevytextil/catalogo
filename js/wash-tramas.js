/* ═══════════════════════════════════════════════════════════════
   WASH TRAMAS — js/wash-tramas.js
   Configurações de lavagem específicas para tecidos da categoria TRAMAS.
   ═══════════════════════════════════════════════════════════════ */

const WASH_TRAMAS = {
  MACRAME:        [...WASH_DEFAULT],
  MACRAME_PALMER: [
    {img:'images/lavagem/MAX-40.jpg',                label:'LAVAR EM TEMPERATURA MÁX. 40°C, NORMAL'},
    {img:'images/lavagem/NAO-ALVEJAR-BRANQUEAR.jpg', label:'NÃO ALVEJAR, NÃO BRANQUEAR'},
    {img:'images/lavagem/NAO-LAVAR-SECO.jpg',        label:'NÃO LAVAR A SECO'},
    {img:'images/lavagem/NAO-SECAR-SECADORA.jpg',    label:'NÃO SECAR EM MÁQUINA SECADORA'},
    {img:'images/lavagem/PASSAR-MAX-100.jpg',        label:'PASSAR EM TEMPERATURA MÁX. 100°C'},
    {img:'images/lavagem/SECAR-HORIZONTAL.jpg',      label:'SECAR NA HORIZONTAL'},
    {img:'images/lavagem/NAO-LIMPAR-UMIDO.jpg',      label:'NÃO LIMPAR A ÚMIDO'},
  ],
};
