// src/components/UpdateAllJobsForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UpdateAllJobsForm() {
  const [profilePath, setProfilePath] = useState('/Users/victor/Library/Application Support/Firefox/Profiles/6g8hca70.default-release');
  const [url, setUrl] = useState('https://client.rmpenterprise.co.uk/app#/rate/companies/621/campaigns/5789');
  const [targetDay, setTargetDay] = useState('28');
  const [targetMonthYear, setTargetMonthYear] = useState('December 2024');
  const [loading, setLoading] = useState(false);
  const [taskId, setTaskId] = useState(null);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/update_all_jobs', {
        profile_path: profilePath,
        url: url,
        target_day: targetDay,
        target_month_year: targetMonthYear
      });
      setTaskId(response.data.task_id);
      setLoading(false);
      navigate(`/task-status/${response.data.task_id}`);
    } catch (error) {
      console.error("Error updating all jobs:", error);
      setLoading(false);
      alert("An error occurred while starting the script.");
    }
  };

  return (
    <div>
      <h2>Update All Jobs</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Firefox Profile Path:</label><br />
          <input type="text" value={profilePath} onChange={(e) => setProfilePath(e.target.value)} required />
        </div>
        <div>
          <label>Campaign URL:</label><br />
          <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} required />
        </div>
        <div>
          <label>Target Day:</label><br />
          <input type="number" min="1" max="31" value={targetDay} onChange={(e) => setTargetDay(e.target.value)} required />
        </div>
        <div>
          <label>Target Month and Year:</label><br />
          <input type="text" value={targetMonthYear} onChange={(e) => setTargetMonthYear(e.target.value)} placeholder="e.g., December 2024" required />
        </div>
        <button type="submit" disabled={loading}>{loading ? 'Running...' : 'Run Script'}</button>
      </form>
    </div>
  );
}

export default UpdateAllJobsForm;
