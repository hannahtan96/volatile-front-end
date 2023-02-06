import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { UserContextType } from "../types/user.type";
import { UserContext } from '../context/userContext';
import { getCurrUserPortfolio, getCurrUserPortfolioWeightings } from '../services/user.service';
import Score from '../components/Score';
import { Weighting } from '../types/user.type';


const ScorePage = () => {

  const { user, saveUserPortfolio, saveUserPortfolioWeightings } = useContext(UserContext) as UserContextType;

  useEffect(() => {

    if (user?.displayName) {
      getUserPortfolio()
      getUserPortfolioWeightings()
    }

  }, [user])


  const getUserPortfolio = () => {
    getCurrUserPortfolio(user!.localId)
      .then((response) => {
        saveUserPortfolio(response)
      })
      .catch((error) => {
        // const resMessage =
        //   (error.response &&
        //     error.response.data &&
        //     error.response.data.message) ||
        //   error.message ||
        //   error.toString();

        console.log(error)
      })
  }

  const getUserPortfolioWeightings = () => {
    getCurrUserPortfolioWeightings(user!.localId)
      .then((response) => {
        console.log(response)
        saveUserPortfolioWeightings(response)
      })
      .catch((error) => {
        // const resMessage =
        //   (error.response &&
        //     error.response.data &&
        //     error.response.data.message) ||
        //   error.message ||
        //   error.toString();

        console.log(error)
      })
  }

  return (
    (user?.displayName ? <Score /> : <div>You need to be logged in!</div>)
  )

}
export default ScorePage;