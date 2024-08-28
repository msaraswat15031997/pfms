// fleetModule.js

let fleetData = [];

document.getElementById('fleetForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const vehicleType = document.getElementById('vehicleType').value;
    const modelNumber = document.getElementById('modelNumber').value;
    const chassisNumber = document.getElementById('chassisNumber').value;
    const purchaseAmount = document.getElementById('purchaseAmount').value;
    const purchaseDate = document.getElementById('purchaseDate').value;

    const newFleet = {
        vehicleType,
        modelNumber,
        chassisNumber,
        purchaseAmount,
        purchaseDate
    };

    fleetData.push(newFleet);
    updateFleetTable();
    document.getElementById('fleetForm').reset();
});

function updateFleetTable() {
    const fleetTableBody = document.querySelector('#fleetTable tbody');
    fleetTableBody.innerHTML = '';

    fleetData.forEach((fleet, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${fleet.vehicleType}</td>
            <td>${fleet.modelNumber}</td>
            <td>${fleet.chassisNumber}</td>
            <td>${fleet.purchaseAmount}</td>
            <td>${fleet.purchaseDate}</td>
            <td class="actions">
                <button onclick="editFleet(${index})">Edit</button>
                <button onclick="deleteFleet(${index})">Delete</button>
            </td>
        `;

        fleetTableBody.appendChild(row);
    });
}

function editFleet(index) {
    const fleet = fleetData[index];

    document.getElementById('vehicleType').value = fleet.vehicleType;
    document.getElementById('modelNumber').value = fleet.modelNumber;
    document.getElementById('chassisNumber').value = fleet.chassisNumber;
    document.getElementById('purchaseAmount').value = fleet.purchaseAmount;
    document.getElementById('purchaseDate').value = fleet.purchaseDate;

    document.getElementById('fleetForm').removeEventListener('submit', addFleet);
    document.getElementById('fleetForm').addEventListener('submit', function(event) {
        event.preventDefault();
        updateFleet(index);
    });
}

function updateFleet(index) {
    fleetData[index] = {
        vehicleType: document.getElementById('vehicleType').value,
        modelNumber: document.getElementById('modelNumber').value,
        chassisNumber: document.getElementById('chassisNumber').value,
        purchaseAmount: document.getElementById('purchaseAmount').value,
        purchaseDate: document.getElementById('purchaseDate').value
    };

    updateFleetTable();
    document.getElementById('fleetForm').reset();

    document.getElementById('fleetForm').removeEventListener('submit', updateFleet);
    document.getElementById('fleetForm').addEventListener('submit', addFleet);
}

function deleteFleet(index) {
    fleetData.splice(index, 1);
    updateFleetTable();
}
