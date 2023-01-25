import React from 'react';
import { useEffect } from 'react';
import { logout } from '../services/auth.service';

const LogoutPage = () => {

  useEffect(() => {
    logout()
  }, [])

  return (
    <div>You've successfully logged out.</div>
  )


}
export default LogoutPage;