import { animated, useSpring } from '@react-spring/web';
import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AnimalList from './Components/AnimalList';
import Sidebar from './Components/Sidebar';
import SingleAnimalView from './Components/SingleAnimalView';
import './index.css';
import AnimalAssignment from './Components/AnimalAssignment';
import TaskManagement from './Components/Taskmanagement';
import VisitorInteraction from './Components/visitorintereaction';
import StaffManagement from './Components/staffmanagement';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const mainContentProps = useSpring({
    marginLeft: isSidebarOpen ? 250 : 0,
    config: { tension: 300, friction: 30 }
  });

  return (
    <Router>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <animated.main style={{
          ...mainContentProps,
          flex: 1,
          padding: '20px',
          backgroundColor: '#f4f7f6'
        }}>
          <Routes>
            <Route path="/" element={<AnimalList />} />
            <Route path="/animal/:id" element={<SingleAnimalView />} />


  

            <Route path="/animal_assignment" element={<AnimalAssignment />} />
            <Route path="/task_management" element={<TaskManagement />} />
            <Route path="/visitors" element={<VisitorInteraction />} />
            <Route path="/staff_management" element={<StaffManagement />} />
            
          </Routes>
        </animated.main>
      </div>
    </Router>
  );
}

export default App;
