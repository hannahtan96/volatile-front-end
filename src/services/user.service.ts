import axios from "axios";
import authHeader from "./auth-header";
import { Holdings } from '../components/Portfolio';

export const API_URL = 'http://127.0.0.1:5000/api'

export const logPortfolio = ( user: string, email: string, localId: string, portfolio: Holdings[] ) => {
  return axios.post(API_URL + '/portfolio/new', {
    user,
    email,
    localId,
    portfolio
  }, { headers: authHeader() })
  .then((response) => {
    if (response.status === 200) {
      localStorage.setItem('userPortfolio', JSON.stringify(response.data))
    }
    return response.data
  })
  .catch((err) => {
    console.log(err)
  })
}

export const getCurrUserPortfolio = (localId: string) => {
  // print(f"{API_URL}portfolio{localId}")
  return axios.get(API_URL + '/portfolio/' + localId, { headers: authHeader() })
    .then((response) => {
      // console.log(response)
      if (response.data) {
        localStorage.setItem('userPortfolio', JSON.stringify(response.data))
      }
      return response.data
    })
    .catch((err) => {
      console.log(err)
    })
};

export const getCurrUserPortfolioWeightings = (localId: string) => {
  // print(f"{API_URL}portfolio{localId}")
  return axios.get(API_URL + '/portfolio/' + localId + '/tickers', { headers: authHeader() })
    .then((response) => {
      if (response.data) {
        localStorage.setItem('userPortfolioWeightings', JSON.stringify(response.data))
      }
      return response.data
    })
    .catch((err) => {
      console.log(err)
    })
};