import React, { useState } from "react";
import axios from "axios";

function MentorReg() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact_number: "",
  });

  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData, // keeps existing values
      [e.target.name]: e.target.value, // updates only the changed field
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/mentor/mentor-registration",
        formData
      );

      if (res.status === 201 || res.status === 200) {
        setMessage("Mentor registered successfully ✅");
        setFormData({ name: "", email: "", password: "", contact_number: "" });
      } else {
        setMessage("Something went wrong ❌");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error ❌ Please try again.");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center font-mono bg-[url('./assets/ruhuna.jpeg')] bg-cover">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-full max-w-md bg-[#222]/75 rounded-xl shadow-md py-8 px-8">
          <h1 className="text-[28px] font-bold text-white mb-6 text-center">
            Register Mentor
          </h1>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <input
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="bg-white/25 text-white border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none transition duration-150 placeholder-gray-300"
              type="text"
              required
            />
            <input
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="bg-white/25 text-white border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none transition duration-150 placeholder-gray-300"
              type="email"
              required
            />
            <input
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="bg-white/25 text-white border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none transition duration-150 placeholder-gray-300"
              type="password"
              required
            />
            <input
              name="contact_number"
              placeholder="Contact Number"
              value={formData.contactNumber}
              onChange={handleChange}
              className="bg-white/25 text-white border-0 rounded-md p-2 mb-6 focus:bg-gray-600 focus:outline-none transition duration-150 placeholder-gray-300"
              type="text"
              required
            />

            <button
              type="submit"
              className="px-10 py-2 text-2xl rounded-md bg-gradient-to-tr from-green-400 to-blue-500 hover:to-pink-500 hover:to-yellow-500 text-white"
            >
              Register
            </button>
          </form>

          {message && (
            <p className="text-center mt-4 text-white font-semibold">
              {message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default MentorReg;
