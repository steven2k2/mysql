// routes/readerRoutes.js
const express = require('express');
const router = express.Router();
const readersController = require('../controllers/readersController');

// Route to display all meter readers
router.get('/', readersController.getAllReaders);

// Route to get a specific meter reader by ID
router.get('/:id', readersController.getReaderById);

// Additional routes for create, update, delete

module.exports = router;