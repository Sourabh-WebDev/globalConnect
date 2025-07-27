import { Link, Outlet, useLocation } from "react-router";
import axiosInstance from "~/utils/axiosInstance";


export const removeToken = () => {
    localStorage.removeItem("token");
};

export default function DashboardLayout() {
    const API_URL = import.meta.env.VITE_API_URL;

    const location = useLocation();
    const logout = async () => {
        try {
            // Call Logout API
            await axiosInstance.post(`${API_URL}/Auth/logout`);
        } catch (err) {
            console.error("Logout API failed:", err);
            // Even if API fails, proceed to clear token
        } finally {
            // Clear token and redirect
            removeToken();
            window.location.href = "/login";
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900">
            {/* Fixed Sidebar */}
            <aside className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg p-4 space-y-6 z-20">
                <div className="text-2xl font-bold text-blue-600">MyApp</div>
                <nav className="flex flex-col space-y-2">
                    <NavLink to="/dashboard">Dashboard</NavLink>
                    <NavLink to="/timesheet">Reports</NavLink>
                    <NavLink to="/dashboard/settings">Settings</NavLink>
                </nav>
            </aside>

            {/* Main content shifted to the right */}
            <div className="ml-64 flex flex-col min-h-screen">
                {/* Sticky Header */}
                <header className="sticky top-0 z-10 bg-white shadow px-6 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-semibold capitalize">
                        {location.pathname.replace("/dashboard", "").slice(1) || "Dashboard"}
                    </h1>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">Welcome, User</span>
                        <button onClick={logout} className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm">
                            Logout
                        </button>
                    </div>
                </header>

                {/* Scrollable page content */}
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="bg-white rounded-xl shadow p-4 min-h-[calc(100vh-5rem)]">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link
            to={to}
            className={`px-3 py-2 rounded text-sm font-medium ${isActive
                ? "bg-blue-100 text-blue-700"
                : "text-gray-700 hover:bg-gray-200"
                }`}
        >
            {children}
        </Link>
    );
}
