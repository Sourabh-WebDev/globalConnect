import { Button } from "antd";
import { Link, useNavigate } from "react-router";

export default function NotFound() {
    const navigate = useNavigate();
    return (
        <div className="h-screen flex flex-col justify-center items-center text-center px-4">
            <h1 className="text-6xl font-bold text-blue-600">404</h1>
            <p className="text-xl mt-4 text-gray-700">Page Not Found</p>
            <img
                src="https://illustrations.popsy.co/blue/crashed-error.svg"
                alt="Login illustration"
                className="w-full max-w-xs mx-auto"
            />
            <Button
                onClick={() => navigate(-1)}
                className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
                Go Home
            </Button>
        </div>
    );
}
