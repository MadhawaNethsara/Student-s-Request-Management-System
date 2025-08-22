import React from "react";
function Stureg() {
  //const Stureg = () => {
return (
  <section className="min-h-screen flex items-center justify-center font-mono bg-[url('./assets/ruhuna.jpeg')] bg-cover">
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-md bg-[#222]/75 rounded-xl shadow-md py-8 px-8">
        <h1 className="text-[28px] font-bold text-white mb-6 text-center">
          Register Student
        </h1>
        <form className="flex flex-col">
          <div className="flex space-x-4 mb-4">
            <input
              placeholder="Name"
              className="bg-white/25 text-white border-0 rounded-md p-2 w-1/2 focus:bg-gray-600 focus:outline-none transition duration-150 placeholder-gray-300"
              type="text"
            />
            <input
              placeholder="Index Number"
              className="bg-white/25 text-white border-0 rounded-md p-2 w-1/2 focus:bg-gray-600 focus:outline-none transition duration-150 placeholder-gray-300"
              type="text"
            />
          </div>

          <div className="flex space-x-4 mb-4">
            <select
              className="bg-white/25 text-white border-0 rounded-md p-2 w-1/2 focus:bg-gray-600 focus:outline-none transition duration-150"
              defaultValue=""
            >
              <option value="" disabled>Year</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
            </select>

            <select
              className="bg-white/25 text-white border-0 rounded-md p-2 w-1/2 focus:bg-gray-600 focus:outline-none transition duration-150"
              defaultValue=""
            >
              <option value="" disabled>Degree</option>
              <option value="phy">phy</option>
              <option value="bio">bio</option>
              <option value="cs">cs</option>
            </select>
          </div>

          <div className="flex space-x-4 mb-4">
            <select
              className="bg-white/25 text-white border-0 rounded-md p-2 w-1/2 focus:bg-gray-600 focus:outline-none transition duration-150"
              defaultValue=""
            >
              <option value="" disabled>Level</option>
              <option value="1">Level 1</option>
              <option value="2">Level 2</option>
              <option value="3">Level 3</option>
            </select>

            <select
              className="bg-white/25 text-white border-0 rounded-md p-2 w-1/2 focus:bg-gray-600 focus:outline-none transition duration-150"
              defaultValue=""
            >
              <option value="" disabled>Semester</option>
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
            </select>
          </div>

          <div className="flex space-x-4 mb-4">
            <input
              placeholder="Contact Number"
              className="bg-white/25 text-white border-0 rounded-md p-2 w-1/2 focus:bg-gray-600 focus:outline-none transition duration-150 placeholder-gray-300"
              type="text"
            />
            <input
              placeholder="Mentor"
              className="bg-white/25 text-white border-0 rounded-md p-2 w-1/2 focus:bg-gray-600 focus:outline-none transition duration-150 placeholder-gray-300"
              type="text"
            />
          </div>

          <input
            placeholder="Email"
            className="bg-white/25 text-white border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none transition duration-150 placeholder-gray-300"
            type="email"
          />
          <input
            placeholder="Password"
            className="bg-white/25 text-white border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none transition duration-150 placeholder-gray-300"
            type="password"
          />

          <button className="px-10 py-2 text-2xl rounded-md bg-gradient-to-tr from-green-400 to-blue-500 hover:to-pink-500 hover:to-yellow-500 text-white">
            Register
          </button>
        </form>
      </div>
    </div>
  </section>
);

}
export default Stureg;
