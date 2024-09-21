
// Import necessary modules
const express = require('express');
const morgan = require('morgan');
const colors = require('colors');
const dotenv = require('dotenv');
const connectDb = require('./config/database');
const path = require('path');  // Add this line


// Configure environment variables
dotenv.config({
    path: './config/config.env',
});

// Create an Express application
const app = express();

// Connect to the database
connectDb();

// Middleware setup
app.use(morgan('dev'));

//include body parser
app.use(express.json());
app.use(express.json({
    extended:true,
}));

// Use the student router
app.use('/api', require('./Router/Student'));

// Define the port
const port = process.env.PORT || 8000;

// Define a basic route
app.get('/', (req, res) => {
    console.log('hit the api');
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`.blue.underline);
});
