import { useState, useEffect, useContext } from 'react';
import { UserContextType, Weighting } from "../types/user.type";
import { UserContext } from '../context/userContext';
import { editPortfolio } from '../services/user.service';
import { Grid, TextField, Button, Typography } from '@mui/material';
import { useForm, Controller } from "react-hook-form";

export interface formValues {
  ticker: string
  shares: number
  email?: string
  user?: string
}

const EditOneStockForm = (datum: Weighting) => {

  const { user } = useContext(UserContext) as UserContextType;
  const [display, setDisplay] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>()

  useEffect(() => {
    reset()
    if (datum['symbol']) {
      setDisplay(true)
      setTicker(datum['symbol'])
      setShares(datum['shares'])
    }

  }, [datum])

  const [ticker, setTicker] = useState<string>()
  const [shares, setShares] = useState<number>()

  const { register, handleSubmit, control, reset } = useForm<formValues>({
    defaultValues: {
      ticker: ticker!,
      shares: shares!
    }
  });

  const handleOnSubmit = (data: formValues) => {
    // let allData = data
    data["email"] = user!.email
    data["user"] = user!.displayName

    editPortfolio(user!.localId!, data)
      .then((response) => {
          console.log(response)
          if (response.portfolio) {
            reset()
            setDisplay(false)
            window.location.reload()
          } else {
            setErrorMessage(response["non-existent ticker"])
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


  return (
    <section id='edit-form-section'>
      {display ?
        (<form onSubmit={handleSubmit(data => handleOnSubmit(data))}>

          <Grid container wrap='nowrap' alignItems="center" spacing={2} >

            <Grid item xs={28}>
              <Controller
                control={control}
                name="ticker"
                defaultValue={ticker}
                render={({ field: { onChange, onBlur, value},
                  fieldState: { error } }) => (
                  <TextField
                    id="outlined"
                    // {...field}
                    onChange={onChange} // send value to hook form
                    onBlur={onBlur} // notify when input is touched/blur
                    value={value}
                    inputProps={{ style: { textTransform: 'uppercase' } }}
                    // defaultValue={ticker}
                    placeholder={ticker}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
              />
            </Grid>

            <Grid item xs={28}>
              <Controller
                control={control}
                name="shares"
                defaultValue={shares}
                render={({ field: { onChange, onBlur, value },
                fieldState: { error } }) => (
                  <TextField
                    id="outlined"
                    // {...field}
                    type="number"
                    onChange={onChange} // send value to hook form
                    onBlur={onBlur} // notify when input is touched/blur
                    value={value}
                    // defaultValue={shares}
                    InputProps={{ inputProps: { min: 0 } }}
                    error={!!error}
                    helperText={error ? error.message : null}

                  />
                )}
              />
            </Grid>

            {/* {formState.errors?.content ? true : false} */}
            <Grid item xs={12}>
              <Button type="submit" variant='contained'>UPDATE</Button>
            </Grid>

          </Grid>

          {errorMessage ? <Typography variant='subtitle2' paddingTop={2} color='gray' sx={{ textAlign: 'center', fontStyle: 'italic' }}>No stock found with {errorMessage} ticker.</Typography> : "" }


        </form>)
      : <div></div>}
    </section>
  )
}

export default EditOneStockForm;