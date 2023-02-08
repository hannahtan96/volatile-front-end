import { Outlet } from 'react-router-dom';
import MenuAppBar from '../components/MenuAppBar';

const Layout = () => {

  return (
    <>
      <MenuAppBar />
      <Outlet />
    </>
  )
}

export default Layout;
