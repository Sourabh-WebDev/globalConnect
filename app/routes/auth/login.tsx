import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { FaHome } from "react-icons/fa";

export const loader = () => null;

export default function Login() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(`${API_URL}User/login`, {
        phone,
        password,
      });

      const { token } = response.data;
      localStorage.setItem("token", token);

      const authResponse = await axios.get(`${API_URL}User/secure`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (authResponse.status === 200) {
        navigate("/dashboard");
      } else {
        setError("Token setup failed. Please try again.");
      }
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Login failed");
      } else {
        setError("Unexpected error");
      }
    }
  };

  const handleSubmitt = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setError(null);

  try {
    const loginResponse = await fetch(`https://globalconnect.somee.com/api/User/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone,
        password,
      }),
    });

    if (!loginResponse.ok) {
      const errorData = await loginResponse.json();
      throw new Error(errorData.message || "Login failed");
    }

    const loginData = await loginResponse.json();
    const { token } = loginData;
    localStorage.setItem("token", token);

    const authResponse = await fetch(`https://globalconnect.somee.com/api/User/secure`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (authResponse.ok) {
      navigate("/dashboard");
    } else {
      setError("Token setup failed. Please try again.");
    }
  } catch (err: any) {
    setError(err.message || "Unexpected error");
  }
};


  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Visual Side */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-indigo-600 dark:bg-indigo-700">
        <div className="text-white text-center space-y-6 max-w-md px-8">
          <h1 className="text-4xl font-bold">Welcome Back 👋</h1>
          <p className="text-lg">
            Sign in with your phone number to continue to your dashboard.
          </p>
          <img
            src="https://illustrations.popsy.co/amber/engineer.svg"
            alt="Login illustration"
            className="w-full max-w-xs mx-auto"
          />
        </div>
      </div>

      {/* Right Form Side */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-12 dark:bg-gray-900 bg-gray-100">
       <div className="absolute top-4 right-7">
              <FaHome onClick={() => navigate("/")} className="text-4xl text-indigo-600 dark:text-indigo-400 mb-4" />
            </div>
        <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
            Sign in to your account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="tel"
                className="mt-1 block w-full px-3 py-2 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="mt-1 block w-full px-3 py-2 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {error && (
              <div className="text-red-600 dark:text-red-400 text-sm text-center">{error}</div>
            )}

            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-md shadow transition-colors"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-sm text-center text-gray-600 dark:text-gray-400">
            Not a member?{" "}
            <a href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
