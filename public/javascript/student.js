// index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000; // You can use any port that is free

// Middleware setup
app.use(cors()); // Enable CORS to allow requests from other origins
app.use(bodyParser.json()); // Parse JSON request bodies

// Endpoint to handle QR code scanning
app.post('/scan', (req, res) => {
    const qrData = req.body; // Extract QR code data from the request body
    
    // Perform any processing or validation here
    console.log('QR Code Data:', qrData);

    // Example response
    res.json({
        success: true,
        message: 'QR Code data received successfully',
        data: qrData
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/qr_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const qrSchema = new mongoose.Schema({
    qrCodeData: String,
    timestamp: { type: Date, default: Date.now }
});

const QrModel = mongoose.model('Qr', qrSchema);

app.post('/scan', async (req, res) => {
    const qrData = req.body;
    
    try {
        // Save QR code data to the database
        const newQr = new QrModel(qrData);
        await newQr.save();
        
        // Send success response
        res.json({
            success: true,
            message: 'QR Code data saved successfully',
            data: qrData
        });
    } catch (error) {
        console.error('Error saving QR Code data:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

