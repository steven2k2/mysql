// routes/aboutRoutes.js
const express = require('express');
const router = express.Router();

// Route to render the static about page
router.get('/', (req, res) => {
    res.render('about'); // Render the about.ejs view
});

module.exports = router;