// Функция для добавления разделителя разрядов
function addThousandsSeparator(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// Функция для форматирования денежного значения
function formatMoneyValue(amount) {
    var rubles = Math.floor(amount);
    var kopecks = Math.round((amount - rubles) * 100);
    return addThousandsSeparator(rubles) + " руб. " + kopecks.toString().padStart(2, "0") + " коп.";
}

// Функция для форматирования числовых значений с разделителем разрядов и форматом денежного значения
function formatNumbersWithSeparator() {
    var elements = document.querySelectorAll(".number-format");
    elements.forEach(function(element) {
        var value = parseFloat(element.innerText);
        if (!isNaN(value)) {
            element.innerText = formatMoneyValue(value);
        }
    });
}

// Вызов функции при загрузке страницы
window.addEventListener("load", formatNumbersWithSeparator);
