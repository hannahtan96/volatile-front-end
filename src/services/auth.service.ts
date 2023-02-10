import axios from 'axios';

export const API_URL = 'https://back-end-volatile-u57s7sv3jq-uc.a.run.app/api'

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

// export const getCurrentUser = () => {
//   const userStr = localStorage.getItem('user');
//   if (userStr) {
//     return JSON.parse(userStr);
//   } else {
//     return null;
//   }
// }

export const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('userPortfolio');
  localStorage.removeItem('userPortfolioWeightings');
};
