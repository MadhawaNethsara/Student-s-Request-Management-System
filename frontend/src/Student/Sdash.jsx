import { useState, useEffect } from "react";

const Sdash = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [subjects, setSubjects] = useState([{ name: "", code: "", date: "" }]);
  const [leaveReason, setLeaveReason] = useState("");
  const [leaveDetails, setLeaveDetails] = useState("");
  const [requests, setRequests] = useState([]); // Store fetched requests

  const handleSubjectChange = (index, field, value) => {
    const updated = [...subjects];
    updated[index][field] = value;
    setSubjects(updated);
  };

  const addSubjectRow = () => {
    setSubjects([...subjects, { name: "", code: "", date: "" }]);
  };

  // Medical Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", e.target.fullName.value);
    formData.append("regNumber", e.target.regNumber.value);
    formData.append("year", e.target.year.value);
    formData.append("level", e.target.level.value);
    formData.append("semester", e.target.semester.value);
    formData.append("degree", e.target.degree.value);
    formData.append("contact", e.target.contact.value);
    formData.append("subjects", JSON.stringify(subjects));
    formData.append("file", e.target.medicalSlip.files[0]);

    try {
      const token = user?.token;
      const res = await fetch("http://localhost:5000/api/student/submit", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        alert("Medical form submitted successfully!");
        setSubjects([{ name: "", code: "", date: "" }]);
        e.target.reset();
        fetchRequests(); // refresh request list
      } else {
        alert("Submission failed: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  // Exam Leave (Other Reason) Submit
  const handleLeaveSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", e.target.fullName.value);
    formData.append("regNumber", e.target.regNumber.value);
    formData.append("year", e.target.year.value);
    formData.append("level", e.target.level.value);
    formData.append("semester", e.target.semester.value);
    formData.append("degree", e.target.degree.value);
    formData.append("contact", e.target.contact.value);
    formData.append("reason", leaveReason);
    formData.append("details", leaveDetails);
    formData.append("file", e.target.proofDoc.files[0]);

    try {
      const token = user?.token;
      const res = await fetch("http://localhost:5000/api/student/leave-request", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        alert("Exam leave request submitted successfully!");
        setLeaveReason("");
        setLeaveDetails("");
        e.target.reset();
        fetchRequests(); // refresh request list
      } else {
        alert("Leave request failed: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the leave request.");
    }
  };

  // Fetch all student requests (Medical + Leave)
  const fetchRequests = async () => {
    try {
      const token = user?.token;
      const res = await fetch("http://localhost:5000/api/student/my-requests", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setRequests(data);
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center font-mono bg-[url('./assets/ruhuna.jpeg')] bg-cover p-6 space-y-10">

      {/* ---------------- Forms Grid ---------------- */}
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Medical Form */}
        <div className="bg-[#1e1e1e]/80 rounded-xl shadow-xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-6 text-center">Submit Medical Form</h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" name="fullName" placeholder="Full Name" className="input-style" />
              <input type="text" name="regNumber" placeholder="Registration Number" className="input-style" />
              <select name="year" className="input-style">
                <option value="">Select Year</option>
                <option>2020</option><option>2021</option><option>2022</option><option>2023</option>
              </select>
              <select name="level" className="input-style">
                <option value="">Select Level</option>
                <option>1</option><option>2</option><option>3</option><option>Special</option>
              </select>
              <select name="semester" className="input-style">
                <option value="">Select Semester</option>
                <option>1st Semester</option><option>2nd Semester</option>
              </select>
              <select name="degree" className="input-style">
                <option value="">Degree Programme</option>
                <option>Bio Science</option><option>Physical Science</option><option>Computer Science</option>
              </select>
              <input type="text" name="contact" placeholder="Contact Number" className="input-style col-span-2" />
            </div>

            {/* Subjects */}
            <div>
              <h2 className="text-xl font-semibold mb-2">Subjects Covered by Medical</h2>
              <div className="space-y-2">
                {subjects.map((subj, index) => (
                  <div key={index} className="grid grid-cols-3 gap-4">
                    <input type="text" placeholder="Subject Name" className="input-style" value={subj.name} onChange={(e) => handleSubjectChange(index, "name", e.target.value)} />
                    <input type="text" placeholder="Subject Code" className="input-style" value={subj.code} onChange={(e) => handleSubjectChange(index, "code", e.target.value)} />
                    <input type="date" className="input-style" value={subj.date} onChange={(e) => handleSubjectChange(index, "date", e.target.value)} />
                  </div>
                ))}
                <button type="button" onClick={addSubjectRow} className="mt-2 text-sm text-blue-300 hover:underline">
                  + Add another subject
                </button>
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1">Upload Medical Slip</label>
              <input type="file" name="medicalSlip" className="input-style bg-white text-black" />
            </div>

            <button type="submit" className="px-6 py-2 mt-4 rounded-md bg-gradient-to-tr from-green-400 to-blue-500 hover:to-pink-500 text-white text-lg">
              Submit
            </button>
          </form>
        </div>

        {/* Exam Leave Form */}
        <div className="bg-[#2a2a2a]/80 rounded-xl shadow-xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-6 text-center">Request Exam Leave</h1>
          <form className="space-y-4" onSubmit={handleLeaveSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" name="fullName" placeholder="Full Name" className="input-style" />
              <input type="text" name="regNumber" placeholder="Registration Number" className="input-style" />
              <select name="year" className="input-style">
                <option value="">Select Year</option>
                <option>2020</option><option>2021</option><option>2022</option><option>2023</option>
              </select>
              <select name="level" className="input-style">
                <option value="">Select Level</option>
                <option>1</option><option>2</option><option>3</option><option>Special</option>
              </select>
              <select name="semester" className="input-style">
                <option value="">Select Semester</option>
                <option>1st Semester</option><option>2nd Semester</option>
              </select>
              <select name="degree" className="input-style">
                <option value="">Degree Programme</option>
                <option>Bio Science</option><option>Physical Science</option><option>Computer Science</option>
              </select>
              <input type="text" name="contact" placeholder="Contact Number" className="input-style col-span-2" />
            </div>

            <textarea name="reason" placeholder="Reason for Leave" className="input-style w-full" value={leaveReason} onChange={(e) => setLeaveReason(e.target.value)} />
            <textarea name="details" placeholder="Provide additional details..." className="input-style w-full" rows="3" value={leaveDetails} onChange={(e) => setLeaveDetails(e.target.value)} />

            <div>
              <label className="block font-semibold mb-1">Upload Proof Document</label>
              <input type="file" name="proofDoc" className="input-style bg-white text-black" />
            </div>

            <button type="submit" className="px-6 py-2 mt-4 rounded-md bg-gradient-to-tr from-yellow-400 to-red-500 hover:to-pink-600 text-white text-lg">
              Submit Leave Request
            </button>
          </form>
        </div>
      </div>

      {/* ---------------- Requests Status Section ---------------- */}
      <div className="w-full max-w-7xl bg-[#1e1e1e]/80 rounded-xl shadow-xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-6 text-center">My Requests Status</h1>
        <table className="w-full text-left border border-white/20">
          <thead className="bg-white/20">
            <tr>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Submitted On</th>
              <th className="py-3 px-4">Details</th>
              <th className="py-3 px-4">Current Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.length > 0 ? (
              requests.map((req, i) => (
                <tr key={i} className="border-t border-white/20 hover:bg-white/10 transition">
                  <td className="py-3 px-4">{req.type}</td>
                  <td className="py-3 px-4">{new Date(req.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 px-4">{req.reason || "Medical request"}</td>
                  <td className="py-3 px-4">
                    {req.status === "mentor_pending" && "Being checked by Mentor"}
                    {req.status === "doctor_pending" && "Being checked by Doctor"}
                    {req.status === "committee_pending" && "Waiting for Committee decision"}
                    {req.status === "approved" && <span className="text-green-400">Approved</span>}
                    {req.status === "rejected" && <span className="text-red-400">Rejected</span>}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-400">
                  No requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Sdash;
