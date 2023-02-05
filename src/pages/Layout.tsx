import { Outlet } from 'react-router-dom';
import MenuAppBar from '../components/MenuAppBar';
import { User } from '../types/user.type';

interface LayoutProps {
  user: User | null
}

const Layout = () => {
  return (
    <>
      <MenuAppBar />
      <Outlet />
    </>
  )
}

export default Layout;
