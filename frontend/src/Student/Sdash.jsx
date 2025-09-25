import { useState, useEffect } from "react";

const Sdash = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const token = storedUser?.token;

  // ---------------- Medical Form States ----------------
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

  // ---------------- Leave Form States (display only) ----------------
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

  // ---------------- Fetch Logged-in Student Data ----------------
  useEffect(() => {
    if (!token) return;

    const fetchStudentData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/student/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        if (res.ok) {
          // Prefill medical form
          setMedicalForm((prev) => ({
            ...prev,
            fullName: data.name || "",
            regNumber: data.registration_number || "",
            year: data.level || "", // your backend may only have "level"
            level: data.level || "",
            semester: data.semester || "",
            degree: data.degree || "",
            contact: data.contact_number || "",
          }));

          // Prefill leave form (display only)
          setLeaveForm((prev) => ({
            ...prev,
            fullName: data.name || "",
            regNumber: data.registration_number || "",
            year: data.level || "",
            level: data.level || "",
            semester: data.semester || "",
            degree: data.degree || "",
            contact: data.contact_number || "",
          }));
        } else {
          console.error("Failed to fetch student data:", data.message);
        }
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

  // ---------------- Medical Form Submission ----------------
  const handleMedicalSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Token not found. Please login again.");
      return;
    }

    if (!medicalForm.medicalSlip) {
      alert("Please upload a medical slip.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("subjects", JSON.stringify(medicalForm.subjects));
      formData.append("medicalSlip", medicalForm.medicalSlip);

      // Optional: you can include other fields if backend expects them
      formData.append("fullName", medicalForm.fullName);
      formData.append("regNumber", medicalForm.regNumber);
      formData.append("year", medicalForm.year);
      formData.append("level", medicalForm.level);
      formData.append("semester", medicalForm.semester);
      formData.append("degree", medicalForm.degree);
      formData.append("contact", medicalForm.contact);

      const res = await fetch(
        "http://localhost:5000/api/student/medicalform",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Medical form submitted successfully ✅");
        setMedicalForm((prev) => ({
          ...prev,
          subjects: [{ name: "", code: "", date: "" }],
          medicalSlip: null,
        }));
      } else {
        alert("Submission failed: " + data.message);
      }
    } catch (err) {
      console.error("Error submitting medical form:", err);
      alert("Submission failed: Check console for details");
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center font-mono bg-[url('./assets/ruhuna.jpeg')] bg-cover p-6 space-y-10">
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Medical Form */}
        <div className="bg-[#1e1e1e]/80 rounded-xl shadow-xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Submit Medical Form
          </h1>
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
                <option>2020</option>
                <option>2021</option>
                <option>2022</option>
                <option>2023</option>
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
                <option>Special</option>
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

            {/* Subjects */}
            <div>
              <h2 className="text-xl font-semibold mb-2">
                Subjects Covered by Medical
              </h2>
              <div className="space-y-2">
                {medicalForm.subjects.map((subj, index) => (
                  <div key={index} className="grid grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="Subject Name"
                      className="input-style"
                      value={subj.name}
                      onChange={(e) =>
                        handleSubjectChange(index, "name", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      placeholder="Subject Code"
                      className="input-style"
                      value={subj.code}
                      onChange={(e) =>
                        handleSubjectChange(index, "code", e.target.value)
                      }
                    />
                    <input
                      type="date"
                      className="input-style"
                      value={subj.date}
                      onChange={(e) =>
                        handleSubjectChange(index, "date", e.target.value)
                      }
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

        {/* Exam Leave Form (display only) */}
        <div className="bg-[#2a2a2a]/80 rounded-xl shadow-xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-6 text-center">Request Exam Leave</h1>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                value={leaveForm.fullName}
                readOnly
                className="input-style bg-gray-500/50"
              />
              <input
                type="text"
                value={leaveForm.regNumber}
                readOnly
                className="input-style bg-gray-500/50"
              />
              <select value={leaveForm.year} disabled className="input-style bg-gray-500/50">
                <option>{leaveForm.year}</option>
              </select>
              <select value={leaveForm.level} disabled className="input-style bg-gray-500/50">
                <option>{leaveForm.level}</option>
              </select>
              <select value={leaveForm.semester} disabled className="input-style bg-gray-500/50">
                <option>{leaveForm.semester}</option>
              </select>
              <select value={leaveForm.degree} disabled className="input-style bg-gray-500/50">
                <option>{leaveForm.degree}</option>
              </select>
              <input
                type="text"
                value={leaveForm.contact}
                readOnly
                className="input-style col-span-2 bg-gray-500/50"
              />
            </div>

            <textarea
              value={leaveForm.reason}
              readOnly
              placeholder="Reason for Leave"
              className="input-style w-full bg-gray-500/50"
            />
            <textarea
              value={leaveForm.details}
              readOnly
              placeholder="Additional details..."
              className="input-style w-full bg-gray-500/50"
              rows="3"
            />

            <div>
              <label className="block font-semibold mb-1">Upload Proof Document</label>
              <input type="file" disabled className="input-style bg-gray-500/50" />
            </div>

            <button
              type="button"
              disabled
              className="px-6 py-2 mt-4 rounded-md bg-gray-400 text-white text-lg cursor-not-allowed"
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
