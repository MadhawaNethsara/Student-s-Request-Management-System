import { useEffect, useState } from "react";
import axios from "axios";

function Cdash() {
  const [medicalForms, setMedicalForms] = useState([]);
  const [leaveForms, setLeaveForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchMedical, setSearchMedical] = useState("");
  const [searchLeave, setSearchLeave] = useState("");
  const [showRejectedMedical, setShowRejectedMedical] = useState(false);

  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const token = storedUser.token;

  // Fetch forms
  useEffect(() => {
    if (!token) {
      setError("Session expired. Please login again.");
      setLoading(false);
      return;
    }

    const fetchForms = async () => {
      try {
        const medRes = await axios.get("http://localhost:5000/api/committee/forms", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (medRes.data.success) setMedicalForms(medRes.data.forms || []);

        const leaveRes = await axios.get("http://localhost:5000/api/committee/leaveforms", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (leaveRes.data.success) setLeaveForms(leaveRes.data.forms || []);
      } catch (err) {
        console.error("Error fetching forms:", err);
        setError("Failed to load forms");
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, [token]);

  // Approve/Reject Medical
  const handleMedicalAction = async (id, action) => {
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
        `http://localhost:5000/api/committee/forms/${id}/review`,
        { action, reason },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        alert(res.data.message);
        setMedicalForms((prev) => prev.filter((f) => f._id !== id));
      } else {
        alert("Action failed: " + (res.data.error || "Unknown error"));
      }
    } catch (err) {
      console.error("Error reviewing medical form:", err);
      alert("Action failed. Please try again.");
    }
  };

  // Approve/Reject Leave
  const handleLeaveAction = async (id, action) => {
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
        `http://localhost:5000/api/committee/leaveforms/${id}/review`,
        { action, reason },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        alert(res.data.message);
        setLeaveForms((prev) => prev.filter((f) => f._id !== id));
      } else {
        alert("Action failed: " + (res.data.error || "Unknown error"));
      }
    } catch (err) {
      console.error("Error reviewing leave form:", err);
      alert("Action failed. Please try again.");
    }
  };

  // Stats calculator
  const calculateStats = (forms, type) => {
    const stats = { approved: 0, rejected: 0, pending: 0 };
    forms.forEach((f) => {
      if (f.status === "committee_approved") stats.approved++;
      else if (f.status === "committee_rejected") stats.rejected++;
      else if (type === "medical" && f.status === "doctor_approved") stats.pending++;
      else if (type === "leave" && f.status === "pending") stats.pending++;
    });
    return stats;
  };

  const medicalStats = calculateStats(medicalForms, "medical");
  const leaveStats = calculateStats(leaveForms, "leave");

  // Filtered lists
  const filteredMedicalForms = medicalForms.filter((f) => {
    const statusFilter = showRejectedMedical
      ? f.status === "committee_rejected"
      : f.status === "doctor_approved";
    return (
      statusFilter &&
      (f.student?.name?.toLowerCase().includes(searchMedical.toLowerCase()) ||
        f.student?.regNumber?.toLowerCase().includes(searchMedical.toLowerCase()) ||
        f.subject?.name?.toLowerCase().includes(searchMedical.toLowerCase()))
    );
  });

  const filteredLeaveForms = leaveForms.filter(
    (f) =>
      f.student?.name?.toLowerCase().includes(searchLeave.toLowerCase()) ||
      f.student?.regNumber?.toLowerCase().includes(searchLeave.toLowerCase()) ||
      (f.status || "").toLowerCase().includes(searchLeave.toLowerCase())
  );

  if (loading) return <p className="text-white text-center mt-10">Loading forms...</p>;
  if (error) return <p className="text-red-400 text-center mt-10">{error}</p>;

  return (
    <section className="min-h-screen p-6 space-y-10 font-mono">
      {/* --- Stats Section --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-green-600/80 p-4 rounded-xl text-center text-white">
          <h2 className="text-lg font-bold">Medical Approved</h2>
          <p className="text-2xl">{medicalStats.approved}</p>
        </div>
        <div className="bg-red-600/80 p-4 rounded-xl text-center text-white">
          <h2 className="text-lg font-bold">Medical Rejected</h2>
          <p className="text-2xl">{medicalStats.rejected}</p>
        </div>
        <div className="bg-yellow-600/80 p-4 rounded-xl text-center text-white">
          <h2 className="text-lg font-bold">Medical Pending</h2>
          <p className="text-2xl">{medicalStats.pending}</p>
        </div>
        <div className="bg-blue-600/80 p-4 rounded-xl text-center text-white">
          <h2 className="text-lg font-bold">Leave Approved</h2>
          <p className="text-2xl">{leaveStats.approved}</p>
        </div>
        <div className="bg-purple-600/80 p-4 rounded-xl text-center text-white">
          <h2 className="text-lg font-bold">Leave Rejected</h2>
          <p className="text-2xl">{leaveStats.rejected}</p>
        </div>
        <div className="bg-orange-600/80 p-4 rounded-xl text-center text-white">
          <h2 className="text-lg font-bold">Leave Pending</h2>
          <p className="text-2xl">{leaveStats.pending}</p>
        </div>
      </div>

      {/* --- Medical Forms --- */}
      <div className="bg-[#1e1e1e]/80 rounded-xl shadow-xl p-6 overflow-x-auto">
        <h1 className="text-3xl font-bold text-white mb-4 text-center">Medical Forms</h1>
        <div className="mb-4 flex justify-between items-center">
          <input
            type="text"
            placeholder="Search by Name / Index / Subject..."
            value={searchMedical}
            onChange={(e) => setSearchMedical(e.target.value)}
            className="px-4 py-2 rounded-md text-black w-72"
          />
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            onClick={() => setShowRejectedMedical((prev) => !prev)}
          >
            {showRejectedMedical ? "Show Approved" : "Show Rejected"}
          </button>
        </div>

        <table className="min-w-full text-white text-left border border-white/20">
          <thead className="bg-white/20">
            <tr>
              <th className="py-3 px-4">Student Name</th>
              <th className="py-3 px-4">Index No</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Subject</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMedicalForms.map((f) => (
              <tr key={f._id} className="border-t border-white/20 hover:bg-white/10">
                <td className="py-3 px-4">{f.student?.name || "-"}</td>
                <td className="py-3 px-4">{f.student?.regNumber || "-"}</td>
                <td className="py-3 px-4">{f.student?.email || "-"}</td>
                <td className="py-3 px-4">{f.subject?.name || "-"}</td>
                <td className="py-3 px-4">{f.status}</td>
                <td className="py-3 px-4 space-x-2">
                  {f.status === "doctor_approved" && (
                    <>
                      <button
                        onClick={() => handleMedicalAction(f._id, "approve")}
                        className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded-md text-sm"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleMedicalAction(f._id, "reject")}
                        className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md text-sm"
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
      </div>

      {/* --- Leave Forms --- */}
      <div className="bg-[#1e1e1e]/80 rounded-xl shadow-xl p-6 overflow-x-auto">
        <h1 className="text-3xl font-bold text-white mb-4 text-center">Leave Requests</h1>
        <div className="mb-4 flex justify-end">
          <input
            type="text"
            placeholder="Search by Name / Index / Status..."
            value={searchLeave}
            onChange={(e) => setSearchLeave(e.target.value)}
            className="px-4 py-2 rounded-md text-black w-72"
          />
        </div>

        <table className="min-w-full text-white text-left border border-white/20">
          <thead className="bg-white/20">
            <tr>
              <th className="py-3 px-4">Student Name</th>
              <th className="py-3 px-4">Index No</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>3
          </thead>
          <tbody>
            {filteredLeaveForms.map((f) => (
              <tr key={f._id} className="border-t border-white/20 hover:bg-white/10">
                <td className="py-3 px-4">{f.student?.name || "-"}</td>
                <td className="py-3 px-4">{f.student?.regNumber || "-"}</td>
                <td className="py-3 px-4">{f.student?.email || "-"}</td>
                <td className="py-3 px-4">{f.status || "Pending"}</td>
                <td className="py-3 px-4 space-x-2">
                  {f.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleLeaveAction(f._id, "approve")}
                        className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded-md text-sm"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleLeaveAction(f._id, "reject")}
                        className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md text-sm"
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
      </div>
    </section>
  );
}

export default Cdash;
