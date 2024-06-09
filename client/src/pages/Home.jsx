import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../ThemeContext';
import '../App.css';

function Home() {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext); 

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className={`home-container ${isDarkMode ? "dark" : ""}`}>
      <button className="theme-toggle" onClick={toggleTheme}>
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>
      <h1 style={{ color: isDarkMode ? "white" : "black" }}>Welcome to the Home Page</h1>
      <button onClick={handleLogout} className='logout'>Logout</button>
    </div>
  );
}

export default Home;
