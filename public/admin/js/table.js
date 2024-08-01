
function printTable(tableId) {
    var printContents = document.getElementById(tableId).outerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    location.reload();
}

function exportToExcel(tableId, fileName) {
    var table = document.getElementById(tableId);
    var wb = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });
    XLSX.writeFile(wb, `${fileName}.xlsx`);
}

function exportToPDF(tableId, fileName) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text(fileName, 20, 10);
    doc.autoTable({
        startY: 20,
        html: `#${tableId}`,
        theme: 'grid',
        headStyles: { fillColor: [0, 0, 0] },
        styles: { cellPadding: 2, fontSize: 10 },
    });
    doc.save(`${fileName}.pdf`);
}

function exportToCSV(tableId, fileName) {
    var table = document.getElementById(tableId);
    var rows = Array.from(table.querySelectorAll('tr'));
    var csvContent = rows.map(row => {
        var cells = Array.from(row.querySelectorAll('th, td'));
        return cells.map(cell => cell.textContent).join(',');
    }).join('\n');

    var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    var link = document.createElement("a");
    var url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${fileName}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function copyTable(tableId) {
    var table = document.getElementById(tableId);
    var range = document.createRange();
    range.selectNode(table);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    alert("Table data copied to clipboard!");
}




document.addEventListener("DOMContentLoaded", function () {
createCheckboxes();
});

function createCheckboxes() {
var table = document.getElementById("productTable");
var headerCells = table.getElementsByTagName("th");
var dropdown = document.getElementById("columnDropdown");

for (var i = 0; i < headerCells.length; i++) {
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = i + 1; // Column index starting from 1
    checkbox.checked = true; // Initially check all checkboxes
    checkbox.onclick = function () { toggleColumn(this.value); };

    var label = document.createElement("label");
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(" " + headerCells[i].innerText));

    dropdown.appendChild(label);
    dropdown.appendChild(document.createElement("br"));
}
}

function toggleDropdown() {
document.getElementById("columnDropdown").classList.toggle("show");
}

function toggleColumn(columnIndex) {
var table = document.getElementById("productTable");
var rows = table.rows;

for (var i = 0; i < rows.length; i++) {
    var cells = rows[i].cells;
    if (cells.length > columnIndex - 1) {
        var cell = cells[columnIndex - 1];
        cell.style.display = (cell.style.display === "none") ? "" : "none";
    }
}
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
if (!event.target.matches('button')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
        }
    }
}
}

function searchTable() {
// Declare variables
var input, filter, table, tr, td, i, j, txtValue;
input = document.getElementById("searchInput");
filter = input.value.toUpperCase();
table = document.getElementById("productTable");
tr = table.getElementsByTagName("tr");

// Loop through all table rows, except the header row
for (i = 1; i < tr.length; i++) {
    tr[i].style.display = "none"; // Hide the row by default
    td = tr[i].getElementsByTagName("td");
    for (j = 0; j < td.length; j++) {
        if (td[j]) {
            txtValue = td[j].textContent || td[j].innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = ""; // Show the row
                break;
            }
        }
    }
}
}
function sortTable(columnIndex) {
var table, rows, switching, i, x, y, shouldSwitch, dir, switchCount = 0;
table = document.getElementById("productTable");
switching = true;
dir = "asc"; // Set the sorting direction to ascending

while (switching) {
    switching = false;
    rows = table.rows;

    for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[columnIndex];
        y = rows[i + 1].getElementsByTagName("TD")[columnIndex];

        if (dir === "asc") {
            if (isNumeric(x.innerHTML) && isNumeric(y.innerHTML)) {
                if (parseFloat(x.innerHTML) > parseFloat(y.innerHTML)) {
                    shouldSwitch = true;
                    break;
                }
            } else if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                shouldSwitch = true;
                break;
            }
        } else if (dir === "desc") {
            if (isNumeric(x.innerHTML) && isNumeric(y.innerHTML)) {
                if (parseFloat(x.innerHTML) < parseFloat(y.innerHTML)) {
                    shouldSwitch = true;
                    break;
                }
            } else if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                shouldSwitch = true;
                break;
            }
        }
    }

    if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchCount++;
    } else {
        if (switchCount === 0 && dir === "asc") {
            dir = "desc";
            switching = true;
        }
    }
}
}

// Utility function to check if a value is numeric
function isNumeric(value) {
return !isNaN(value - parseFloat(value));
}



let currentPage = 1;
let recordsPerPage = 10;

document.addEventListener("DOMContentLoaded", function() {
displayTable();
});

function displayTable() {
const table = document.getElementById("productTable");
const tbody = table.querySelector("tbody");
const rows = tbody.querySelectorAll("tr");
const totalRows = rows.length;
const totalPages = Math.ceil(totalRows / recordsPerPage);

// Hide all rows initially
for (let i = 0; i < totalRows; i++) {
    rows[i].style.display = "none";
}

// Display rows for the current page
const start = (currentPage - 1) * recordsPerPage;
const end = start + recordsPerPage;
for (let i = start; i < end && i < totalRows; i++) {
    rows[i].style.display = "";
}

// Update the pagination controls
document.getElementById("currentPage").textContent = `Page ${currentPage} of ${totalPages}`;
document.querySelector("button[onclick='previousPage()']").disabled = currentPage === 1;
document.querySelector("button[onclick='nextPage()']").disabled = currentPage === totalPages;
}

function changeRecordsPerPage() {
recordsPerPage = parseInt(document.getElementById("recordsPerPage").value);
currentPage = 1; // Reset to first page
displayTable();
}

function previousPage() {
if (currentPage > 1) {
    currentPage--;
    displayTable();
}
}

function nextPage() {
const totalRows = document.getElementById("productTable").querySelector("tbody").querySelectorAll("tr").length;
const totalPages = Math.ceil(totalRows / recordsPerPage);
if (currentPage < totalPages) {
    currentPage++;
    displayTable();
}
}



