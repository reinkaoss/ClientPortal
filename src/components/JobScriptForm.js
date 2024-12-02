import React, { useState } from 'react';
import axios from 'axios';
import './styles/JobScriptForm.css'; // Optional: For styling

const JobScriptForm = () => {
    const [url, setUrl] = useState('');
    const [date, setDate] = useState('');
    const [mode, setMode] = useState('all'); // Default to 'all'
    const [jobIds, setJobIds] = useState('');
    const [response, setResponse] = useState('');
    const [updatedJobUrls, setUpdatedJobUrls] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setResponse('');
        setUpdatedJobUrls([]);

        // Convert the date to a format without leading zeros
        const [year, month, day] = date.split('-');
        const formattedDate = `${year}-${parseInt(month, 10)}-${parseInt(day, 10)}`;

        const jobIdsArray = jobIds ? jobIds.split(',').map(id => id.trim()) : [];

        try {
            const res = await axios.post('http://localhost:5000/run-script', {
                scriptPath: './scripts/updateJobs.py',
                args: [url, formattedDate, mode, ...jobIdsArray],
            });

            setResponse(res.data.output || 'Script executed successfully.');
            setUpdatedJobUrls(res.data.updatedJobUrls || []);
        } catch (err) {
            setError('Error occurred: ' + err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h1>Run Job Script</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    URL:
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Enter the campaign URL"
                        required
                    />
                </label>
                <br />
                <label>
                    Date:
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
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
                    <input
                        type="text"
                        value={jobIds}
                        onChange={(e) => setJobIds(e.target.value)}
                        placeholder="Enter job IDs (e.g., 12345,67890)"
                    />
                </label>
                <br />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Running...' : 'Run Script'}
                </button>
            </form>
            {isLoading && <div>Loading...</div>}
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <div>
                <h2>Response:</h2>
                <pre>{response}</pre>
                {updatedJobUrls.length > 0 && (
                    <div>
                        <h2>Updated Job URLs:</h2>
                        <ul>
                            {updatedJobUrls.map((url, index) => (
                                <li key={index}>
                                    <a href={url} target="_blank" rel="noopener noreferrer">
                                        {url}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobScriptForm;
