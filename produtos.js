/* ============================================================
   📝 EDITE SÓ ESTE ARQUIVO PARA ATUALIZAR O SITE
   ------------------------------------------------------------
   • Troque o nome da loja e o @ do Instagram abaixo.
   • Para adicionar um produto: copie um bloco { ... }, cole
     no final da lista PRODUTOS e troque nome/descrição/link.
   • Categorias novas aparecem sozinhas nos filtros do site.
   • Campo opcional "destaque": selo dourado no card (ex.: "Premium").
   ============================================================ */

const LOJA = {
  nome: "Links Vendas IA",
  subtitulo: "Uma seleção refinada dos produtos que apresento nos vídeos — escolhidos um a um. Toque num item para ver o preço e adquira com a compra protegida do Mercado Livre.",
  // 👇 Troque pelo seu @ (ex.: "meuinstagram"). Deixe "" se não quiser mostrar.
  instagram: "",
  // 👇 Data da última atualização (só texto)
  atualizadoEm: "Novembro de 2026",
};

/* Categorias (emoji + nome bonito). A ordem aqui é a ordem no site. */
const CATEGORIAS = {
  musica:    { nome: "Música 🎸",    emoji: "🎸" },
  notebooks: { nome: "Notebooks 💻", emoji: "💻" },
  // Para criar uma categoria nova, adicione uma linha, ex.:
  // casa: { nome: "Casa 🏠", emoji: "🏠" },
};

const PRODUTOS = [
  /* ---------------- 🎸 MÚSICA ---------------- */
  {
    nome: "Giannini Canário — Cordas de Nylon",
    descricao: "O clássico brasileiro do violão de nylon: macio ao toque, timbre acolhedor e perfeito para evoluir sem forçar os dedos.",
    link: "https://meli.la/1be3eHi",
    categoria: "musica",
    loja: "Mercado Livre",
  },
  {
    nome: "Giannini Clássico — Nylon Tensão Média",
    descricao: "Tensão média para violão clássico, com timbre equilibrado e resposta confortável — presença na medida certa para o estudo diário.",
    link: "https://meli.la/2NoLGmo",
    categoria: "musica",
    loja: "Mercado Livre",
  },
  {
    nome: "Strinberg WS10 — Cordas de Aço Bronze .010",
    descricao: "Aço bronze Extra Light .010: leveza ao tocar e brilho cristalino que valoriza cada acorde do violão folk.",
    link: "https://meli.la/1hWUqMY",
    categoria: "musica",
    loja: "Mercado Livre",
  },
  {
    nome: "Ernie Ball Earthwood 2006 — Bronze 80/20 .010–.050",
    descricao: "Bronze 80/20 Extra Light .010–.050 da lendária Ernie Ball — projeção, clareza e durabilidade em nível profissional.",
    link: "https://meli.la/1UgbsLG",
    categoria: "musica",
    loja: "Mercado Livre",
    destaque: "Escolha do especialista",
  },
  {
    nome: "SG Electric Guitar — Nickel Wound .011–.049",
    descricao: "Nickel Wound .011–.049 para Guitarra elétrica: pegada firme, sustain generoso e um timbre encorpado que impõe respeito.",
    link: "https://meli.la/27Uts7y",
    categoria: "musica",
    emoji: "🎸",
    loja: "Mercado Livre",
  },

  /* ---------------- 💻 NOTEBOOKS ---------------- */
  {
    nome: "Positivo Vision C15M — 15\" Full HD IPS",
    descricao: "Tela de 15\" Full HD IPS e Intel Celeron — a porta de entrada elegante para estudar, trabalhar e navegar com fluidez.",
    link: "https://meli.la/29T2c2i",
    categoria: "notebooks",
    loja: "Mercado Livre",
    destaque: "Melhor custo-benefício",
  },
  {
    nome: "VAIO FE16 — 16\" IPS WUXGA, Ryzen série 5000",
    descricao: "Tela ampla de 16\" IPS WUXGA, AMD Ryzen série 5000 e Radeon Graphics — performance de sobra para quem exige mais.",
    link: "https://meli.la/2hn29M3",
    categoria: "notebooks",
    loja: "Mercado Livre",
  },
  {
    nome: "ASUS VivoBook 15 — 15,6\" Full HD",
    descricao: "15,6\" Full HD em um corpo leve e prateado — sofisticação portátil para acompanhar o seu ritmo, onde ele for.",
    link: "https://meli.la/2gnZyC1",
    categoria: "notebooks",
    loja: "Mercado Livre",
  },
  {
    nome: "Acer Aspire — Full HD pra Estudo e Trabalho",
    descricao: "Tela Full HD e a confiabilidade Acer para estudo e trabalho — um clássico discreto que simplesmente entrega.",
    link: "https://meli.la/2Y6WyVs",
    categoria: "notebooks",
    loja: "Mercado Livre",
  },
  {
    nome: "Acer Aspire Core i3 — Full HD, Intel Core i3",
    descricao: "Intel Core i3 e tela Full HD: potência extra para multitarefa, reuniões e estudos sem engasgos.",
    link: "https://meli.la/2BmXfPd",
    categoria: "notebooks",
    loja: "Mercado Livre",
  },
];
