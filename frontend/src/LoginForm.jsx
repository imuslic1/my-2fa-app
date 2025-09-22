import { useState } from "react";
import "./LoginForm.css"; // Import the CSS file

export default function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const clearForm = () => {
        setUsername("");
        setPassword("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:4000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();
            setMessage(data.message);
            if (res.ok) {
                clearForm();
            }
        } catch (error) {
            console.error(error);
            setMessage("Error connecting to server");
        }
    };

    const clearMessage = () => {
        if (message) {
            setMessage("");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form
                className="login-form"
                onSubmit={handleSubmit}
            >

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                        clearMessage();
                    }}
                    required
                    className="login-username-input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        clearMessage();
                    }}
                    required
                    className="login-password-input"
                />

                <button type="submit">Login</button>
            </form>
            {message=="Login successful" && <p className="success">{message}</p> 
                || message && <p className="error">{message}</p>}
        </div>

    );
}
