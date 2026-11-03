/* ============================================================
   📝 EDITE SÓ ESTE ARQUIVO PARA ATUALIZAR O SITE
   ------------------------------------------------------------
   • Troque o nome da loja e o @ do Instagram abaixo.
   • Para adicionar um produto: copie um bloco { ... }, cole
     no final da lista PRODUTOS e troque nome/descrição/link.
   • Categorias novas aparecem sozinhas nos filtros do site.
   ============================================================ */

const LOJA = {
  nome: "Links Vendas IA",
  subtitulo: "🛒 Achadinhos e ofertas que eu indico nos vídeos — toque num produto pra ver o preço e comprar com segurança!",
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
    descricao: "Cordas de nylon para violão. Clássica, macia e ideal pra quem está começando.",
    link: "https://meli.la/1be3eHi",
    categoria: "musica",
    loja: "Mercado Livre",
  },
  {
    nome: "Giannini Clássico — Nylon Tensão Média",
    descricao: "Cordas de nylon, tensão média, para violão clássico. Timbre equilibrado e confortável.",
    link: "https://meli.la/2NoLGmo",
    categoria: "musica",
    loja: "Mercado Livre",
  },
  {
    nome: "Strinberg WS10 — Cordas de Aço Bronze .010",
    descricao: "Para violão de aço, Bronze, Extra Light .010. Leve de tocar e com ótimo brilho.",
    link: "https://meli.la/1hWUqMY",
    categoria: "musica",
    loja: "Mercado Livre",
  },
  {
    nome: "Ernie Ball Earthwood 2006 — Bronze 80/20 .010–.050",
    descricao: "Para violão de aço, bronze 80/20, Extra Light .010–.050. Qualidade premium Ernie Ball.",
    link: "https://meli.la/1UgbsLG",
    categoria: "musica",
    loja: "Mercado Livre",
    destaque: "⭐ Premium",
  },
  {
    nome: "SG Electric Guitar — Nickel Wound .011–.049",
    descricao: "Para Guitarra elétrica, Nickel Wound, .011–.049. Pegada firme e timbre encorpado.",
    link: "https://meli.la/27Uts7y",
    categoria: "musica",
    emoji: "🎸",
    loja: "Mercado Livre",
  },

  /* ---------------- 💻 NOTEBOOKS ---------------- */
  {
    nome: "Positivo Vision C15M — 15\" Full HD IPS",
    descricao: "Tela 15\" Full HD IPS, Intel Celeron. Ótimo custo-benefício pra estudo e uso do dia a dia.",
    link: "https://meli.la/29T2c2i",
    categoria: "notebooks",
    loja: "Mercado Livre",
    destaque: "💲 Custo-benefício",
  },
  {
    nome: "VAIO FE16 — 16\" IPS WUXGA, Ryzen série 5000",
    descricao: "Tela 16\" IPS WUXGA, AMD Ryzen série 5000, Radeon Graphics. Performance pra trabalho e estudo pesado.",
    link: "https://meli.la/2hn29M3",
    categoria: "notebooks",
    loja: "Mercado Livre",
  },
  {
    nome: "ASUS VivoBook 15 — 15,6\" Full HD",
    descricao: "Tela 15,6\" Full HD, leve e prateado. Fácil de carregar pra qualquer lugar.",
    link: "https://meli.la/2gnZyC1",
    categoria: "notebooks",
    loja: "Mercado Livre",
  },
  {
    nome: "Acer Aspire — Full HD pra Estudo e Trabalho",
    descricao: "Tela Full HD, ideal pra estudo e trabalho. Um Acer confiável pro dia a dia.",
    link: "https://meli.la/2Y6WyVs",
    categoria: "notebooks",
    loja: "Mercado Livre",
  },
  {
    nome: "Acer Aspire Core i3 — Full HD, Intel Core i3",
    descricao: "Tela Full HD, Intel Core i3. Mais potência pra trabalho, estudo e multitarefa.",
    link: "https://meli.la/2BmXfPd",
    categoria: "notebooks",
    loja: "Mercado Livre",
  },
];
