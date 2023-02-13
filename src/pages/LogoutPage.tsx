import { useEffect } from 'react';
import { logout } from '../services/auth.service';
import { Box } from '@mui/material';
import NotLoggedInLinks from '../components/NotLoggedInLinks';

const LogoutPage = () => {

  useEffect(() => {
    logout()
  }, [])

  return (
    <Box>
      <NotLoggedInLinks />
    </Box>
  )


}
export default LogoutPage;