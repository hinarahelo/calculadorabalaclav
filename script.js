const produtos = [
  { nome: "FAJUTO", cor: "Azul", classe: "azul", sem: 3000, com: 2500 },
  { nome: "COMUM", cor: "Branco", classe: "branco", sem: 4000, com: 3500 },
  { nome: "INCOMUM", cor: "Verde", classe: "verde", sem: 6000, com: 5500 },
  { nome: "RARO", cor: "Vermelho", classe: "vermelho", sem: 13000, com: 12000 },
  { nome: "ESPECIAL", cor: "Preto", classe: "preto", sem: 26000, com: 25000 },
  { nome: "LUVA", cor: "", classe: "neutro", sem: 1300, com: 1200 },
  { nome: "LIXA", cor: "", classe: "neutro", sem: 1200, com: 800 }
];

const desktopTableBody = document.getElementById("desktopTableBody");
const mobileList = document.getElementById("mobileList");

const totalSemEl = document.getElementById("totalSem");
const totalComEl = document.getElementById("totalCom");
const pessoalSemEl = document.getElementById("pessoalSem");
const balaclavSemEl = document.getElementById("balaclavSem");
const pessoalComEl = document.getElementById("pessoalCom");
const balaclavComEl = document.getElementById("balaclavCom");

function formatBRL(valor) {
  return `R$ ${valor.toLocaleString("pt-BR")}`;
}

function productNameHTML(produto) {
  const cor = produto.cor
    ? `<span class="product-name__color">(${produto.cor})</span>`
    : "";

  return `
    <span class="product-name">
      <span class="usb ${produto.classe}"></span>
      <span>${produto.nome}</span>
      ${cor}
    </span>
  `;
}

function criarDesktop() {
  if (!desktopTableBody) return;

  desktopTableBody.innerHTML = "";

  produtos.forEach((produto, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${productNameHTML(produto)}</td>
      <td>${formatBRL(produto.sem)}</td>
      <td>${formatBRL(produto.com)}</td>
      <td>
        <input
          type="number"
          min="0"
          step="1"
          value="0"
          data-index="${index}"
          data-group="desktop"
        >
      </td>
    `;

    desktopTableBody.appendChild(tr);
  });
}

function criarMobile() {
  if (!mobileList) return;

  mobileList.innerHTML = "";

  produtos.forEach((produto, index) => {
    const card = document.createElement("div");
    card.className = "mobile-card";

    card.innerHTML = `
      <div class="mobile-card__top">
        ${productNameHTML(produto)}
      </div>

      <div class="mobile-card__grid">
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
          step="1"
          value="0"
          data-index="${index}"
          data-group="mobile"
        >
      </div>
    `;

    mobileList.appendChild(card);
  });
}

function getInputsByIndex(index) {
  return document.querySelectorAll(`input[data-index="${index}"]`);
}

function sincronizarInputs(index, valor, origem) {
  getInputsByIndex(index).forEach((input) => {
    if (input.dataset.group !== origem) {
      input.value = valor;
    }
  });
}

function getQuantidade(index) {
  const inputs = getInputsByIndex(index);
  if (!inputs.length) return 0;

  const valor = parseInt(inputs[0].value, 10) || 0;
  return Math.max(0, valor);
}

function calcular() {
  let totalSem = 0;
  let totalCom = 0;

  produtos.forEach((produto, index) => {
    const quantidade = getQuantidade(index);

    totalSem += quantidade * produto.sem;
    totalCom += quantidade * produto.com;
  });

  if (totalSemEl) totalSemEl.textContent = formatBRL(totalSem);
  if (totalComEl) totalComEl.textContent = formatBRL(totalCom);

  if (pessoalSemEl) pessoalSemEl.textContent = formatBRL(totalSem * 0.8);
  if (balaclavSemEl) balaclavSemEl.textContent = formatBRL(totalSem * 0.2);

  if (pessoalComEl) pessoalComEl.textContent = formatBRL(totalCom * 0.8);
  if (balaclavComEl) balaclavComEl.textContent = formatBRL(totalCom * 0.2);
}

document.addEventListener("input", (event) => {
  if (!event.target.matches('input[type="number"][data-index]')) {
    return;
  }

  const index = event.target.dataset.index;
  const valor = Math.max(0, parseInt(event.target.value, 10) || 0);

  event.target.value = valor;
  sincronizarInputs(index, valor, event.target.dataset.group);
  calcular();
});

criarDesktop();
criarMobile();
calcular();
