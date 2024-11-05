// controllers/meterController.js

// Importing the database connection
const db = require('../config/db');

exports.getAllMeters = (req, res) => {
    const sql = 'SELECT * FROM meter_assets';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching meters:', err);
            return res.status(500).send('Error retrieving meters');
        }
        // Pass the data to the 'meters' view template
        res.render('readings/browse', { text: 'readings', meters: results });
    });
};
