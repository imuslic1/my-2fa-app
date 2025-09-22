import { useState } from "react";
import "./LoginForm.css"; // Import the CSS file

export default function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // For now just log values — later we’ll call backend
        console.log("Login attempt:", { username, password });

        // Example fetch (uncomment once backend exists)
        /*
        const res = await fetch("http://localhost:4000/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        console.log(data);
        */
    };

    return (
        <form
            className="login-form"
            onSubmit={handleSubmit}
        >
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Login</button>
        </form>
    );
}
