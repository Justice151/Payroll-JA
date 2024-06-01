// display.js
document.addEventListener('DOMContentLoaded', () => {
    displayEntries();
    document.getElementById('inputForm').addEventListener('submit', addEntry);
    document.getElementById('removeForm').addEventListener('submit', removeTransaction);
});

function displayEntries() {
    const entries = JSON.parse(localStorage.getItem('workEntries')) || [];
    const tbody = document.getElementById('workTable').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';

    entries.forEach((entry, index) => {
        const row = tbody.insertRow();
        row.insertCell(0).innerText = entry.workerName;
        row.insertCell(1).innerText = entry.hoursWorked;
        row.insertCell(2).innerText = entry.workDescription;
        row.insertCell(3).innerText = entry.hourlyRate;
        row.insertCell(4).innerText = entry.workDate;
        row.insertCell(5).innerText = entry.totalPayment.toFixed(2);

        const removeButton = document.createElement('button');
        removeButton.innerText = 'Remove';
        removeButton.onclick = () => {
            removeTransactionByIndex(index);
        };
        const actionCell = row.insertCell(6);
        actionCell.appendChild(removeButton);
    });
}

function addEntry(e) {
    e.preventDefault();

    const workerName = document.getElementById('workerName').value;
    const hoursWorked = parseFloat(document.getElementById('hoursWorked').value);
    const workDescription = document.getElementById('workDescription').value;
    const hourlyRate = parseFloat(document.getElementById('hourlyRate').value);
    const workDate = document.getElementById('workDate').value;
    const totalPayment = hoursWorked * hourlyRate;

    let entries = JSON.parse(localStorage.getItem('workEntries')) || [];

    entries.push({ workerName, hoursWorked, workDescription, hourlyRate, workDate, totalPayment });

    localStorage.setItem('workEntries', JSON.stringify(entries));

    document.getElementById('inputForm').reset();
    displayEntries();
}

function removeTransactionByIndex(index) {
    let entries = JSON.parse(localStorage.getItem('workEntries')) || [];
    entries.splice(index, 1);
    localStorage.setItem('workEntries', JSON.stringify(entries));
    displayEntries();
}

function removeTransaction(e) {
    e.preventDefault();

    const workerName = document.getElementById('removeWorkerName').value;
    const removeDate = document.getElementById('removeDate').value;
    const removeDescription = document.getElementById('removeDescription').value;
    const removeAmount = parseFloat(document.getElementById('removeAmount').value);

    let entries = JSON.parse(localStorage.getItem('workEntries')) || [];
    let entryFound = false;

    entries = entries.map(entry => {
        if (entry.workerName === workerName && entry.workDate === removeDate && entry.workDescription === removeDescription) {
            entry.totalPayment -= removeAmount;
            entryFound = true;
        }
        return entry;
    });

    if (entryFound) {
        localStorage.setItem('workEntries', JSON.stringify(entries));
        displayEntries();
        alert(`Removed $${removeAmount.toFixed(2)} from ${workerName} on ${removeDate}`);
    } else {
        alert('No matching entry found.');
    }

    document.getElementById('removeForm').reset();
}
