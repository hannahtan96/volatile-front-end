import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { UserContextType, Weighting } from "../types/user.type";
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import { editPortfolio } from '../services/user.service';
import { Box, Grid, TextField, Typography, Button } from '@mui/material';
import { useForm, Controller, useFormState, set } from "react-hook-form";

export interface formValues {
  ticker: string
  shares: number
}

const EditOneStockForm = (datum: Weighting) => {

  const { user } = useContext(UserContext) as UserContextType;
  // const [ticker, setTicker] = useState<string>()
  // const [shares, setShares] = useState<number>()
  const [display, setDisplay] = useState<boolean>(false)

  useEffect(() => {
    // setDisplay(false)
    reset()
    if (datum['01. symbol']) {
      console.log(datum)
      setDisplay(true)
      // console.log(datum['01. symbol'])
      setTicker(datum['01. symbol'])
      setShares(datum['11. shares'])

    }

  }, [datum])

  const navigate = useNavigate()
  const [ticker, setTicker] = useState<string>()
  const [shares, setShares] = useState<number>()
  // const [defaultValues, setDefaultValues] = useState<Weighting>(datum);

  const { register, handleSubmit, control, reset } = useForm<formValues>({
    defaultValues: {
      ticker: ticker!,
      shares: shares!
    }
  });

  const handleOnSumbit = (data: formValues) => {

    editPortfolio(user!.localId!, data)
      .then((response) => {
          console.log(response)
          reset()
          setDisplay(false)
          navigate('/portfolio')
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
        (<form onSubmit={handleSubmit(data => handleOnSumbit(data))}>

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
                    onChange={onChange} // send value to hook form
                    onBlur={onBlur} // notify when input is touched/blur
                    value={value}
                    // defaultValue={shares}
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

        </form>)
      : <div></div>}
    </section>
  )
}

export default EditOneStockForm;