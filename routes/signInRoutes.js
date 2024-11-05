const express = require('express');
const router = express.Router();
const MeterReader = require('../models/meterReaderModel');

// Route to render the sign-in form
router.get('/', (req, res) => {
    console.log('Rendering sign-in form'); // Debugging: Log when the sign-in form is being rendered
    res.render('signIn', { errorMessage: null, showError: false }); // No error message or flag on first load
});

// Route to handle sign-in form submission
router.post('/', (req, res) => {
    const { username, password } = req.body;

    // Debugging: Log the username (but NOT the password for security reasons)
    console.log('Sign-In Attempt:', { username });

    // Validate the presence of username and password
    if (!username || !password) {
        console.warn('Sign-In Error: Missing username or password'); // Debugging: Warn if username or password is missing
        return res.render('signIn', {
            errorMessage: 'Username and password are required.',
            showError: true
        });
    }

    // Fetch user data by username
    MeterReader.getMeterReaderByUsername(username, (err, reader) => {
        if (err) {
            console.error('Database error:', err); // Debugging: Log database errors for troubleshooting

            // Render with a database error message
            return res.render('signIn', {
                errorMessage: 'An error occurred. Please try again later.',
                showError: true
            });
        }

        // Check if a reader was found and the password matches
        if (reader && reader.password === password) {  // Adjust this based on your actual password check mechanism
            console.log('User found:', { id: reader.id, email: reader.email }); // Debugging: Log user details (id and email only)

            // Store user details in the session
            req.session.first_name = reader.first_name;
            req.session.full_name = `${reader.first_name} ${reader.last_name}`;
            req.session.username = reader.email;

            // Debugging: Confirm session data is set
            console.log('Session data set:', {
                first_name: req.session.first_name,
                full_name: req.session.full_name,
                username: req.session.username
            });

            // Redirect to the home page after successful sign-in
            console.log('Sign-in successful, redirecting to home page');
            res.redirect('/meters');
        } else {
            // Log if the username was not found or password is incorrect
            console.log(`Failed sign-in attempt for username "${username}". Rendering sign-in with error message.`);

            // Render the sign-in form with an error message and showError flag
            res.render('signIn', {
                errorMessage: 'Incorrect username or password. Please try again.',
                showError: true
            });
        }
    });
});

module.exports = router;