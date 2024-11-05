// models/meterReaderModel.js
const db = require('../config/db');

// models/meterReaderModel.js
exports.getAllMeterReaders = (callback) => {
    const query = 'SELECT * FROM new_meter_readers';
    db.query(query, (err, results) => {
        if (err) {
            return callback(err, null);
        }

        // Map over results to add a full_name field and format hire_date
        const formattedResults = results.map(reader => ({
            ...reader,
            full_name: `${reader.first_name} ${reader.last_name}`,
            hire_date: new Date(reader.hire_date).toLocaleDateString('en-UK', {
                year: 'numeric',
                month: 'long',  // 'short' for abbreviated month
                day: 'numeric'
            })
        }));

        callback(null, formattedResults);
    });
};

// Function to get a meter reader by ID
exports.getMeterReaderById = (id, callback) => {
    const query = 'SELECT * FROM new_meter_readers WHERE reader_id = ?';
    alert('getMeterReaderById');
    db.query(query, [id], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result[0]);
    });
};

// Function to get a meter reader by username (email)
exports.getMeterReaderByUsername = (username, callback) => {
    const query = 'SELECT * FROM meter_readers WHERE email = ? LIMIT 1';
    db.query(query, [username], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results[0]); // Return the first result if found, otherwise null
    });
};

// Function to create a new meter reader
exports.createMeterReader = (data, callback) => {
    const query = 'INSERT INTO meter_readers (first_name, last_name, email, phone_number, hire_date, address, city, postal_code, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [data.first_name, data.last_name, data.email, data.phone_number, data.hire_date, data.address, data.city, data.postal_code, data.is_active];
    db.query(query, values, (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result.insertId);
    });
};

// Function to update a meter reader's info
exports.updateMeterReader = (id, data, callback) => {
    const query = 'UPDATE meter_readers SET first_name = ?, last_name = ?, email = ?, phone_number = ?, address = ?, city = ?, postal_code = ?, is_active = ? WHERE reader_id = ?';
    const values = [data.first_name, data.last_name, data.email, data.phone_number, data.address, data.city, data.postal_code, data.is_active, id];
    db.query(query, values, (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
};

// Function to delete a meter reader by ID
exports.deleteMeterReader = (id, callback) => {
    const query = 'DELETE FROM meter_readers WHERE reader_id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
};