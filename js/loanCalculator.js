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
  document.getElementById("monthlyPayment").innerText = formatMoney(monthlyPayment) ;

  var totalLoanAmount = monthlyPayment * loanPeriod;
  document.getElementById("totalLoanAmount").innerText = formatMoney(totalLoanAmount) ;

  var totalOverpayment = totalLoanAmount - loanAmount;
  document.getElementById("totalOverpayment").innerText = formatMoney(totalOverpayment) ;

  var loanTable = document.getElementById("loanTable");
  // Очистка таблицы
  while (loanTable.rows.length > 1) {
    loanTable.deleteRow(1);
  }
  var loanBalance = loanAmount;
  for (var i = 1; i <= loanPeriod; i++) {
    var interestPayment = loanBalance * loanInterest;
    var principalPayment = monthlyPayment - interestPayment;
    loanBalance -= principalPayment;
    var row = loanTable.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerText = i;
    cell2.innerText = formatMoney(principalPayment) ;
    cell3.innerText = formatMoney(interestPayment) ;
    cell4.innerText = (loanBalance > 0 ? formatMoney(loanBalance) : "0.00") ;
  }
}
