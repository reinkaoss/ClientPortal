// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import JobScriptForm from './components/JobScriptForm';

function App() {
  return (
    <Router>
      <div className="container">
        <h1>Job Automation Tool</h1>
        <nav>
          <ul>
            <li><Link to="/JobScriptForm">Test</Link></li>
          </ul>
        </nav>
        <Routes>
          {/* Add the correct route for JobScriptForm */}
          <Route path="/JobScriptForm" element={<JobScriptForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
