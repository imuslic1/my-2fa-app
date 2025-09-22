require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const sequelize = require('./models/index.js');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

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

// register route
app.post('/api/register', async (req, res) => {
	try {
		const { username, password } = req.body;
	
		const existingUser = await User.findOne({ where: { username } });
		if (existingUser) {
			return res.status(400).json({ message: 'Username already exists' });
		}
	
		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = await User.create({ username, password: hashedPassword });
		res.status(201).json({ message: 'User registered successfully', userId: newUser.id });
	} catch (error) {
		console.error('Error registering user:', error);
		res.status(500).json({ message: 'Error registering user' });
	}
});

// Sync database
sequelize.sync({ alter: true }).then(() => {
	console.log("Database & tables created!");
});

app.listen(PORT, () => {
	console.log(`Backend running at http://localhost:${PORT}`);
});
