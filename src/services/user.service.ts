import axios from "axios";
import authHeader from "./auth-header";
import { Holdings } from '../components/Portfolio';
import { formValues } from "../components/EditOneStockForm";
import { API_URL } from "./auth.service";

export const logPortfolio = ( user: string, email: string, localId: string, portfolio: Holdings[] ) => {
  return axios.post(API_URL + '/portfolio/new', {
    user,
    email,
    localId,
    portfolio
  }, { headers: authHeader() })
  .then((response) => {
    if (response && response.data.portfolio) {
      localStorage.setItem('userPortfolio', JSON.stringify(response.data))
    }
    return response.data
  })
  .catch((err) => {
    console.log(err)
  })
}

export const editPortfolio = ( localId: string, data: formValues ) => {
  return axios.post(API_URL + '/portfolio/' + localId + '/edit', {
    data
  }, { headers: authHeader() })
  .then((response) => {
    if (response && response.data.portfolio) {
      localStorage.setItem('userPortfolio', JSON.stringify(response.data))
    }
    return response.data
  })
  .catch((err) => {
    console.log(err)
  })
}

export const getCurrUserPortfolio = (localId: string) => {
  console.log(`in getCurrUserPortfolio for ${localId}`)
  return axios.get(API_URL + '/portfolio/' + localId, { headers: authHeader() })
    .then((response) => {
      if (response.data.portfolio) {
        localStorage.setItem('userPortfolio', JSON.stringify(response.data))
      }
      return response.data
    })
    .catch((err) => {
      console.log(err)
    })
};

export const getCurrUserPortfolioWeightings = (localId: string) => {
  console.log(`in getCurrUserPortfolioWeightings for ${localId}`)
  return axios.get(API_URL + '/portfolio/' + localId + '/tickers', { headers: authHeader() })
    .then((response) => {
      if (response.data) {
        if (response.data.weightings) {
          localStorage.setItem('userPortfolioWeightings', JSON.stringify(response.data))
        }
      }
      return response.data
    })
    .catch((err) => {
      console.log(err)
    })
};

export const getCurrUserPortfolioSentiments = (portfolio : Holdings[]) => {
  console.log(`in getCurrUserPortfolioWeightings for ${portfolio}`)
  return axios.post(API_URL + '/sentiments', {
    portfolio
    }, { headers: authHeader() })
    .then((response) => {

      if (response.data) {
        return response.data
      }
    })
    .catch((err) => {
      console.log()
    })
}
