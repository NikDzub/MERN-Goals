import axios from 'axios';

const API_URL = '/api/users/';

//Register
const register = async (registerData) => {
  const res = await axios.post(API_URL + 'register', registerData);
  if (res.data.token) {
    localStorage.setItem('user', JSON.stringify(res.data));
    return res.data;
  } else {
    return null;
  }
};

//Login
const login = async (registerData) => {
  const res = await axios.post(API_URL + 'login', registerData);
  if (res.data.token) {
    localStorage.setItem('user', JSON.stringify(res.data));
    return res.data;
  } else {
    return null;
  }
};

//Logout
const logout = async () => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
