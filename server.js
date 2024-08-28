const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/perfect_fleet', { useNewUrlParser: true, useUnifiedTopology: true });

// Define schemas and models
const driverSchema = new mongoose.Schema({
    driverName: String,
    vehicleId: String,
    startTime: String,
    endTime: String,
    distance: Number,
    route: String,
    fuelConsumption: Number,
    tripDuration: String
});

const fleetSchema = new mongoose.Schema({
    vehicleType: String,
    modelNumber: String,
    chassisNumber: String,
    purchaseAmount: Number,
    purchaseDate: String
});

const maintenanceSchema = new mongoose.Schema({
    vehicleId: String,
    maintenanceDate: String,
    description: String,
    cost: Number
});

const Driver = mongoose.model('Driver', driverSchema);
const Fleet = mongoose.model('Fleet', fleetSchema);
const Maintenance = mongoose.model('Maintenance', maintenanceSchema);

// API routes
app.get('/api/drivers', async (req, res) => {
    const drivers = await Driver.find();
    res.json(drivers);
});

app.get('/api/fleet', async (req, res) => {
    const fleet = await Fleet.find();
    res.json(fleet);
});

app.get('/api/maintenance', async (req, res) => {
    const maintenance = await Maintenance.find();
    res.json(maintenance);
});

// Add more CRUD operations as needed

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
