import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./TwoFactorAuth.css"; 

export default function TwoFactorAuth() {
    const location = useLocation();
    const navigate = useNavigate();
    const { tempToken } = location.state || {};

    if (!tempToken) {
        navigate("/login");
        return null;
    }

    const [code, setCode] = useState("");
    const [message, setMessage] = useState("");

    const clearForm = () => {
        setCode("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:4000/api/verify-2fa", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ tempToken, token: code }),
            });

            const data = await res.json();
            setMessage(data.message);

            if (res.ok) {
                clearForm();
                // Redirect to dashboard or another page
                setTimeout(() => {
                    navigate("/dashboard");
                }, 1000);
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
            <h1>Two-Factor<br /> Authentication</h1>
            <br />
            Enter the code from your authenticator app to verify your login.
            <br />
            <img src="/src/assets/mobile.png" className="phone-image" />
            <form
                className="two-factor-form"
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    placeholder="6-digit code"
                    value={code}
                    onChange={(e) => {
                        setCode(e.target.value);
                        clearMessage();
                    }}
                    required
                    className="two-factor-input"
                />

                <button type="submit">Verify</button>
            </form>
            {message=="Login successful" && <p className="success">{message}</p> 
                || message && <p className="error">{message}</p>}
        </div>

    );
}
