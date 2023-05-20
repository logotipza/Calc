function formatMoney(amount) {
    var rubles = Math.floor(amount);
    var kopecks = Math.round((amount - rubles) * 100);
    return rubles.toLocaleString("ru-RU") + " руб. " + kopecks.toLocaleString("ru-RU", { minimumIntegerDigits: 2 }) + " коп.";
  }

// Функция для форматирования числа с разделителем по разрядам
// function formatNumber(number) {
//   var parts = number.toString().split(".");
//   parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
//   return parts.join(".");
// }

// // Функция для преобразования числа в формат денег
// function formatMoney(amount) {
//   return formatNumber(amount.toFixed(2));
// }




  