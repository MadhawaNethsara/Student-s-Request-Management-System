import React from 'react'
function Stureg() {
//const Stureg = () => {
    return (
         <section className="min-h-screen flex items-center justify-center font-mono bg-[url('./assets/ruhuna.jpeg')] bg-cover from-10% via-indigo-500 via-50% to-sky-500 to-100%">
        <div>
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="w-full max-w-md bg-[#222]/75 rounded-xl shadow-md py-8 px-8">
                    <h1 className="text-[28px] font-bold text-white mb-6 text-center">Register Form</h1>
                    <form className="flex flex-col">
                        <div className="flex space-x-4 mb-4">
                            <input placeholder="Name"className="bg-white/25 text-white border-0 rounded-md p-2 w-1/2 focus:bg-gray-600 focus:outline-none transition ease-in-out duration-150 placeholder-gray-300" type="text"/>
                            <input placeholder="Index Number"className="bg-white/25 text-white border-0 rounded-md p-2 w-1/2 focus:bg-gray-600 focus:outline-none transition ease-in-out duration-150 placeholder-gray-300" type="text"/>
                            
                        </div>
                        <div className="flex space-x-4 mb-4">
                            <input placeholder="Year"className="bg-white/25 text-white border-0 rounded-md p-2 w-1/2 focus:bg-gray-600 focus:outline-none transition ease-in-out duration-150 placeholder-gray-300" type="text"/>
                            <input placeholder="Degree"className="bg-white/25 text-white border-0 rounded-md p-2 w-1/2 focus:bg-gray-600 focus:outline-none transition ease-in-out duration-150 placeholder-gray-300" type="text"/>
                        </div>
                            <input placeholder="Email"className="bg-white/25 text-white border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none transition ease-in-out duration-150 placeholder-gray-300" type="text"/>
                            <button className="px-10 py-2 text-2xl rounded-md bg-gradient-to-tr from-green-400 to-blue-500 hover:to-pink-500 hover:to-yellow-500 text-white">Register</button>
                    </form>
                </div>
            </div>
        </div>
        </section>
    )
}
export default Stureg;