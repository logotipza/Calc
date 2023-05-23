// Глобальная переменная для хранения данных о продуктах
let productData = [
  { name: "Яблоко", calories: 52 },
  { name: "Банан", calories: 96 },
  { name: "Апельсин", calories: 43 },
];

// Функция для генерации вариантов продуктов в выпадающем списке
function generateOptions(data) {
  let options = "";

  for (let i = 0; i < data.length; i++) {
    options += `<option value="${data[i].name}">${data[i].name}</option>`;
  }

  return options;
}

// Функция для добавления продукта в таблицу
function addProduct(event) {
  event.preventDefault();

  const selectElement = document.getElementById("productSelect");
  const amountElement = document.getElementById("productAmount");

  const selectedProduct = selectElement.value;
  const amount = parseFloat(amountElement.value);

  if (selectedProduct && !isNaN(amount) && amount > 0) {
    const product = productData.find((item) => item.name === selectedProduct);

    if (product) {
      const tableBody = document.getElementById("tableBody");

      // Проверка, есть ли уже строка с выбранным продуктом
      const existingRow = Array.from(tableBody.children).find(
        (row) => row.cells[0].textContent === selectedProduct
      );

      if (existingRow) {
        updateExistingProduct(existingRow, amount);
      } else {
        const calories = product.calories * amount;
        const newRow = `
          <tr>
            <td>${selectedProduct}</td>
            <td>${amount} г</td>
            <td>${calories.toFixed(2)}</td>
            <td>
              <button class="deleteButton" onclick="deleteProduct(this)">X</button>
              <button class="deleteButton" onclick="changeProduct(this)">Изменить</button>
            </td>
          </tr>
        `;

        tableBody.insertAdjacentHTML("beforeend", newRow);
      }

      updateTotalCalories();
    }
  }

  selectElement.selectedIndex = 0;
  amountElement.value = "";
}

// Функция для обновления существующего продукта в таблице
function updateExistingProduct(row, amount) {
  const amountCell = row.cells[1];
  const existingAmount = parseFloat(amountCell.textContent.split(" ")[0]);
  const newAmount = existingAmount + amount;
  amountCell.textContent = `${newAmount} г`;

  const product = productData.find((item) => item.name === row.cells[0].textContent);
  const calories = product.calories * newAmount;
  row.cells[2].textContent = calories.toFixed(2);
}

// Функция для удаления продукта из таблицы
function deleteProduct(button) {
  const row = button.closest("tr");
  row.remove();

  updateTotalCalories();
}
// Функция для изменения продукта в таблице
function changeProduct(button) {
  const row = button.closest("tr");
  const amountCell = row.querySelector("td:nth-child(2)");
  const currentAmount = parseFloat(amountCell.textContent.split(" ")[0]);

  const formContainer = document.createElement("div");
  formContainer.classList.add("custom-form-container");

  const inputField = document.createElement("input");
  inputField.type = "number";
  inputField.placeholder = "Новая граммовка";
  inputField.classList.add("custom-input-field");

  const confirmButton = document.createElement("button");
  confirmButton.textContent = "Применить";
  confirmButton.classList.add("custom-confirm-button");

  formContainer.appendChild(inputField);
  formContainer.appendChild(confirmButton);

  const updateAmount = () => {
    const newAmount = parseFloat(inputField.value);
    if (!isNaN(newAmount) && newAmount > 0) {
      const productCell = row.querySelector("td:nth-child(1)");
      const productName = productCell.textContent;
      const product = productData.find((item) => item.name === productName);

      if (product) {
        const calories = product.calories * newAmount;
        const caloriesCell = row.querySelector("td:nth-child(3)");
        caloriesCell.textContent = calories.toFixed(2);

        amountCell.textContent = `${newAmount} г`;

        updateTotalCalories();
      }
    }
    formContainer.remove();
  };

  confirmButton.addEventListener("click", updateAmount);
  inputField.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      updateAmount();
    }
  });

  inputField.value = currentAmount;
  const cellContent = amountCell.firstChild;
  amountCell.replaceChild(formContainer, cellContent);
  inputField.focus();

  // Добавляем обработчик события потери фокуса с полем ввода
  inputField.addEventListener("blur", () => {
    // Если поле ввода пустое, восстанавливаем предыдущее значение
    if (inputField.value.trim() === "") {
      inputField.value = currentAmount;
    }
  });
}

// Функция для обновления общей калорийности блюда
function updateTotalCalories() {
  const rows = document.querySelectorAll("#tableBody tr");
  let totalCalories = 0;

  rows.forEach((row) => {
    const caloriesCell = row.cells[2];
    const calories = parseFloat(caloriesCell.textContent);
    totalCalories += calories;
  });

  const totalCaloriesElement = document.getElementById("totalCalories");
  totalCaloriesElement.textContent = totalCalories.toFixed(2);
}

// Инициализация калькулятора
function initCalculator() {
  const productSelect = document.getElementById("productSelect");
  productSelect.innerHTML = generateOptions(productData);

  const form = document.getElementById("calculatorForm");
  form.addEventListener("submit", addProduct);
}

// Загрузка данных и инициализация калькулятора при загрузке страницы
window.addEventListener("load", initCalculator);
