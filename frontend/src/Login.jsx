import image from "./assets/ruhuna.jpeg";
function Login() {
  //const handleLogin = () => {

  //}


    return(
         <section className="min-h-screen flex items-center justify-center font-mono bg-[url('./assets/ruhuna.jpeg')] bg-cover from-10% via-indigo-500 via-50% to-sky-500 to-100%">
           <div className=" shadow-2xl">
        <div className="flex flex-col item-center justify-center p-20 gap-8 bg-white/75 rounded-2xl">
          <h1 className="text-5xl font-bold">Welcome</h1>
          <div className="flex flex-col text-2xl text-left gap-1">
            <span>Username</span>
            <input type="text" className="rounded-md p-1 border-2 outline-none bg-gray-400 focus:border-cyan-400 focus:bg-gray-400"/>
          </div>
          <div className="flex flex-col text-2xl text-left gap-1">
            <span>Password</span>
            <input type="text" className="rounded-md p-1 border-2 outline-none bg-gray-400 focus:border-cyan-400 focus:bg-gray-400"/>
          </div>
          <div className="flex gap-1 items-center">
            <input type="checkbox"/>
            <span className="text-base">Remember Password</span>
          </div>
          <button className="px-10 py-2 text-2xl rounded-md bg-gradient-to-tr from-green-400 to-blue-500 hover:to-pink-500 hover:to-yellow-500 text-white" >Login</button>
          <p className="font-semibold">Don't have an account?<a href="#" className="text-blue-400 hover:underline">Register</a></p>
        </div>
        <img src={image} alt="" className='w-[450px] object-cover x1:rounded-tr-2xl x1:rounded-br-2xl x1:block hidden'/>
      </div>
      
    </section>
    )
}
export default Login;