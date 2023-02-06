import React, { useState, useEffect } from 'react';
import { AgChartsReact } from 'ag-charts-react';
import { useContext } from 'react';
import { UserContextType, Weighting } from "../types/user.type";
import { UserContext } from '../context/userContext';
import Portfolio from '../components/Portfolio';
import { getCurrUserPortfolio } from '../services/user.service';
import { Box, Grid, TextField, Typography, Button } from '@mui/material';
import { useForm, Controller, useFormState, set } from "react-hook-form";

interface formValues {
  ticker: string
  shares: number
}

const EditOneStockForm = (datum: Weighting) => {



  // const [ticker, setTicker] = useState<string>()
  // const [shares, setShares] = useState<number>()
  const [display, setDisplay] = useState<boolean>(false)

  useEffect(() => {
    setDisplay(false)
    if (datum['01. symbol']) {
      setTicker(datum['01. symbol'])
      setShares(datum['11. shares'])
      setDisplay(true)
    }
  }, [datum])


  const [ticker, setTicker] = useState<string>()
  const [shares, setShares] = useState<number>()
  // const [defaultValues, setDefaultValues] = useState<Weighting>(datum);

  const { handleSubmit, control, reset } = useForm<formValues>({
    defaultValues: {
      ticker: ticker,
      shares: shares
    }
  });

  const handleOnSumbit = (data: formValues) => {
    console.log(data)
    reset()
    setDisplay(false)
  }

  return (
    <section id='edit-form-section'>
      {display ?
        (<form onSubmit={handleSubmit(data => handleOnSumbit(data))}>

          <Grid container wrap='nowrap' alignItems="center" spacing={2} >

            <Grid item xs={28}>
              <Controller
                control={control}
                name="ticker"
                defaultValue={datum['01. symbol']}
                render={({ field: { onChange, onBlur, value},
                  fieldState: { error } }) => (
                  <TextField
                    id="outlined"
                    // {...field}
                    onChange={onChange} // send value to hook form
                    onBlur={onBlur} // notify when input is touched/blur
                    value={value}

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
                defaultValue={datum['11. shares']}
                render={({ field: { onChange, onBlur, value },
                fieldState: { error } }) => (
                  <TextField
                    id="outlined"
                    // {...field}
                    onChange={onChange} // send value to hook form
                    onBlur={onBlur} // notify when input is touched/blur
                    value={value}

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