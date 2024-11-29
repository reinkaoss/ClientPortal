import React, { useState } from 'react';
import axios from 'axios';

const JobScriptForm = () => {
    const [url, setUrl] = useState('');
    const [date, setDate] = useState('');
    const [mode, setMode] = useState('all'); // Default to 'all'
    const [jobIds, setJobIds] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Convert the date to a format without leading zeros
        const [year, month, day] = date.split('-');
        const formattedDate = `${year}-${parseInt(month, 10)}-${parseInt(day, 10)}`;
    
        const jobIdsArray = jobIds ? jobIds.split(',').map(id => id.trim()) : [];
        try {
            const res = await axios.post('http://localhost:5000/run-script', {
                scriptPath: './scripts/updateJobs.py',
                args: [url, formattedDate, mode, ...jobIdsArray],
            });
            setResponse(res.data.output);
        } catch (err) {
            setResponse('Error occurred: ' + err.message);
        }
    };
    

    return (
        <div>
            <h1>Run Job Script</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    URL:
                    <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
                </label>
                <br />
                <label>
                    Date:
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </label>
                <br />
                <label>
                    Mode:
                    <select value={mode} onChange={(e) => setMode(e.target.value)}>
                        <option value="all">All</option>
                        <option value="include">Include</option>
                        <option value="exclude">Exclude</option>
                    </select>
                </label>
                <br />
                <label>
                    Job IDs (comma-separated):
                    <input type="text" value={jobIds} onChange={(e) => setJobIds(e.target.value)} />
                </label>
                <br />
                <button type="submit">Run Script</button>
            </form>
            <div>
                <h2>Response:</h2>
                <pre>{response}</pre>
            </div>
        </div>
    );
};

export default JobScriptForm;
