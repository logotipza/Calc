// supersearch.js

// Функция для преобразования строки с данными в массив объектов
function parseDataOptions(optionsString) {
    var optionsArray = optionsString.split("\n");
    var currencyData = [];
    optionsArray.forEach(function (option) {
        if (option.trim() !== "") {
            var currency = option.match(/value="([^"]+)"/)[1];
            var name = option.match(/>([^<]+)/)[1];
            currencyData.push({ value: currency, name: name });
        }
    });
    return currencyData;
}

// Функция для генерации HTML-кода выпадающего списка
function generateOptions(data) {
    // Сортируем данные по алфавиту
    data.sort(function (a, b) {
        return a.name.localeCompare(b.name);
    });

    var options = "";
    var currentLetter = "";
    data.forEach(function (currency) {
        var firstLetter = currency.name.charAt(0).toUpperCase();
        if (firstLetter !== currentLetter) {
            options += `<optgroup label="${firstLetter}">`;
            currentLetter = firstLetter;
        }
        options += `<option value="${currency.value}">${currency.name}</option>`;
    });
    return options;
}

// Получаем элементы списка и данные валют
var fromCurrencySelect = document.getElementById("fromCurrency");
var toCurrencySelect = document.getElementById("toCurrency");
var currencyData = parseDataOptions(currencyOptions);

// Генерируем и устанавливаем опции для выпадающих списков
fromCurrencySelect.innerHTML = generateOptions(currencyData);
toCurrencySelect.innerHTML = generateOptions(currencyData);

// Добавляем обработчики событий для выпадающих списков
fromCurrencySelect.addEventListener("change", function () {
    toCurrencySelect.disabled = false;
});

toCurrencySelect.addEventListener("change", function () {
    fromCurrencySelect.disabled = false;
});
