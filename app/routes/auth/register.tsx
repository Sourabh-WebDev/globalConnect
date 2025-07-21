import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { FaHome } from "react-icons/fa";

export const loader = () => null;

export default function Register() {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    password: "",
    confirmPassword: "",
    addressLn1: "",
    email: "",
    pincode: "",
    state: "",
    district: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const payload = { ...form, pincode: Number(form.pincode) } as {
        confirmPassword?: string;
      };
      delete payload.confirmPassword;

      const response = await axios.post(`https://globalconnect.somee.com/api/User/register`, payload);

      if (response.status === 200 || response.status === 201) {
        setSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/"), 2000);
      } else {
        setError("Registration failed. Try again.");
      }
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Registration failed");
      } else {
        setError("Unexpected error");
      }
    }
  };


  const fieldClasses =
    "w-full rounded-md bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white dark:placeholder-gray-400 outline outline-1 outline-gray-300 dark:outline-gray-600 focus:outline-2 focus:outline-indigo-600";

  const labelClasses = "block text-sm font-medium text-gray-900 dark:text-gray-100";

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 dark:bg-gray-900 transition-colors">
      {/* Left Illustration */}
      <div className="hidden md:flex w-1/2 bg-indigo-600 dark:bg-indigo-700 items-center justify-center p-10">
        <div className="text-white text-center space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight">Welcome Aboard!</h1>
          <p className="text-lg">Start your journey with us by creating an account.</p>
          <img
            src="https://illustrations.popsy.co/amber/online-shopping.svg"
            alt="Register Illustration"
            className="max-w-md mx-auto"
          />
        </div>
      </div>

      {/* Right Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-12">
      <div className="absolute top-4 right-7">
        <FaHome onClick={() => navigate("/") } className="text-4xl text-indigo-600 dark:text-indigo-400 mb-4" />
      </div>
        <div className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
            Create Your Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>First Name</label>
                <input name="firstname" value={form.firstname} onChange={handleChange} required className={fieldClasses} />
              </div>
              <div>
                <label className={labelClasses}>Last Name</label>
                <input name="lastname" value={form.lastname} onChange={handleChange} required className={fieldClasses} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>Email</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} required className={fieldClasses} />
              </div>
              <div>
                <label className={labelClasses}>Phone</label>
                <input name="phone" type="tel" value={form.phone} onChange={handleChange} required className={fieldClasses} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>Password</label>
                <input name="password" type="password" value={form.password} onChange={handleChange} required className={fieldClasses} />
              </div>
              <div>
                <label className={labelClasses}>Confirm Password</label>
                <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} required className={fieldClasses} />
              </div>
            </div>

            <div>
              <label className={labelClasses}>Address Line 1</label>
              <input name="addressLn1" value={form.addressLn1} onChange={handleChange} required className={fieldClasses} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>State</label>
                <input name="state" value={form.state} onChange={handleChange} required className={fieldClasses} />
              </div>
              <div>
                <label className={labelClasses}>District</label>
                <input name="district" value={form.district} onChange={handleChange} required className={fieldClasses} />
              </div>
            </div>

            <div>
              <label className={labelClasses}>Pincode</label>
              <input name="pincode" type="number" value={form.pincode} onChange={handleChange} required className={fieldClasses} />
            </div>

            {error && <div className="text-red-600 dark:text-red-400 text-sm text-center">{error}</div>}
            {success && <div className="text-green-600 dark:text-green-400 text-sm text-center">{success}</div>}

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md shadow focus:outline focus:outline-indigo-600"
            >
              Register
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <a href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
