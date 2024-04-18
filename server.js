const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path'); 

const app = express();
const port = 3000;

const data = [];

fs.createReadStream('HR-Employee-Attrition.csv')
  .pipe(csv())
  .on('data', (row) => {
    data.push(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed.');
  });

// API endpoint to serve data
app.get('/data', (req, res) => {
  res.json(data);
});

// Endpoint for dashboard HTML page
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html')); 
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
