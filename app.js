const express = require('express');
require('dotenv').config();
const app = express();
const connectDB = require('./config/db');
const cors = require('cors');



// Connect Database
connectDB();


// Init Middleware
app.use(cors());
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));
app.use('/api/animals', require('./routes/animalRoutes'));
app.use('/api/comments', require('./routes/commentRoutes'));


module.exports = app;