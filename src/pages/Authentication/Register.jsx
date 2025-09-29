import React, { useState } from "react";

function Register() {
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

  const [message, setMessage] = useState(""); // feedback message
  const [isError, setIsError] = useState(false);

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
    setMessage("");
    setIsError(false);

    // Simple frontend validation
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      setIsError(true);
      return;
    }

    try {
      const response = await fetch("https://localhost:5001/api/users/register", {
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
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "Registration successful!");
        setIsError(false);

        // Redirect to Login after 1.5 seconds
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      } else {
        setMessage(data.message || "Registration failed");
        setIsError(true);
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error. Please try again later.");
      setIsError(true);
    }
  };

  return (
    <div className="flex flex-col gap-5 max-w-3xl mx-auto mt-10">
      <div className="flex flex-col gap items-center relative">
        <h1 className="text-3xl font-medium font-archivo">Create an Account</h1>
        <p className="text-md font-normal text-gray-500 font-inter">
          Join us and start your journey
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-xl font-normal font-inter">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="John"
            className="p-2 rounded-lg border-2 border-[#dee1e6ff]"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xl font-normal font-inter">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Doe"
            className="p-2 rounded-lg border-2 border-[#dee1e6ff]"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xl font-normal font-inter">Middle Name</label>
          <input
            type="text"
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
            placeholder="K"
            className="p-2 rounded-lg border-2 border-[#dee1e6ff]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xl font-normal font-inter">Email</label>
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

        <div className="flex flex-col gap-2">
          <label className="text-xl font-normal font-inter">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="25"
            className="p-2 rounded-lg border-2 border-[#dee1e6ff]"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xl font-normal font-inter">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="123 Main St"
            className="p-2 rounded-lg border-2 border-[#dee1e6ff]"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
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

        <div className="flex flex-col gap-2">
          <label className="text-xl font-normal font-inter">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
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
          Sign Up
        </button>
      </form>

      {message && (
        <p
          className={`text-center mt-2 font-inter ${
            isError ? "text-red-500" : "text-green-500"
          }`}
        >
          {message}
        </p>
      )}

      <span className="flex gap place-self-center mt-3">
        <p className="text-[#565d6dff] font-inter">Already have an account?</p>
        <a
          href="/login"
          className="font-inter text-[#636ae8ff] hover:text-[#171A1FFF]"
        >
          Login
        </a>
      </span>
    </div>
  );
}

export default Register;
