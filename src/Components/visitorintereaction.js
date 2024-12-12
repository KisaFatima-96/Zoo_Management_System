import React, { useState } from 'react';
import axios from '../services/api';

const VisitorInteraction = () => {
  const [interaction, setInteraction] = useState({
    visitorName: '',
    details: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    axios
      .post('http://localhost:5000/api/visitors/visitor-interactions', interaction)
      .then(() => {
        alert('Interaction recorded successfully');
        setInteraction({ visitorName: '', details: '' });
      })
      .catch((err) => {
        setError('Error recording interaction. Please try again.');
        console.error(err);
      })
      .finally(() => setLoading(false));
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f7f7f7',
  };

  const cardStyle = {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '500px',
    textAlign: 'center',
  };

  const titleStyle = {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '1.5rem',
    fontWeight: '600',
  };

  const formGroupStyle = {
    marginBottom: '1.5rem',
    textAlign: 'left',
  };

  const labelStyle = {
    fontSize: '1rem',
    color: '#555',
    marginBottom: '0.5rem',
    display: 'block',
  };

  const inputStyle = {
    width: '100%',
    padding: '1rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    marginTop: '0.5rem',
    boxSizing: 'border-box',
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: '100px',
  };

  const buttonStyle = {
    backgroundColor: '#2980B9',
    color: '#fff',
    border: 'none',
    padding: '1rem 2rem',
    fontSize: '1rem',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const buttonDisabledStyle = {
    ...buttonStyle,
    backgroundColor: '#2980B9',
  };

  const errorMessageStyle = {
    color: '#e74c3c',
    marginTop: '1rem',
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Visitor Interaction</h1>
        <form onSubmit={handleSubmit}>
          <div style={formGroupStyle}>
            <label htmlFor="visitorName" style={labelStyle}>Visitor Name</label>
            <input
              type="text"
              id="visitorName"
              placeholder="Enter visitor's name"
              value={interaction.visitorName}
              onChange={(e) =>
                setInteraction({ ...interaction, visitorName: e.target.value })
              }
              required
              style={inputStyle}
            />
          </div>
          
          <div style={formGroupStyle}>
            <label htmlFor="details" style={labelStyle}>Interaction Details</label>
            <textarea
              id="details"
              placeholder="Enter details of the interaction"
              value={interaction.details}
              onChange={(e) =>
                setInteraction({ ...interaction, details: e.target.value })
              }
              required
              style={textareaStyle}
            ></textarea>
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            style={loading ? buttonDisabledStyle : buttonStyle}
          >
            {loading ? 'Recording...' : 'Record Interaction'}
          </button>
        </form>

        {error && <p style={errorMessageStyle}>{error}</p>}
      </div>
    </div>
  );
};

export default VisitorInteraction;
