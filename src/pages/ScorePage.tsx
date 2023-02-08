import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { UserContextType } from "../types/user.type";
import { UserContext } from '../context/userContext';
import { getCurrUserPortfolio, getCurrUserPortfolioWeightings } from '../services/user.service';
import Score from '../components/Score';
import { Weighting } from '../types/user.type';
import NotLoggedInLinks from '../components/NotLoggedInLinks';


const ScorePage = () => {

  const { user } = useContext(UserContext) as UserContextType;

  return (
    (user?.displayName ? <Score /> : <NotLoggedInLinks />)
  )

}
export default ScorePage;