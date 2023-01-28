import React from 'react';
import { useContext } from 'react';
import Login from '../components/Login';
import { UserContextType } from "../types/user.type";
import { UserContext } from '../context/userContext';

const LoginPage = () => {

  const { user } = useContext(UserContext) as UserContextType;

  return (
    (user?.displayName ? <div>You're already logged in!</div> : <Login />)
  )

}
export default LoginPage;