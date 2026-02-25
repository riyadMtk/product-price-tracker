require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const watchlistRoutes = require('./routes/watchlist');
const priceRoutes = require('./routes/prices');

const app = express();

// Connexion à MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/watchlist', watchlistRoutes);
app.use('/api/prices', priceRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur Node.js démarré sur le port ${PORT}`));