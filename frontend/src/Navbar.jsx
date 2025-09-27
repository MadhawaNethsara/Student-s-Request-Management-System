import { Link } from "react-router-dom";
import image from "./assets/logo.jpg";

function Navbar() {
  return (
    <>
      {/* Navbar */}
      <nav className="w-full fixed top-0 left-0 z-50 bg-black text-white font-mono shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <img
              src={image}
              alt="Logo"
              className="h-10 w-10 object-cover rounded-full border border-yellow-400 shadow-md"
            />
            <span className="text-lg md:text-xl font-bold tracking-wide">
              University Request Committee
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-6 text-sm md:text-base">
            <Link
              to="/Home"
              className="hover:text-yellow-400 transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              to="/About"
              className="hover:text-yellow-400 transition-colors duration-300"
            >
              About
            </Link>
            <Link
              to="/Help"
              className="hover:text-yellow-400 transition-colors duration-300"
            >
              Help
            </Link>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content overlap */}
      <div className="h-16"></div>
    </>
  );
}

export default Navbar;
