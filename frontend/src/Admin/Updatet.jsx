
function Updatet() {
  return (
    <section className="min-h-screen flex items-center justify-center font-mono bg-[url('./assets/ruhuna.jpeg')] bg-cover bg-center">
  <div className="flex flex-col items-center justify-center w-full px-4">
    
    {/* Card Container */}
    <div className="w-full max-w-md bg-[#222]/75 rounded-xl shadow-md py-8 px-8">
      <h1 className="text-3xl font-bold text-white text-center mb-6">Time Table</h1>

      <form className="flex flex-col space-y-4">

        {/* Date Picker (placeholder – you should replace with react-datepicker) */}
        <input
          id="datepicker-autohide"
          type="text"
          placeholder="Select Date"
          className="bg-white/20 text-white placeholder-white/60 p-3 rounded-lg border-none focus:bg-gray-600 focus:outline-none transition"
        />

        {/* Degree + Level Dropdowns */}
        <div className="flex gap-4">
          <select
            defaultValue=""
            className="bg-white/20 text-white placeholder-white/60 p-3 w-1/2 rounded-lg border-none focus:bg-gray-600 focus:outline-none transition"
          >
            <option value="" disabled>Degree</option>
            <option>Physical Science</option>
            <option>Bio Science</option>
            <option>Computer Science</option>
          </select>

          <select
            defaultValue=""
            className="bg-white/20 text-white placeholder-white/60 p-3 w-1/2 rounded-lg border-none focus:bg-gray-600 focus:outline-none transition"
          >
            <option value="" disabled>Level</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </div>

        {/* Subject Code + Name */}
        <div className="flex gap-4">
          <input
            placeholder="Subject Code"
            className="bg-white/20 text-white placeholder-white/60 p-3 w-1/2 rounded-lg border-none focus:bg-gray-600 focus:outline-none transition"
            type="text"
          />
          <input
            placeholder="Subject Name"
            className="bg-white/20 text-white placeholder-white/60 p-3 w-1/2 rounded-lg border-none focus:bg-gray-600 focus:outline-none transition"
            type="text"
          />
        </div>

        {/* Update Button */}
        <button
          type="submit"
          className="mt-2 w-full py-3 text-xl font-semibold bg-gradient-to-tr from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white rounded-lg shadow-md transition-all duration-300"
        >
          Update
        </button>
      </form>
    </div>

    {/* Action Buttons */}
    <div className="flex flex-wrap justify-center gap-4 mt-6">
      <button className="px-6 py-3 text-lg font-medium rounded-lg bg-gradient-to-tr from-red-500 to-yellow-500 hover:from-yellow-500 hover:to-red-500 text-white shadow-md transition-all duration-300">
        Delete Table
      </button>
      <button className="px-6 py-3 text-lg font-medium rounded-lg bg-gradient-to-tr from-indigo-500 to-cyan-500 hover:from-purple-500 hover:to-pink-500 text-white shadow-md transition-all duration-300">
        View Table
      </button>
    </div>
  </div>
</section>


  )
}
export default Updatet