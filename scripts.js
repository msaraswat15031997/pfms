// Existing Fleet management code...

// Driver module logic (log, view, edit, delete trip data)
let tripData = [];

// Handle trip log form submission
document.getElementById('tripLogForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const driverName = document.getElementById('driverName').value;
    const vehicleId = document.getElementById('vehicleId').value;
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;
    const distance = document.getElementById('distance').value;
    const route = document.getElementById('route').value;
    const fuelConsumption = document.getElementById('fuelConsumption').value;
    const tripDuration = document.getElementById('tripDuration').value;

    const newTrip = {
        driverName,
        vehicleId,
        startTime,
        endTime,
        distance,
        route,
        fuelConsumption,
        tripDuration
    };

    tripData.push(newTrip);
    updateTripTable();
    document.getElementById('tripLogForm').reset();
});

function updateTripTable() {
    const tripTableBody = document.querySelector('#tripLogTable tbody');
    tripTableBody.innerHTML = '';

    tripData.forEach((trip, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${trip.driverName}</td>
            <td>${trip.vehicleId}</td>
            <td>${trip.startTime}</td>
            <td>${trip.endTime}</td>
            <td>${trip.distance}</td>
            <td>${trip.route}</td>
            <td>${trip.fuelConsumption}</td>
            <td>${trip.tripDuration}</td>
            <td class="actions">
                <button onclick="editTrip(${index})">Edit</button>
                <button onclick="deleteTrip(${index})">Delete</button>
            </td>
        `;

        tripTableBody.appendChild(row);
    });
}

function editTrip(index) {
    const trip = tripData[index];

    document.getElementById('driverName').value = trip.driverName;
    document.getElementById('vehicleId').value = trip.vehicleId;
    document.getElementById('startTime').value = trip.startTime;
    document.getElementById('endTime').value = trip.endTime;
    document.getElementById('distance').value = trip.distance;
    document.getElementById('route').value = trip.route;
    document.getElementById('fuelConsumption').value = trip.fuelConsumption;
    document.getElementById('tripDuration').value = trip.tripDuration;

    document.getElementById('tripLogForm').removeEventListener('submit', addTrip);
    document.getElementById('tripLogForm').addEventListener('submit', function(event) {
        event.preventDefault();
        updateTrip(index);
    });
}

function updateTrip(index) {
    tripData[index] = {
        driverName: document.getElementById('driverName').value,
        vehicleId: document.getElementById('vehicleId').value,
        startTime: document.getElementById('startTime').value,
        endTime: document.getElementById('endTime').value,
        distance: document.getElementById('distance').value,
        route: document.getElementById('route').value,
        fuelConsumption: document.getElementById('fuelConsumption').value,
        tripDuration: document.getElementById('tripDuration').value
    };

    updateTripTable();
    document.getElementById('tripLogForm').reset();

    document.getElementById('tripLogForm').removeEventListener('submit', updateTrip);
    document.getElementById('tripLogForm').addEventListener('submit', addTrip);
}

function deleteTrip(index) {
    tripData.splice(index, 1);
    updateTripTable();
}

function addTrip(event) {
    event.preventDefault();

    const driverName = document.getElementById('driverName').value;
    const vehicleId = document.getElementById('vehicleId').value;
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;
    const distance = document.getElementById('distance').value;
    const route = document.getElementById('route').value;
    const fuelConsumption = document.getElementById('fuelConsumption').value;
    const tripDuration = document.getElementById('tripDuration').value;

    const newTrip = {
        driverName,
        vehicleId,
        startTime,
        endTime,
        distance,
        route,
        fuelConsumption,
        tripDuration
    };

    tripData.push(newTrip);
    updateTripTable();
    document.getElementById('tripLogForm').reset();
}
