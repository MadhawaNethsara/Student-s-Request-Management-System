import { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

function Cdash() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const token = storedUser.token;

  useEffect(() => {
    const fetchForms = async () => {
      if (!token) {
        setError("No token found. Please login again.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/api/committee/forms", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) setForms(res.data.forms || []);
      } catch (err) {
        console.error("Error fetching forms:", err);
        setError("Failed to load forms");
      } finally {
        setLoading(false);
      }
    };
    fetchForms();
  }, [token]);

  const handleReview = async (id, action) => {
    let reason = "";
    if (action === "reject") {
      reason = prompt("Enter reason for rejection:");
      if (!reason) return;
    }

    try {
      await axios.put(
        `http://localhost:5000/api/committee/forms/${id}/review`,
        { action, reason },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setForms(forms.filter((f) => f._id !== id));
    } catch (err) {
      console.error("Error reviewing form:", err);
      alert("Action failed. Please try again.");
    }
  };

  // Filtering by student name, regNumber, or status
  const filteredForms = forms.filter(
    (f) =>
      f.student?.name?.toLowerCase().includes(search.toLowerCase()) ||
      f.student?.regNumber?.toLowerCase().includes(search.toLowerCase()) ||
      (f.status || "").toLowerCase().includes(search.toLowerCase())
  );

  // Statistics for PieChart
  const stats = filteredForms.reduce(
    (acc, f) => {
      if (f.status === "committee_approved") acc.approved += 1;
      else if (f.status === "committee_rejected") acc.rejected += 1;
      else acc.pending += 1;
      return acc;
    },
    { approved: 0, rejected: 0, pending: 0 }
  );

  const statsData = [
    { name: "Approved", value: stats.approved },
    { name: "Rejected", value: stats.rejected },
    { name: "Pending", value: stats.pending },
  ];

  const COLORS = ["#4CAF50", "#F44336", "#FF9800"];

  return (
   <section className="min-h-screen flex flex-col items-center font-mono p-6 space-y-10">
      <div className="w-full max-w-6xl bg-[#1e1e1e]/80 backdrop-blur-md rounded-xl shadow-xl p-8 overflow-x-auto">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Committee Panel
        </h1>

        {loading ? (
          <p className="text-white text-center">Loading forms...</p>
        ) : error ? (
          <p className="text-red-400 text-center">{error}</p>
        ) : (
          <>
            <div className="mb-4 flex justify-end">
              <input
                type="text"
                placeholder="Search by Name / Index / Status..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-4 py-2 rounded-md text-black w-72"
              />
            </div>

            <table className="min-w-full text-white text-left border border-white/20">
              <thead className="bg-white/20 text-white">
                <tr>
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">Index No</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Form</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredForms.map((f) => (
                  <tr
                    key={f._id}
                    className="border-t border-white/20 hover:bg-white/10 transition"
                  >
                    <td className="py-3 px-4">{f.student?.name || "-"}</td>
                    <td className="py-3 px-4">{f.student?.regNumber || "-"}</td>
                    <td className="py-3 px-4">{f.student?.email || "-"}</td>
                    <td className="py-3 px-4">
                      <a
                        href={`http://localhost:5000/${f.medicalSlip || ""}`}
                        className="text-blue-300 underline hover:text-blue-500"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Form
                      </a>
                    </td>
                    <td className="py-3 px-4">{f.status || "Pending"}</td>
                    <td className="py-3 px-4 space-x-2">
                      {(f.status || "") === "doctor_validated" && (
                        <>
                          <button
                            onClick={() => handleReview(f._id, "approve")}
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReview(f._id, "reject")}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>

      {/* Statistics */}
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
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
