const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Create multiple arrays to store data based on categories
const categoryData = {
  category1: [],
  category2: [],
  category3: [],
  // Add more categories as needed
};

app.post('/api/data/:category', (req, res) => {
  const { category } = req.params;
  const requestData = req.body;

  // Check if the specified category exists
  if (!categoryData.hasOwnProperty(category)) {
    return res.status(400).json({ error: 'Invalid category' });
  }

  // Store the posted data in the appropriate category's array
  categoryData[category].push(requestData);

  res.json({ message: 'Data received and saved' });
});

app.get('/api/data', (req, res) => {
  // Combine data from all categories into one response object
  const allData = {};
  for (const category in categoryData) {
    if (categoryData.hasOwnProperty(category)) {
      allData[category] = categoryData[category];
    }
  }

  res.json({ data: allData });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});