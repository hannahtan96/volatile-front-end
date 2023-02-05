// https://codesandbox.io/s/eager-wiles-xkz3qg?file=/src/App.js:0-8602
import { useContext, useState, useEffect } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { logPortfolio } from "../services/user.service";
import {
  Box,
  Button,
  Grid,
  TextField
} from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { UserContextType } from "../types/user.type";
import { UserContext } from '../context/userContext';
import './Portfolio.css'

interface FormInputs {
  holdings: Holdings[]
}

export interface Holdings {
  ticker: string
  shares: number
}

const myHelper = {
  email: {
    required: "Email is Required",
    pattern: "Invalid Email Address"
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'left',
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

const Portfolio = () => {

  const { user, userPortfolio, userPortfolioWeightings } = useContext(UserContext) as UserContextType;
  const [portfolio, setPortfolio] = useState<any[]>([])

  useEffect(() => {
    // console.log(user)
    // addNewHolding()
  }, [user])

  const classes = useStyles();

  const { control, handleSubmit, reset } = useForm({
    reValidateMode: "onBlur"
  });

  const {
    fields: holdings,
    append: appendHoldingRow,
    remove: removeHolding
  } = useFieldArray({
    control,
    name: "holdings"
  });

  const handleOnSubmit = (e: any) => {
    let name = user!.displayName
    let email = user!.email
    let localId = user!.localId
    let portfolio = e.holdings

    logPortfolio(name, email, localId, portfolio)
      .then((response) => {
        console.log(response.data)
        reset()
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        console.log(resMessage)
      })
    };

    const addNewHolding = () => appendHoldingRow({ ticker: "", shares: '' });

    return (
      <section id='portfolio-section'>

        <form className={classes.root} onSubmit={handleSubmit(handleOnSubmit)}>

          <Box alignItems="center">
            {holdings.map((field, index) => (
              <Grid container wrap='nowrap' key={field.id} spacing={2} >
                <Grid item xs={28}>
                  <Controller
                    control={control}
                    // must use . for the object key!!!
                    name={`holdings.${index}.ticker`}
                    defaultValue=""
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        label="Ticker"
                        variant="outlined"
                        type="text"
                        error={!!error}
                        helperText={error ? error.message : null}
                        inputProps={{ style: { textTransform: "uppercase" } }}
                        fullWidth />
                    )}
                    rules={{ required: 'Ticker Required' }}
                  />
                </Grid>

                <Grid item xs={24}>
                  <Controller
                    control={control}
                    // must use . for the object key!!!
                    name={`holdings.${index}.shares`}
                    defaultValue=""
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        label="# of Shares"
                        variant="outlined"
                        type="number"
                        error={!!error}
                        helperText={error ? error.message : null}
                        InputProps={{ inputProps: { min: 1 } }}
                        fullWidth />
                    )}
                    rules={{ required: 'Number of shares Required' }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Button
                    color="error"
                    variant="text"
                    onClick={() => removeHolding(index)}
                  >
                    Delete
                  </Button>
                </Grid>

                  </Grid>
                ))}

              <Grid item xs={12}>
                {/* {errorMessage ? <p id='login-error-message'>Incorrect email or password</p> : <div></div>} */}
                <Button variant="contained" onClick={addNewHolding}>
                  Add
                </Button>
                <Button type="submit">Submit</Button>
              </Grid>
            </Box>
        </form>
      </section>
    );
  }

export default Portfolio;
