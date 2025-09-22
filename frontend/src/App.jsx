import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import Header from './Header'
import TwoFactorAuth from './TwoFactorAuth'
import Dashboard from './Dashboard'
import Setup2FA from './Setup2FA'

function App() {
	return (
		<div>
			<Header />

			<main style={{ maxWidth: "400px", margin: "2rem auto" }}>
				<Routes>
					<Route path="/login" element={<LoginForm />} />
					<Route path="/register" element={<RegisterForm />} />
					<Route path="/verify-login" element={<TwoFactorAuth />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/setup-2fa" element={<Setup2FA />} />
					{/* default redirect */}
					<Route path="*" element={<Navigate to="/login" />} />
				</Routes>
			</main>
		</div>
	);
}

export default App;
