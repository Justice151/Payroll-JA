// display.js
document.addEventListener('DOMContentLoaded', displayEntries);

function displayEntries() {
    const entries = JSON.parse(localStorage.getItem('workEntries')) || [];
    const tbody = document.getElementById('workTable').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';

    entries.forEach(entry => {
        const row = tbody.insertRow();
        row.insertCell(0).innerText = entry.workerName;
        row.insertCell(1).innerText = entry.hoursWorked;
        row.insertCell(2).innerText = entry.workDescription;
        row.insertCell(3).innerText = entry.hourlyRate;
        row.insertCell(4).innerText = entry.workDate;
        row.insertCell(5).innerText = entry.totalPayment.toFixed(2);
    });
}
