import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { UserContextType } from "../types/user.type";
import { UserContext } from '../context/userContext';
import { getCurrUserPortfolio, getCurrUserPortfolioWeightings } from '../services/user.service';
import Score from '../components/Score';
import { Weighting } from '../types/user.type';


const ScorePage = () => {

  const { user } = useContext(UserContext) as UserContextType;

  return (
    (user?.displayName ? <Score /> : <div>You need to be logged in!</div>)
  )

}
export default ScorePage;