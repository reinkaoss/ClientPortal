import React from 'react';
import './styles/instructions.css'; // Optional: For styling

function Instructions() {
  return (
    <div className="instructions-container">
      <h2>Setup Instructions</h2>
      <p>
        If this is your first time using the app, follow these steps to set up the necessary environment and configure your browser profile.
      </p>

      <h3>1. Install the Required Software</h3>
      <ol>
        <li>
          <strong>Python:</strong>
          <ul>
            <li>Download and install Python from the official website: <a href="https://www.python.org/downloads/" target="_blank" rel="noreferrer">https://www.python.org/downloads/</a>.</li>
            <li>Ensure Python is added to your PATH during installation.</li>
            <li>To verify Python installation, open Terminal (Mac/Linux) or Command Prompt (Windows) and type:</li>
            <pre><code>python3 --version</code></pre>
            <li>You should see the installed version of Python.</li>
          </ul>
        </li>
        <h3>Installing Python via Terminal</h3>
<ol>
  <li>Open your terminal.</li>
  <li>Run the following command for macOS (using Homebrew):
    <pre>brew install python</pre>
  </li>
  <li>Verify the installation:
    <pre>python3 --version</pre>
  </li>
  <li>If Python is not found, visit <a href="https://www.python.org/downloads/" target="_blank">python.org</a> for manual installation.</li>
</ol>

        <li>
          <strong>Geckodriver:</strong>
          <ul>
            <li>Download Geckodriver from the official repository: <a href="https://github.com/mozilla/geckodriver/releases" target="_blank" rel="noreferrer">https://github.com/mozilla/geckodriver/releases</a>.</li>
            <li>Choose the version compatible with your operating system (e.g., Mac, Windows, Linux).</li>
            <li>After downloading:
              <ul>
                <li>On Windows: Extract the file and move it to a folder included in your PATH (e.g., <code>C:\Windows\System32</code>).</li>
                <li>On Mac/Linux: Move the file to a directory like <code>/usr/local/bin</code>. You can do this with the following command:</li>
                <pre><code>sudo mv geckodriver /usr/local/bin</code></pre>
              </ul>
            </li>
            <li>To verify Geckodriver installation, type the following command in Terminal/Command Prompt:</li>
            <pre><code>geckodriver --version</code></pre>
            <li>You should see the installed version of Geckodriver.</li>
          </ul>
        </li>
        <li>
          <strong>Firefox:</strong>
          <ul>
            <li>Download and install the latest version of Firefox from the official website: <a href="https://www.mozilla.org/en-US/firefox/new/" target="_blank" rel="noreferrer">https://www.mozilla.org/en-US/firefox/new/</a>.</li>
          </ul>
        </li>
      </ol>

      <h3>2. Locate Your Firefox Profile Path</h3>
      <ol>
        <li>Open Firefox.</li>
        <li>Type <code>about:profiles</code> in the address bar and press Enter.</li>
        <li>Under "Root Directory," find your active profile (e.g., <em>default-release</em>).</li>
        <li>Click on <strong>Open Folder</strong> to reveal the profile folder in Finder (Mac) or File Explorer (Windows).</li>
        <li>Copy the full path from the Finder/File Explorer window (e.g., <code>/Users/yourusername/Library/Application Support/Firefox/Profiles/abcdefg.default-release</code>).</li>
      </ol>

      <h3>3. Adjust the Python Script</h3>
      <ol>
        <li>Locate the Python script named <code>updateJobs.py</code> in the application folder.</li>
        <li>Open the script using a text editor (e.g., Notepad, VS Code).</li>
        <li>Find the line that specifies the Firefox profile path:</li>
        <pre><code>profile_path = '/Users/victor/Library/Application Support/Firefox/Profiles/6g8hca70.default-release'</code></pre>
        <li>Replace the existing path with your copied profile path. Ensure you use forward slashes (<code>/</code>) and wrap the path in single quotes.</li>
        <li>Save the changes to the script.</li>
      </ol>

      <h3>3. Running the App</h3>
      <ol>
        <li>Open Firefox, make sure you're signed in Client Portal</li>
        <li>Start the server by double-clicking the server executable (e.g., <code>server-mac</code> or <code>server.exe</code>).</li>
        <li>Open your browser and go to <a href="http://localhost:5000" target="_blank" rel="noreferrer">http://localhost:5000</a>.</li>
        <li>Use the app to run tasks directly from your browser.</li>
      </ol>

      <h3>4. Troubleshooting</h3>
      <ul>
        <li><strong>Python Not Found:</strong> Ensure Python is installed and added to your PATH.</li>
        <li><strong>Geckodriver Not Found:</strong> Verify Geckodriver is installed and located in a directory included in your PATH.</li>
        <li><strong>Incorrect Profile Path:</strong> Ensure the profile path entered in the script matches your active Firefox profile.</li>
        <li><strong>Permission Issues:</strong> Ensure the executables have execute permissions. On Mac/Linux, run:</li>
        <pre><code>chmod +x server-mac</code></pre>
        <li><strong>Port Already in Use:</strong> If port 5000 is already in use, modify the <code>PORT</code> variable in <code>server.js</code> to an available port.</li>
      </ul>
    </div>
  );
}

export default Instructions;
