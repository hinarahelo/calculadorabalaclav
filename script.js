(() => {
  "use strict";

  const PRODUCTS = [
    { name: "FAJUTA", priceWithoutPartnership: 3000, priceWithPartnership: 2500 },
    { name: "COMUM", priceWithoutPartnership: 4000, priceWithPartnership: 3500 },
    { name: "INCOMUM", priceWithoutPartnership: 6000, priceWithPartnership: 5500 },
    { name: "RARO", priceWithoutPartnership: 13000, priceWithPartnership: 12000 },
    { name: "ESPECIAL", priceWithoutPartnership: 26000, priceWithPartnership: 25000 },
    { name: "LUVA", priceWithoutPartnership: 1300, priceWithPartnership: 1200 },
    { name: "LIXA", priceWithoutPartnership: 1200, priceWithPartnership: 800 }
  ];

  const PERSONAL_SHARE = 0.8;
  const BALACLAV_SHARE = 0.2;

  const body = document.getElementById("calculator-body");

  const totalWithoutElement = document.getElementById("total-sem-parceria");
  const totalWithElement = document.getElementById("total-com-parceria");

  const personalWithoutElement = document.getElementById("pessoal-sem-parceria");
  const balaclavWithoutElement = document.getElementById("balaclav-sem-parceria");

  const personalWithElement = document.getElementById("pessoal-com-parceria");
  const balaclavWithElement = document.getElementById("balaclav-com-parceria");

  const currencyFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0
  });

  const formatCurrency = (value) => currencyFormatter.format(value);

  const sanitizeQuantity = (value) => {
    const parsed = Number.parseInt(value, 10);
    return Number.isNaN(parsed) || parsed < 0 ? 0 : parsed;
  };

  const rows = PRODUCTS.map((product, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td class="col-type">${product.name}</td>
      <td class="money">${formatCurrency(product.priceWithoutPartnership)}</td>
      <td class="money">${formatCurrency(product.priceWithPartnership)}</td>
      <td>
        <input
          class="qty-input"
          type="number"
          min="0"
          step="1"
          inputmode="numeric"
          value="0"
          aria-label="Quantidade de ${product.name}"
          data-index="${index}"
        />
      </td>
      <td class="money total-cell" data-total-without>${formatCurrency(0)}</td>
      <td class="money total-cell" data-total-with>${formatCurrency(0)}</td>
    `;

    body.appendChild(row);

    return {
      input: row.querySelector(".qty-input"),
      totalWithoutCell: row.querySelector("[data-total-without]"),
      totalWithCell: row.querySelector("[data-total-with]")
    };
  });

  const calculate = () => {
    let totalWithout = 0;
    let totalWith = 0;

    for (let index = 0; index < PRODUCTS.length; index += 1) {
      const product = PRODUCTS[index];
      const row = rows[index];

      const quantity = sanitizeQuantity(row.input.value);

      if (row.input.value !== String(quantity)) {
        row.input.value = quantity;
      }

      const subtotalWithout = quantity * product.priceWithoutPartnership;
      const subtotalWith = quantity * product.priceWithPartnership;

      row.totalWithoutCell.textContent = formatCurrency(subtotalWithout);
      row.totalWithCell.textContent = formatCurrency(subtotalWith);

      totalWithout += subtotalWithout;
      totalWith += subtotalWith;
    }

    totalWithoutElement.textContent = formatCurrency(totalWithout);
    totalWithElement.textContent = formatCurrency(totalWith);

    personalWithoutElement.textContent = formatCurrency(totalWithout * PERSONAL_SHARE);
    balaclavWithoutElement.textContent = formatCurrency(totalWithout * BALACLAV_SHARE);

    personalWithElement.textContent = formatCurrency(totalWith * PERSONAL_SHARE);
    balaclavWithElement.textContent = formatCurrency(totalWith * BALACLAV_SHARE);
  };

  body.addEventListener("input", (event) => {
    if (!event.target.classList.contains("qty-input")) {
      return;
    }

    calculate();
  });

  calculate();
})();
