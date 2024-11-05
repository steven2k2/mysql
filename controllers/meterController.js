// controllers/meterController.js

// Import formatDate from the utility file
const { formatDate } = require('../utils/dateFormatter');

// Importing the database connection
const db = require('../config/db');

exports.getAllMeters = (req, res) => {
    const sql = 'SELECT * FROM meter_information';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching meters:', err);
            return res.status(500).send('Error retrieving meters');
        }
        // Extract data from root property before rendering
        res.render('meters/browse', { text: 'meters', meters: results, formatDate: formatDate });
    });
};

// New method to fetch a single meter by ID
exports.getMeterById = (req, res) => {
    const meterId = req.params.id; // Extract the meter ID from the request parameters
    const sql = 'SELECT * FROM meter_information WHERE meter_id = ?';

    db.query(sql, [meterId], (err, results) => {
        if (err) {
            console.error(`Error fetching meter with ID ${meterId}:`, err);
            return res.status(500).send('Error retrieving meter');
        }

        if (results.length === 0) {
            return res.status(404).send('Meter not found!!!!!!!!!!');
        }

        // Render the meter details view or send the result as JSON
        //res.render('meterDetails', { activePath: 'meters', meter: results[0] });

        res.render('meters/show', { text: 'meters', data: results, formatDate: formatDate });
    });
};

