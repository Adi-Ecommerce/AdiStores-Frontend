import React, { useState } from "react";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState(""); // Feedback message
  const [isError, setIsError] = useState(false); // Is it an error message?

  // Update form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // clear previous messages
    setIsError(false);

    try {
      const response = await fetch("https://localhost:5001/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Success
        setMessage(data.message); // "Login successful"
        setIsError(false);

        // Redirect after 1 second
        setTimeout(() => {
          window.location.href = "/dashboard"; // or homepage
        }, 1000);
      } else {
        // Backend returned 401 Unauthorized
        setMessage(data.message || "Login failed");
        setIsError(true);
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error. Please try again later.");
      setIsError(true);
    }
  };

  return (
    <div className="flex flex-col gap-5 max-w-md mx-auto mt-10">
      <div className="flex flex-col gap items-center relative">
        <h1 className="text-3xl font-medium font-archivo">Login</h1>
        <p className="text-md font-normal text-gray-500 font-inter">
          Welcome back!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-2 col-span-full">
          <label className="text-xl font-normal font-inter">Email address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="p-2 rounded-lg border-2 border-[#dee1e6ff]"
            required
          />
        </div>

        <div className="flex flex-col gap-2 col-span-full">
          <label className="text-xl font-normal font-inter">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="*******"
            className="p-2 rounded-lg border-2 border-[#dee1e6ff]"
            required
          />
        </div>

        <button
          type="submit"
          className="grid col-span-full border w-[70%] place-self-center p-3 rounded-md mt-2 items-center font-inter border border-[#dee1e6ff] text-black hover:text-[#171A1FFF]"
        >
          Login
        </button>
      </form>

      {/* Feedback message */}
      {message && (
        <p
          className={`text-center ${
            isError ? "text-red-500" : "text-green-500"
          } font-inter mt-2`}
        >
          {message}
        </p>
      )}

      <span className="flex gap place-self-center mt-3">
        <p className="text-[#565d6dff] font-inter">Don’t have an account?</p>
        <a
          href="/register"
          className="font-inter text-[#636ae8ff] hover:text-[#171A1FFF]"
        >
          Sign Up
        </a>
      </span>
    </div>
  );
}

export default Login;
