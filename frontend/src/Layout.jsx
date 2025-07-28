import Navbar from './Navbar.jsx' // Adjust the path based on your file structure
import { Outlet } from 'react-router-dom';
function Layout() {
  return (
    <div>
      <Navbar />
      <div> {/* padding to offset fixed navbar */}
        <Outlet /> {/* Render nested routes here */}
      </div>
    </div>
  )
}
export default Layout;
