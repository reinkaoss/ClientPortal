// src/components/TaskStatus.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function TaskStatus() {
  const { taskId } = useParams();
  const [status, setStatus] = useState('Loading...');
  
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/task_status/${taskId}`);
        setStatus(response.data.status);
      } catch (error) {
        console.error("Error fetching task status:", error);
        setStatus("Error fetching status.");
      }
    };

    // Polling every 5 seconds
    const interval = setInterval(() => {
      fetchStatus();
    }, 5000);

    // Initial fetch
    fetchStatus();

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, [taskId]);

  return (
    <div>
      <h2>Task Status</h2>
      <p><strong>Task ID:</strong> {taskId}</p>
      <p><strong>Status:</strong> {status}</p>
    </div>
  );
}

export default TaskStatus;
