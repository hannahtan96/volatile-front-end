import { createContext, useEffect, useState } from "react";
import User, { UserContextType } from "../types/user.type";

export const UserContext = createContext<UserContextType | null>(null);

const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}')
    if (userData.displayName) {
      saveUser(userData)
    }
  }, [])

  const saveUser = (user: User) => {
    if (user.displayName) {
      setUser(user)
    }
  }

  return (
    <UserContext.Provider value={{ user, saveUser }}>
      { children }
    </UserContext.Provider>
  )

}

export default UserProvider;