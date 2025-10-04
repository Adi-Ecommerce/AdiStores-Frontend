import React, { useState,useContext } from "react";
import { useNavigate,Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react"; // 👈 Import Lucide icons

function Register() {
    const BackendURL=import.meta.env.VITE_BACKEND_URL;
    const {login}=useContext(AuthContext);
    const [formData, setFormData] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        age: "",
        address: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.firstName || !formData.lastName || !formData.email) {
            toast.error("Please fill in all required fields", { duration: 3000 });
            return;
        }

        if (formData.age < 18) {
            toast.error("You must be at least 18 years old", { duration: 3000 });
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match", { duration: 3000 });
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${BackendURL}/api/Users/register`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        firstName: formData.firstName,
                        middleName: formData.middleName,
                        lastName: formData.lastName,
                        age: parseInt(formData.age),
                        address: formData.address,
                        email: formData.email,
                        password: formData.password,
                    }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                login(data.user,data.token);
                toast.success(data.message || "Registration successful!", { duration: 3000 });
                setTimeout(() => navigate("/home"), 1000);
            } else {
                const errorMsg = data.message || data.errors?.[0] || "Registration failed";
                toast.error(errorMsg, { duration: 3000 });
            }
        } catch (err) {
            console.error(err);
            toast.error("Server error. Please try again later.", { duration: 3000 });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-8 max-w-3xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
            <Toaster position="top-right" />

            {/* Header */}
            <div className="flex flex-col items-center text-center relative">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium font-archivo">
                    Create an Account
                </h1>
                <p className="text-sm sm:text-base lg:text-lg font-normal text-gray-500 font-inter">
                    Join us and start your journey
                </p>
            </div>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full"
            >
                {/* Normal fields */}
                {[
                    { label: "First Name", name: "firstName", type: "text", placeholder: "John", required: true },
                    { label: "Last Name", name: "lastName", type: "text", placeholder: "Doe", required: true },
                    { label: "Middle Name", name: "middleName", type: "text", placeholder: "K", required: false },
                    { label: "Email", name: "email", type: "email", placeholder: "you@example.com", required: true },
                    { label: "Age", name: "age", type: "number", placeholder: "25", required: true },
                    { label: "Address", name: "address", type: "text", placeholder: "123 Main St", required: true },
                ].map((field, idx) => (
                    <div key={idx} className="flex flex-col gap-2">
                        <label className="text-base sm:text-lg lg:text-xl font-normal font-inter">{field.label}</label>
                        <input
                            type={field.type}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                            placeholder={field.placeholder}
                            autoComplete="on"
                            className="p-2 rounded-lg border-2 border-[#dee1e6ff] focus:border-blue-500 outline-none transition text-sm sm:text-base"
                            required={field.required}
                        />
                    </div>
                ))}

                {/* Password field */}
                <div className="flex flex-col gap-2 relative">
                    <label className="text-base sm:text-lg lg:text-xl font-normal font-inter">Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="*******"
                        autoComplete="on"
                        className="p-2 pr-10 rounded-lg border-2 border-[#dee1e6ff] focus:border-blue-500 outline-none transition text-sm sm:text-base"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-10 text-gray-500 hover:text-black"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>

                {/* Confirm Password field */}
                <div className="flex flex-col gap-2 relative">
                    <label className="text-base sm:text-lg lg:text-xl font-normal font-inter">Confirm Password</label>
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="*******"
                        autoComplete="on"
                        className="p-2 pr-10 rounded-lg border-2 border-[#dee1e6ff] focus:border-blue-500 outline-none transition text-sm sm:text-base"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="absolute right-3 top-10 text-gray-500 hover:text-black"
                    >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>

                {/* Submit button */}
                <button
                    type="submit"
                    disabled={loading}
                    className={`col-span-full w-full sm:w-[70%] place-self-center p-3 rounded-md border border-[#dee1e6ff] text-black font-inter 
      hover:bg-blue-500 hover:text-white focus:ring-2 focus:ring-blue-300 active:scale-95 transition-all
      ${loading ? "opacity-70 cursor-not-allowed bg-gray-300" : ""}`}
                >
                    {loading ? (
                        <span className="flex items-center justify-center gap-2">
          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          Signing Up...
        </span>
                    ) : (
                        "Sign Up"
                    )}
                </button>
            </form>

            {/* Login Link */}
            <span className="flex gap-1 place-self-center mt-3 text-sm sm:text-base">
    <p className="text-[#565d6dff] font-inter">Already have an account?</p>
    <Link to="/login" className="font-inter text-[#636ae8ff] hover:text-[#171A1FFF]">
      Login
    </Link>
  </span>
        </div>

    );
}

export default Register;
