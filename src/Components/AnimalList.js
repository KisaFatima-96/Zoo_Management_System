import { animated, useTrail } from '@react-spring/web';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function AnimalList() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    const fetchAnimals = async () => {
      const response = await api.get('/animals');
      setAnimals(response.data);
    };
    fetchAnimals();
  }, []);

  const trail = useTrail(animals.length, {
    from: { opacity: 0, transform: 'translate3d(0, 30px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
  });

  return (
    <div style={gridStyle}>
      {trail.map((props, index) => (
        <animated.div key={animals[index]._id} style={{ ...cardStyle, ...props }}>
          <Link to={`/animal/${animals[index]._id}`} style={linkStyle}>
            <img src={animals[index].image} alt={animals[index].name} style={imageStyle} />
            <div style={infoStyle}>
              <h2 style={nameStyle}>{animals[index].name}</h2>
              <p style={speciesStyle}>Species: {animals[index].species}</p>
            </div>
          </Link>
        </animated.div>
      ))}
    </div>
  );
}

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: '20px',
  padding: '20px'
};

const cardStyle = {
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  overflow: 'hidden',
  transition: 'transform 0.3s ease-in-out',
  ':hover': {
    transform: 'translateY(-5px)'
  }
};

const linkStyle = {
  textDecoration: 'none',
  color: 'inherit'
};

const imageStyle = {
  width: '100%',
  height: '200px',
  objectFit: 'cover'
};

const infoStyle = {
  padding: '20px'
};

const nameStyle = {
  margin: '0 0 10px',
  fontSize: '20px',
  fontWeight: 'bold',
  color: '#2c3e50'
};

const speciesStyle = {
  margin: '0',
  color: '#7f8c8d',
  fontSize: '14px'
};

export default AnimalList;

