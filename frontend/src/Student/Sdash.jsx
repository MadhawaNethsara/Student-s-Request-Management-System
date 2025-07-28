import { useState, useEffect } from "react";

const Sdash = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  // useEffect(() => {
  //   if (!user || user.role !== "student") {
  //     window.location.href = "/";
  //   }
  // }, [user]);

  const [subjects, setSubjects] = useState([
    { name: "", code: "", date: "" },
  ]);

  const handleSubjectChange = (index, field, value) => {
    const updated = [...subjects];
    updated[index][field] = value;
    setSubjects(updated);
  };

  const addSubjectRow = () => {
    setSubjects([...subjects, { name: "", code: "", date: "" }]);
  };

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
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        alert("Medical form submitted successfully!");
        setSubjects([{ name: "", code: "", date: "" }]);
        e.target.reset();
      } else {
        alert("Submission failed: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center font-mono bg-[url('./assets/ruhuna.jpeg')] bg-cover p-4">
      <div className="w-full max-w-4xl bg-[#1e1e1e]/80 rounded-xl shadow-xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-6 text-center">Submit Medical Form</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="input-style"
            />
            <input
              type="text"
              name="regNumber"
              placeholder="Registration Number"
              className="input-style"
            />

            <select name="year" className="input-style">
              <option value="">Select Year</option>
              <option>2020</option>
              <option>2021</option>
              <option>2022</option>
              <option>2023</option>
            </select>

            <select name="level" className="input-style">
              <option value="">Select Level</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>Special</option>
            </select>

            <select name="semester" className="input-style">
              <option value="">Select Semester</option>
              <option>1st Semester</option>
              <option>2nd Semester</option>
            </select>

            <select name="degree" className="input-style">
              <option value="">Degree Programme</option>
              <option>Bio Science</option>
              <option>Physical Science</option>
              <option>Computer Science</option>
            </select>

            <input
              type="text"
              name="contact"
              placeholder="Contact Number"
              className="input-style col-span-2"
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              Subjects Covered by Medical
            </h2>
            <div className="space-y-2">
              {subjects.map((subj, index) => (
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
            <label className="block font-semibold mb-1">
              Upload Medical Slip
            </label>
            <input
              type="file"
              name="medicalSlip"
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
    </section>
  );
};

export default Sdash;
