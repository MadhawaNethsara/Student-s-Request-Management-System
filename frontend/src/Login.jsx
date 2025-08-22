import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import image from "./assets/ruhuna.jpeg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      console.log(res);
      if (res.data && res.data.user) {
        // localStorage.setItem("token", res.data.token);
        // localStorage.setItem("user", JSON.stringify(res.data.user));

        const role = res.data.user.role;
        if (role === "student") navigate("/student-dashboard");
        else if (role === "mentor") navigate("/mentor-dashboard");
        else if (role === "doctor") navigate("/doctor-dashboard");
        else if (role === "committee") navigate("/committee-dashboard");
        else if (role === "admin") navigate("/admin");
        else {
          setError("Unknown user role");
        }
      } else {
        setError("Invalid login response. Please try again.");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Invalid credentials or server error");
      }
    }
  };

  return (
    <section className="bg-[url('./assets/logbg.jpg')] min-h-screen flex items-center justify-center font-mono bg-cover from-10% via-indigo-500 via-50% to-sky-500 to-100%">
      <div className="shadow-2xl flex flex-col mt-20 lg:flex-row bg-white/50 rounded-2xl overflow-hidden">
        <form
          onSubmit={handleLogin}
          className="flex flex-col justify-center p-10 gap-6 w-full max-w-md"
        >
          <h1 className="text-5xl font-bold text-center">Welcome</h1>

          {error && <p className="text-red-600 text-center">{error}</p>}

          <div className="flex flex-col text-xl gap-1">
            <label htmlFor="email">Username</label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-md p-2 border-2 outline-none bg-gray-400 focus:border-cyan-400"
              required
            />
          </div>

          <div className="flex flex-col text-xl gap-1">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-md p-2 border-2 outline-none bg-gray-400 focus:border-cyan-400"
              required
            />
          </div>

          <div className="flex gap-2 items-center">
            <input type="checkbox" />
            <span className="text-base">Remember Password</span>
          </div>

          <button
            type="submit"
            className="px-10 py-2 text-xl rounded-md bg-gradient-to-tr from-green-400 to-blue-500 hover:to-pink-500 hover:to-yellow-500 text-white"
          >
            Login
          </button>

          {/* <p className="text-center font-semibold">
            Don’t have an account?{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Register
            </a>
          </p> */}
        </form>

        <img
          src={image}
          alt="login"
          className="w-[450px] object-cover hidden lg:block"
        />
      </div>
    </section>
  );
};

export default Login;
