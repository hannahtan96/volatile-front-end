import { ChangeEvent, FormEventHandler, SyntheticEvent, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import User from '../types/user.type';
import { registerNewUser } from '../services/auth.service'
import './Register.css'

interface RegisterProps {
  signUpCallback: Function
}

interface signUpCredentials {
  firstName: string
  lastName: string
  username: string
  email: string
  password: string
}

const Register = (props: RegisterProps) => {
  const [successful, setSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  // const initalValues: User = {
  //   firstName: '',
  //   lastName: '',
  //   username: '',
  //   email: '',
  //   password: ''
  // }

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().min(3).max(20).required(),
    lastName: Yup.string().min(3).max(30).required(),
    username: Yup.string().min(3).max(20).required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(8).max(32).required()
  })


  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: ''
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm<signUpCredentials>({
    resolver: yupResolver(validationSchema)
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const NewFormData = { ...formData, [e.target.name]: e.target.value };
    setFormData(NewFormData);
  };

  const handleRegister = ({firstName, lastName, username, email, password}: signUpCredentials) => {

    // e.preventDefault()

    // const firstName = formData.firstName
    // const lastName = formData.lastName
    // const username = formData.username
    // const email = formData.email
    // const password = formData.password


    registerNewUser(firstName, lastName, username, email, password)
      .then((response:any) => {
        setMessage(response.data.message)
      })
      .catch((error: any) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setSuccessful(false);
      })
    }

    return (
      <form onSubmit={handleSubmit(handleRegister)}>

        <input
          {...register("firstName")}
          placeholder="firstName"
        />
        <p>{errors.firstName?.message}</p>

        <input
          {...register("lastName")}
          placeholder="lastName"
        />
        <p>{errors.lastName?.message}</p>

        <input
          {...register("username")}
          placeholder="username"
        />
        <p>{errors.username?.message}</p>

        <input
          {...register("email")}
          placeholder="email"
        />
        <p>{errors.email?.message}</p>

        <input
          {...register("password")}
          placeholder="password"
        />
        <p>{errors.password?.message}</p>



        <input id="button" type="submit" value="Register" />
      </form>
    );
  };

export default Register;

