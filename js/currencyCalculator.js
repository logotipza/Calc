function convertCurrency(event) {
    event.preventDefault();
    var amount = parseFloat(document.getElementById("amount").value);
    var fromCurrency = document.getElementById("fromCurrency").value;
    var toCurrency = document.getElementById("toCurrency").value;
  
    // Выполняем запрос к API для получения курсов валют
    fetch('https://api.exchangerate-api.com/v4/latest/' + fromCurrency)
      .then(response => response.json())
      .then(data => {
        // Получаем курс обмена для выбранных валют
        var rates = data.rates;
        var exchangeRate = rates[toCurrency];
  
        // Выполняем конвертацию валюты
        var convertedAmount = amount * exchangeRate;
  
        // Отображаем результат
        document.getElementById("result").innerText = convertedAmount.toFixed(2) + " " + toCurrency;
      })
      .catch(error => {
        // Обработка ошибок
        console.error('Ошибка:', error);
      });
  }

  var currencyOptions = `
  <option value="RUB">Российский рубль (RUB)</option>
  <option value="USD">Доллар США (USD)</option>
  <option value="EUR">Евро (EUR)</option>
  <option value="GBP">Фунт стерлингов (GBP)</option>
  <option value="KZT">Казахский тенге (KZT)</option>
  <option value="AZN">Азербайджанский манат (AZN)</option>
  <option value="CNY">Китайский юань (CNY)</option>
  <option value="AUD">Австралийский доллар (AUD)</option>
  <option value="CAD">Канадский доллар (CAD)</option>
  <option value="CHF">Швейцарский франк (CHF)</option>
  <option value="JPY">Японская иена (JPY)</option>
  <option value="BRL">Бразильский реал (BRL)</option>
  <option value="MXN">Мексиканское песо (MXN)</option>
  <option value="SGD">Сингапурский доллар (SGD)</option>
  <option value="SEK">Шведская крона (SEK)</option>
  <option value="NOK">Норвежская крона (NOK)</option>
  <option value="INR">Индийская рупия (INR)</option>
  <option value="TRY">Турецкая лира (TRY)</option>
  <option value="ZAR">Южноафриканский рэнд (ZAR)</option>
  <option value="PLN">Польский злотый (PLN)</option>
  <option value="NZD">Новозеландский доллар (NZD)</option>
  <option value="HKD">Гонконгский доллар (HKD)</option>
  <option value="DKK">Датская крона (DKK)</option>
  <option value="ILS">Израильский шекель (ILS)</option>
  <option value="MYR">Малайзийский ринггит (MYR)</option>
  <option value="PHP">Филиппинское песо (PHP)</option>
  <option value="THB">Таиландский бат (THB)</option>
  <option value="CZK">Чешская крона (CZK)</option>
  <option value="HUF">Венгерский форинт (HUF)</option>
  <option value="BGN">Болгарский лев (BGN)</option>
  <option value="RON">Румынский лей (RON)</option>
  <option value="HRK">Хорватская куна (HRK)</option>
  <option value="ISK">Исландская крона (ISK)</option>
  <option value="IDR">Индонезийская рупия (IDR)</option>
  <option value="PKR">Пакистанская рупия (PKR)</option>
  <option value="ILS">Израильский шекель (ILS)</option>
  <option value="EGP">Египетский фунт (EGP)</option>
  <option value="ARS">Аргентинское песо (ARS)</option>
  <option value="CLP">Чилийское песо (CLP)</option>
  <option value="COP">Колумбийское песо (COP)</option>
  <option value="PEN">Перуанский соль (PEN)</option>
  <option value="VND">Вьетнамский донг (VND)</option>
  <option value="UAH">Украинская гривна (UAH)</option>
  <option value="SAR">Саудовский риял (SAR)</option>
  <option value="AED">Дирхам ОАЭ (AED)</option>
  <option value="LKR">Шри-ланкийская рупия (LKR)</option>
  <option value="BHD">Бахрейнский динар (BHD)</option>
  <option value="QAR">Катарский риал (QAR)</option>
  <option value="KRW">Южнокорейская вона (KRW)</option>
  <option value="MXN">Мексиканское песо (MXN)</option>
  <option value="ZMW">Замбийская квача (ZMW)</option>
  <option value="NGN">Нигерийская найра (NGN)</option>
  <option value="GHS">Ганский седи (GHS)</option>
  <option value="UGX">Угандийский шиллинг (UGX)</option>
  <option value="KES">Кенийский шиллинг (KES)</option>
  <option value="TZS">Танзанийский шиллинг (TZS)</option>
  <option value="XAF">Центральноафриканский франк (XAF)</option>
  <option value="XOF">Западноафриканский франк (XOF)</option>
  <option value="XAF">Франк КФА (XAF)</option>
  <option value="XOF">Франк КФА (XOF)</option>
  <option value="XCD">Восточно-карибский доллар (XCD)</option>
  <option value="GEL">Грузинский лари (GEL)</option>
  <option value="AMD">Армянский драм (AMD)</option>
  <option value="TJS">Таджикский сомони (TJS)</option>
  <option value="DZD">Алжирский динар (DZD)</option>
  <option value="MAD">Марокканский дирхам (MAD)</option>
  <option value="LYD">Ливийский динар (LYD)</option>
  <option value="SDG">Суданский фунт (SDG)</option>
  <option value="TND">Тунисский динар (TND)</option>
  <option value="JOD">Иорданский динар (JOD)</option>
  <option value="KWD">Кувейтский динар (KWD)</option>
  <option value="OMR">Оманский риал (OMR)</option>
  <option value="BND">Брунейский доллар (BND)</option>
  <option value="QAR">Катарский риал (QAR)</option>
  <option value="NAD">Намибийский доллар (NAD)</option>
  <option value="CRC">Костариканский колон (CRC)</option>
  <option value="PAB">Панамский бальбоа (PAB)</option>
  <option value="ETB">Эфиопский быр (ETB)</option>
  <option value="CUP">Кубинское песо (CUP)</option>
  <option value="UYU">Уругвайское песо (UYU)</option>
  <option value="DOP">Доминиканское песо (DOP)</option>
  <option value="MOP">Макао патака (MOP)</option>
  <option value="BYN">Белорусский рубль (BYN)</option>
  <option value="GIP">Гибралтарский фунт (GIP)</option>
  <option value="GTQ">Гватемальский кетсаль (GTQ)</option>
  <option value="HNL">Гондурасская лемпира (HNL)</option>
  <option value="ISK">Исландская крона (ISK)</option>
  <option value="JMD">Ямайский доллар (JMD)</option>
  <option value="LAK">Лаосский кип (LAK)</option>
  <option value="MKD">Македонский денар (MKD)</option>
  <option value="MUR">Маврикийская рупия (MUR)</option>
  <option value="MNT">Монгольский тугрик (MNT)</option>
  <option value="MMK">Мьянманский кьят (MMK)</option>
  <option value="NPR">Непальская рупия (NPR)</option>
  <option value="PGK">Папуа-Новая Гвинея кина (PGK)</option>
  <option value="PYG">Парагвайский гуарани (PYG)</option>
  <option value="RWF">Франк Руанды (RWF)</option>
  <option value="SBD">Соломоновые острова доллар (SBD)</option>
  <option value="SCR">Сейшельская рупия (SCR)</option>
  <option value="SLL">Сьерра-Леонский леоне (SLL)</option>
  <option value="SZL">Свазилендский лилангени (SZL)</option>
  <option value="TOP">Тонганская паанга (TOP)</option>
  <option value="TTD">Тринидад и Тобаго доллар (TTD)</option>
  <option value="TWD">Новый тайваньский доллар (TWD)</option>
  <option value="UAH">Украинская гривна (UAH)</option>
  <option value="VUV">Вануатский вату (VUV)</option>
  <option value="WST">Самоанская тала (WST)</option>
  <option value="XAF">Центральноафриканский франк (XAF)</option>
  <option value="XCD">Восточно-карибский доллар (XCD)</option>
  <option value="XPF">Французский тихоокеанский франк (XPF)</option>
  <option value="YER">Йеменский риал (YER)</option>
  <option value="ZMW">Замбийская квача (ZMW)</option>
  <option value="ZWL">Зимбабвийский доллар (ZWL)</option>
`;

document.getElementById("fromCurrency").innerHTML = currencyOptions;
document.getElementById("toCurrency").innerHTML = currencyOptions;

