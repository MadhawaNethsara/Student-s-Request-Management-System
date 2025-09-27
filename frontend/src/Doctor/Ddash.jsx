import React, { useEffect, useState } from "react";
import axios from "axios";

function Ddash() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const token = storedUser.token;

  useEffect(() => {
    if (!token) {
      setError("Session expired. Please login again.");
      setLoading(false);
      return;
    }

    const fetchForms = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/doctor/forms", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          setForms(res.data.forms);
        } else {
          setError("Failed to load forms");
        }
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
    if (!token) {
      alert("Session expired. Please login again.");
      return;
    }

    let reason = "";
    if (action === "reject") {
      reason = prompt("Enter reason for rejection:");
      if (!reason) return;
    }

    try {
      const res = await axios.put(
        `http://localhost:5000/api/doctor/forms/${id}/review`,
        { action, reason },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        alert(res.data.message);
        setForms(forms.filter((form) => form._id !== id));
      } else {
        alert("Action failed: " + (res.data.error || "Unknown error"));
      }
    } catch (err) {
      console.error("Error reviewing form:", err);
      alert("Action failed. Please try again.");
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center font-mono p-6 space-y-10">
      <div className="w-full max-w-4xl bg-[#1e1e1e]/80 rounded-xl shadow-xl p-8 overflow-x-auto">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Doctor Panel
        </h1>

        {loading ? (
          <p className="text-white text-center">Loading forms...</p>
        ) : error ? (
          <p className="text-red-400 text-center">{error}</p>
        ) : forms.length === 0 ? (
          <p className="text-white text-center">No submitted forms available</p>
        ) : (
          <table className="min-w-full text-white text-left border border-white/20">
            <thead className="bg-white/20">
              <tr>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Reg. Number</th>
                <th className="py-3 px-4">Medical Slip</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {forms.map((entry) => (
                <tr
                  key={entry._id}
                  className="border-t border-white/20 hover:bg-white/10"
                >
                  <td className="py-3 px-4">{entry.fullName}</td>
                  <td className="py-3 px-4">{entry.regNumber}</td>
                  <td className="py-3 px-4">
                    {entry.medicalSlip ? (
                      <a
                        href={`http://localhost:5000/${entry.medicalSlip}`}
                        className="text-blue-300 underline hover:text-blue-500"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Slip
                      </a>
                    ) : (
                      "No slip"
                    )}
                  </td>
                  <td className="py-3 px-4 space-x-2">
                    <button
                      onClick={() => handleReview(entry._id, "approve")}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReview(entry._id, "reject")}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}

export default Ddash;
