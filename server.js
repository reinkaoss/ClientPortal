const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the CORS package
const path = require('path'); // Import the path module

const app = express();
const PORT = 5000;

// Enable CORS for all origins
app.use(cors());

// Parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the React app
const buildPath = path.join(process.cwd(), 'build');
app.use(express.static(buildPath));

// Serve the React app for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

// Handle any other routes by serving the React app (for client-side routing)
app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

// Endpoint to run the Python script
app.post('/run-script', async (req, res) => {
    const { scriptPath, args } = req.body;
    const { spawn } = require('child_process');
    const pythonProcess = spawn('python3', [scriptPath, ...args]);

    let output = '';
    pythonProcess.stdout.on('data', (data) => {
        output += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Error: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        console.log(`Python script exited with code ${code}`);
        
        // Extract updated job URLs from the output
        const urlsMatch = output.match(/Updated job URLs: \[(.*?)\]/);
        const updatedUrls = urlsMatch ? urlsMatch[1].split(',').map(url => url.trim()) : [];
        
        res.json({
            output,
            updatedJobUrls: updatedUrls // Include URLs in the response
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
