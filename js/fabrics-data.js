/* ═══════════════════════════════════════════════════════════════
   FABRICS DATA — js/fabrics-data.js
   Adicione novos tecidos aqui. Não mexa nos outros arquivos JS.

   Estrutura de cada tecido:
   CHAVE: {
     name        : 'Nome Exibido',
     category    : 'LISOS' | 'TEXTURIZADOS' | 'TRAMAS' | 'ESTAMPADOS',
     tag         : 'Segmento · Segmento',
     desc        : 'Descrição completa do tecido.',
     pages       : <número total de imagens incluindo a capa>,
     colorsTitle : 'Cores Disponíveis' | 'Variações' | 'Cores',
     largura     : '1,60m',       // opcional
     rendimento  : '2,40m/kg',    // opcional
     gramatura   : '240g',        // opcional
     composicao  : '97% Poliamida, 3% Elastano', // opcional
     attributes  : ['01.FITNESS.jpg', '14.BRILHANTE.jpg', ...], // opcional
     bookUrl     : 'book.html?fabric=CHAVE', // opcional
   }
   ═══════════════════════════════════════════════════════════════ */

const FABRICS = {

  // ── LISOS ────────────────────────────────────────────────────
  LIRUS: {
    name: 'Lirus', category: 'LISOS', tag: 'Fitness · Moda Casual',
    desc: 'Em poliamida opaca com elastano, a malha LIRUS possui visual com efeito furadinho. Leveza, fluidez e toque macio, possui ótima respirabilidade, garantindo conforto ao usuário durante a realização da atividade física. Idealizada para peças de performance: t-shirts, regatas ou recortes estratégicos.',
    pages: 11, colorsTitle: 'Cores Disponíveis',
    largura: '1,62m', rendimento: '4,57m/kg', gramatura: '135g', composicao: '91% Poliamida, 9% Elastano',
    attributes: ['01.FITNESS.jpg','05.TOQUE-MACIO.jpg','11.RESPIRABILIDADE.jpg','13.ELASTICIDADE1.jpg'],
    bookUrl: 'book.html?fabric=LIRUS',
  },
  NEW_TRIP: {
    name: 'New Trip', category: 'LISOS', tag: 'Fitness · Moda Casual',
    desc: 'Parceiro ideal para todos os esportes, o artigo confere textura suave e foi desenvolvido com a microfibra de poliamida juntamente com um fio ultrafino, que é responsável pela formação dos microporos. Tem excelente respirabilidade que ajuda na evaporação natural da transpiração, deixando a pele seca e fresca durante os exercícios. É um artigo de rápida secagem e perfeito para a confecção de regatas e camisetas soltinhas, principalmente para os exercícios aeróbicos e de corridas.',
    pages: 50, colorsTitle: 'Cores Disponíveis',
    largura: '1,53m', rendimento: '4,84m/kg', gramatura: '135g/m²', composicao: '92% Poliamida, 8% Elastano',
    attributes: ['01.FITNESS.jpg','20.CAIMENTO.jpg','23.ALTO-RENDIMENTO.jpg','12.CONFORTO-TERMICO.jpg','06.SOLAR.jpg','11.RESPIRABILIDADE.jpg'],
    bookUrl: 'book.html?fabric=NEW_TRIP',
  },

  // ── TRAMAS ───────────────────────────────────────────────────
  MACRAME_PALMER: {
    name: 'Macramê Franja Palmer', category: 'TRAMAS', tag: 'Moda Praia · Moda Casual',
    desc: 'Textura de tramas abertas inspirada na técnica artesanal do macramê. Visual rústico e sofisticado para peças com personalidade.',
    pages: 5, colorsTitle: 'Variações',
    largura: '1,40m', rendimento: '3,86m', gramatura: '185g/m²', composicao: '96% Poliamida, 4% Elastano',
    attributes: ['02.PRAIA2.jpg','04.MODA.jpg','05.TOQUE-MACIO.jpg','13.ELASTICIDADE1.jpg'],
    bookUrl: 'book.html?fabric=MACRAME_PALMER',
  },
  MACRAME: {
    name: 'Macramê', category: 'TRAMAS', tag: 'Moda Praia · Moda',
    desc: 'Textura artesanal com nós e vazados característicos do macramê. Peças com personalidade e estilo único.',
    pages: 3, colorsTitle: 'Variações',
  },

  // ── TEXTURIZADOS ─────────────────────────────────────────────
  ANARRUGA_BRILHANTE: {
    name: 'Anarruga Brilhante', category: 'TEXTURIZADOS', tag: 'Moda Praia · Lingerie',
    desc: 'Textura anarrugada com acabamento brilhante e sofisticado. Excelente para saídas de praia e peças de destaque.',
    pages: 12, colorsTitle: 'Cores Disponíveis',
    largura: '', rendimento: '1,5m por metro', gramatura: '220g/m²', composicao: '80% Poliamida, 20% Elastano',
    attributes: ['01.FITNESS.jpg','10.LINGERIE.jpg','14.BRILHANTE.jpg','16.COMPRESSAO.jpg','12.COMFORTO_TERMICO.jpg'],
    bookUrl: 'book.html?fabric=ANARRUGA_BRILHANTE',
  },
  ANARRUGA_PRAIA: {
    name: 'Anarruga Praia', category: 'TEXTURIZADOS', tag: 'Moda Praia',
    desc: 'Leveza e frescor com textura anarrugada especial para coleções praia. Toque agradável e secagem rápida.',
    pages: 26, colorsTitle: 'Cores Disponíveis',
  },
  AREZZO: {
    name: 'Arezzo', category: 'TEXTURIZADOS', tag: 'Moda Praia · Moda Casual',
    desc: 'A malha Arezzo traz um design exclusivo, inspirado nas artes geométricas, com quadriculados em alto relevo que criam um visual bicolor cheio de charme, sofisticação e personalidade. Confeccionada em poliamida opaca e poliéster com elastano, oferece um toque extremamente macio, conforto duradouro e elasticidade na medida certa. Sua estrutura é perfeita tanto para a moda praia quanto para composições casuais cheias de personalidade. Disponível na versão tingida em diversas combinações de cores. FPU 50+ vitalício devido ao fio de poliamida ser enriquecido com dióxido de titânio em sua massa.',
    pages: 6, colorsTitle: 'Cores Disponíveis',
    largura: '', rendimento: '2,07m por metro', gramatura: '345g | 140m', composicao: '50% Poliamida, 40% Poliéster, 10% Elastano',
    attributes: ['02.PRAIA2.jpg','04.MODA.jpg','05.TOQUE-MACIO.jpg','13.ELASTICIDADE1.jpg'],
    bookUrl: 'book.html?fabric=AREZZO',
  },
  BOUCLE: {
    name: 'Bouclê', category: 'TEXTURIZADOS', tag: 'Moda · Moda Praia',
    desc: 'Textura bouclê clássica com laçinhos característicos. Tecido nobre para peças com personalidade e sofisticação.',
    pages: 7, colorsTitle: 'Cores Disponíveis',
  },
  BOUCLE_NERVUS: {
    name: 'Bouclê Nervus', category: 'TEXTURIZADOS', tag: 'Moda · Moda Praia',
    desc: 'Textura bouclê com nervuras em relevo. Visual moderno e sofisticado para suas coleções.',
    pages: 3, colorsTitle: 'Variações',
  },
  BOUCLE_PETALAS: {
    name: 'Bouclê Pétalas', category: 'TEXTURIZADOS', tag: 'Moda · Moda Praia',
    desc: 'Variação exclusiva do bouclê com relevo em formato de pétalas. Exclusividade e charme para sua coleção.',
    pages: 3, colorsTitle: 'Variações',
  },
  CANCUN: {
    name: 'Cancún', category: 'TEXTURIZADOS', tag: 'Moda Praia · Moda Casual',
    desc: 'Textura leve e fluida com toque macio. Ideal para peças com caimento suave e conforto excepcional.',
    pages: 8, colorsTitle: 'Cores Disponíveis',
  },
  CANELADO_BLACKOUT: {
    name: 'Canelado Blackout', category: 'TEXTURIZADOS', tag: 'Moda Praia · Moda',
    desc: 'Textura canelada com efeito blackout. Ideal para peças de moda praia e casual com estilo e personalidade.',
    pages: 8, colorsTitle: 'Cores Disponíveis',
  },
  CANELADO_DE_COMPRESSAO: {
    name: 'Canelado Compressão', category: 'TEXTURIZADOS', tag: 'Fitness · Moda Praia',
    desc: 'Produzida em poliamida brilhante com elastano, a malha Canelado de Compressão® se destaca pelo seu mini canelado com toque extremamente sedoso, entregando um visual elegante e sofisticado. Com gramatura média, oferece boa compressão e excelente cobertura, garantindo segurança e conforto mesmo durante a prática de atividades físicas. É a escolha ideal para leggings, tops e também para peças da linha praia, unindo performance, estilo e versatilidade em uma única base. FPU 50+ vitalício devido ao fio de poliamida ser enriquecido com dióxido de titânio em sua massa.',
    pages: 50, colorsTitle: 'Cores Disponíveis',
    largura: '1,25m', rendimento: '2,76m/kg', gramatura: '290g', composicao: '73,88% Poliamida, 26,12% Elastano',
    attributes: ['01.FITNESS.jpg','02.PRAIA2.jpg','14.BRILHANTE.jpg','16.COMPRESSAO.jpg','06.SOLAR.jpg'],
    bookUrl: 'book.html?fabric=CANELADO_DE_COMPRESSAO',
  },
  CANELADO_DIAGONAL: {
    name: 'Canelado Diagonal', category: 'TEXTURIZADOS', tag: 'Moda Praia · Moda',
    desc: 'Textura canelada diagonal com toque macio e visual moderno. Ideal para peças de moda praia e casual com estilo e personalidade.',
    pages: 5, colorsTitle: 'Variações',
  },
  CANELADO_EDEN: {
    name: 'Canelado Eden', category: 'TEXTURIZADOS', tag: 'Moda Praia · Fitness',
    desc: 'Textura em poliamida brilhante de efeito canelado. Estruturado e confortável, pode ser aplicado desde modelagens básicas de moda praia até peças de média compressão. A boa elasticidade e cobertura permitem sua aplicação também no segmento de fitness. O efeito brilhante intensifica a tonalidade das cores, dos mais claros aos mais escuros.',
    pages: 37, colorsTitle: 'Cores Disponíveis',
    largura: '', rendimento: '2,78m/kg', gramatura: '240g/m²', composicao: '87% Poliamida, 13% Elastano',
    attributes: ['01.FITNESS.jpg','02.PRAIA2.jpg','14.BRILHANTE.jpg','13.ELASTICIDADE1.jpg','15.KETTENSPORT.jpg','06.TOQUE-GELADO.jpg'],
    bookUrl: 'book.html?fabric=CANELADO_EDEN',
  },
  CANELADO_FUJI: {
    name: 'Canelado Fuji', category: 'TEXTURIZADOS', tag: 'Moda Praia',
    desc: 'Em poliamida com elastano, o canelado FUJI possui textura em relevo fio brilhante e fundo opaco, com toque extremamente sedoso e aparência sofisticada. Com gramatura média, possui elasticidade acertada para peças da moda praia. O distanciamento das canaletas é perfeito para ocupar pequenos espaços em pequenas modelagens. FPU 50+ vitalício.',
    pages: 40, colorsTitle: 'Cores Disponíveis',
    largura: '', rendimento: '2,74m/kg', gramatura: '260g | 1,04m', composicao: '91% Poliamida, 9% Elastano',
    attributes: ['02.PRAIA2.jpg','14.BRILHANTE.jpg','13.ELASTICIDADE1.jpg','06.SOLAR.jpg'],
    bookUrl: 'book.html?fabric=CANELADO_FUJI',
  },
  CANELADO_LENATEX: {
    name: 'Canelado Lenatex', category: 'TEXTURIZADOS', tag: 'Lingerie · Moda',
    desc: 'Acabamento delicado com textura canelada fina. Leveza e conforto incomparáveis para lingerie premium.',
    pages: 4, colorsTitle: 'Variações',
  },
  CANELADO_PILLE: {
    name: 'Canelado Pille', category: 'TEXTURIZADOS', tag: 'Fitness · Esportivo',
    desc: 'Em poliamida opaca com elastano, a malha dupla PILLE possui textura de canelado extremamente macio e sofisticado. Possui avesso diferenciado, com fio preto tinto em massa numa estrutura que trabalha em favor da boa cobertura e evita a transparência do produto durante a atividade física. Com gramatura alta, é ideal para peças de performance com compressão. Pode ser também utilizado na moda praia. FPU 50+ vitalício.',
    pages: 14, colorsTitle: 'Cores Disponíveis',
    largura: '', rendimento: '1,78m/kg', gramatura: '350g | 1,6m', composicao: '90,59% Poliamida, 9,41% Elastano',
    attributes: ['01.FITNESS.jpg','25.ESPORTIVO.jpg','19.ALTA-COBERTURA.jpg','06.SOLAR.jpg'],
    bookUrl: 'book.html?fabric=CANELADO_PILLE',
  },
  CANELADO_POLIESTER: {
    name: 'Canelado Poliéster', category: 'TEXTURIZADOS', tag: 'Fitness · Esportivo',
    desc: 'Textura marcante e toque suave. Ótima elasticidade e durabilidade para peças fitness de alto desempenho.',
    pages: 19, colorsTitle: 'Cores Disponíveis',
    largura: '1,6m', rendimento: '1,78m/kg', gramatura: '350g', composicao: '90,59% Poliamida, 9,41% Elastano',
    attributes: ['01.FITNESS.jpg','25.ESPORTIVO.jpg','19.ALTA-COBERTURA.jpg','06.SOLAR.jpg'],
    bookUrl: 'book.html?fabric=CANELADO_POLIESTER',
  },
  CANELADO_POWER: {
    name: 'Canelado Power', category: 'TEXTURIZADOS', tag: 'Fitness · Lingerie',
    desc: 'Textura canelada com toque firme e compressão moderada. Ideal para peças que exigem suporte e conforto durante o movimento.',
    pages: 12, colorsTitle: 'Cores Disponíveis',
  },
  CANELADO_TREND_MOVE: {
    name: 'Canelado Trend Move', category: 'TEXTURIZADOS', tag: 'Fitness · Moda Praia',
    desc: 'Textura em poliamida de efeito canelado, aspecto natural opaco, estruturada e confortável. Pode ser aplicado desde modelagens básicas de moda praia até peças de média compressão. A boa elasticidade também permite sua aplicação no segmento de fitness.',
    pages: 6, colorsTitle: 'Cores Disponíveis',
    largura: '', rendimento: '2,69m/kg', gramatura: '260g/m²', composicao: '90,7% Poliamida, 9,3% Elastano',
    attributes: ['01.FITNESS.jpg','02.PRAIA2.jpg','13.ELASTICIDADE1.jpg','12.CONFORTO-TERMICO.jpg','05.TOQUE-MACIO.jpg'],
    bookUrl: 'book.html?fabric=CANELADO_TREND_MOVE',
  },
  CANELADO_WONDER: {
    name: 'Canelado Wonder', category: 'TEXTURIZADOS', tag: 'Fitness · Lingerie',
    desc: 'Estilo e performance, onde o artigo apresenta ótima elasticidade assertivo para valorizar a silhueta com conforto. Desenvolvido com a tecnologia Lycra® Xtra-life que garante maior durabilidade das peças e maior resistência a danos causados pelo cloro, suor, protetores solares, cremes e óleos corporais.',
    pages: 17, colorsTitle: 'Cores Disponíveis',
    largura: '', rendimento: '2,75m/kg', gramatura: '280g/m²', composicao: '76,8% Poliamida, 23,2% Elastano',
    attributes: ['01.FITNESS.jpg','10.LINGERIE.jpg','14.BRILHANTE.jpg','16.COMPRESSAO.jpg','12.CONFORTO-TERMICO.jpg'],
    bookUrl: 'book.html?fabric=CANELADO_WONDER',
  },
  CARMEL: {
    name: 'Carmel', category: 'TEXTURIZADOS', tag: 'Fitness · Moda Praia · Moda Casual',
    desc: 'Tecido de aspecto sensorial creponado, reúne as seguintes características técnicas da malharia: Double-face, pode ser usado em ambas as superfícies; Construção discretamente aerada, ajuda na passagem do ar; Caimento para peças que buscam bem-estar e relaxamento.',
    pages: 27, colorsTitle: 'Cores Disponíveis',
    largura: '', rendimento: '3,69m/kg', gramatura: '175g/m²', composicao: '87% Poliamida, 13% Elastano',
    attributes: ['01.FITNESS.jpg','02.PRAIA2.jpg','04.MODA.jpg','20.CAIMENTO.jpg','12.CONFORTO-TERMICO.jpg','11.RESPIRABILIDADE.jpg'],
    bookUrl: 'book.html?fabric=CARMEL',
  },
  CREPINHO: {
    name: 'Crepinho', category: 'TEXTURIZADOS', tag: 'Moda · Moda Praia',
    desc: 'Leveza e fluidez incomparáveis para peças com acabamento delicado e elegante.',
    pages: 23, colorsTitle: 'Cores Disponíveis',
  },
  CREPONADO: {
    name: 'Creponado', category: 'TEXTURIZADOS', tag: 'Moda Praia',
    desc: 'Superfície texturizada e leve para saídas de praia com estilo e personalidade.',
    pages: 10, colorsTitle: 'Cores Disponíveis',
  },
  CROCHE_SANTORINI: {
    name: 'Crochê Santorini', category: 'TEXTURIZADOS', tag: 'Moda Praia · Moda',
    desc: 'Inspiração mediterrânea com textura crochê única. Sofisticação e leveza para coleções verão.',
    pages: 9, colorsTitle: 'Cores Disponíveis',
  },
  CROCHETE: {
    name: 'Crochete', category: 'TEXTURIZADOS', tag: 'Moda Praia · Fitness · Casual',
    desc: 'Com estrutura dupla e alta gramatura, a malha CROCHETE possui textura inspirada nos produtos artesanais, com aparência rústica e efeito de crochê produzido à mão. Em poliamida opaca com elastano, confere ao usuário conforto e muita maciez. Ideal para peças da moda praia, pode ser utilizado no segmento Fitness e em peças de moda casual.',
    pages: 5, colorsTitle: 'Variações',
    largura: '1,32m', rendimento: '1,68m/kg', gramatura: '450g', composicao: '80% Poliamida, 20% Elastano',
    attributes: ['01.FITNESS.jpg','02.PRAIA2.jpg','04.MODA.jpg','19.ALTA-COBERTURA.jpg','05.TOQUE-MACIO.jpg','06.SOLAR.jpg'],
  },
  CRUNCH_LISTRADO: {
    name: 'Crunch Listrado', category: 'TEXTURIZADOS', tag: 'Moda Praia · Moda Casual',
    desc: 'Com estrutura dupla e aparência crepada, a malha CRUNCH LISTRADO combina o design clássico de listras com uma textura única, adicionando um toque exclusivo e sofisticado. Confeccionada em poliamida opaca com elastano, proporciona conforto, maciez e excelente cobertura. Perfeita para a moda praia, também é uma escolha versátil para compor looks sofisticados e modernos na moda casual. FPU 50+ vitalício.',
    pages: 8, colorsTitle: 'Cores Disponíveis',
    largura: '1,50m', rendimento: '1,90m/KG', gramatura: '350g', composicao: '92% Poliamida, 8% Elastano',
    attributes: ['02.PRAIA2.jpg','04.MODA.jpg','13.ELASTICIDADE1.jpg','06.SOLAR.jpg'],
    bookUrl: 'book.html?fabric=CRUNCH_LISTRADO',
  },
  CRUNCH_POA: {
    name: 'Crunch Poá', category: 'TEXTURIZADOS', tag: 'Moda Praia · Moda Casual',
    desc: 'Com estrutura dupla e aparência crepada, a malha CRUNCH POÁ combina o design clássico de bolinhas com uma textura única, adicionando um toque exclusivo e sofisticado. Confeccionada em poliamida opaca com elastano, proporciona conforto, maciez e excelente cobertura. Perfeita para a moda praia. FPU 50+ vitalício.',
    pages: 5, colorsTitle: 'Variações',
    largura: '1,50m', rendimento: '2,02m/kg', gramatura: '330g', composicao: '91% Poliamida, 9% Elastano',
    attributes: ['02.PRAIA2.jpg','04.MODA.jpg','13.ELASTICIDADE1.jpg','06.SOLAR.jpg'],
    bookUrl: 'book.html?fabric=CRUNCH_POA',
  },
  DIAMOND: {
    name: 'Diamond', category: 'TEXTURIZADOS', tag: 'Fitness · Lingerie',
    desc: 'Toque acetinado e brilho sutil. Acabamento liso de alta qualidade para peças sofisticadas.',
    pages: 2, colorsTitle: 'Variações',
  },
  DOTS: {
    name: 'Dots', category: 'TEXTURIZADOS', tag: 'Moda Praia · Moda Casual',
    desc: 'Textura de bolinhas em relevo para um visual divertido e moderno. Ideal para peças de moda praia e casual com estilo e personalidade.',
    pages: 31, colorsTitle: 'Cores Disponíveis',
  },
  JACQUARD_BROCADO: {
    name: 'Jacquard Brocado', category: 'TEXTURIZADOS', tag: 'Moda Praia · Moda',
    desc: 'A malha JACQUARD BROCADO possui textura trabalhada com retenção e bastante volume, enriquecendo e agregando valor às peças, mesmo quando em modelagens básicas. Em poliamida opaca com elastano, é comercialmente usada com o lado avesso para fora. Versátil, possui elasticidade e compressão ajustadas. FPU 50+ vitalício.',
    pages: 18, colorsTitle: 'Cores Disponíveis',
    largura: '1,5m', rendimento: '2,64m/kg', gramatura: '330g', composicao: '80% Poliamida, 20% Elastano',
    attributes: ['01.FITNESS.jpg','02.PRAIA2.jpg','04.MODA.jpg','16.COMPRESSAO.jpg','06.SOLAR.jpg'],
    bookUrl: 'book.html?fabric=JACQUARD_BROCADO',
  },
  JACQUARD_CONCHAS: {
    name: 'Jacquard Conchas', category: 'TEXTURIZADOS', tag: 'Moda Praia · Moda',
    desc: 'Motivo de conchas tecido em jacquard. Inspiração marinha com acabamento sofisticado.',
    pages: 5, colorsTitle: 'Variações',
  },
  JACQUARD_CONCHINHAS: {
    name: 'Jacquard Conchinhas', category: 'TEXTURIZADOS', tag: 'Moda Praia',
    desc: 'Produto elastizado com motivo de CONCHAS em poliamida brilhante e fundo opaco, possui toque extremamente sedoso e aparência sofisticada. Chique e clássico, foi idealizado para peças da moda praia, com elasticidade confortável e arte em tamanho ideal para preencher pequenas áreas. FPU 50+ vitalício.',
    pages: 8, colorsTitle: 'Variações',
    largura: '1,6m', rendimento: '2,01m/kg', gramatura: '310g', composicao: '93,27% Poliamida, 6,73% Elastano',
    attributes: ['02.PRAIA2.jpg','14.BRILHANTE.jpg','13.ELASTICIDADE1.JPG','06.SOLAR.jpg'],
    bookUrl: 'book.html?fabric=JACQUARD_CONCHINHAS',
  },
  JACQUARD_DEGRADE: {
    name: 'Jacquard Degradê', category: 'TEXTURIZADOS', tag: 'Moda Praia · Moda',
    desc: 'Trama jacquard com efeito degradê exclusivo. Tecido nobre para coleções diferenciadas.',
    pages: 13, colorsTitle: 'Cores Disponíveis',
  },
  JACQUARD_GITA: {
    name: 'Jacquard Gita', category: 'TEXTURIZADOS', tag: 'Moda Praia · Moda',
    desc: 'Trama jacquard com padrão exclusivo inspirado em motivos esportivos. Ideal para coleções fitness com estilo.',
    pages: 3, colorsTitle: 'Variações',
  },
  JACQUARD_KASHIMIR: {
    name: 'Jacquard Kashimir', category: 'TEXTURIZADOS', tag: 'Moda Praia',
    desc: 'Desenvolvida em jacquard eletrônico, a malha KASHIMIR apresenta um design inspirado em culturas ancestrais. Os padrões étnicos se unem à elegância do clássico cashmere, resultando em peças que combinam autenticidade, sofisticação e um charme atemporal. Em poliamida opaca elastizada, oferece conforto e maciez excepcionais. FPU 50+ vitalício.',
    pages: 2, colorsTitle: 'Variações',
    largura: '1,5m', rendimento: '2,15m/kg', gramatura: '310g', composicao: '89% Poliamida, 11% Elastano',
    attributes: ['02.PRAIA2.jpg','13.ELASTICIDADE1.jpg','06.SOLAR.jpg'],
    bookUrl: 'book.html?fabric=JACQUARD_KASHIMIR',
  },
  JACQUARD_LEAF: {
    name: 'Jacquard Leaf', category: 'TEXTURIZADOS', tag: 'Moda Praia',
    desc: 'Produto elastizado com motivo de FOLHAGEM em poliamida fio brilhante e opaco, possui toque extremamente sedoso e aparência sofisticada. Chique e clássico, foi idealizado para peças fitness ou moda praia, com elasticidade ajustada. FPU 50+ vitalício.',
    pages: 4, colorsTitle: 'Variações',
    largura: '1,62m', rendimento: '2,13m/kg', gramatura: '290g', composicao: '83,45% Poliamida, 16,55% Elastano',
    attributes: ['02.PRAIA2.jpg','05.TOQUE-MACIO.jpg','13.ELASTICIDADE1.JPG','06.SOLAR.jpg'],
    bookUrl: 'book.html?fabric=JACQUARD_LEAF',
  },
  JACQUARD_LINES: {
    name: 'Jacquard Lines', category: 'TEXTURIZADOS', tag: 'Moda Praia · Fitness · Moda Casual',
    desc: 'Malha jacquard trabalhada com retenções em forma de linhas ondulares com TEXTURA e VOLUME 3D. Em poliamida opaca com elastano, possui compressão ajustada e alto conforto. FPU 50+ vitalício.',
    pages: 2, colorsTitle: 'Variações',
    largura: '1,25m', rendimento: '2,5m/KG', gramatura: '320g', composicao: '82,11% Poliamida, 17,89% Elastano',
    attributes: ['02.PRAIA2.jpg','01.FITNESS.jpg','04.MODA.jpg','16.COMPRESSAO.jpg','06.SOLAR.jpg'],
    bookUrl: 'book.html?fabric=JACQUARD_LINES',
  },
  JACQUARD_NILO: {
    name: 'Jacquard Nilo', category: 'TEXTURIZADOS', tag: 'Moda Praia · Moda Casual · Fitness',
    desc: 'Com estrutura dupla e alta gramatura, a malha JACQUARD NILO possui textura inspirada nos produtos artesanais, com aparência listrada e efeito de crochê rendado produzido à mão. Em poliamida opaca com elastano, confere ao usuário conforto, muita maciez e excelente cobertura. Possui proteção solar vitalícia.',
    pages: 2, colorsTitle: 'Variações',
    largura: '1,30m', rendimento: '1,92m/kg', gramatura: '400g', composicao: '90% Poliamida, 10% Elastano',
    attributes: ['01.FITNESS.jpg','02.PRAIA2.jpg','04.MODA.jpg','05.TOQUE-MACIO.jpg','06.SOLAR.jpg'],
    bookUrl: 'book.html?fabric=JACQUARD_NILO',
  },
  JACQUARD_ONCA: {
    name: 'Jacquard Onça', category: 'TEXTURIZADOS', tag: 'Moda Praia · Moda Casual',
    desc: 'Trama jacquard com padrão exclusivo em estampa de onça. Ideal para coleções com estilo e personalidade.',
    pages: 13, colorsTitle: 'Cores',
  },
  JACQUARD_PIQUET: {
    name: 'Jacquard Piquet', category: 'TEXTURIZADOS', tag: 'Moda Praia · Moda Casual',
    desc: 'Trama jacquard com padrão exclusivo em textura piquet. Ideal para coleções fitness com estilo.',
    pages: 3, colorsTitle: 'Variações',
  },
  JACQUARD_WINNER: {
    name: 'Jacquard Winner', category: 'TEXTURIZADOS', tag: 'Fitness',
    desc: 'Com visual brilhante e toque macio, Jacquard Winner combina compressão e elasticidade equilibradas. Possui a tecnologia Ketten Sport, sendo indesmalhável, altamente resistente e com excelente estabilidade dimensional. Proporciona sofisticação e forte impacto visual às peças de fitness.',
    pages: 6, colorsTitle: 'Variações',
    largura: '', rendimento: '2,43m/kg', gramatura: '260g/m²', composicao: '75% Poliamida, 25% Elastano',
    attributes: ['01.FITNESS.jpg','14.BRILHANTE.jpg','16.COMPRESSAO.jpg','15.KETTENSPORT.jpg','05.TOQUE-MACIO.jpg'],
    bookUrl: 'book.html?fabric=JACQUARD_WINNER',
  },
  JACQUARD_YAHALOM: {
    name: 'Jacquard Yahalom', category: 'TEXTURIZADOS', tag: 'Moda Praia · Moda',
    desc: 'Trama jacquard com padrão exclusivo. Ideal para coleções com estilo e personalidade.',
    pages: 4, colorsTitle: 'Variações',
  },
  JACQUARD_ZIGZAG_PUZZLE: {
    name: 'Jacquard Zigzag-Puzzle', category: 'TEXTURIZADOS', tag: 'Moda Praia · Moda Casual',
    desc: 'Trama jacquard com padrão em zigzag e puzzle. Ideal para coleções com estilo e personalidade.',
    pages: 4, colorsTitle: 'Variações',
  },
  LASTEX_GLOSS: {
    name: 'Lastex Gloss', category: 'TEXTURIZADOS', tag: 'Moda Praia · Moda Casual',
    desc: 'Textura lastex com acabamento glossy. Brilho intenso e toque macio para peças de destaque.',
    pages: 5, colorsTitle: 'Variações',
  },
  LASTEX_LIGHT: {
    name: 'Lastex Light', category: 'TEXTURIZADOS', tag: 'Moda Praia · Moda Casual',
    desc: 'Textura lastex leve com toque suave. Conforto e estilo para peças casuais e de praia.',
    pages: 13, colorsTitle: 'Cores',
  },
  LIS: {
    name: 'LIS', category: 'TEXTURIZADOS', tag: 'Moda Praia · Fitness · Lingerie',
    desc: 'A malha Jacquard Lis traz um design exclusivo inspirado nas artes dos azulejos clássicos e na icônica Flor de Lis, símbolo de nobreza e sofisticação. O relevo bicolor dá um charme único, com um toque artístico e refinado. Feita em poliamida opaca com elastano, oferece conforto extremo e maciez incomparável. FPU 50+ vitalício.',
    pages: 7, colorsTitle: 'Cores Disponíveis',
    largura: '1,35m', rendimento: '1,68m/kg', gramatura: '440g', composicao: '89% Poliamida, 11% Elastano',
    attributes: ['02.PRAIA2.jpg','04.MODA.jpg','06.SOLAR.jpg','05.TOQUE-MACIO.jpg'],
    bookUrl: 'book.html?fabric=LIS',
  },
  LUREX_3_DOURADO: {
    name: 'Lurex 3 Dourado', category: 'TEXTURIZADOS', tag: 'Moda Praia · Moda',
    desc: 'Textura com fios de lurex dourados que conferem brilho e sofisticação. Ideal para peças de destaque e coleções especiais.',
    pages: 6, colorsTitle: 'Variações',
  },
  LUREX_3_PRATA: {
    name: 'Lurex 3 Prata', category: 'TEXTURIZADOS', tag: 'Moda Praia · Moda Casual',
    desc: 'Com brilho exuberante e sofisticado, a malha LUREX PRATA possui construção dupla, onde o fio de lurex está incorporado ao lado externo e não no avesso, garantindo assim um toque sedoso à pele, sem nenhum desconforto. Com lurex e gramatura mediana, possui elasticidade e estrutura acertados para peças da moda praia ou casual. FPU 50+ vitalício.',
    pages: 29, colorsTitle: 'Cores',
    largura: '1,4m', rendimento: '2,70m/kg', gramatura: '265g', composicao: '90% Poliamida, Poliéster 5,17%, 4,8% Elastano',
    attributes: ['02.PRAIA2.jpg','04.MODA.jpg','14.BRILHANTE.jpg','13.ELASTICIDADE1.jpg'],
    bookUrl: 'book.html?fabric=LUREX_3_PRATA',
  },
  LUREX_4_E_OUTROS: {
    name: 'Lurex 4 e Outros', category: 'TEXTURIZADOS', tag: 'Moda Praia · Moda',
    desc: 'Textura com fios de lurex que conferem brilho e sofisticação. Ideal para peças de destaque e coleções especiais.',
    pages: 23, colorsTitle: 'Cores',
  },
  LUX_DUBAI: {
    name: 'Lux Dubai', category: 'TEXTURIZADOS', tag: 'Moda Praia · Moda',
    desc: 'Textura luxuosa com brilho sutil e caimento impecável. Ideal para peças sofisticadas e elegantes.',
    pages: 2, colorsTitle: 'Variações',
  },
  LYCRA_JEANS: {
    name: 'Lycra Jeans', category: 'TEXTURIZADOS', tag: 'Moda Praia · Moda',
    desc: 'Textura inspirada em jeans com toque macio e excelente elasticidade. Versatilidade para peças casuais e de moda praia.',
    pages: 2, colorsTitle: 'Variações',
  },
  MALIBU: {
    name: 'Malibu', category: 'TEXTURIZADOS', tag: 'Fitness · Moda Casual · Moda Praia',
    desc: 'Textura leve e fluida com toque macio. Ideal para peças com caimento suave e conforto excepcional.',
    pages: 20, colorsTitle: 'Cores Disponíveis',
    rendimento: '3,86m/kg', gramatura: '185g/m²', composicao: '80% Poliamida, 20% Elastano',
    attributes: ['01.FITNESS.jpg','04.MODA.jpg','02.PRAIA2.jpg','20.CAIMENTO.jpg','13.ELASTICIDADE1.jpg','05.TOQUE-MACIO.jpg'],
    bookUrl: 'book.html?fabric=MALIBU',
  },
  MALTE: {
    name: 'Malte', category: 'TEXTURIZADOS', tag: 'Moda Praia · Moda Casual · Fitness',
    desc: 'Com estrutura dupla e alta gramatura, a malha MALTE possui textura inspirada nos produtos artesanais, com aparência rústica e efeito produzido à mão. Em poliamida opaca com elastano, confere ao usuário conforto e muita maciez. Ideal para peças da moda praia, pode ser utilizado no segmento Fitness e em peças de moda casual. FPU 50+ vitalício.',
    pages: 12, colorsTitle: 'Cores Disponíveis',
    largura: '1,35m', rendimento: '1,58m/kg', gramatura: '470g', composicao: '89,19% Poliamida, 10,81% Elastano',
    attributes: ['01.FITNESS.jpg','02.PRAIA2.jpg','04.MODA.jpg','05.TOQUE-MACIO.jpg','06.SOLAR.jpg'],
    bookUrl: 'book.html?fabric=MALTE',
  },
  MARRAKESH: {
    name: 'Marrakesh', category: 'TEXTURIZADOS', tag: 'Fitness · Lingerie · Moda Praia',
    desc: 'Artigo desenvolvido em malha com fio trilobal, que confere um efeito similar ao shantung plano. A presença de elastano o torna ideal para confecção de moda praia. Em peças de lingerie, funciona como um falso liso e destaca-se em peças de linha dia e linha noite combinadas com rendas. Em tons profundos, torna-se sofisticado.',
    pages: 3, colorsTitle: 'Variações',
    largura: '', rendimento: '3,31m/kg', gramatura: '195g/m²', composicao: '86% Poliamida, 14% Elastano',
    attributes: ['01.FITNESS.jpg','02.PRAIA2.jpg','10.LINGERIE.jpg','14.BRILHANTE.jpg','13.ELASTICIDADE1.jpg','06.TOQUE-GELADO.jpg'],
    bookUrl: 'book.html?fabric=MARRAKESH',
  },
  MARSELHA: {
    name: 'Marselha', category: 'TEXTURIZADOS', tag: 'Fitness · Moda Praia',
    desc: 'É uma malha de alta performance desenvolvida para moda fitness e praia. Oferece excelente elasticidade, rápida recuperação e toque macio, garantindo conforto, compressão na medida e durabilidade. Estrutura estável que não deforma com o uso.',
    pages: 6, colorsTitle: 'Cores Disponíveis',
    largura: '', rendimento: '3,27m/kg', gramatura: '300g/m²', composicao: '92,3% Poliamida, 7,7% Elastano',
    attributes: ['01.FITNESS.jpg','02.PRAIA2.jpg','13.ELASTICIDADE1.jpg','12.CONFORTO-TERMICO.jpg'],
    bookUrl: 'book.html?fabric=MARSELHA',
  },
  MONTANA: {
    name: 'Montana', category: 'TEXTURIZADOS', tag: 'Fitness · Moda Casual',
    desc: 'Visual compacto e sem transparência. Sua construção estruturada extrapower no comprimento garante suporte nas práticas esportivas, com flexibilidade quando exigido. Tecnologia Ketten Sport de tecidos altamente resistentes, bi-elásticos e com ótima estabilidade dimensional.',
    pages: 12, colorsTitle: 'Cores Disponíveis',
    largura: '', rendimento: '1,87m/kg', gramatura: '340g/m²', composicao: '83% Poliamida, 17% Elastano',
    attributes: ['01.FITNESS.jpg','14.BRILHANTE.jpg','16.COMPRESSAO.jpg','13.ELASTICIDADE1.jpg'],
    bookUrl: 'book.html?fabric=MONTANA',
  },
  POINTS: {
    name: 'Points', category: 'TEXTURIZADOS', tag: 'Moda Praia · Moda',
    desc: 'Textura leve e fluida com toque macio. Ideal para peças com caimento suave e conforto excepcional.',
    pages: 12, colorsTitle: 'Cores Disponíveis',
  },
  POSITANO: {
    name: 'Positano', category: 'TEXTURIZADOS', tag: 'Moda Praia · Moda',
    desc: 'Textura leve e fluida com toque macio. Ideal para peças com caimento suave e conforto excepcional.',
    pages: 4, colorsTitle: 'Variações',
  },
  ROCKS: {
    name: 'Rocks', category: 'TEXTURIZADOS', tag: 'Moda Praia · Moda',
    desc: 'Textura rochosa com toque macio e caimento fluido. Ideal para peças com personalidade e estilo marcante.',
    pages: 4, colorsTitle: 'Variações',
  },
  SAINT_MARTIN: {
    name: 'Saint Martin', category: 'TEXTURIZADOS', tag: 'Moda Casual · Moda Praia',
    desc: 'Com visual tridimensional, o artigo confere tecnologia com conforto. Proporciona visual de tecido feito a mão, tem bom caimento e boa elasticidade para permitir a confecção de peças com modelagens drapeadas e torcidas. Foi desenvolvido para atender ao mercado de praia com forte impacto visual na confecção de biquínis e maiôs.',
    pages: 24, colorsTitle: 'Cores Disponíveis',
    largura: '1,10m', rendimento: '3,57m/kg', gramatura: '255g/m²', composicao: '89% Poliamida, 11% Elastano',
    attributes: ['04.MODA.jpg','02.PRAIA2.jpg','12.CONFORTO-TERMICO.jpg','13.ELASTICIDADE1.jpg'],
    bookUrl: 'book.html?fabric=SAINT_MARTIN',
  },
  SEREIA: {
    name: 'Sereia', category: 'TEXTURIZADOS', tag: 'Moda Praia · Moda',
    desc: 'Textura leve e fluida com toque macio. Ideal para peças com caimento suave e conforto excepcional.',
    pages: 5, colorsTitle: 'Variações',
  },
  SUKUZA: {
    name: 'Sukuza', category: 'TEXTURIZADOS', tag: 'Fitness',
    desc: 'Reúne as melhores características de aplicação na confecção do segmento esportivo: power, elasticidade controlada e retorno e cobertura, aliados ao visual único texturado em relevo e refletivo, devido à mistura de fios opacos e brilhantes.',
    pages: 2, colorsTitle: 'Cores Disponíveis',
    largura: '', rendimento: '2,32m/kg', gramatura: '2,95g/m²', composicao: '75,47% Poliamida, 24,53% Elastano',
    attributes: ['01.FITNESS.jpg','16.COMPRESSAO.jpg','15.KETTENSPORT.jpg','06.TOQUE-GELADO.jpg'],
    bookUrl: 'book.html?fabric=SUKUZA',
  },
  TEXAS: {
    name: 'Texas', category: 'TEXTURIZADOS', tag: 'Moda Praia · Fitness · Moda Casual',
    desc: 'Uma malha de textura com visual rústico e artesanal, que remete ao ponto do crochê, em poliamida, com toque macio e suave. Além de moda praia é um produto que pode ser usado para detalhes de peças esportivas, blusões, jaquetas e moda casual. Possui alongamento e elasticidade ideais para moda praia.',
    pages: 17, colorsTitle: 'Cores Disponíveis',
    largura: '', rendimento: '2,65m/kg', gramatura: '2,70g/m²', composicao: '',
    attributes: ['02.PRAIA2.jpg','01.FITNESS.jpg','04.MODA.jpg'],
    bookUrl: 'book.html?fabric=TEXAS',
  },
  VERONA: {
    name: 'Verona', category: 'TEXTURIZADOS', tag: 'Moda Praia · Moda Casual',
    desc: 'Com aparência de PLUSH, a malha VERONA BRILHANTE atende a tendência de toque ATOALHADO e se torna sinônimo de estilo e conforto à beira-mar. Com brilho sofisticado e luxuoso em poliamida com elastano, é extremamente macio, confortável e possui secagem rápida. Versátil, pode ser utilizado na moda casual.',
    pages: 28, colorsTitle: 'Cores Disponíveis',
    largura: '1,60m', rendimento: '2,40m/kg', gramatura: '240g', composicao: '97% Poliamida, 3% Elastano',
    attributes: ['02.PRAIA2.jpg','04.MODA.jpg','05.TOQUE-MACIO.jpg'],
    bookUrl: 'book.html?fabric=VERONA',
  },

  // ── ESTAMPADOS ───────────────────────────────────────────────
  SARDINHA: {
    name: 'Sardinha', category: 'ESTAMPADOS', tag: 'Moda Praia · Moda',
    desc: 'Lançamento Sardinha em tule e suplex. Charme e sofisticação para coleções diferenciadas.',
    pages: 3, colorsTitle: 'Variações',
  },
  SARDINHAS: {
    name: 'Sardinhas', category: 'ESTAMPADOS', tag: 'Moda Praia · Moda',
    desc: 'Lançamentos Sardinhas em tule e suplex. Charme e sofisticação para coleções diferenciadas.',
    pages: 3, colorsTitle: 'Variações',
  },

  /* ── ADICIONE NOVOS TECIDOS AQUI ──
  NOME_DA_CHAVE: {
    name: 'Nome do Tecido', category: 'TEXTURIZADOS', tag: 'Segmento · Segmento',
    desc: 'Descrição do tecido.',
    pages: 10, colorsTitle: 'Cores Disponíveis',
    largura: '', rendimento: '', gramatura: '', composicao: '',
    attributes: [],
    bookUrl: 'book.html?fabric=NOME_DA_CHAVE',
  },
  ── */
};