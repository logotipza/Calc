function formatMoney(amount) {
    var rubles = Math.floor(amount);
    var kopecks = Math.round((amount - rubles) * 100);
    return rubles.toLocaleString("ru-RU") + " руб. " + kopecks.toLocaleString("ru-RU", { minimumIntegerDigits: 2 }) + " коп.";
  }
  