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
        const calories = product.calories * amount;
        const tableBody = document.getElementById("tableBody");
  
        const newRow = `
          <tr>
            <td>${selectedProduct}</td>
            <td>${amount} г</td>
            <td>${calories.toFixed(2)}</td>
            <td>
              <button class="deleteButton" onclick="deleteProduct(this)">Удалить</button>
            </td>
          </tr>
        `;
  
        tableBody.insertAdjacentHTML("beforeend", newRow);
  
        updateTotalCalories();
      }
    }
  
    selectElement.selectedIndex = 0;
    amountElement.value = "";
  }
  
  // Функция для удаления продукта из таблицы
  function deleteProduct(button) {
    const row = button.closest("tr");
    row.remove();
  
    updateTotalCalories();
  }
  
  // Функция для обновления общей калорийности блюда
  function updateTotalCalories() {
    const rows = document.querySelectorAll("#tableBody tr");
    let totalCalories = 0;
  
    rows.forEach((row) => {
      const caloriesCell = row.querySelector("td:nth-child(3)");
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
  