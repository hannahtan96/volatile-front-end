import React from 'react';
import { useEffect } from 'react';
import { logout } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import NotLoggedInLinks from '../components/NotLoggedInLinks';

const LogoutPage = () => {

  const navigate = useNavigate()

  useEffect(() => {
    logout()
    // navigate("/home")
  }, [])

  return (
    <Box>
      <NotLoggedInLinks />
    </Box>
  )


}
export default LogoutPage;