import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router";
import axiosInstance from "~/utils/axiosInstance";

export const removeToken = () => {
    localStorage.removeItem("token");
};

export default function DashboardLayout() {
    const API_URL = import.meta.env.VITE_API_URL;
    const [storedUsername, setStoredUsername] = useState<string | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(false); // mobile toggle

    const location = useLocation();

    const logout = async () => {
        try {
            await axiosInstance.post(`${API_URL}/Auth/logout`);
        } catch (err) {
            console.error("Logout API failed:", err);
        } finally {
            removeToken();
            window.location.href = "/login";
        }
    };

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning 🌅";
        if (hour < 17) return "Good Afternoon 🌄";
        return "Good Evening 🌆";
    };

    const [greeting] = useState(getGreeting());

    useEffect(() => {
        const username = localStorage.getItem("username");
        setStoredUsername(username);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 lg:h-screen w-64 bg-white shadow-lg p-4 space-y-6 z-40 transform 
        transition-transform duration-300 lg:translate-x-0 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:static`}
            >
                <div className="text-2xl font-bold text-blue-600">MyApp</div>
                <nav className="flex flex-col space-y-2">
                    <NavLink to="/dashboard" onClick={() => setSidebarOpen(false)}>
                        Dashboard
                    </NavLink>
                    <NavLink to="/timesheet" onClick={() => setSidebarOpen(false)}>
                        Reports
                    </NavLink>
                    <NavLink to="/dashboard/settings" onClick={() => setSidebarOpen(false)}>
                        Settings
                    </NavLink>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex flex-col flex-1 min-h-screen">
                {/* Header */}
                <header className="sticky top-0 z-20 bg-white shadow px-4 sm:px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        {/* Hamburger for mobile */}
                        <button
                            className="lg:hidden p-2 rounded hover:bg-gray-200"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                        >
                            <svg
                                className="w-6 h-6 text-gray-700"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <h1 className="text-lg sm:text-xl font-semibold capitalize">{greeting}</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="hidden sm:inline text-sm text-gray-600">
                            Welcome, {storedUsername}
                        </span>
                        <button
                            onClick={logout}
                            className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm"
                        >
                            Logout
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-6">
                    <div className="bg-white rounded-xl shadow p-4 min-h-[calc(100vh-5rem)]">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}

function NavLink({
    to,
    children,
    onClick,
}: {
    to: string;
    children: React.ReactNode;
    onClick?: () => void;
}) {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link
            to={to}
            onClick={onClick}
            className={`px-3 py-2 rounded text-sm font-medium ${isActive
                ? "bg-blue-100 text-blue-700"
                : "text-gray-700 hover:bg-gray-200"
                }`}
        >
            {children}
        </Link>
    );
}
