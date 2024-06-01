// input.js
document.getElementById('inputForm').addEventListener('submit', calculateTotalPay);

function calculateTotalPay(e) {
    e.preventDefault();
    
    const workerName = document.getElementById('workerName').value;
    const hoursWorked = parseFloat(document.getElementById('hoursWorked').value);
    const hourlyRate = parseFloat(document.getElementById('hourlyRate').value);
    const totalPayment = hoursWorked * hourlyRate;

    document.getElementById('totalPay').innerText = `Total Pay for ${workerName}: $${totalPayment.toFixed(2)}`;
    
    // Save the entry in localStorage
    const entry = { workerName, hoursWorked, hourlyRate, totalPayment };
    let entries = JSON.parse(localStorage.getItem('workEntries')) || [];
    entries.push(entry);
    localStorage.setItem('workEntries', JSON.stringify(entries));
}
