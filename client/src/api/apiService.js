import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/user';

const registerUser = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, formData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const loginUser = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, formData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export { registerUser, loginUser };
