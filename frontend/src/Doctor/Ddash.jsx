function Ddash() {
  // Dummy data (replace with actual DB data later)
  const medicalForms = [
    {
      id: 1,
      name: "Nimal Perera",
      formLink: "#"
    },
    {
      id: 2,
      name: "Kamal Silva",
      formLink: "#"
    }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center font-mono bg-[url('./assets/ruhuna.jpeg')] bg-cover">
      <div className="w-full max-w-5xl bg-[#222]/75 rounded-xl shadow-md p-8 overflow-x-auto">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Doctor Section</h1>
        <table className="min-w-full text-white text-left border border-white/20">
          <thead className="bg-white/20 text-white">
            <tr>
              <th className="py-3 px-4">Student Name</th>
              <th className="py-3 px-4">Medical Form</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {medicalForms.map((student) => (
              <tr key={student.id} className="border-t border-white/20">
                <td className="py-3 px-4">{student.name}</td>
                <td className="py-3 px-4">
                  <a
                    href={student.formLink}
                    className="text-blue-300 underline hover:text-blue-500"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Form
                  </a>
                </td>
                <td className="py-3 px-4 space-x-2">
                  <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-md">Approve</button>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Ddash;
