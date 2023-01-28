import React from 'react';
import { useEffect } from 'react';
import { logout } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {

  const navigate = useNavigate()

  useEffect(() => {
    logout()
    // navigate("/home")
  }, [])

  return (
    <div>You've successfully logged out.</div>
  )


}
export default LogoutPage;