var chart = null; // Переменная для хранения графика

function calculateInterest() {
    var initialAmount = parseFloat(document.getElementById("initialAmount").value);
    var interestRate = parseFloat(document.getElementById("interestRate").value) / 100;
    var investmentTerm = parseInt(document.getElementById("investmentTerm").value);

    var totalAmount = initialAmount * Math.pow(1 + interestRate, investmentTerm);
    document.getElementById("totalAmount").innerText = totalAmount.toFixed(2) + ' руб.';

    var interestTable = document.getElementById("interestTable");
    var tableBody = interestTable.querySelector("tbody");

    // Очистка таблицы
    while (tableBody.firstChild) {
        tableBody.firstChild.remove();
    }

    // Генерация данных для таблицы
    for (var year = 1; year <= investmentTerm; year++) {
        var newRow = tableBody.insertRow();
        var yearCell = newRow.insertCell();
        var amountCell = newRow.insertCell();

        yearCell.innerText = year;
        amountCell.innerText = (initialAmount * Math.pow(1 + interestRate, year)).toFixed(2) + ' руб.';
    }

    // Удаление предыдущего графика, если он существует
    if (chart) {
        chart.destroy();
    }

    // Создание нового графика
    var ctx = document.getElementById("chart").getContext("2d");
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: investmentTerm }, (_, i) => (i + 1).toString()),
            datasets: [{
                label: 'Накопления',
                data: Array.from({ length: investmentTerm }, (_, i) => initialAmount * Math.pow(1 + interestRate, i + 1)),
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Год'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Накопления, руб.'
                    }
                }
            }
        }
    });
}