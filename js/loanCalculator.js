var chart = null; // Переменная для хранения графика

function togglePeriodType(type) {
  var radioMonths = document.getElementById("loanPeriodMonths");
  var radioYears = document.getElementById("loanPeriodYears");
  var toggleContainer = document.querySelector(".toggle-container");
  if (type === "months") {
    radioMonths.checked = true;
    radioYears.checked = false;
    toggleContainer.children[0].classList.add("active");
    toggleContainer.children[1].classList.remove("active");
  } else if (type === "years") {
    radioMonths.checked = false;
    radioYears.checked = true;
    toggleContainer.children[0].classList.remove("active");
    toggleContainer.children[1].classList.add("active");
  }
}

function calculateLoan() {
  var loanAmount = parseFloat(document.getElementById("loanAmount").value);
  var loanInterest = parseFloat(document.getElementById("loanInterest").value) / 100 / 12;
  var loanPeriodType = document.querySelector('input[name="loanPeriodType"]:checked').value;
  var loanPeriod = parseInt(document.getElementById("loanPeriod").value);
  if (loanPeriodType === "years") {
    loanPeriod *= 12;
  }

  var monthlyPayment = (loanAmount * loanInterest * Math.pow(1 + loanInterest, loanPeriod)) / (Math.pow(1 + loanInterest, loanPeriod) - 1);
  document.getElementById("monthlyPayment").innerText = formatMoney(monthlyPayment);

  var totalLoanAmount = monthlyPayment * loanPeriod;
  document.getElementById("totalLoanAmount").innerText = formatMoney(totalLoanAmount);

  var totalOverpayment = totalLoanAmount - loanAmount;
  document.getElementById("totalOverpayment").innerText = formatMoney(totalOverpayment);

  var loanTable = document.getElementById("loanTable");
  // Очистка таблицы
  while (loanTable.rows.length > 1) {
    loanTable.deleteRow(1);
  }
  var loanBalance = loanAmount;
  var principalPaymentData = []; // Массив для хранения данных платежей по основному долгу
  for (var i = 1; i <= loanPeriod; i++) {
    var interestPayment = loanBalance * loanInterest;
    var principalPayment = monthlyPayment - interestPayment;
    loanBalance -= principalPayment;
    principalPaymentData.push(principalPayment); // Добавление значения платежа по основному долгу в массив
    var row = loanTable.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerText = i;
    cell2.innerText = formatMoney(principalPayment);
    cell3.innerText = formatMoney(interestPayment);
    cell4.innerText = (loanBalance > 0 ? formatMoney(loanBalance) : "0.00");
  }

  // Удаление предыдущего графика, если он существует
  if (chart) {
    chart.destroy();
  }

  // Создание нового графика
  var ctx = document.getElementById("chart").getContext("2d");

  // Формирование данных для графика
  var monthlyPaymentLine = Array.from({ length: loanPeriod }, () => monthlyPayment);
  var principalPaymentLine = principalPaymentData;

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: Array.from({ length: loanPeriod }, (_, i) => (i + 1).toString()),
      datasets: [
        {
          label: "Ежемесячный платеж",
          data: monthlyPaymentLine,
          fill: false,
          borderColor: "rgba(0, 0, 0, 1)",
          borderWidth: 1,
        },
        {
          label: "Платеж по основному долгу",
          data: principalPaymentLine,
          fill: false,
          borderColor: "rgba(255, 0, 0, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: "Месяц",
          },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: "Сумма, руб.",
          },
        },
      },
    },
  });
}

function formatMoney(amount) {
  return amount.toLocaleString("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
