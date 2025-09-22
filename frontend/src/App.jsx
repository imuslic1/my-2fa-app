import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginForm from './LoginForm'

function App() {
	const [count, setCount] = useState(0)

	return (
		<div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
			<h1>My 2FA Demo</h1>
			<LoginForm />
		</div>
	);
}

export default App;
