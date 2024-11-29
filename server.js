const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the CORS package

const app = express();
const PORT = 5000;

// Enable CORS for all origins
app.use(cors());

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Server is running!');
});

app.post('/run-script', async (req, res) => {
    const { scriptPath, args } = req.body;

    if (!scriptPath || !args) {
        console.error('Missing scriptPath or args in request body.');
        return res.status(400).json({ error: 'scriptPath and args are required.' });
    }

    console.log('Received POST request with the following data:');
    console.log(`scriptPath: ${scriptPath}`);
    console.log(`args: ${args}`);

    const { spawn } = require('child_process');
    const pythonProcess = spawn('python3', [scriptPath, ...args]);

    let output = '';

    pythonProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        output += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        console.log(`Python script exited with code ${code}`);
        res.json({ output, exitCode: code });
    });

    pythonProcess.on('error', (err) => {
        console.error(`Failed to start Python process: ${err}`);
        res.status(500).json({ error: 'Failed to start Python process', details: err.message });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
