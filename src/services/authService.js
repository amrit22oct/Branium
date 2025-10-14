import axios from 'axios';

export const login = async (email, password) => {
  const res = await axios.post('/api/auth/login', { email, password });
  return res.data;
};

export const register = async (user) => {
  const res = await axios.post('/api/auth/register', user);
  return res.data;
};
