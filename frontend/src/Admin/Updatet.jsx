import { useState } from "react";
import axios from "axios";

function Updatet() {
  // Single entry state
  const [entry, setEntry] = useState({
    date: "",
    degree: "",
    level: "",
    semester: "",
    subjectCode: "",
    subjectName: "",
    timeSlot: { start: "", end: "" },
  });

  // File state for bulk upload
  const [file, setFile] = useState(null);

  // Handle input change for single entry
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEntry((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit for single entry
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/timetable/add",
        entry
      );
      alert(response.data.message);
      setEntry({
        date: "",
        degree: "",
        level: "",
        semester: "",
        subjectCode: "",
        subjectName: "",
        timeSlot: { start: "", end: "" },
      });
    } catch (error) {
      console.error(error);
      alert("Error adding timetable entry: " + error.response?.data?.error);
    }
  };

  // Handle bulk file change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle bulk upload (placeholder)
  const handleBulkUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file first");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/timetable/bulk",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert(response.data.message);
      setFile(null);
    } catch (error) {
      console.error(error);
      alert("Error uploading file: " + error.response?.data?.error);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center font-mono bg-[url('./assets/ruhuna.jpeg')] bg-cover bg-center px-6 py-10">
      <div className="w-full max-w-6xl bg-[#1e1e1e]/80 backdrop-blur-md rounded-2xl shadow-xl p-10">
        <h1 className="text-4xl font-bold text-white text-center mb-10">
          Timetable Management
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Single Entry */}
          <div className="bg-[#222]/75 rounded-xl shadow-md py-8 px-8">
            <h2 className="text-2xl font-semibold text-white text-center mb-6">
              Update Single Entry
            </h2>
            <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
              <input
                type="date"
                name="date"
                value={entry.date}
                onChange={handleChange}
                className="bg-white/20 text-white placeholder-white/60 p-3 rounded-lg focus:bg-gray-600 focus:outline-none transition"
              />
              <div className="flex gap-4">
                <select
                  name="degree"
                  value={entry.degree}
                  onChange={handleChange}
                  className="bg-white/20 text-white p-3 w-1/2 rounded-lg focus:bg-gray-600 focus:outline-none transition"
                >
                  <option value="">Degree</option>
                  <option value="Physical Science">Physical Science</option>
                  <option value="Bio Science">Bio Science</option>
                  <option value="Computer Science">Computer Science</option>
                </select>
                <select
                  name="level"
                  value={entry.level}
                  onChange={handleChange}
                  className="bg-white/20 text-white p-3 w-1/2 rounded-lg focus:bg-gray-600 focus:outline-none transition"
                >
                  <option value="">Level</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
              <input
                type="text"
                name="subjectCode"
                value={entry.subjectCode}
                onChange={handleChange}
                placeholder="Subject Code"
                className="bg-white/20 text-white placeholder-white/60 p-3 rounded-lg focus:bg-gray-600 focus:outline-none transition"
              />
              <input
                type="text"
                name="subjectName"
                value={entry.subjectName}
                onChange={handleChange}
                placeholder="Subject Name"
                className="bg-white/20 text-white placeholder-white/60 p-3 rounded-lg focus:bg-gray-600 focus:outline-none transition"
              />
              <button
                type="submit"
                className="mt-2 w-full py-3 text-lg font-semibold bg-gradient-to-tr from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white rounded-lg shadow-md transition-all duration-300"
              >
                Update Entry
              </button>
            </form>
          </div>

          {/* Bulk Upload */}
          <div className="bg-[#222]/75 rounded-xl shadow-md py-8 px-8">
            <h2 className="text-2xl font-semibold text-white text-center mb-6">
              Bulk Update via Excel
            </h2>
            <form
              className="flex flex-col space-y-4"
              onSubmit={handleBulkUpload}
            >
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileChange}
                className="bg-white/20 text-white p-3 rounded-lg focus:bg-gray-600 focus:outline-none transition"
              />
              <button
                type="submit"
                className="mt-2 w-full py-3 text-lg font-semibold bg-gradient-to-tr from-purple-400 to-pink-500 hover:from-green-400 hover:to-blue-500 text-white rounded-lg shadow-md transition-all duration-300"
              >
                Upload & Update Table
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Updatet;
