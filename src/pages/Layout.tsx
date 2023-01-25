import { Outlet } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';

interface LayoutProps {
  user: string|null
}

const Layout = (props: LayoutProps) => {
  return (
    <>
      <NavigationBar user={props.user}/>
      <Outlet />
    </>
  )
}

export default Layout;
