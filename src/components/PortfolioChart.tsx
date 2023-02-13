import { useState, useEffect, useContext } from 'react';
import { AgChartsReact } from 'ag-charts-react';
import { UserContextType, Weighting } from "../types/user.type";
import { UserContext } from '../context/userContext';
import Portfolio from '../components/Portfolio';
import { editPortfolio } from '../services/user.service';
import EditOneStockForm, { formValues } from '../components/EditOneStockForm';
import { getCurrUserPortfolio, getCurrUserPortfolioWeightings } from '../services/user.service';
import { Typography, Button, Box } from '@mui/material';
import ErrorMessage from '../components/ErrorMessage';


const PortfolioChart = () => {

  const { user, userPortfolio, userPortfolioWeightings, saveUserPortfolio, saveUserPortfolioWeightings } = useContext(UserContext) as UserContextType;

  const [currWeightings, setCurrWeightings] = useState<Weighting[]>()
  const [display, setDisplay] = useState<boolean>(false)
  const [tickerToEdit, setTickerToEdit] = useState<Weighting|null>()
  const [errorMessage, setErrorMessage] = useState<string>()

  useEffect(() => {
    if (user?.displayName) {
      getUserPortfolio()
    }
  }, [user])

  useEffect(() => {
    if (userPortfolio?.portfolio) {
      getUserPortfolioWeightings()
    }
  }, [userPortfolio])

  useEffect(() => {
    if (userPortfolioWeightings?.weightings) {
      setCurrWeightings(userPortfolioWeightings?.weightings)
      setDisplay(true)
      setTickerToEdit(null)
    }
  }, [userPortfolioWeightings])


  const getUserPortfolio = () => {
    getCurrUserPortfolio(user!.localId!)
      .then((response) => {
        console.log(response)
        saveUserPortfolio(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const getUserPortfolioWeightings = () => {
    getCurrUserPortfolioWeightings(user!.localId!)
      .then((response) => {
        console.log(response)
        if (response.weightings) {
          saveUserPortfolioWeightings(response)
        } else if (response.error) {
          setErrorMessage(response.error)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const edit = () => {
    setTickerToEdit({
      "c": 0,
      "h": 0,
      "l": 0,
      "o": 0,
      "pc": 0,
      "t": 0,
      "symbol": "NEW",
      "shares": 0,
      "proportion": 0,
      "name": ""
    })
  }

  const handleEditTickerSubmit = (data: formValues) => {

    editPortfolio(user!.localId!, data)
      .then((response) => {
          console.log(response)
          if (response.portfolio) {
            getUserPortfolioWeightings()
          } else {
            setErrorMessage(`Invalid ticker: ${response["non-existent ticker"]}`)
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
      .finally(() => setTickerToEdit(null))
  }

  let percentage_option = {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }

  const percFormatter = new Intl.NumberFormat("en-US", percentage_option)
  const numFormatter = new Intl.NumberFormat("en-US");
  const dollarFormatter = new Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' })
  const colors = ["#75eab6", "#56a06c", "#ade64f", "#3d99ce", "#a7dcf9", "#aea2eb", "#fd95e8", "#f642d0", "#2af464", "#8f937f", "#dcd888", "#d6790b", "#fd5917", "#ffb4a2", "#fe707d", "#f4d403"]

  const options = {
    data: currWeightings,
    series: [
      {
        type: "pie",
        labelKey: "symbol",
        calloutLabel: {
          fontSize: 16,
          fontWeight: '600',
          offset: 5
        },
        angleKey: "proportion",
        radiusKey: "o",
        sectorLabelKey: "name",
        innerRadiusRatio: 0.70,
        fills: colors,
        fillOpacity: 0.70,
        strokes: ['white'],
        strokeWidth: 3,
        showInLegend: false,
        highlightStyle: {
          item: {
            fillOpacity: 0,
            stroke: "#000",
            strokeWidth: 1
          }
        },
        sectorLabel: {
          color: "white",
          fontWeight: "normal",
          formatter: ({ datum, angleKey }: any) => {
            const value = datum[angleKey];
            return percFormatter.format(value);
          }
        },
        tooltip: {
          renderer: ({ datum, sectorLabelKey, radiusKey }: any) => {
            return {
              title: `${datum[sectorLabelKey]}`,
              content: `Price: ${dollarFormatter.format(
                datum[radiusKey]
              )}`
            };
          }
        },
        listeners: {
          nodeClick: ({ datum }: any) => {
            setTickerToEdit(datum)
          }
        },
        shadow: {
          enabled: true,
          color: 'gray',
          xOffset: 4,
          yOffset: 10
        }
      },
      {
        type: 'pie',
        calloutLabelKey: 'symbol',
        calloutLabel: {
          fontSize: 12,
          offset: 0
        },
        angleKey: 'shares',
        sectorLabelKey: 'name',
        outerRadiusRatio: 0.4,
        innerRadiusRatio: 0.25,
        showInLegend: false,
        fillOpacity: 0.70,
        strokes: ['white'],
        strokeWidth: 2,
        highlightStyle: {
          item: {
            fillOpacity: 0,
            stroke: "#000",
            strokeWidth: 0.5
          }
        },
        shadow: {
          enabled: true,
          color: 'lightgray',
          xOffset: 3,
          yOffset: 6
        },
        sectorLabel: {
          color: "white",
          fontSize: 14,
          fontWeight: "bold",
          formatter: ({ datum, angleKey }: any) => {
            const value = datum[angleKey];
            return numFormatter.format(value);
          }
        },
        tooltip: {
          renderer: ({ datum, sectorLabelKey, angleKey }: any) => {
            return {
              title: `${datum[sectorLabelKey]}`,
              content: `Shares: ${numFormatter.format(
                datum[angleKey]
              )}`
            };
          }
        },
      }
    ]
  }


  return (
    <div>
      <Box p={2} textAlign={'center'}>
        <Typography variant="h4" p={1} >CURRENT PORTFOLIO</Typography>
        <Typography variant="body2" sx={{ color: 'gray', fontSize: 14, fontStyle: 'italic', fontWeight: 400 }}>
          To edit existing holdings, directly click on the holding and edit the number of shares.
        </Typography>
      </Box>
      {display ?
        (<div id='portfolio-section'>
          <AgChartsReact options={options} />
        </div>)
      :  <div></div>}

      {tickerToEdit ?
        (<div id='edit-portfolio-section' className='p-20'>
          <EditOneStockForm callback={handleEditTickerSubmit} datum={tickerToEdit} />
        </div>)

      :  <div></div>}

      <Button type="submit" variant="outlined" onClick={edit} >ADD ONE</Button>

      <div id='new-portfolio-form' className='p-20'>
        <Typography variant="h4" p={1} borderBottom={'1px solid #1976d2'} >NEW PORTFOLIO</Typography>
        <Portfolio />
      </div>

      {errorMessage ? <ErrorMessage error={errorMessage} /> : ""}
    </div>
  )


}
export default PortfolioChart;