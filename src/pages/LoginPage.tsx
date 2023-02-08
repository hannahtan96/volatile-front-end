import React, { useContext, SyntheticEvent } from 'react';
import Login from '../components/Login';
import { UserContextType } from "../types/user.type";
import { UserContext } from '../context/userContext';
import { Box, Breadcrumbs, Link, Typography } from '@mui/material';
import LoggedInLinks from '../components/LoggedInLinks';

const LoginPage = () => {

  const { user } = useContext(UserContext) as UserContextType;



  return (
    (user?.displayName ? <LoggedInLinks /> : <Login />)
  )

}
export default LoginPage;