// controllers/customerController.js

// Importing the database connection
const db = require('../config/db');

exports.getAllCustomers = (req, res) => {
    const sql = 'SELECT * FROM customers LIMIT 25';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching customers:', err);
            return res.status(500).send('Error retrieving customers');
        }
        // Pass the data to the 'customers' view template
        res.render('customers', { customers: results });
    });
};
