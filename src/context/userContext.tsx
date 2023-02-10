import { createContext, useEffect, useState } from "react";
import { User, UserPortfolio, UserContextType, Weightings } from "../types/user.type";

export const UserContext = createContext<UserContextType | null>(null);

const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>();
  const [userPortfolio, setUserPortfolio] = useState<UserPortfolio>()
  const [userPortfolioWeightings, setUserPortfolioWeightings] = useState<Weightings>()

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}')
    if (userData?.displayName) {
      setUser(userData)
    }

    const userPortfolioData = JSON.parse(localStorage.getItem('userPortfolio') || '{}')
    if (userPortfolioData?.user) {
      setUserPortfolio(userPortfolioData)
    }

    const userPortfolioWeightingsData = JSON.parse(localStorage.getItem('userPortfolioWeightings') || '{}')
    if (userPortfolioWeightingsData?.weightings?.length > 0) {
      setUserPortfolioWeightings(userPortfolioWeightingsData)
    }

  }, [children])

  const saveUser = (user: User) => {
    if (user.displayName) {
      setUser(user)
    }
  }

  const saveUserPortfolio = (userPortfolio: UserPortfolio) => {
    if (userPortfolio.user) {
      setUserPortfolio(userPortfolio)
    }
  }

  const saveUserPortfolioWeightings = (userPortfolioWeightings: Weightings) => {
    if (userPortfolioWeightings.weightings.length > 0) {
      setUserPortfolioWeightings(userPortfolioWeightings)
    }
  }

  return (
    <UserContext.Provider value={{ user, userPortfolio, userPortfolioWeightings, saveUser, saveUserPortfolio, saveUserPortfolioWeightings }}>
      { children }
    </UserContext.Provider>
  )

}

export default UserProvider;