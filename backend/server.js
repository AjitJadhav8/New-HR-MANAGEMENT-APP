require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const allRoutes = require('./routes/allRoutes'); // Import all routes
const verifyToken = require('./middleware/verifyToken'); // JWT middleware
const db = require('./config/db'); // Import the database connection

const app = express();
const port = process.env.PORT || 3000;
const secretKey = process.env.JWT_SECRET_KEY || 'your-secret-key';

// Database connection
// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

// db.connect((err) => {
//   if (err) throw err;
//   console.log('Connected to MySQL database');
// });

// Middleware
app.use(bodyParser.json());
app.use(cors());
// app.use(cors({origin: '*'}));

app.use('/api', allRoutes); // Use the routes from allRoutes.js

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
