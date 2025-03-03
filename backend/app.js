const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const scanRoutes = require('./routes/scanRoutes');
const studentRoutes = require('./routes/studentRoutes');
const adminRoutes = require('./routes/adminRoutes'); // Added admin routes
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: "*", // Temporarily allowing all origins for debugging
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization"
}));

// Logging middleware (to log all incoming requests)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes); // Added admin routes
app.use('/api', scanRoutes);
app.use('/api/student', studentRoutes);
app.use(express.static("frontend"));

// Default route
app.get('/', (req, res) => {
  res.send('Hostel Tracking System Backend');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] Error:`, err.stack);
  res.status(500).json({ message: 'Something went wrong on the server!' });
});

// 404 handler for undefined routes
app.use((req, res) => {
  console.error(`[${new Date().toISOString()}] 404: Route not found - ${req.method} ${req.url}`);
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
