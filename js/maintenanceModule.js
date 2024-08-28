// maintenanceModule.js

let maintenanceData = [];

// Handle maintenance log form submission
document.getElementById('maintenanceForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const vehicleId = document.getElementById('vehicleId').value;
    const maintenanceDate = document.getElementById('maintenanceDate').value;
    const description = document.getElementById('description').value;
    const cost = document.getElementById('cost').value;

    const newLog = {
        vehicleId,
        maintenanceDate,
        description,
        cost
    };

    maintenanceData.push(newLog);
    updateMaintenanceTable();
    document.getElementById('maintenanceForm').reset();
});

function updateMaintenanceTable() {
    const maintenanceTableBody = document.querySelector('#maintenanceTable tbody');
    maintenanceTableBody.innerHTML = '';

    maintenanceData.forEach((log, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${log.vehicleId}</td>
            <td>${log.maintenanceDate}</td>
            <td>${log.description}</td>
            <td>${log.cost}</td>
            <td class="actions">
                <button onclick="editMaintenance(${index})">Edit</button>
                <button onclick="deleteMaintenance(${index})">Delete</button>
            </td>
        `;

        maintenanceTableBody.appendChild(row);
    });
}

function editMaintenance(index) {
    const log = maintenanceData[index];

    document.getElementById('vehicleId').value = log.vehicleId;
    document.getElementById('maintenanceDate').value = log.maintenanceDate;
    document.getElementById('description').value = log.description;
    document.getElementById('cost').value = log.cost;

    document.getElementById('maintenanceForm').removeEventListener('submit', addMaintenance);
    document.getElementById('maintenanceForm').addEventListener('submit', function(event) {
        event.preventDefault();
        updateMaintenance(index);
    });
}

function updateMaintenance(index) {
    maintenanceData[index] = {
        vehicleId: document.getElementById('vehicleId').value,
        maintenanceDate: document.getElementById('maintenanceDate').value,
        description: document.getElementById('description').value,
        cost: document.getElementById('cost').value
    };

    updateMaintenanceTable();
    document.getElementById('maintenanceForm').reset();

    document.getElementById('maintenanceForm').removeEventListener('submit', updateMaintenance);
    document.getElementById('maintenanceForm').addEventListener('submit', addMaintenance);
}

function deleteMaintenance(index) {
    maintenanceData.splice(index, 1);
    updateMaintenanceTable();
}
