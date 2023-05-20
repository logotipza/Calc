function calculateInterest() {
    var initialAmount = parseFloat(document.getElementById("initialAmount").value);
    var interestRate = parseFloat(document.getElementById("interestRate").value) / 100;
    var investmentTerm = parseInt(document.getElementById("investmentTerm").value);

    var totalAmount = initialAmount;
    var interestTable = document.getElementById("interestTable");
    var tableBody = interestTable.getElementsByTagName("tbody")[0];
    // Clear the table body
    tableBody.innerHTML = "";

    for (var month = 1; month <= investmentTerm; month++) {
        var interest = totalAmount * interestRate;
        totalAmount += interest;

        var row = tableBody.insertRow();
        var monthCell = row.insertCell();
        var amountCell = row.insertCell();

        monthCell.textContent = month;
        amountCell.textContent = totalAmount.toFixed(2) + ' руб.';
    }

    document.getElementById("totalAmount").textContent = totalAmount.toFixed(2) + ' руб.';
}
