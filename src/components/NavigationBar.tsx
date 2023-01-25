import { useState, useEffect } from 'react'
import { Nav, NavLink, NavMenu } from './NavBarElements'
// import { BrowserRouter, Route, Link } from 'react-router-dom';
import { getCurrentUser, logout } from '../services/auth.service'
import { ContactSupportOutlined } from '@material-ui/icons';

interface NavigationBarProps {
  user: string|null
}

const NavigationBar = (props: NavigationBarProps) => {

  // const [user, setUser] = useState<string|null>('')

  const logoutNow = () => {
    logout()
  }

  return (
    <Nav>
      <NavMenu>
        <NavLink to="/home">
          Home
        </NavLink>
        <NavLink to="/login">
          Login
        </NavLink>
        <NavLink to="/register">
          Register
        </NavLink>
        <NavLink to="/logout" onClick={logoutNow}>
          Logout
        </NavLink>
      </NavMenu>
      <div>{props.user}</div>
      {props.user ? <div>Welcome {props.user}</div> : ""}
    </Nav>
  )
};

export default NavigationBar