import { useContext } from 'react';
import Login from '../components/Login';
import { UserContextType } from "../types/user.type";
import { UserContext } from '../context/userContext';
import LoggedInLinks from '../components/LoggedInLinks';

const LoginPage = () => {

  const { user } = useContext(UserContext) as UserContextType;

  return (
    (user?.displayName ? <LoggedInLinks /> : <Login />)
  )

}
export default LoginPage;