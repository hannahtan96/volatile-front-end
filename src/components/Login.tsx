import { ChangeEvent, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, TextField, makeStyles } from '@material-ui/core';
import { login } from '../services/auth.service'


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
  const [successful, setSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');


  const validationSchema = Yup.object().shape({
    email: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });

  const classes = useStyles();

  const { handleSubmit, control, reset } = useForm<loginCredentials>({
    resolver: yupResolver(validationSchema)
  })

  const handleLogin = ({email, password}: loginCredentials) => {

    login(email, password)
      .then((response:any) => {
        console.log(response)
        setMessage(response)
        reset()
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

            <Button type='submit' variant="contained" color="primary">Login</Button>
          </form>
        </div>)
        :
        (<div>{message}</div>)}
      </section>
    );
  };

export default Login;