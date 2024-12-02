import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import JobScriptForm from './components/JobScriptForm'; 
import Instructions from './components/Instructions'; 
import { NavLink } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        {/* Navigation Bar */}
        <nav>
          <ul>
            <li>
            <NavLink to="/" exact activeClassName="active-link">
            JobScriptForm
      </NavLink>
    </li>
    <li>
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
