/* Lógica do site — lê tudo do produtos.js (LOJA, CATEGORIAS, PRODUTOS) */
(function () {
  const $ = (sel) => document.querySelector(sel);
  const reduzirMovimento = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Cabeçalho ---------- */
  document.title = `${LOJA.nome} — Curadoria Premium ✦`;
  $("#loja-nome").textContent = LOJA.nome;
  $("#rodape-nome").textContent = LOJA.nome;
  $("#loja-sub").textContent = LOJA.subtitulo || "";
  $("#atualizado").textContent = LOJA.atualizadoEm ? `Coleção atualizada · ${LOJA.atualizadoEm}` : "";
  $("#ano").textContent = new Date().getFullYear();

  // Monograma do avatar: iniciais das 2 primeiras palavras do nome (ex.: "LV")
  const iniciais = (LOJA.nome || "LV")
    .trim().split(/\s+/).slice(0, 2).map((p) => p[0]).join("").toUpperCase();
  $("#avatar-iniciais").textContent = iniciais || "✦";

  if (LOJA.instagram) {
    const user = LOJA.instagram.replace(/^@/, "");
    const btn = $("#btn-instagram");
    btn.href = `https://instagram.com/${user}`;
    $("#insta-nome").textContent = `@${user}`;
    btn.hidden = false;
  }

  /* ---------- Animação de entrada ao rolar ---------- */
  const observador = new IntersectionObserver(
    (entradas) => entradas.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("visivel"); observador.unobserve(e.target); }
    }),
    { threshold: 0.08, rootMargin: "0px 0px -24px 0px" }
  );
  const revelar = (el) => (reduzirMovimento ? el.classList.add("visivel") : observador.observe(el));
  document.querySelectorAll(".revelar").forEach(revelar);

  /* ---------- Estado (busca + filtro) ---------- */
  let categoriaAtiva = "todos";
  let busca = "";

  const normalizar = (txt) =>
    (txt || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const romanos = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
  const dois = (n) => String(n).padStart(2, "0");

  /* ---------- Filtros (chips gerados das categorias) ---------- */
  const filtrosEl = $("#filtros");
  const idsUsados = Object.keys(CATEGORIAS).filter((id) =>
    PRODUTOS.some((p) => p.categoria === id)
  );
  $("#num-categorias").textContent = idsUsados.length;

  function chip(id, label) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "chip" + (id === categoriaAtiva ? " ativo" : "");
    b.setAttribute("aria-pressed", id === categoriaAtiva ? "true" : "false");
    b.textContent = label;
    b.onclick = () => {
      categoriaAtiva = id;
      filtrosEl.querySelectorAll(".chip").forEach((c) => {
        const ativo = c === b;
        c.classList.toggle("ativo", ativo);
        c.setAttribute("aria-pressed", ativo ? "true" : "false");
      });
      render();
    };
    return b;
  }
  filtrosEl.append(chip("todos", `✦ Todos · ${PRODUTOS.length}`));
  idsUsados.forEach((id) => {
    const qtd = PRODUTOS.filter((p) => p.categoria === id).length;
    const nomeSemEmoji = CATEGORIAS[id].nome.replace(/[\p{Extended_Pictographic}\uFE0F]/gu, "").trim();
    filtrosEl.append(chip(id, `${CATEGORIAS[id].emoji} ${nomeSemEmoji} · ${qtd}`));
  });

  /* Contagem animada do total de produtos */
  (function contar() {
    const el = $("#contador");
    const alvo = PRODUTOS.length;
    if (reduzirMovimento) { el.textContent = alvo; return; }
    const inicio = performance.now(), dur = 700;
    (function passo(t) {
      const p = Math.min((t - inicio) / dur, 1);
      el.textContent = Math.round(alvo * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(passo);
    })(inicio);
  })();

  /* ---------- Busca ---------- */
  $("#busca").addEventListener("input", (e) => {
    busca = normalizar(e.target.value.trim());
    render();
  });

  /* ---------- Renderização dos produtos ---------- */
  const listaEl = $("#lista");
  const vazioEl = $("#vazio");

  function produtoPassa(p) {
    if (categoriaAtiva !== "todos" && p.categoria !== categoriaAtiva) return false;
    if (!busca) return true;
    return normalizar(`${p.nome} ${p.descricao} ${CATEGORIAS[p.categoria]?.nome || ""}`).includes(busca);
  }

  function criarCard(p, numero) {
    const cat = CATEGORIAS[p.categoria] || { emoji: "🛒", nome: "Produto" };
    const nomeCat = cat.nome.replace(/[\p{Extended_Pictographic}\uFE0F]/gu, "").trim();
    const a = document.createElement("a");
    a.className = "card revelar";
    a.href = p.link;
    a.target = "_blank";
    a.rel = "noopener sponsored";
    a.setAttribute("aria-label", `${p.nome} — ver preço e adquirir em ${p.loja || "loja parceira"}`);

    a.innerHTML = `
      <span class="card-numero" aria-hidden="true">${dois(numero)}</span>
      <div class="card-topo">
        <div class="thumb" aria-hidden="true">${p.emoji || cat.emoji}</div>
        <div class="info">
          <span class="cat-rotulo"></span>
          <span class="destaque" hidden>✦ <span class="destaque-txt"></span></span>
          <h3></h3>
          <p></p>
        </div>
      </div>
      <div class="card-rodape">
        <span class="cta">Ver preço e adquirir <span class="cta-seta" aria-hidden="true">→</span></span>
        <span class="loja">via<b></b></span>
      </div>`;
    // textContent evita HTML acidental vindo dos dados
    a.querySelector(".cat-rotulo").textContent = nomeCat;
    a.querySelector("h3").textContent = p.nome;
    a.querySelector(".info p").textContent = p.descricao || "";
    a.querySelector(".loja b").textContent = p.loja || "Loja parceira";
    if (p.destaque) {
      const d = a.querySelector(".destaque");
      d.querySelector(".destaque-txt").textContent =
        p.destaque.replace(/[\p{Extended_Pictographic}\uFE0F]/gu, "").trim();
      d.hidden = false;
    }
    revelar(a);
    return a;
  }

  function render() {
    listaEl.innerHTML = "";
    let total = 0;
    let colecao = 0;

    idsUsados.forEach((id) => {
      if (categoriaAtiva !== "todos" && categoriaAtiva !== id) return;
      const itens = PRODUTOS.filter((p) => p.categoria === id && produtoPassa(p));
      if (!itens.length) return;

      const nomeCat = CATEGORIAS[id].nome.replace(/[\p{Extended_Pictographic}\uFE0F]/gu, "").trim();
      const grupo = document.createElement("section");
      grupo.className = "grupo";
      grupo.innerHTML = `
        <div class="grupo-cabeca">
          <span class="grupo-numero" aria-hidden="true">Nº ${romanos[colecao] || colecao + 1}</span>
          <h2>${CATEGORIAS[id].emoji} ${nomeCat}</h2>
          <span class="grupo-contagem">${itens.length} ${itens.length === 1 ? "item" : "itens"}</span>
        </div>
        <div class="grupo-regua" aria-hidden="true"></div>`;
      colecao++;
      itens.forEach((p) => grupo.append(criarCard(p, ++total)));
      listaEl.append(grupo);
    });

    vazioEl.hidden = total !== 0;
  }
  render();

  /* ---------- Compartilhar / copiar link ---------- */
  const toast = $("#toast");
  let toastTimer;
  function mostrarToast(msg) {
    toast.textContent = msg;
    toast.classList.add("mostrar");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("mostrar"), 2600);
  }

  $("#btn-compartilhar").addEventListener("click", async () => {
    const dados = { title: document.title, text: "✦ Olha essa seleção premium:", url: location.href };
    if (navigator.share) {
      try { await navigator.share(dados); } catch (_) { /* usuário cancelou */ }
    } else {
      try {
        await navigator.clipboard.writeText(location.href);
        mostrarToast("✦ Link copiado — cole onde quiser");
      } catch (_) {
        mostrarToast("Copie o link da barra de endereço 😉");
      }
    }
  });
})();
