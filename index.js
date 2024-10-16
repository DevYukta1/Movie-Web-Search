// index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('public')); // Serve static files from the public folder

// Define the API endpoint
app.get('/movies', (req, res) => {
  const searchQuery = req.query.search;
  const apiKey = process.env.API_KEY; // Get API key from environment variable

  // Fetch data from OMDB API
  fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchQuery}`)
    .then(response => response.json())
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      console.error('Error fetching data from OMDB:', error);
      res.status(500).json({ error: 'Error fetching data' });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});