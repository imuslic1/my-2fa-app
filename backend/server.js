require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const sequelize = require('./models/index.js');
const User = require('./models/User');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const crypto = require('crypto');

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
		const secret = speakeasy.generateSecret({ name: `MyApp (${username})` });
		const newUser = await User.create({ username, password: hashedPassword, twoFactorSecret: secret.base32 });
		const qrCodeDataURL = await qrcode.toDataURL(secret.otpauth_url);

		res.status(201).json({ message: 'Registration successful', userId: newUser.id, qrCodeDataURL });
	} catch (error) {
		console.error('Error registering user:', error);
		res.status(500).json({ message: 'Error registering user' });
	}
});

// login route
app.post('/api/login', async (req, res) => {
	try {

		const { username, password } = req.body;
		
		const user = await User.findOne({ where: { username } });
		if (!user) {
			return res.status(400).json({ message: 'Invalid username or password' });
		}

		const passwordMatch = await bcrypt.compare(password, user.password);
		if (!passwordMatch) {
			return res.status(400).json({ message: 'Invalid username or password' });
		}

		// Temporary token for 2FA verification step
		const tempToken = crypto.randomBytes(20).toString('hex');

		user.tempToken = tempToken;
		user.tempTokenExpiry = Date.now() + 0.5 * 60 * 1000; // 30 seconds
		await user.save();

		res.status(200).json({ message: '2FA required', tempToken });
	} catch (error) {
		console.error('Error during login:', error);
		res.status(500).json({ message: 'Error during login' });
	}
});

// 2FA verification route
app.post('/api/verify-2fa', async (req, res) => {
	try {
		const { tempToken, token } = req.body;

		const user = await User.findOne({ where: { tempToken } });
		if (!user) {
			return res.status(400).json({ message: 'Invalid temporary token' });
		}

		if(Date.now() > user.tempTokenExpiry) {
			return res.status(400).json({ message: 'Session expired, please log in again.' });
		}

		const verified = speakeasy.totp.verify({
			secret: user.twoFactorSecret,
			encoding: 'base32',
			token
		});

		if (!verified) {
			return res.status(400).json({ message: 'Invalid 2FA token' });
		}
		// Clear temp token and expiry
		user.tempToken = null;
		user.tempTokenExpiry = null;
		await user.save();
		res.status(200).json({ message: 'Login successful' });
	} catch (error) {
		console.error('Error during 2FA verification:', error);
		res.status(500).json({ message: 'Error during 2FA verification' });
	}
});


// Sync database
sequelize.sync({ alter: true }).then(() => {
	console.log("Database & tables created!");
});

app.listen(PORT, () => {
	console.log(`Backend running at http://localhost:${PORT}`);
});
