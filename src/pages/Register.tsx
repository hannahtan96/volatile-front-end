import axios from "axios";
import { Navigate } from 'react-router-dom';
import Register from "../components/Register";


interface formDataProps {
  firstName: string
  lastName: string
  username: string
  email: string
  password: string
}

const RegisterPage = () => {

  return (
    <Register />
  )


}
export default RegisterPage;