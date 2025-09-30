import { useState, useEffect } from "react";

const Sdash = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const token = storedUser?.token;

  // ---------------- Medical Form State ----------------
  const [medicalForm, setMedicalForm] = useState({
    fullName: "",
    regNumber: "",
    year: "",
    level: "",
    semester: "",
    degree: "",
    contact: "",
    subjects: [{ name: "", code: "", date: "" }],
    medicalSlip: null,
  });

  // ---------------- Leave Form State ----------------
  const [leaveForm, setLeaveForm] = useState({
    fullName: "",
    regNumber: "",
    year: "",
    level: "",
    semester: "",
    degree: "",
    contact: "",
    reason: "",
    details: "",
    proofDoc: null,
  });

  // ---------------- Fetch Student Data ----------------
  useEffect(() => {
    if (!token) return;

    const fetchStudentData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/student/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          // Prefill medical and leave forms
          const prefill = {
            fullName: data.name || "",
            regNumber: data.registration_number || "",
            year: data.year || "",
            level: data.level || "",
            semester: data.semester || "",
            degree: data.degree || "",
            contact: data.contact_number || "",
          };
          setMedicalForm((prev) => ({ ...prev, ...prefill }));
          setLeaveForm((prev) => ({ ...prev, ...prefill }));
        } else console.error("Fetch student failed:", data.message);
      } catch (err) {
        console.error("Error fetching student data:", err);
      }
    };

    fetchStudentData();
  }, [token]);

  // ---------------- Handlers ----------------
  const handleMedicalChange = (e) => {
    const { name, value } = e.target;
    setMedicalForm({ ...medicalForm, [name]: value });
  };

  const handleMedicalFile = (e) => {
    setMedicalForm({ ...medicalForm, medicalSlip: e.target.files[0] });
  };

  const handleSubjectChange = (index, field, value) => {
    const updated = [...medicalForm.subjects];
    updated[index][field] = value;
    setMedicalForm({ ...medicalForm, subjects: updated });
  };

  const addSubjectRow = () => {
    setMedicalForm({
      ...medicalForm,
      subjects: [...medicalForm.subjects, { name: "", code: "", date: "" }],
    });
  };

  const handleMedicalSubmit = async (e) => {
    e.preventDefault();
    if (!token) return alert("Token missing. Please login again.");
    if (!medicalForm.medicalSlip) return alert("Upload a medical slip.");

    try {
      const formData = new FormData();
      formData.append("subjects", JSON.stringify(medicalForm.subjects));
      formData.append("medicalSlip", medicalForm.medicalSlip);
      formData.append("fullName", medicalForm.fullName);
      formData.append("regNumber", medicalForm.regNumber);
      formData.append("year", medicalForm.year);
      formData.append("level", medicalForm.level);
      formData.append("semester", medicalForm.semester);
      formData.append("degree", medicalForm.degree);
      formData.append("contact", medicalForm.contact);

      const res = await fetch("http://localhost:5000/api/student/medicalform", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        alert("Medical form submitted ✅");
        setMedicalForm((prev) => ({
          ...prev,
          subjects: [{ name: "", code: "", date: "" }],
          medicalSlip: null,
        }));
      } else alert("Submission failed ❌: " + data.message);
    } catch (err) {
      console.error(err);
      alert("Submission failed ❌ Check console for details.");
    }
  };

  // ---------------- Leave Form Handlers ----------------
  const handleLeaveChange = (e) => {
    const { name, value } = e.target;
    setLeaveForm({ ...leaveForm, [name]: value });
  };

  const handleLeaveFile = (e) => {
    setLeaveForm({ ...leaveForm, proofDoc: e.target.files[0] });
  };

  const handleLeaveSubmit = async (e) => {
    e.preventDefault();
    if (!token) return alert("Token missing. Please login again.");
    if (!leaveForm.reason) return alert("Please provide a reason for leave.");

    try {
      const formData = new FormData();
      formData.append("fullName", leaveForm.fullName);
      formData.append("regNumber", leaveForm.regNumber);
      formData.append("year", leaveForm.year);
      formData.append("level", leaveForm.level);
      formData.append("semester", leaveForm.semester);
      formData.append("degree", leaveForm.degree);
      formData.append("contact", leaveForm.contact);
      formData.append("reason", leaveForm.reason);
      formData.append("details", leaveForm.details);
      if (leaveForm.proofDoc) formData.append("proofDoc", leaveForm.proofDoc);

      const res = await fetch("http://localhost:5000/api/student/leave", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        alert("Leave request submitted ✅");
        setLeaveForm((prev) => ({ ...prev, reason: "", details: "", proofDoc: null }));
      } else alert("Submission failed ❌: " + data.message);
    } catch (err) {
      console.error(err);
      alert("Submission failed ❌ Check console for details.");
    }
  };

  // ---------------- JSX ----------------
  return (
    <section className="min-h-screen flex flex-col items-center font-mono p-6 space-y-10">
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Medical Form */}
        <div className="bg-[#1e1e1e]/80 rounded-xl shadow-xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-6 text-center">Submit Medical Form</h1>
          <form className="space-y-4" onSubmit={handleMedicalSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="fullName"
                value={medicalForm.fullName}
                onChange={handleMedicalChange}
                placeholder="Full Name"
                className="input-style"
              />
              <input
                type="text"
                name="regNumber"
                value={medicalForm.regNumber}
                onChange={handleMedicalChange}
                placeholder="Registration Number"
                className="input-style"
              />
              <select
                name="year"
                value={medicalForm.year}
                onChange={handleMedicalChange}
                className="input-style"
              >
                <option value="">Select Year</option>
                <option>2025</option>
                <option>2026</option>
                <option>2027</option>
              </select>
              <select
                name="level"
                value={medicalForm.level}
                onChange={handleMedicalChange}
                className="input-style"
              >
                <option value="">Select Level</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
              <select
                name="semester"
                value={medicalForm.semester}
                onChange={handleMedicalChange}
                className="input-style"
              >
                <option value="">Select Semester</option>
                <option>1st Semester</option>
                <option>2nd Semester</option>
              </select>
              <select
                name="degree"
                value={medicalForm.degree}
                onChange={handleMedicalChange}
                className="input-style"
              >
                <option value="">Degree Programme</option>
                <option>Bio Science</option>
                <option>Physical Science</option>
                <option>Computer Science</option>
              </select>
              <input
                type="text"
                name="contact"
                value={medicalForm.contact}
                onChange={handleMedicalChange}
                placeholder="Contact Number"
                className="input-style col-span-2"
              />
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Subjects Covered by Medical</h2>
              <div className="space-y-2">
                {medicalForm.subjects.map((subj, index) => (
                  <div key={index} className="grid grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="Subject Name"
                      className="input-style"
                      value={subj.name}
                      onChange={(e) => handleSubjectChange(index, "name", e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Subject Code"
                      className="input-style"
                      value={subj.code}
                      onChange={(e) => handleSubjectChange(index, "code", e.target.value)}
                    />
                    <input
                      type="date"
                      className="input-style"
                      value={subj.date}
                      onChange={(e) => handleSubjectChange(index, "date", e.target.value)}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addSubjectRow}
                  className="mt-2 text-sm text-blue-300 hover:underline"
                >
                  + Add another subject
                </button>
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1">Upload Medical Slip</label>
              <input
                type="file"
                name="medicalSlip"
                onChange={handleMedicalFile}
                className="input-style bg-white text-black"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2 mt-4 rounded-md bg-gradient-to-tr from-green-400 to-blue-500 hover:to-pink-500 text-white text-lg"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Leave Form */}
        <div className="bg-[#2a2a2a]/80 rounded-xl shadow-xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-6 text-center">Request Exam Leave</h1>
          <form className="space-y-4" onSubmit={handleLeaveSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="fullName"
                value={leaveForm.fullName}
                onChange={handleLeaveChange}
                placeholder="Full Name"
                className="input-style"
              />
              <input
                type="text"
                name="regNumber"
                value={leaveForm.regNumber}
                onChange={handleLeaveChange}
                placeholder="Registration Number"
                className="input-style"
              />
              <select
                name="year"
                value={leaveForm.year}
                onChange={handleLeaveChange}
                className="input-style"
              >
                <option value="">Select Year</option>
                <option>2025</option>
                <option>2026</option>
                <option>2027</option>
              </select>
              <select
                name="level"
                value={leaveForm.level}
                onChange={handleLeaveChange}
                className="input-style"
              >
                <option value="">Select Level</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
              <select
                name="semester"
                value={leaveForm.semester}
                onChange={handleLeaveChange}
                className="input-style"
              >
                <option value="">Select Semester</option>
                <option>1st Semester</option>
                <option>2nd Semester</option>
              </select>
              <select
                name="degree"
                value={leaveForm.degree}
                onChange={handleLeaveChange}
                className="input-style"
              >
                <option value="">Degree Programme</option>
                <option>Bio Science</option>
                <option>Physical Science</option>
                <option>Computer Science</option>
              </select>
              <input
                type="text"
                name="contact"
                value={leaveForm.contact}
                onChange={handleLeaveChange}
                placeholder="Contact Number"
                className="input-style col-span-2"
              />
            </div>

            <textarea
              name="reason"
              value={leaveForm.reason}
              onChange={handleLeaveChange}
              placeholder="Reason for Leave"
              className="input-style w-full"
            />
            <textarea
              name="details"
              value={leaveForm.details}
              onChange={handleLeaveChange}
              placeholder="Additional details..."
              className="input-style w-full"
              rows="3"
            />

            <div>
              <label className="block font-semibold mb-1">Upload Proof Document</label>
              <input
                type="file"
                name="proofDoc"
                onChange={handleLeaveFile}
                className="input-style bg-white text-black"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2 mt-4 rounded-md bg-gradient-to-tr from-green-400 to-blue-500 hover:to-pink-500 text-white text-lg"
            >
              Submit Leave Request
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Sdash;
