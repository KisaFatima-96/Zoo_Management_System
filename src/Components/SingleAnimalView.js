import { animated, useSpring } from '@react-spring/web';
import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

function SingleAnimalView() {
  const [animal, setAnimal] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnimal = async () => {
      const response = await api.get(`/animals/${id}`);
      setAnimal(response.data);
    };
    fetchAnimal();
  }, [id]);

  const animation = useSpring({
    from: { opacity: 0, transform: 'translate3d(0, 40px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
  });

  if (!animal) {
    return <div>Loading...</div>;
  }

  return (
    <animated.div style={{ ...containerStyle, ...animation }}>
      <button onClick={() => navigate(-1)} style={backButtonStyle}>
        <FaArrowLeft /> Back
      </button>
      <img src={animal.image} alt={animal.name} style={imageStyle} />
      <h1 style={nameStyle}>{animal.name}</h1>
      <p style={speciesStyle}>Species: {animal.species}</p>
      <p style={descriptionStyle}>{animal.description}</p>
    </animated.div>
  );
}

const containerStyle = {
  maxWidth: '800px',
  margin: '0 auto',
  padding: '20px',
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
};

const backButtonStyle = {
  background: 'none',
  border: 'none',
  color: '#3498db',
  fontSize: '16px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  marginBottom: '20px'
};

const imageStyle = {
  width: '100%',
  height: '400px',
  objectFit: 'cover',
  borderRadius: '8px',
  marginBottom: '20px'
};

const nameStyle = {
  fontSize: '28px',
  fontWeight: 'bold',
  color: '#2c3e50',
  marginBottom: '10px'
};

const speciesStyle = {
  fontSize: '18px',
  color: '#7f8c8d',
  marginBottom: '20px'
};

const descriptionStyle = {
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#34495e'
};

export default SingleAnimalView;

