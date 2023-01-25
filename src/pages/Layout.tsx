import { Outlet } from 'react-router-dom';
import MenuAppBar from '../components/MenuAppBar';
import User from '../types/user.type';

interface LayoutProps {
  user: User | null
}

const Layout = (props: LayoutProps) => {
  return (
    <>
      <MenuAppBar user={props.user} />
      <Outlet />
    </>
  )
}

export default Layout;
