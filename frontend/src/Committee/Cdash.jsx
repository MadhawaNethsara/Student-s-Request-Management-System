function Cdash() {
  // Dummy data (replace with DB values later)
  const medicalApplications = [
    {
      id: 1,
      name: "Nimal Perera",
      index: "SE/2021/005",
      year: "3rd",
      degree: "Computer Science",
      email: "nimalp@ruh.ac.lk",
      formLink: "#"
    },
    {
      id: 2,
      name: "Kamal Silva",
      index: "SE/2021/010",
      year: "2nd",
      degree: "IT",
      email: "kamals@ruh.ac.lk",
      formLink: "#"
    }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center font-mono bg-[url('./assets/ruhuna.jpeg')] bg-cover">
      <div className="w-full max-w-6xl bg-[#1e1e1e]/80 backdrop-blur-md rounded-xl shadow-xl p-8 overflow-x-auto">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Committee Panel</h1>
        <table className="min-w-full text-white text-left border border-white/20">
          <thead className="bg-white/20 text-white">
            <tr>
              <th className="py-3 px-4">Student Name</th>
              <th className="py-3 px-4">Index No</th>
              <th className="py-3 px-4">Year</th>
              <th className="py-3 px-4">Degree</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Medical Form</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {medicalApplications.map((app) => (
              <tr key={app.id} className="border-t border-white/20 hover:bg-white/10 transition">
                <td className="py-3 px-4">{app.name}</td>
                <td className="py-3 px-4">{app.index}</td>
                <td className="py-3 px-4">{app.year}</td>
                <td className="py-3 px-4">{app.degree}</td>
                <td className="py-3 px-4">{app.email}</td>
                <td className="py-3 px-4">
                  <a
                    href={app.formLink}
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

export default Cdash;
