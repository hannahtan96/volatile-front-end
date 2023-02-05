import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { UserContextType } from "../types/user.type";
import { UserContext } from '../context/userContext';
import { getCurrUserPortfolio, getCurrUserPortfolioWeightings } from '../services/user.service';
import Score from '../components/Score';
import { Weighting } from '../types/user.type';


const ScorePage = () => {

  const { user, saveUserPortfolio, saveUserPortfolioWeightings } = useContext(UserContext) as UserContextType;
  const [w, setW] = useState<Weighting[]>([])

  useEffect(() => {

    if (user?.displayName) {
      getUserPortfolio()
      getUserPortfolioWeightings()
    }

  }, [user])

  useEffect(() => {
    if (w.length > 0) {
      calculateWeightings()
    }
  }, [w])

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
        setW(response.weightings)

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

  const calculateWeightings = () => {
    // console.log(userPortfolioWeightings)
    // let w = userPortfolioWeightings?.weightings!
    let total_w = w.reduce((sum, a) => sum + (parseInt(a['02. open'])*a['11. my shares']), 0)
    let newWeightings = w
      .map((data, i) => ({...data, "12. proportion": (parseInt(w[i]['02. open'])*w[i]['11. my shares'])/total_w}))

    console.log(newWeightings)
    // localStorage.removeItem('userPortfolioWeightings');
    saveUserPortfolioWeightings({weightings: newWeightings})
  }

  return (
    (user?.displayName ? <Score /> : <div>You need to be logged in!</div>)
  )

}
export default ScorePage;