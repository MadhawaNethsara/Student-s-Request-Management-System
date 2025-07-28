
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Navbar.jsx';
import Layout from './Layout.jsx';
import About from './About.jsx';
import Help from './Help.jsx';
import Login from "./Login.jsx";
import Stureg from "./Admin/Stureg.jsx";
import Updatet from "./Admin/Updatet.jsx";
import Admin from "./Admin/Admin.jsx";
import Sdash from './Student/Sdash.jsx'
import Ddash from './Doctor/Ddash.jsx';
import Cdash from './Committee/Cdash.jsx';
import Mdash from './Mentor/Mdash.jsx';

const App = () => {
  return (
       <BrowserRouter>
      <Navbar/>
      <Routes>
          <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="about" element={<About />} />
          <Route path="home" element={<Login />} />
          <Route path="help" element={<Help />} />
          
          <Route path="admin" element={<Admin />} /> 
          <Route path="admin/student-registration" element={<Stureg />} /> 
          <Route path="admin" element={<Admin />} /> 
          <Route path="admin" element={<Admin />} /> 
          <Route path="student-dashboard" element={<Sdash />} /> 
          <Route path="doctor-dashboard" element={<Ddash />} />
          <Route path="mentor-dashboard" element={<Mdash />} />
          <Route path="committee-dashboard" element={<Cdash />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;




