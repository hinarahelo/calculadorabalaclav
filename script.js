const produtos = [
  { nome: "FAJUTA", cor: "Azul", classe: "azul", sem: 3000, com: 2500 },
  { nome: "COMUM", cor: "Branco", classe: "branco", sem: 4000, com: 3500 },
  { nome: "INCOMUM", cor: "Verde", classe: "verde", sem: 6000, com: 5500 },
  { nome: "RARO", cor: "Vermelho", classe: "vermelho", sem: 13000, com: 12000 },
  { nome: "ESPECIAL", cor: "Preto", classe: "preto", sem: 26000, com: 25000 },
  { nome: "LUVA", cor: "", classe: "neutro", sem: 1300, com: 1200 },
  { nome: "LIXA", cor: "", classe: "neutro", sem: 1200, com: 800 }
];

const tabelaDesktop = document.getElementById("tabelaDesktop");
const tabelaMobile = document.getElementById("tabelaMobile");

function formatBRL(valor) {
  return "R$ " + valor.toLocaleString("pt-BR");
}

function nomeProdutoHTML(produto) {
  const corTexto = produto.cor
    ? `<span class="nome-cor">(${produto.cor})</span>`
    : "";

  return `
    <span class="nome">
      <span class="usb ${produto.classe}"></span>
      <span>${produto.nome}</span>
      ${corTexto}
    </span>
  `;
}

produtos.forEach((produto, index) => {
  const tr = document.createElement("tr");

  tr.innerHTML = `
    <td>${nomeProdutoHTML(produto)}</td>
    <td>${formatBRL(produto.sem)}</td>
    <td>${formatBRL(produto.com)}</td>
    <td>
      <input
        type="number"
        min="0"
        value="0"
        data-index="${index}"
        data-group="desktop"
      >
    </td>
    <td id="desktopSem${index}">${formatBRL(0)}</td>
    <td id="desktopCom${index}">${formatBRL(0)}</td>
  `;

  tabelaDesktop.appendChild(tr);

  const mobileCard = document.createElement("div");
  mobileCard.className = "mobile-item";

  mobileCard.innerHTML = `
    <div class="mobile-top">
      ${nomeProdutoHTML(produto)}
    </div>

    <div class="mobile-prices">
      <div class="mobile-field">
        <label>Preço s/ parceria</label>
        <strong>${formatBRL(produto.sem)}</strong>
      </div>

      <div class="mobile-field">
        <label>Preço c/ parceria</label>
        <strong>${formatBRL(produto.com)}</strong>
      </div>
    </div>

    <div class="mobile-qty">
      <label for="mobileInput${index}">Quantidade</label>
      <input
        id="mobileInput${index}"
        type="number"
        min="0"
        value="0"
        data-index="${index}"
        data-group="mobile"
      >
    </div>

    <div class="mobile-totals">
      <div class="mobile-field">
        <label>Total s/ parceria</label>
        <span id="mobileSem${index}">${formatBRL(0)}</span>
      </div>

      <div class="mobile-field">
        <label>Total c/ parceria</label>
        <span id="mobileCom${index}">${formatBRL(0)}</span>
      </div>
    </div>
  `;

  tabelaMobile.appendChild(mobileCard);
});

function sincronizarInputs(index, valor, origem) {
  const seletor = `input[data-index="${index}"]`;
  document.querySelectorAll(seletor).forEach((input) => {
    if (input.dataset.group !== origem) {
      input.value = valor;
    }
  });
}

function calcular() {
  let totalSem = 0;
  let totalCom = 0;

  produtos.forEach((produto, index) => {
    const inputReferencia = document.querySelector(
      `input[data-index="${index}"][data-group="desktop"]`
    ) || document.querySelector(`input[data-index="${index}"][data-group="mobile"]`);

    const qtd = Math.max(0, parseInt(inputReferencia.value, 10) || 0);

    const valorSem = qtd * produto.sem;
    const valorCom = qtd * produto.com;

    const desktopSem = document.getElementById(`desktopSem${index}`);
    const desktopCom = document.getElementById(`desktopCom${index}`);
    const mobileSem = document.getElementById(`mobileSem${index}`);
    const mobileCom = document.getElementById(`mobileCom${index}`);

    if (desktopSem) desktopSem.textContent = formatBRL(valorSem);
    if (desktopCom) desktopCom.textContent = formatBRL(valorCom);
    if (mobileSem) mobileSem.textContent = formatBRL(valorSem);
    if (mobileCom) mobileCom.textContent = formatBRL(valorCom);

    totalSem += valorSem;
    totalCom += valorCom;
  });

  document.getElementById("totalSem").textContent = formatBRL(totalSem);
  document.getElementById("totalCom").textContent = formatBRL(totalCom);

  document.getElementById("pessoalSem").textContent = formatBRL(totalSem * 0.8);
  document.getElementById("balaclavSem").textContent = formatBRL(totalSem * 0.2);

  document.getElementById("pessoalCom").textContent = formatBRL(totalCom * 0.8);
  document.getElementById("balaclavCom").textContent = formatBRL(totalCom * 0.2);
}

document.addEventListener("input", (event) => {
  if (event.target.matches('input[type="number"][data-index]')) {
    const index = event.target.dataset.index;
    const valor = Math.max(0, parseInt(event.target.value, 10) || 0);

    event.target.value = valor;
    sincronizarInputs(index, valor, event.target.dataset.group);
    calcular();
  }
});

calcular();
