import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

function Cdash() {
  // Dummy data (replace with DB/API later)
  const medicalApplications = [
    {
      id: 1,
      name: "Nimal Perera",
      index: "SE/2021/005",
      year: "3rd",
      degree: "Computer Science",
      email: "nimalp@ruh.ac.lk",
      category: "Medical",
      status: "Pending",
      formLink: "#",
    },
    {
      id: 2,
      name: "Kamal Silva",
      index: "SE/2021/010",
      year: "2nd",
      degree: "IT",
      email: "kamals@ruh.ac.lk",
      category: "Medical",
      status: "Approved",
      formLink: "#",
    },
  ];

  const leaveApplications = [
    {
      id: 1,
      name: "Sunil Wickrama",
      index: "SE/2021/015",
      year: "2nd",
      degree: "Mathematics",
      email: "sunilw@ruh.ac.lk",
      reason: "Family Emergency",
      status: "Pending",
      formLink: "#",
    },
    {
      id: 2,
      name: "Anoma Fernando",
      index: "SE/2020/021",
      year: "3rd",
      degree: "Computer Science",
      email: "anomaf@ruh.ac.lk",
      reason: "Travel Abroad",
      status: "Pending",
      formLink: "#",
    },
  ];

  const [search, setSearch] = useState("");

  // Filtering by degree/year/status
  const filteredMedical = medicalApplications.filter(
    (app) =>
      app.degree.toLowerCase().includes(search.toLowerCase()) ||
      app.year.toLowerCase().includes(search.toLowerCase()) ||
      app.status.toLowerCase().includes(search.toLowerCase())
  );

  // Stats data (replace with DB calculations later)
  const statsData = [
    { name: "Approved", value: 12 },
    { name: "Rejected", value: 5 },
    { name: "Pending", value: 8 },
  ];

  const COLORS = ["#4CAF50", "#F44336", "#FF9800"];

  return (
    <section className="min-h-screen flex flex-col items-center font-mono bg-[url('./assets/ruhuna.jpeg')] bg-cover p-6 space-y-10">
      <div className="w-full max-w-6xl bg-[#1e1e1e]/80 backdrop-blur-md rounded-xl shadow-xl p-8 overflow-x-auto">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Committee Panel
        </h1>

        {/* --- Search --- */}
        <div className="mb-4 flex justify-end">
          <input
            type="text"
            placeholder="Search by Degree / Year / Status..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-md text-black w-72"
          />
        </div>

        {/* --- Medical Applications --- */}
        <h2 className="text-xl font-semibold text-white mb-3">
          Medical Applications
        </h2>
        <table className="min-w-full text-white text-left border border-white/20 mb-8">
          <thead className="bg-white/20 text-white">
            <tr>
              <th className="py-3 px-4">Student Name</th>
              <th className="py-3 px-4">Index No</th>
              <th className="py-3 px-4">Year</th>
              <th className="py-3 px-4">Degree</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Form</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMedical.map((app) => (
              <tr
                key={app.id}
                className="border-t border-white/20 hover:bg-white/10 transition"
              >
                <td className="py-3 px-4">{app.name}</td>
                <td className="py-3 px-4">{app.index}</td>
                <td className="py-3 px-4">{app.year}</td>
                <td className="py-3 px-4">{app.degree}</td>
                <td className="py-3 px-4">{app.email}</td>
                <td className="py-3 px-4">
                  <a
                    href={app.formLink}
                    className="text-blue-300 underline hover:text-blue-500"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Form
                  </a>
                </td>
                <td className="py-3 px-4">{app.status}</td>
                <td className="py-3 px-4 space-x-2">
                  <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm">
                    Approve
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm">
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* --- Other Reason Leave Applications --- */}
        <h2 className="text-xl font-semibold text-white mb-3">
          Exam Leave Requests (Other Reasons)
        </h2>
        <table className="min-w-full text-white text-left border border-white/20">
          <thead className="bg-white/20 text-white">
            <tr>
              <th className="py-3 px-4">Student Name</th>
              <th className="py-3 px-4">Index No</th>
              <th className="py-3 px-4">Year</th>
              <th className="py-3 px-4">Degree</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Reason</th>
              <th className="py-3 px-4">Form</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaveApplications.map((app) => (
              <tr
                key={app.id}
                className="border-t border-white/20 hover:bg-white/10 transition"
              >
                <td className="py-3 px-4">{app.name}</td>
                <td className="py-3 px-4">{app.index}</td>
                <td className="py-3 px-4">{app.year}</td>
                <td className="py-3 px-4">{app.degree}</td>
                <td className="py-3 px-4">{app.email}</td>
                <td className="py-3 px-4">{app.reason}</td>
                <td className="py-3 px-4">
                  <a
                    href={app.formLink}
                    className="text-blue-300 underline hover:text-blue-500"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Form
                  </a>
                </td>
                <td className="py-3 px-4">{app.status}</td>
                <td className="py-3 px-4 space-x-2">
                  <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm">
                    Approve
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm">
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- Statistics Section --- */}
      <div className="w-full max-w-4xl bg-[#1e1e1e]/80 rounded-xl shadow-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Medical Requests Statistics
        </h2>
        <PieChart width={400} height={300}>
          <Pie
            data={statsData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {statsData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </section>
  );
}

export default Cdash;
