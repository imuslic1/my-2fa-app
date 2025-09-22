import { useState } from "react";
import "./RegisterForm.css";

function RegisterForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== repeatPassword) {
            setMessage("Passwords do not match");
            return;
        }

        try {
            const res = await fetch("http://localhost:4000/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();
            setMessage(data.message);
        } catch (error) {
            console.error(error);
            setMessage("Error connecting to server");
        }
    };
    const [repeatPassword, setRepeatPassword] = useState("");

    return (
        <div>
            <h2>Register</h2>
            <form 
                className="register-form"
                onSubmit={handleSubmit} 
            >
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="username-input"
                />
                
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="password-input"
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    className="repeat-password-input"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                />
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default RegisterForm;
