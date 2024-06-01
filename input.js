// input.js
document.getElementById('inputForm').addEventListener('submit', calculateTotalPay);

function calculateTotalPay(e) {
    e.preventDefault();
    
    const workerName = document.getElementById('workerName').value;
    const hoursWorked = parseFloat(document.getElementById('hoursWorked').value);
    const workDescription = document.getElementById('workDescription').value;
    const hourlyRate = parseFloat(document.getElementById('hourlyRate').value);
    const totalPayment = hoursWorked * hourlyRate;

    let entries = JSON.parse(localStorage.getItem('workEntries')) || [];
    let workerExists = false;

    entries = entries.map(entry => {
        if (entry.workerName === workerName) {
            workerExists = true;
            entry.hoursWorked += hoursWorked;
            entry.totalPayment += totalPayment;
        }
        return entry;
    });

    if (!workerExists) {
        entries.push({ workerName, hoursWorked, workDescription, hourlyRate, totalPayment });
    }

    localStorage.setItem('workEntries', JSON.stringify(entries));

    document.getElementById('totalPay').innerText = `Total Pay for ${workerName}: $${entries.find(entry => entry.workerName === workerName).totalPayment.toFixed(2)}`;
}
