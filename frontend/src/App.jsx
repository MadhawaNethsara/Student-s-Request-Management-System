
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Navbar.jsx';
import Layout from './Layout.jsx';
import About from './About.jsx';
import Help from './Help.jsx';
import Login from "./login.jsx";
import Stureg from "./Admin/Stureg.jsx";
import Updatet from "./Admin/Updatet.jsx";
import Admin from "./Admin/Admin.jsx";
import Sdash from './Student/Sdash.jsx'
import Ddash from './Doctor/Ddash.jsx';
import Cdash from './Committee/Cdash.jsx';
import Mdash from './Mentor/Mdash.jsx';

function App() {


  return (
    //<About/>
    //<Help />
   //<Login />
    //<Stureg />
    //<Updatet />
    //<Admin/>
    //<Layout/>
    //<Sdash/>
    //<Ddash />
    //<Cdash />
    //<Mdash />





     <BrowserRouter>
      <Navbar/>
      <Routes>
          <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="About" element={<About />} />
          <Route path="Home" element={<Login />} />
          <Route path="Help" element={<Help />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App





