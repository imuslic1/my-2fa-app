require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const sequelize = require('./models/index.js');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

sequelize.sync({ alter: true }).then(() => {
  console.log("Database & tables created!");
});

// test route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Express backend!' });
});

// login route
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  console.log('Login attempt:', { username, password });
  // Here you would normally check the username and password against your database
  res.json({ message: 'Login successful' });
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
