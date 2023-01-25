import { useContext, useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, TextField, makeStyles } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth.service'
import User, { UserContextType } from "../types/user.type";
import { UserContext } from '../context/userContext';

interface loginCredentials {
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

const Login = () => {
  const { user, saveUser } = useContext(UserContext) as UserContextType;

  const [currUser, setCurrUser] = useState<User|null>(null)
  const [successful, setSuccessful] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (user) {
      setSuccessful(true);
      setSuccessMessage('You\'re already logged in!')
    }
  }, [user])


  const validationSchema = Yup.object().shape({
    email: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });

  const classes = useStyles();
  const navigate = useNavigate()

  const { handleSubmit, control, reset } = useForm<loginCredentials>({
    resolver: yupResolver(validationSchema)
  })

  const handleLogin = ({email, password}: loginCredentials) => {

    login(email, password)
      .then((response:any) => {
        console.log(response)
        if (response.displayName) {
          saveUser(response);
          navigate('/home')
        } else {
          setErrorMessage(response.message);
        }
        reset()
      })
      .catch((error: any) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        console.log(resMessage)
        setErrorMessage(resMessage);
        setSuccessful(false);
      })
    }

    return (
      <section>
        {!successful ?
        (<div className="form-section">
          <h2>Login</h2>

          <form className={classes.root} onSubmit={handleSubmit(handleLogin)}>

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
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{ required: 'Password required' }}
            />

            {errorMessage ? <p>Incorrect email or password</p> : ""}
            <Button type='submit' variant="contained" color="primary">Login</Button>
          </form>
        </div>) : <div>{successMessage}</div>}
      </section>
    );
  };

export default Login;