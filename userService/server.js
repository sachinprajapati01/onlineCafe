const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const logger = require('./middleware/logger');

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Set-Cookie']
}));

app.use(express.json());
app.use(cookieParser());

// Add logger middleware
app.use(logger);

// Passport initialization
require('./config/passport');
app.use(passport.initialize());

// MongoDB Connection
console.log(process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// User routes
const userRoutes = require('./routes/userRoutes');
app.use('/user', userRoutes);

app.get('/', (req, res) => {
  res.send('User Service is running');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`User Service running on port ${PORT}`));