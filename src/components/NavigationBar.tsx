import { Nav, NavLink, NavMenu } from './NavBarElements'
import { BrowserRouter, Route, Link } from 'react-router-dom';

type Month = 'Jan' | 'Feb' | 'Mar'


interface NavigationBarProps {
  name: string
  date: string
}

const NavigationBar = () => {
  return (
    <Nav>
      <NavMenu>
        {/* <NavLink to="/about" activeStyle>
          About
        </NavLink>
        <NavLink to="/contact" activeStyle>
          Contact Us
        </NavLink>
        <NavLink to="/blogs" activeStyle>
          Blogs
        </NavLink> */}
        <NavLink to="/register" activeStyle>
          Sign Up
        </NavLink>
        <Link to="/register">Register</Link>
      </NavMenu>
    </Nav>
  )
};

export default NavigationBar