function Mdash() {
  // Dummy data to simulate database results
  const studentSubmissions = [
    {
      id: 1,
      name: "Sajith Fernando",
      index: "SE/2022/045",
      formLink: "#",
      slipLink: "#"
    },
    {
      id: 2,
      name: "Isuru Jayasuriya",
      index: "SE/2023/023",
      formLink: "#",
      slipLink: "#"
    }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center font-mono bg-[url('./assets/ruhuna.jpeg')] bg-cover">
      <div className="w-full max-w-5xl bg-[#1e1e1e]/80 rounded-xl shadow-xl p-8 overflow-x-auto">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Mentor Panel</h1>
        <table className="min-w-full text-white text-left border border-white/20">
          <thead className="bg-white/20">
            <tr>
              <th className="py-3 px-4">Student Name</th>
              <th className="py-3 px-4">Index No</th>
              <th className="py-3 px-4">Medical Slip</th>
              <th className="py-3 px-4">Medical Form</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {studentSubmissions.map((entry) => (
              <tr key={entry.id} className="border-t border-white/20 hover:bg-white/10">
                <td className="py-3 px-4">{entry.name}</td>
                <td className="py-3 px-4">{entry.index}</td>
                <td className="py-3 px-4">
                  <a
                    href={entry.slipLink}
                    className="text-blue-300 underline hover:text-blue-500"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Slip
                  </a>
                </td>
                <td className="py-3 px-4">
                  <a
                    href={entry.formLink}
                    className="text-blue-300 underline hover:text-blue-500"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Form
                  </a>
                </td>
                <td className="py-3 px-4 space-x-2">
                  <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm">Approve</button>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Mdash;
