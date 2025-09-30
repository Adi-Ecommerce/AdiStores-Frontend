import React, { useState } from "react";
import {Link} from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react"; // icons for show/hide

function Login() {
    const BackendURL=import.meta.env.VITE_BACKEND_URL;
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Update form data
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${BackendURL}/api/Users/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData), // only email + password
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(data.message || "Login successful!", { duration: 3000 });
                setTimeout(() => {
                    window.location.href = "/home";
                }, 1000);
            } else {
                toast.error(data.message || "Login failed", { duration: 3000 });
            }
        } catch (err) {
            console.error(err);
            toast.error("Server error. Please try again later.", { duration: 3000 });
        } finally {
            setLoading(false);
        }
    };


    return (
        <motion.div
            className="flex flex-col gap-5 max-w-md mx-auto mt-10 relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            {/* Toast Container */}
            <Toaster position="top-right" />

            <div className="flex flex-col gap items-center relative">
                <h1 className="text-3xl font-medium font-archivo">Login</h1>
                <p className="text-md font-normal text-gray-500 font-inter">Welcome back!</p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5">
                {/* Email */}
                <div className="flex flex-col gap-2 col-span-full">
                    <label className="text-xl font-normal font-inter">Email address</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="p-2 rounded-lg border-2 border-[#dee1e6ff] focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
                        required
                    />
                </div>

                {/* Password */}
                <div className="flex flex-col gap-2 col-span-full relative">
                    <label className="text-xl font-normal font-inter">Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="*******"
                        className="p-2 pr-10 rounded-lg border-2 border-[#dee1e6ff] focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-12 text-gray-500 hover:text-gray-700"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>


                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className={`col-span-full w-[70%] place-self-center p-3 rounded-md mt-2 font-inter border-2 border-[#dee1e6ff] text-black
                      hover:bg-blue-500 hover:text-white active:bg-blue-600 focus:ring-2 focus:ring-blue-400 transition flex justify-center items-center gap-2`}
                >
                    {loading ? (
                        <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8H4z"
                            ></path>
                        </svg>
                    ) : null}
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>

            {/* Register link */}
            <span className="flex gap-2 place-self-center mt-3">
                <p className="text-[#565d6dff] font-inter">Don’t have an account?</p>
                <Link
                    to='/'
                    className="font-inter text-[#636ae8ff] hover:text-[#171A1FFF]"
                >
                    Sign Up
                </Link>
            </span>
        </motion.div>
    );
}

export default Login;
