import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/api'

export const login = function(email: string, password: string) {
  return axios.post(API_URL + 'signin', {
    email,
    password
  })
  .then((response) => {
    if (response.data.idToken) {
      console.log(response.data)
      localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
  })
};

export const register = function(firstName: string, lastName: string, username: string, email: string, password: string) {
  return axios.post(API_URL + 'signup', {
    firstName,
    lastName,
    username,
    email,
    password
  })
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);
  return null
}

export const logout = () => {
  localStorage.removeItem('user');
};
