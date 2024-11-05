// Importing the database connection
const db = require('../config/db');
const { formatDate } = require('../utils/dateFormatter');

// Helper function to format address without unnecessary commas
const formatAddress = (reader) => {
    const { address_street, address_city, address_region, address_postal_code, address_country } = reader;

    // Create an array of address components, filtering out any that are undefined or empty
    const addressComponents = [
        address_street,
        address_city,
        address_region,
        address_postal_code,
        address_country
    ].filter(component => component); // Filters out falsy values like undefined, null, or empty strings

    // Join the components with a comma and space, handling missing fields gracefully
    return addressComponents.join(', ');
};

// Get all meter readers
exports.getAllReaders = (req, res) => {
    const sql = 'SELECT * FROM meter_readers ORDER BY name;';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching meter readers:', err);
            return res.status(500).json({ message: 'Server error' });
        }

        // Add formatted address to each reader
        const readersWithAddress = results.map(reader => ({
            ...reader,
            fullAddress: formatAddress(reader)
        }));

        res.render('readers/browse', {
            text: 'readers',
            readers: readersWithAddress,
            formatDate: formatDate
        });
    });
};

// Get a meter reader by ID
exports.getReaderById = (req, res) => {
    const readerId = req.params.id;
    const sql = 'SELECT * FROM meter_readers WHERE reader_id = ?';

    db.query(sql, [readerId], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ success: false, message: 'Server error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'Meter reader not found' });
        }

        const reader = results[0];
        reader.full_address = formatAddress(reader); // Add formatted address

        res.render('readers/show', {
            text: 'readers',
            data: reader,
            formatDate: formatDate
        });
    });
};

// Create a new meter reader
exports.createReader = (req, res) => {
    const { name, contact_number, email, hire_date, active, street, city, region, postal_code, country } = req.body;
    const sql = 'INSERT INTO meter_readers (name, contact_number, email, hire_date, active, street, city, region, postal_code, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    db.query(sql, [name, contact_number, email, hire_date, active, street, city, region, postal_code, country], (err, results) => {
        if (err) {
            console.error('Error creating meter reader:', err);
            return res.status(500).json({ success: false, message: 'Server error' });
        }
        res.status(201).json({ success: true, message: 'Meter reader created', readerId: results.insertId });
    });
};

// Update a meter reader by ID
exports.updateReaderById = (req, res) => {
    const readerId = req.params.id;
    const { name, contact_number, email, hire_date, active, street, city, region, postal_code, country } = req.body;
    const sql = 'UPDATE meter_readers SET name = ?, contact_number = ?, email = ?, hire_date = ?, active = ?, street = ?, city = ?, region = ?, postal_code = ?, country = ? WHERE reader_id = ?';

    db.query(sql, [name, contact_number, email, hire_date, active, street, city, region, postal_code, country, readerId], (err, results) => {
        if (err) {
            console.error('Error updating meter reader:', err);
            return res.status(500).json({ success: false, message: 'Server error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Meter reader not found' });
        }
        res.status(200).json({ success: true, message: 'Meter reader updated' });
    });
};

// Delete a meter reader by ID
exports.deleteReaderById = (req, res) => {
    const readerId = req.params.id;
    const sql = 'DELETE FROM meter_readers WHERE reader_id = ?';

    db.query(sql, [readerId], (err, results) => {
        if (err) {
            console.error('Error deleting meter reader:', err);
            return res.status(500).json({ success: false, message: 'Server error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Meter reader not found' });
        }
        res.status(200).json({ success: true, message: 'Meter reader deleted' });
    });
};