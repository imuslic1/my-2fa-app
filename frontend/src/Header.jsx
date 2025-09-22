import { Link, useLocation } from "react-router-dom";
import "./Header.css";

function Header() {
    const location = useLocation();

    return (
        <header>
            <div className="logo-container">
                <img src="/src/assets/etf-logo.png" alt="App Logo" className="corner-logo" />
            </div>
            <h2>Ismar Muslić - Diplomski rad</h2>

            <nav>
                <Link
                    to="/login"
                    className={location.pathname === "/login" ? "active" : ""}
                >
                    Login
                </Link>
                <Link
                    to="/register"
                    className={location.pathname === "/register" ? "active" : ""}
                >
                    Register
                </Link>
            </nav>
        </header>
    );
}

export default Header;
