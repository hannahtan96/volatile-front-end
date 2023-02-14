import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, TextField, makeStyles } from '@material-ui/core';
import { registerNewUser } from '../services/auth.service'
import './Register.css'
import { useNavigate } from 'react-router-dom';


interface signUpCredentials {
  firstName: string
  lastName: string
  username: string
  email: string
  password: string
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
}));

const Register = () => {
  const [successful, setSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().min(3).max(20).required(),
    lastName: Yup.string().min(3).max(30).required(),
    username: Yup.string().min(3).max(20).required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(8).max(32).required()
  })

  const classes = useStyles();
  const navigate = useNavigate()

  const { handleSubmit, control, reset } = useForm<signUpCredentials>({
    resolver: yupResolver(validationSchema)
  })

  const handleRegister = ({firstName, lastName, username, email, password}: signUpCredentials) => {

    registerNewUser(firstName, lastName, username, email, password)
      .then((response) => {
        setMessage(response.data.message)
        reset()
        navigate('/login')
      })
      .catch((error) => {
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
      <section>
        {!successful ?
        (<div className="form-section">
          <h2>Register New User</h2>

          <form className={classes.root} onSubmit={handleSubmit(handleRegister)}>

            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  label="First Name"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{ required: 'First name required' }}
            />

            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  label="Last Name"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{ required: 'Last name required' }}
            />

            <Controller
              name="username"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  label="Username"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{ required: 'Username required' }}
            />

            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  label="Email"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{ required: 'Email required' }}
            />

            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{ required: 'Password required' }}
            />

            <Button type='submit' variant="contained" color="primary">Register</Button>
          </form>
        </div>)
        :
        (<div>{message}</div>)}
      </section>
    );
  };

export default Register;

