/* Lógica do site — lê tudo do produtos.js (LOJA, CATEGORIAS, PRODUTOS) */
(function () {
  const $ = (sel) => document.querySelector(sel);

  /* ---------- Cabeçalho ---------- */
  document.title = `${LOJA.nome} — Achadinhos e Ofertas 🛒`;
  $("#loja-nome").textContent = LOJA.nome;
  $("#loja-sub").textContent = LOJA.subtitulo || "";
  $("#atualizado").textContent = LOJA.atualizadoEm ? `• Atualizado em ${LOJA.atualizadoEm}` : "";
  $("#ano").textContent = new Date().getFullYear();

  if (LOJA.instagram) {
    const user = LOJA.instagram.replace(/^@/, "");
    const btn = $("#btn-instagram");
    btn.href = `https://instagram.com/${user}`;
    btn.hidden = false;
    btn.lastChild.textContent = ` @${user}`;
  }

  /* ---------- Estado (busca + filtro) ---------- */
  let categoriaAtiva = "todos";
  let busca = "";

  const normalizar = (txt) =>
    (txt || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  /* ---------- Filtros (chips gerados das categorias) ---------- */
  const filtrosEl = $("#filtros");
  const idsUsados = Object.keys(CATEGORIAS).filter((id) =>
    PRODUTOS.some((p) => p.categoria === id)
  );

  function chip(id, label) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "chip" + (id === categoriaAtiva ? " ativo" : "");
    b.textContent = label;
    b.onclick = () => {
      categoriaAtiva = id;
      filtrosEl.querySelectorAll(".chip").forEach((c) => c.classList.toggle("ativo", c === b));
      render();
    };
    return b;
  }
  filtrosEl.append(chip("todos", `🛒 Todos (${PRODUTOS.length})`));
  idsUsados.forEach((id) => {
    const qtd = PRODUTOS.filter((p) => p.categoria === id).length;
    filtrosEl.append(chip(id, `${CATEGORIAS[id].nome} (${qtd})`));
  });

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

  function criarCard(p, idx) {
    const cat = CATEGORIAS[p.categoria] || { emoji: "🛒" };
    const a = document.createElement("a");
    a.className = "card";
    a.href = p.link;
    a.target = "_blank";
    a.rel = "noopener sponsored";
    a.style.animationDelay = `${Math.min(idx * 50, 400)}ms`;
    a.setAttribute("aria-label", `${p.nome} — comprar em ${p.loja || "loja parceira"}`);

    const destaque = p.destaque ? `<span class="destaque">${p.destaque}</span>` : "";
    a.innerHTML = `
      <div class="card-topo">
        <div class="thumb" aria-hidden="true">${p.emoji || cat.emoji}</div>
        <div class="info">
          ${destaque}
          <h3></h3>
          <p></p>
        </div>
        <span class="seta" aria-hidden="true">›</span>
      </div>
      <div class="card-rodape">
        <span class="cta">🛒 Ver preço e comprar</span>
        <span class="loja">${p.loja || ""}</span>
      </div>`;
    // textContent evita HTML acidental vindo dos dados
    a.querySelector("h3").textContent = p.nome;
    a.querySelector(".info p").textContent = p.descricao || "";
    return a;
  }

  function render() {
    listaEl.innerHTML = "";
    let total = 0;

    idsUsados.forEach((id) => {
      if (categoriaAtiva !== "todos" && categoriaAtiva !== id) return;
      const itens = PRODUTOS.filter((p) => p.categoria === id && produtoPassa(p));
      if (!itens.length) return;

      const grupo = document.createElement("section");
      grupo.className = "grupo";
      const titulo = document.createElement("h2");
      titulo.className = "grupo-titulo";
      titulo.innerHTML = `${CATEGORIAS[id].nome} <small>${itens.length} ${itens.length === 1 ? "produto" : "produtos"}</small>`;
      grupo.append(titulo);
      itens.forEach((p) => grupo.append(criarCard(p, total++)));
      listaEl.append(grupo);
    });

    $("#contador").textContent =
      total === PRODUTOS.length
        ? `${total} produtos`
        : `${total} de ${PRODUTOS.length} produtos`;
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
    const dados = { title: document.title, text: "🛒 Olha esses achadinhos!", url: location.href };
    if (navigator.share) {
      try { await navigator.share(dados); } catch (_) { /* usuário cancelou */ }
    } else {
      try {
        await navigator.clipboard.writeText(location.href);
        mostrarToast("✅ Link copiado! Cola onde quiser 😉");
      } catch (_) {
        mostrarToast("📋 Copia o link da barra de endereço 😉");
      }
    }
  });
})();
