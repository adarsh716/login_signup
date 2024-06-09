import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import { ThemeContext } from '../ThemeContext';
import { registerUser, loginUser } from '../api/apiService'; 

function Login() {
  const [isActive, setIsActive] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { isDarkMode, toggleTheme } = useContext(ThemeContext); // Use ThemeContext
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      navigate('/home');
    }
  }, [navigate]);

  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(formData);
      toast.success("Login successful!");
      localStorage.setItem('user', JSON.stringify(data.token)); 
      navigate('/home'); // Navigate to home after successful login
    } catch (error) {
      toast.error(error.msg || "Login failed. Please check your credentials.");
    }
  };

  const handleFormSubmitRegister = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser(formData);
      toast.success("Registration successful!");
      localStorage.setItem('user', JSON.stringify(data.token));
      navigate('/home'); // Navigate to home after successful registration
    } catch (error) {
      toast.error(error.msg || "Registration failed. Please try again.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={`container ${isActive ? "active" : ""} ${isDarkMode ? "dark" : ""}`} id="container">
      <button className="theme-toggle" onClick={toggleTheme}>
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>
      <div className="form-container sign-up">
        <form onSubmit={handleFormSubmitRegister}>
          <h1 style={{ color: isDarkMode ? "white" : "black" }}>Create Account</h1>
          <input type="text" placeholder="Name" name="name" value={formData.name} onChange={handleChange} />
          <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
          <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
          <button type="submit">Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in">
        <form onSubmit={handleFormSubmit}>
          <h1 style={{ color: isDarkMode ? "white" : "black" }}>Sign In</h1>
          <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
          <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
          <button type="submit">Sign In</button>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p style={{ color: "white" }}>Enter your personal details to use all site features</p>
            <button
              className={`hidden ${isActive ? "" : "active"}`}
              onClick={handleLoginClick}
              id="login"
            >
              Sign In
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>
            <p style={{ color: "white" }}>Register with your personal details to use all site features</p>
            <button
              className={`hidden ${isActive ? "active" : ""}`}
              onClick={handleRegisterClick}
              id="register"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
