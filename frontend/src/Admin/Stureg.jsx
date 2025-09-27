import React, { useState } from "react";
import axios from "axios";

function Stureg() {
  const [formData, setFormData] = useState({
    name: "",
    registration_number: "",
    year: "",
    degree: "",
    level: "",
    semester: "",
    contact_number: "",
    //mentor: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/student/register",
        formData
      );

      if (res.status === 201 || res.status === 200) {
        setMessage("Student registered successfully ✅");
        setFormData({
          name: "",
          registration_number: "",
          year: "",
          degree: "",
          level: "",
          semester: "",
          contact_number: "",
          mentor: "",
          email: "",
          password: "",
        });
      } else {
        setMessage("Something went wrong ❌");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error ❌ Please try again.");
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center font-mono p-6 space-y-10">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-full max-w-md bg-[#222]/75 rounded-xl shadow-md py-8 px-8">
          <h1 className="text-[28px] font-bold text-white mb-6 text-center">
            Register Student
          </h1>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="flex space-x-4 mb-4">
              <input
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="bg-white/25 text-white border-0 rounded-md p-2 w-1/2 focus:bg-gray-600 focus:outline-none placeholder-gray-300"
                type="text"
                required
              />
              <input
                name="registration_number"
                placeholder="Index Number"
                value={formData.registration_number}
                onChange={handleChange}
                className="bg-white/25 text-white border-0 rounded-md p-2 w-1/2 focus:bg-gray-600 focus:outline-none placeholder-gray-300"
                type="text"
                required
              />
            </div>

            <div className="flex space-x-4 mb-4">
              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="bg-white/25 text-white border-0 rounded-md p-2 w-1/2 focus:bg-gray-600 focus:outline-none"
                required
              >
                <option value="" disabled>
                  Year
                </option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
              </select>

              <select
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                className="bg-white/25 text-white border-0 rounded-md p-2 w-1/2 focus:bg-gray-600 focus:outline-none"
                required
              >
                <option value="" disabled>
                  Degree
                </option>
                <option value="phy">Physical Science</option>
                <option value="bio">Bio Science</option>
                <option value="cs">Computer Science</option>
              </select>
            </div>

            <div className="flex space-x-4 mb-4">
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="bg-white/25 text-white border-0 rounded-md p-2 w-1/2 focus:bg-gray-600 focus:outline-none"
                required
              >
                <option value="" disabled>
                  Level
                </option>
                <option value="1">Level 1</option>
                <option value="2">Level 2</option>
                <option value="3">Level 3</option>
              </select>

              <select
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                className="bg-white/25 text-white border-0 rounded-md p-2 w-1/2 focus:bg-gray-600 focus:outline-none"
                required
              >
                <option value="" disabled>
                  Semester
                </option>
                <option value="1">Semester 1</option>
                <option value="2">Semester 2</option>
              </select>
            </div>

            <div className="flex space-x-4 mb-4">
              <input
                name="contact_number"
                placeholder="Contact Number"
                value={formData.contact_number}
                onChange={handleChange}
                className="bg-white/25 text-white border-0 rounded-md p-2 w-1/2 focus:bg-gray-600 focus:outline-none placeholder-gray-300"
                type="text"
                required
              />
             <select
                name="mentor"
                value={formData.mentor}
                onChange={handleChange}
                className="bg-white/25 text-white border-0 rounded-md p-2 w-1/2 focus:bg-gray-600 focus:outline-none"
                required
              >
                <option value="" disabled>
                  Mentor
                </option>
                <option value="1">Mentor 1</option>
                <option value="2">Mentor 2</option>
                <option value="2">Mentor 3</option>
              </select>
            </div>

            <input
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="bg-white/25 text-white border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none placeholder-gray-300"
              type="email"
              required
            />
            <input
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="bg-white/25 text-white border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none placeholder-gray-300"
              type="password"
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

export default Stureg;
