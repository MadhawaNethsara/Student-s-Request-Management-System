import Navbar from './Navbar.jsx' // Adjust the path based on your file structure
import { Outlet } from 'react-router-dom';
function Layout() {
  return (
    <div>
      <Navbar />
      <div className="pt-20 px-4"> {/* padding to offset fixed navbar */}
        <Outlet /> {/* Render nested routes here */}
      </div>
    </div>
  )
}
export default Layout;
