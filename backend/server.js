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
const https = require('https');


https.globalAgent = new https.Agent({ keepAlive:true });
// Middleware
app.use(bodyParser.json());
app.use(cors());
// app.use(cors({origin: '*'}));

app.use('/api', allRoutes); // Use the routes from allRoutes.js

const path = require('path');

// Serve static files from Angular's build folder
// app.use(express.static(path.join(__dirname, '../dist/hr-management-app/browser'))); // Update with your Angular build path

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../dist/hr-management-app/browser/index.html')); // Update path if necessary
// });


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
