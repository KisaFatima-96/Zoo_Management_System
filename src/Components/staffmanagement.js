import React, { useEffect, useState } from 'react';
import axios from '../services/api';

const StaffManagement = () => {
  const [staff, setStaff] = useState([]);
  const [newStaff, setNewStaff] = useState({ name: '', role: '' });
  const [view, setView] = useState('add'); // Toggle between 'add' and 'view'

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    const res = await axios.get('http://localhost:5000/api/staff');
    setStaff(res.data);
  };

  const addStaff = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/staff', newStaff);
    fetchStaff();
    setNewStaff({ name: '', role: '' });
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#f4f4f9',
    padding: '2rem',
  };

  const toggleButtonStyle = {
    padding: '0.5rem 2rem',
    margin: '1rem',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#2980B9',
    color: '#fff',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const formStyle = {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '600px',
    marginBottom: '2rem',
  };

  const inputStyle = {
    width: '100%',
    padding: '1rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    marginBottom: '1rem',
  };

  const buttonStyle = {
    backgroundColor: '#2980B9',
    color: '#fff',
    padding: '1rem 2rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    width: '100%',
    transition: 'background-color 0.3s ease',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '2rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const tableHeaderStyle = {
    backgroundColor: '#2980B9',
    color: '#fff',
    padding: '1rem',
    fontSize: '1.1rem',
    textAlign: 'left',
  };

  const tableRowStyle = {
    borderBottom: '1px solid #ddd',
  };

  const tableCellStyle = {
    padding: '1rem',
    textAlign: 'left',
  };

  return (
    <div style={containerStyle}>
      <h1>Staff Management</h1>

      {/* Toggle between views */}
      <div>
        <button style={toggleButtonStyle} onClick={() => setView('add')}>
          Add New Staff
        </button>
        <button style={toggleButtonStyle} onClick={() => setView('view')}>
          View All Staff
        </button>
      </div>

      {/* Add New Staff Form */}
      {view === 'add' && (
        <form onSubmit={addStaff} style={formStyle}>
          <h2>Add New Staff</h2>
          <input
            type="text"
            placeholder="Name"
            value={newStaff.name}
            onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
            required
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Role"
            value={newStaff.role}
            onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
            required
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>
            Add Staff
          </button>
        </form>
      )}

      {/* View All Staff Table */}
      {view === 'view' && (
        <div>
          <h2>Staff List</h2>
          <table style={tableStyle}>
            <thead>
              <tr style={tableHeaderStyle}>
                <th style={tableCellStyle}>Name</th>
                <th style={tableCellStyle}>Role</th>
                <th style={tableCellStyle}>Assigned Animals</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((s) => (
                <tr key={s._id} style={tableRowStyle}>
                  <td style={tableCellStyle}>{s.name}</td>
                  <td style={tableCellStyle}>{s.role}</td>
                  <td style={tableCellStyle}>
                    {s.assignedAnimals && s.assignedAnimals.length > 0 ? (
                      <ul>
                        {s.assignedAnimals.map((animal) => (
                          <li key={animal._id}>{animal.name}</li>
                        ))}
                      </ul>
                    ) : (
                      'No animals assigned'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StaffManagement;
