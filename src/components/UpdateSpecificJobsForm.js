// src/components/UpdateSpecificJobsForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UpdateSpecificJobsForm() {
  const [profilePath, setProfilePath] = useState('/Users/victor/Library/Application Support/Firefox/Profiles/6g8hca70.default-release');
  const [url, setUrl] = useState('https://client.rmpenterprise.co.uk/app#/rate/companies/621/campaigns/5789');
  const [jobIds, setJobIds] = useState('29629,29631,29630');
  const [targetDay, setTargetDay] = useState('28');
  const [targetMonthYear, setTargetMonthYear] = useState('December 2024');
  const [loading, setLoading] = useState(false);
  const [taskId, setTaskId] = useState(null);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jobIdsArray = jobIds.split(',').map(id => id.trim()).filter(id => id);
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/update_specific_jobs', {
        profile_path: profilePath,
        url: url,
        job_ids: jobIdsArray,
        target_day: targetDay,
        target_month_year: targetMonthYear
      });
      setTaskId(response.data.task_id);
      setLoading(false);
      navigate(`/task-status/${response.data.task_id}`);
    } catch (error) {
      console.error("Error updating specific jobs:", error);
      setLoading(false);
      alert("An error occurred while starting the script.");
    }
  };

  return (
    <div>
      <h2>Update Specific Jobs</h2>
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
          <label>Job IDs (comma-separated):</label><br />
          <input type="text" value={jobIds} onChange={(e) => setJobIds(e.target.value)} placeholder="e.g., 29629,29631,29630" required />
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

export default UpdateSpecificJobsForm;
