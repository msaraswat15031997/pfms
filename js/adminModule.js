async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch data from ${url}`);
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

function populateTable(tableId, data) {
    const tableBody = document.querySelector(`#${tableId} tbody`);
    tableBody.innerHTML = '';

    data.forEach(item => {
        const row = document.createElement('tr');

        for (const key in item) {
            if (item.hasOwnProperty(key)) {
                const cell = document.createElement('td');
                cell.textContent = item[key];
                row.appendChild(cell);
            }
        }

        tableBody.appendChild(row);
    });
}

function filterTable(inputId, tableId) {
    const input = document.querySelector(`#${inputId}`);
    input.addEventListener('input', () => {
        const filter = input.value.toLowerCase();
        const table = document.querySelector(`#${tableId}`);
        const rows = table.querySelectorAll('tbody tr');

        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            const rowText = Array.from(cells).map(cell => cell.textContent.toLowerCase()).join(' ');
            row.style.display = rowText.includes(filter) ? '' : 'none';
        });
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    // Fetch data from backend API
    const driverData = await fetchData('http://localhost:5000/api/drivers');
    const fleetData = await fetchData('http://localhost:5000/api/fleet');
    const maintenanceData = await fetchData('http://localhost:5000/api/maintenance');

    // Populate tables with fetched data
    populateTable('driverData', driverData);
    populateTable('fleetData', fleetData);
    populateTable('maintenanceData', maintenanceData);

    // Add filtering functionality
    filterTable('driverFilter', 'driverData');
    filterTable('fleetFilter', 'fleetData');
    filterTable('maintenanceFilter', 'maintenanceData');
});
