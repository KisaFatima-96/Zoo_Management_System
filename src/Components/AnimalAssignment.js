import React, { useEffect, useState } from 'react';
import axios from '../services/api';

const AnimalAssignment = () => {
  const [staff, setStaff] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [showAssignmentForm, setShowAssignmentForm] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState('');
  const [selectedAnimal, setSelectedAnimal] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch staff data
    axios.get('/staff').then((res) => setStaff(res.data));

    // Fetch animal data
    axios.get('/animals').then((res) => setAnimals(res.data));
  }, []);

  const handleAnimalAssignment = (e) => {
    e.preventDefault();

    // Find the selected staff member
    const staffMember = staff.find((s) => s._id === selectedStaff);
    
    // Check if the selected animal is already assigned to the selected staff
    if (staffMember && staffMember.assignedAnimals.some((animal) => animal._id === selectedAnimal)) {
      setError('This animal is already assigned to the selected staff member.');
      return; // Stop execution if animal is already assigned
    }

    // API call to assign animal to staff
    axios
      .put(`/staff/${selectedStaff}/assign`, { animalId: selectedAnimal })
      .then(() => {
        // Re-fetch staff data after assignment
        axios.get('/staff').then((res) => setStaff(res.data));
        alert('Animal assigned successfully!');
        setSelectedStaff('');
        setSelectedAnimal('');
        setShowAssignmentForm(false);
        setError(''); // Clear any previous error messages
      })
      .catch((error) => {
        console.error('Error assigning animal:', error);
      });
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: '#2C3E50' }}>Animal Assignment</h1>

      {/* Toggle Button to Show Either Staff/Animal Assignment Form */}
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => setShowAssignmentForm(!showAssignmentForm)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#2980B9',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          {showAssignmentForm ? 'View Staff and Assigned Animals' : 'Assign Animal to Staff'}
        </button>
      </div>

      {showAssignmentForm ? (
        // Animal Assignment Form
        <form onSubmit={handleAnimalAssignment} style={{ background: '#ECF0F1', padding: '20px', borderRadius: '8px' }}>
          <h2 style={{ textAlign: 'center', color: '#34495E' }}>Assign Animal to Staff</h2>

          {error && <div style={{ color: '#E74C3C', textAlign: 'center', marginBottom: '15px' }}>{error}</div>}

          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="staff" style={{ display: 'block', fontSize: '14px', marginBottom: '5px' }}>Select Staff</label>
            <select
              id="staff"
              value={selectedStaff}
              onChange={(e) => setSelectedStaff(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '5px',
                border: '1px solid #BDC3C7',
                fontSize: '16px',
              }}
            >
              <option value="">-- Select Staff --</option>
              {staff.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name} ({s.role})
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="animal" style={{ display: 'block', fontSize: '14px', marginBottom: '5px' }}>Select Animal</label>
            <select
              id="animal"
              value={selectedAnimal}
              onChange={(e) => setSelectedAnimal(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '5px',
                border: '1px solid #BDC3C7',
                fontSize: '16px',
              }}
            >
              <option value="">-- Select Animal --</option>
              {animals.map((a) => (
                <option key={a._id} value={a._id}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ textAlign: 'center' }}>
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                backgroundColor: '#2980B9',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                fontSize: '16px',
                cursor: 'pointer',
              }}
            >
              Assign Animal
            </button>
          </div>
        </form>
      ) : (
        // Staff and Assigned Animals Table
        <div>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              marginTop: '20px',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            <thead>
              <tr style={{ backgroundColor: '#2980B9', color: '#fff' }}>
                <th style={{ padding: '12px', textAlign: 'left' }}>Staff Name</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Role</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Assigned Animals</th>
              </tr>
            </thead>
            <tbody>
              {staff.length > 0 ? (
                staff.map((member) => (
                  <tr key={member._id} style={{ backgroundColor: '#ECF0F1', borderBottom: '1px solid #BDC3C7' }}>
                    <td style={{ padding: '10px' }}>{member.name}</td>
                    <td style={{ padding: '10px' }}>{member.role}</td>
                    <td style={{ padding: '10px' }}>
                      {member.assignedAnimals.length > 0 ? (
                        <ul style={{ margin: 0, padding: 0 }}>
                          {member.assignedAnimals.map((animal) => (
                            <li key={animal._id} style={{ fontSize: '14px', color: '#7F8C8D' }}>
                              {animal.name}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span>No animals assigned</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" style={{ padding: '10px', textAlign: 'center', color: '#7F8C8D' }}>
                    No staff members found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AnimalAssignment;
