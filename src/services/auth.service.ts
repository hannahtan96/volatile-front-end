import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/api/'

export const login = (email: string, password: string) => {
  return axios.post(API_URL + 'login', {
    email,
    password
    })
    .then((response) => {
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
        // let portfolio = getCurrUserPortfolio(response.data.localId)
      }
      return response.data
    })
    .catch((err) => {
      console.log(err)
    })
};

export const registerNewUser = (firstName: string, lastName: string, username: string, email: string, password: string) => {
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
  if (userStr) {
    return JSON.parse(userStr);
  } else {
    return null;
  }
}

export const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('userPortfolio');
  localStorage.removeItem('userPortfolioWeightings');
};
