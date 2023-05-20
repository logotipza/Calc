function drawChart(data) {
    var svg = document.getElementById("chart");
    svg.innerHTML = "";

    var width = svg.clientWidth;
    var height = svg.clientHeight;
    var margin = 40;
    var chartWidth = width - 2 * margin;
    var chartHeight = height - 2 * margin;

    var maxData = Math.max(...data);

    var xScale = chartWidth / (data.length - 1);
    var yScale = chartHeight / maxData;

    var pathData = "M";
    for (var i = 0; i < data.length; i++) {
        var x = i * xScale + margin;
        var y = chartHeight - data[i] * yScale + margin;
        pathData += x + "," + y + " ";
    }

    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", pathData);
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", "black");

    svg.appendChild(path);

    // Draw x-axis
    var xAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
    xAxis.setAttribute("x1", margin);
    xAxis.setAttribute("y1", chartHeight + margin);
    xAxis.setAttribute("x2", width - margin);
    xAxis.setAttribute("y2", chartHeight + margin);
    xAxis.setAttribute("stroke", "black");

    svg.appendChild(xAxis);

    // Draw y-axis
    var yAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
    yAxis.setAttribute("x1", margin);
    yAxis.setAttribute("y1", margin);
    yAxis.setAttribute("x2", margin);
    yAxis.setAttribute("y2", chartHeight + margin);
    yAxis.setAttribute("stroke", "black");

    svg.appendChild(yAxis);

    // Add labels
    var labels = document.createElementNS("http://www.w3.org/2000/svg", "g");
    labels.setAttribute("class", "labels");

    var step = Math.ceil(data.length / (chartWidth / 60)); // Шаг изменения для значений оси x

    for (var i = 0; i < data.length; i += step) {
        var x = i * xScale + margin;
        var y = chartHeight + margin + 15;

        var label = document.createElementNS("http://www.w3.org/2000/svg", "text");
        label.setAttribute("x", x);
        label.setAttribute("y", y);
        label.setAttribute("text-anchor", "middle");
        label.setAttribute("font-size", "12px");
        label.textContent = i + 1;

        labels.appendChild(label);
    }

    svg.appendChild(labels);

    // Add vertical axis labels
    var yAxisLabels = document.createElementNS("http://www.w3.org/2000/svg", "g");
    yAxisLabels.setAttribute("class", "y-axis-labels");

    var labelStep = maxData / 5;
    for (var i = 0; i <= 5; i++) {
        var y = chartHeight - i * labelStep * yScale + margin;

        var label = document.createElementNS("http://www.w3.org/2000/svg", "text");
        label.setAttribute("x", margin - 10);
        label.setAttribute("y", y + 5);
        label.setAttribute("text-anchor", "end");
        label.setAttribute("font-size", "12px");
        label.textContent = (labelStep * i).toFixed(2);

        yAxisLabels.appendChild(label);
    }

    svg.appendChild(yAxisLabels);

    // Add horizontal grid lines
    var gridLines = document.createElementNS("http://www.w3.org/2000/svg", "g");
    gridLines.setAttribute("class", "grid-lines");

    for (var i = 0; i <= 5; i++) {
        var y = chartHeight - i * labelStep * yScale + margin;

        var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", margin);
        line.setAttribute("y1", y);
        line.setAttribute("x2", width - margin);
        line.setAttribute("y2", y);
        line.setAttribute("stroke", "#ddd");
        line.setAttribute("stroke-dasharray", "3 3");

        gridLines.appendChild(line);
    }

    svg.appendChild(gridLines);

    // Create the table
    var table = document.getElementById("table");
    table.innerHTML = "";

    var headerRow = table.insertRow(0);
    var headerCell1 = headerRow.insertCell(0);
    var headerCell2 = headerRow.insertCell(1);
    headerCell1.textContent = "Месяц";
    headerCell2.textContent = "Проценты";

    for (var i = 0; i < data.length; i++) {
        var row = table.insertRow(i + 1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.textContent = i + 1;
        cell2.textContent = data[i].toFixed(2);
    }
}
