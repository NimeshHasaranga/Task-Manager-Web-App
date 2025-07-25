// Load environment variables FIRST
require('dotenv').config();

// Debug environment variables
console.log('Environment Variables Loaded:', {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI ? '*****' : 'NOT FOUND'
});

const app = require('./app');
const connectDB = require('./config/db');
const http = require('http');

// Connect to database
connectDB();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err.message);
  server.close(() => process.exit(1));
});