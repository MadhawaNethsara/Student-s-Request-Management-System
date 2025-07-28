import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();
  return (
    <section className="min-h-screen flex items-center justify-center font-mono bg-[url('./assets/ruhuna.jpeg')] bg-cover bg-center">
      <div className="flex flex-col items-center justify-center w-full px-4">
        
        <div className="w-full max-w-md bg-[#222]/75 rounded-xl shadow-lg p-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-8">Admin Panel</h1>

          <div className="flex flex-col space-y-4">
            <button onClick={()=>navigate("/admin/student-registration")} className="w-full py-3 bg-gradient-to-tr from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white rounded-lg shadow-md transition-all duration-300 text-lg">
              🧑‍🎓 Register Students
            </button>
 
            <button className="w-full py-3 bg-gradient-to-tr from-cyan-400 to-purple-500 hover:from-yellow-400 hover:to-red-500 text-white rounded-lg shadow-md transition-all duration-300 text-lg">
              👨‍🏫 Register Mentors
            </button>

            <button className="w-full py-3 bg-gradient-to-tr from-indigo-400 to-sky-500 hover:from-green-400 hover:to-indigo-500 text-white rounded-lg shadow-md transition-all duration-300 text-lg">
              🧑‍⚕️ Register Doctors
            </button>

            <button className="w-full py-3 bg-gradient-to-tr from-pink-400 to-rose-500 hover:from-blue-400 hover:to-green-500 text-white rounded-lg shadow-md transition-all duration-300 text-lg">
              🗓️ Edit Time Tables
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Admin