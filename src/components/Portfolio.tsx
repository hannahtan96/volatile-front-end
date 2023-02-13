// https://codesandbox.io/s/eager-wiles-xkz3qg?file=/src/App.js:0-8602
import { useContext, useState } from "react";
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
import ErrorMessage from "./ErrorMessage";


export interface Holdings {
  symbol: string
  name: string
  shares: number
}

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

  const { user } = useContext(UserContext) as UserContextType;
  const [badTickerError, setBadTickerError] = useState<string>('')

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
          console.log(response)
          if (response["non-existent tickers"]) {
            setBadTickerError(`Invalid tickers: ${response["non-existent tickers"]}`)
          } else {
            console.log(response.data)
            reset()
            window.location.reload()
          }

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
      <section id='new-portfolio-form-section'>

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
              {/* <Grid>{potentialHoldings?.length > 0 ? <div>Pick Me</div> : ""}</Grid> */}
              {badTickerError ? <ErrorMessage {...{error: badTickerError}} /> : ""}
              <Button variant="contained" onClick={addNewHolding}>
                NEW
              </Button>
              <Button type="submit">Submit</Button>
            </Grid>
          </Box>
        </form>


      </section>
    );
  }

export default Portfolio;
