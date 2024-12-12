const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const memberRoutes = require('./routes/member');


// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(express.json());  // To parse JSON requests
app.use(cors());          // To handle cross-origin requests

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Database connected successfully'))
.catch(err => console.log('Database connection error:', err));

// Import routes
const authRoutes = require('./routes/auth');  // Import the authentication routes

// Use routes (this is where the line should go)
app.use('/api/auth', authRoutes);  // Use the /api/auth path for auth-related requests
app.use('/api/members', memberRoutes);  // Use the /api/members path for member-related requests
// Basic route (for testing)
app.get('/', (req, res) => {
  res.send('Welcome to the BITSA backend!');
});

// Set the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
