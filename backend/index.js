const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
require('./Models/db'); // Connect to MongoDB
const AuthRouter = require('./Routes/AuthRouter'); // Import Auth Router
const ProductRouter = require('./Routes/ProductRouter'); // Import Product Router
const port = process.env.PORT || 8081;

app.use(bodyParser.json());
app.use(cors());
const app = express();
app.use(cors({
  origin: 'https://deploy-mern2-ui.vercel.app', // Allow your frontend domain
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json()); // Ensure this middleware is applied

// Ping Route for testing
app.get('/ping', (req, res) => {
    res.send('Hello World!');
});

// Use AuthRouter for authentication routes
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);
// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
