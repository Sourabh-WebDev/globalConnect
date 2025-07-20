import { Outlet } from "react-router";

export default function AuthLayout() {
    return (
        <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900">
            <Outlet /> {/* Child routes like register.tsx will render here */}
        </div>
    );
}
