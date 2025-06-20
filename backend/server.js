// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const uploadRoutes = require('./src/routes/uploadRoutes'); 

// const app = express();

// // Middleware
// app.use(cors({
//   origin: 'http://localhost:5173', 
//   credentials: true
// }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Add logging middleware
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.path}`);
//   next();
// });

// // Routes
// app.use('/api', uploadRoutes);

// // Error handling middleware
// app.use((error, req, res, next) => {
//   console.error('Global error handler:', error);
//   res.status(500).json({ error: error.message });
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const uploadRoutes = require('./src/routes/uploadRoutes'); 

const app = express();


// CORS middleware
app.use(cors({
  origin: '*',
  credentials: true,
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api', uploadRoutes);

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  res.status(500).json({ error: error.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});