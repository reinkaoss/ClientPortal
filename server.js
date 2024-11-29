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
    const urlsMatch = output.match(/Updated job URLs: \[(.*?)\]/);
    const updatedUrls = urlsMatch ? urlsMatch[1].split(',').map(url => url.trim()) : [];
    res.json({ output, updatedJobUrls: updatedUrls });
});
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
