import { useContext } from 'react';
import { UserContextType } from "../types/user.type";
import { UserContext } from '../context/userContext';
import NotLoggedInLinks from '../components/NotLoggedInLinks';
import PortfolioChart from '../components/PortfolioChart';

const PortfolioPage = () => {

  const { user } = useContext(UserContext) as UserContextType;

  return (
    <section>
      {user?.displayName ? <PortfolioChart /> : <NotLoggedInLinks />}
    </section>
  )


}
export default PortfolioPage;