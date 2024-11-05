const express = require('express');
const path = require('path');
const session = require('express-session'); // Import express-session

const customerRoutes = require('./routes/customerRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const readerRoutes = require('./routes/readerRoutes');
const meterRoutes = require('./routes/meterRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const signInRoutes = require('./routes/signInRoutes');
const portalRoutes = require('./routes/portalRoutes');
const readingsRoutes = require('./routes/readingsRoutes');

const app = express();

// Middleware for sessions
app.use(session({
    secret: 'your_secret_key', // Use a strong secret in production
    resave: false,             // Prevents saving session if not modified
    saveUninitialized: false,  // Prevents saving uninitialized sessions
    cookie: { secure: false }  // Set to true if using HTTPS
}));


// Middleware
app.use(express.json()); // JSON parsing middleware
app.use(express.urlencoded({ extended: true })); // Middleware to parse form data
//app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Serve static files from the 'public' directory
app.use(express.static('public'));

app.use(express.static('images'));

// Set view engine to EJS
app.set('view engine', 'ejs');

// // Root route for the homepage (or redirect to dashboard)
// app.get('/', (req, res) => res.render('index'));

// // Root route
// app.get('/', (req, res) => {
//     res.render('index', { username: req.session.username || null });
// });


// Route handlers
app.use('/sign-in', signInRoutes); // Register the sign-in route
app.use('/customers', customerRoutes);
app.use('/meters', meterRoutes);
app.use('/readers', readerRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/about', aboutRoutes);
app.use('/portal', portalRoutes);
app.use('/readings', readingsRoutes);

// Default route
app.get('/', (req, res) => {
    res.render('pages/index', { title: 'Home' });
});

// Start server on configurable port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));