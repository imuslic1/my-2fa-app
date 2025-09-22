import { useLocation, useNavigate } from "react-router-dom";

function Setup2FA() {
    const location = useLocation();
    const navigate = useNavigate();
    const qrCode = location.state?.qrCode;

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4">Set up Google Authenticator</h2>

            {qrCode ? (
                <>
                    <img src={qrCode} alt="Scan with Google Authenticator" className="border p-2 rounded" />
                    <p className="mt-2 text-gray-700">
                        Scan this QR code with Google Authenticator and enter the code on login.
                    </p>
                    <button
                        onClick={() => navigate("/login")}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
                    >
                        Continue to Login
                    </button>
                </>
            ) : (
                <p>Error: No QR code found. Please register again.</p>
            )}
        </div>
    );
}

export default Setup2FA;
