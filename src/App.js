import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import JobScriptForm from './components/JobScriptForm'; 
import Instructions from './components/Instructions'; 
import { NavLink } from 'react-router-dom';
import './components/styles/navbar.css';

function App() {
  return (
    <Router>
      <div>
        {/* Navigation Bar */}
        <nav className='navbar'>
          <ul className='navbarUL'>
            <li className='navbarLI'>
            <NavLink to="/" exact activeClassName="active-link">
            Adjust Deadlines
      </NavLink>
    </li>
    <li className='navbarLI'>
      <NavLink to="/instructions" activeClassName="active-link">
      Instructions
      </NavLink>
            </li>
          </ul>
        </nav>

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<JobScriptForm />} />
          <Route path="/instructions" element={<Instructions />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

