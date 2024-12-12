import React, { useEffect, useState } from 'react';
import axios from '../services/api';

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [staffMembers, setStaffMembers] = useState([]);
  const [newTask, setNewTask] = useState({
    description: '',
    assignedTo: '',
    dueDate: '',
  });
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState('view'); // Toggle between 'view' and 'add'

  // Fetch all tasks and staff members
  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5000/api/tasks')
      .then((res) => setTasks(res.data))
      .catch((err) => alert('Error fetching tasks: ' + err.message));
    axios
      .get('http://localhost:5000/api/staff')
      .then((res) => setStaffMembers(res.data))
      .catch((err) => alert('Error fetching staff: ' + err.message))
      .finally(() => setLoading(false));
  }, []);

  // Handle task creation
  const createTask = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post('http://localhost:5000/api/tasks', newTask)
      .then((res) => {
        setTasks([...tasks, res.data.task]);
        setNewTask({ description: '', assignedTo: '', dueDate: '' });
        alert('Task created successfully');
      })
      .catch((err) => alert('Error creating task: ' + err.message))
      .finally(() => setLoading(false));
  };

  // Update task status
  const updateTaskStatus = (taskId, status) => {
    axios
      .put(`http://localhost:5000/api/tasks/${taskId}`, { status })
      .then(() => {
        setTasks((prev) =>
          prev.map((task) => (task._id === taskId ? { ...task, status } : task))
        );
      })
      .catch((err) => alert('Error updating task status: ' + err.message));
  };

  return (
    <div style={containerStyle}>
      <h1>Task Management</h1>
      {loading ? <p>Loading...</p> : null}

      {/* Toggle Between Views */}
      <div>
        <button style={toggleButtonStyle} onClick={() => setView('view')}>
          View All Tasks
        </button>
        <button style={toggleButtonStyle} onClick={() => setView('add')}>
          Create New Task
        </button>
      </div>

      {/* View All Tasks */}
      {view === 'view' && (
        <div style={tableContainerStyle}>
          <h2>All Tasks</h2>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Description</th>
                <th style={tableHeaderStyle}>Assigned To</th>
                <th style={tableHeaderStyle}>Due Date</th>
                <th style={tableHeaderStyle}>Status</th>
                <th style={tableHeaderStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id}>
                  <td style={tableCellStyle}>{task.description}</td>
                  <td style={tableCellStyle}>{task.assignedTo?.name || 'Unassigned'}</td>
                  <td style={tableCellStyle}>{new Date(task.dueDate).toLocaleDateString()}</td>
                  <td style={tableCellStyle}>{task.status}</td>
                  <td style={tableCellStyle}>
                    <button
                      style={actionButtonStyle}
                      onClick={() => updateTaskStatus(task._id, 'in-progress')}
                    >
                      Mark as In-Progress
                    </button>
                    <button
                      style={actionButtonStyle}
                      onClick={() => updateTaskStatus(task._id, 'completed')}
                    >
                      Mark as Completed
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Create New Task Form */}
      {view === 'add' && (
        <div style={formContainerStyle}>
          <h2>Create New Task</h2>
          <form onSubmit={createTask}>
            <div style={formGroupStyle}>
              <label>Description:</label>
              <input
                type="text"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                required
                style={inputStyle}
              />
            </div>
            <div style={formGroupStyle}>
              <label>Assign To:</label>
              <select
                value={newTask.assignedTo}
                onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                required
                style={selectStyle}
              >
                <option value="">Select Staff Member</option>
                {staffMembers.map((member) => (
                  <option key={member._id} value={member._id}>
                    {member.name}
                  </option>
                ))}
              </select>
            </div>
            <div style={formGroupStyle}>
              <label>Due Date:</label>
              <input
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                required
                style={inputStyle}
              />
            </div>
            <button type="submit" style={submitButtonStyle}>Create Task</button>
          </form>
        </div>
      )}
    </div>
  );
};

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  backgroundColor: '#f4f6f9',
};

const toggleButtonStyle = {
  padding: '0.5rem 2rem',
  margin: '10px',
  border: 'none',
  borderRadius: '8px',
  backgroundColor: '#2980B9',
  color: '#fff',
  cursor: 'pointer',
  fontSize: '1rem',
  transition: 'background-color 0.3s ease',
};

const tableContainerStyle = {
  width: '80%',
  marginTop: '20px',
  padding: '10px',
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '20px',
};

const tableHeaderStyle = {
  backgroundColor: '#2980B9',
  color: '#fff',
  padding: '1rem',
  textAlign: 'left',
};

const tableCellStyle = {
  padding: '1rem',
  borderBottom: '1px solid #ddd',
};

const actionButtonStyle = {
  padding: '0.5rem 1rem',
  margin: '5px',
  backgroundColor: '#5cb85c',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

const formContainerStyle = {
  width: '80%',
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  marginTop: '20px',
};

const formGroupStyle = {
  marginBottom: '1rem',
};

const inputStyle = {
  width: '100%',
  padding: '0.75rem',
  fontSize: '1rem',
  borderRadius: '4px',
  border: '1px solid #ccc',
};

const selectStyle = {
  width: '100%',
  padding: '0.75rem',
  fontSize: '1rem',
  borderRadius: '4px',
  border: '1px solid #ccc',
};

const submitButtonStyle = {
  padding: '0.75rem 2rem',
  backgroundColor: '#2980B9',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  fontSize: '1rem',
  cursor: 'pointer',
  width: '100%',
  transition: 'background-color 0.3s ease',
};

export default TaskManagement;
