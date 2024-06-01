// script.js
document.getElementById('workForm').addEventListener('submit', addEntry);

function addEntry(e) {
    e.preventDefault();
    
    const workerName = document.getElementById('workerName').value;
    const hoursWorked = parseFloat(document.getElementById('hoursWorked').value);
    const workDescription = document.getElementById('workDescription').value;
    const hourlyRate = parseFloat(document.getElementById('hourlyRate').value);
    const totalPayment = hoursWorked * hourlyRate;

    const entry = { workerName, hoursWorked, workDescription, hourlyRate, totalPayment };
    let entries = JSON.parse(localStorage.getItem('workEntries')) || [];
    entries.push(entry);
    localStorage.setItem('workEntries', JSON.stringify(entries));

    displayEntries();
    document.getElementById('workForm').reset();
}

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
        row.insertCell(4).innerText = entry.totalPayment.toFixed(2);
    });
}

// Initial display of entries
displayEntries();
