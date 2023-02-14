import { useContext } from 'react';
import { UserContextType } from "../types/user.type";
import { UserContext } from '../context/userContext';
import Score from '../components/Score';
import NotLoggedInLinks from '../components/NotLoggedInLinks';


const ScorePage = () => {

  const { user } = useContext(UserContext) as UserContextType;

  return (
    (user?.displayName ? <Score /> : <NotLoggedInLinks />)
  )

}
export default ScorePage;