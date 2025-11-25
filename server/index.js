const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Allows React to talk to Node
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/flightDB')
    .then(() => console.log('MongoDB Connected locally'))
    .catch(err => console.log(err));

// Define the Data Structure (Schema)
const TelemetrySchema = new mongoose.Schema({
    altitude: { type: Number, required: true }, // 0 - 3000
    his: { type: Number, required: true },      // 0 - 360
    adi: { type: Number, required: true },      // 0 - 100
    timestamp: { type: Date, default: Date.now }
});

const Telemetry = mongoose.model('Telemetry', TelemetrySchema);

// --- API Routes ---

// 1. GET - Get the latest data
app.get('/api/telemetry', async (req, res) => {
    try {//(descending)
        const data = await Telemetry.findOne().sort({ timestamp: -1 });
        // If no data exists, return zeros
        const defaultData = { altitude: 0, his: 0, adi: 0 };
        res.json(data || defaultData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. POST - Save new data
app.post('/api/telemetry', async (req, res) => {
    try {
        const { altitude, his, adi } = req.body;

        if (altitude < 0 || altitude > 3000) {
            return res.status(400).json({ error: "Altitude must be between 0 and 3000" });
        }

        if (his < 0 || his > 360) {
            return res.status(400).json({ error: "HIS must be between 0 and 360" });
        }

        if (adi < 0 || adi > 100) {
            return res.status(400).json({ error: "ADI must be between 0 and 100" });
        }

        const newData = new Telemetry({
            altitude: Number(altitude),
            his: Number(his),
            adi: Number(adi)
        });

        await newData.save();
        res.json({ message: 'Data saved successfully!', data: newData });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start Server on 0.0.0.0 to allow LAN access
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});