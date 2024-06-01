// main.js
document.addEventListener('DOMContentLoaded', displayTotalPayments);

function displayTotalPayments() {
    const entries = JSON.parse(localStorage.getItem('workEntries')) || [];
    const totals = {};

    // Calculate total payments for each worker
    entries.forEach(entry => {
        if (!totals[entry.workerName]) {
            totals[entry.workerName] = 0;
        }
        totals[entry.workerName] += entry.totalPayment;
    });

    const tbody = document.getElementById('totalTable').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';

    for (const [workerName, totalPayment] of Object.entries(totals)) {
        const row = tbody.insertRow();
        row.insertCell(0).innerText = workerName;
        row.insertCell(1).innerText = totalPayment.toFixed(2);
    }
}
