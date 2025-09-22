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
		res.status(201).json({ message: 'Registration successful', userId: newUser.id });
	} catch (error) {
		console.error('Error registering user:', error);
		res.status(500).json({ message: 'Error registering user' });
	}
});

// login route
app.post('/api/login', async (req, res) => {
	try {

		const { username, password } = req.body;
		console.log('Login attempt:', { username, password });
		
		const user = await User.findOne({ where: { username } });
		if (!user) {
			return res.status(400).json({ message: 'Invalid username or password' });
		}

		const passwordMatch = await bcrypt.compare(password, user.password);
		if (!passwordMatch) {
			return res.status(400).json({ message: 'Invalid username or password' });
		}
		// If 2FA is enabled, you would typically check the 2FA token here
		// For simplicity, we skip that step in this example

		// Successful login


		res.json({ message: 'Login successful', user: user.username });
	} catch (error) {
		console.error('Error during login:', error);
		res.status(500).json({ message: 'Error during login' });
	}
});

// Sync database
sequelize.sync({ alter: true }).then(() => {
	console.log("Database & tables created!");
});

app.listen(PORT, () => {
	console.log(`Backend running at http://localhost:${PORT}`);
});
