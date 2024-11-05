// controllers/meterReaderController.js
const dashBoard = require('../models/dashBoardModel');

exports.getDashboard = (req, res) => {
    MeterReader.getAllMeterReaders((err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching meter readers' });
        }
        res.render('meterReaders', { meterReaders: data });
    });
};

exports.getMeterReaderById = (req, res) => {
    const id = req.params.id;
    MeterReader.getMeterReaderById(id, (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching meter reader' });
        }
        res.json(data);
    });
};

// Additional functions for create, update, delete can be added similarly