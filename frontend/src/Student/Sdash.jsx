import { useState } from "react";

function Sdash() {
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

  return (
    <section className="min-h-screen flex items-center justify-center font-mono bg-[url('./assets/ruhuna.jpeg')] bg-cover p-4">
      <div className="w-full max-w-4xl bg-[#1e1e1e]/80 rounded-xl shadow-xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-6 text-center">Submit Medical Form</h1>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Full Name" className="input-style" />
            <input type="text" placeholder="Registration Number" className="input-style" />

            <select className="input-style">
              <option value="">Select Year</option>
              <option>2020</option>
              <option>2021</option>
              <option>2022</option>
              <option>2023</option>
            </select>

            <select className="input-style">
              <option value="">Select Level</option>
              <option>1000</option>
              <option>2000</option>
              <option>3000</option>
              <option>4000</option>
            </select>

            <select className="input-style">
              <option value="">Select Semester</option>
              <option>1st Semester</option>
              <option>2nd Semester</option>
            </select>

            <select className="input-style">
              <option value="">Degree Programme</option>
              <option>Bio Science</option>
              <option>Physical Science</option>
              <option>Computer Science</option>
            </select>

            <input type="text" placeholder="Contact Number" className="input-style col-span-2" />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Subjects Covered by Medical</h2>
            <div className="space-y-2">
              {subjects.map((subj, index) => (
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
            <input type="file" className="input-style bg-white text-black" />
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
}

export default Sdash;
