import { Nav, NavLink, NavMenu } from './NavBarElements'



type Month = 'Jan' | 'Feb' | 'Mar'


interface NavigationBarProps {
  name: string
  date: string
}

const NavigationBar = () => {
  return (
    <>
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
          <NavLink to="/sign-up" activeStyle>
            Sign Up
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  )
};

export default NavigationBar