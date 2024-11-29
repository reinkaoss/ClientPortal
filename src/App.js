// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UpdateAllJobsForm from './components/UpdateAllJobsForm';
import UpdateSpecificJobsForm from './components/UpdateSpecificJobsForm';
import TaskStatus from './components/TaskStatus';

function App() {
  return (
    <Router>
      <div className="container">
        <h1>Job Automation Tool</h1>
        <nav>
          <ul>
            <li><Link to="/update-all">Update All Jobs</Link></li>
            <li><Link to="/update-specific">Update Specific Jobs</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/update-all" element={<UpdateAllJobsForm />} />
          <Route path="/update-specific" element={<UpdateSpecificJobsForm />} />
          <Route path="/task-status/:taskId" element={<TaskStatus />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
