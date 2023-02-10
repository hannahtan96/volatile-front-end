import { useState, useEffect, useContext } from 'react';
import { UserContextType } from "../types/user.type";
import { UserContext } from '../context/userContext';
import { AgChartsReact } from 'ag-charts-react';
import './Score.css'
import CommonWordsList from './CommonWordsList';
import SentimentedWordList from './SentimentedWordList';
import { Weighting } from '../types/user.type';
import { getCurrUserPortfolioSentiments } from '../services/user.service';
import { Holdings } from './Portfolio';
import { Box, Typography } from '@mui/material';
import { CircularProgress } from '@material-ui/core';

interface headline {
  confidence: string,
  irony: string,
  score_tag: string,
  text: string,
}

export interface sentiment {
  confidence: string,
  score_tag: string,
  text: string,
}

interface positionData {
  date: string,
  headliners: headline[],
  sentiment_score: number,
  sentiments: sentiment[],
  ticker: string,
  words: Word
}

export interface Word {
  [key: string]: number;
}

export interface onePosition {
  ticker: string,
  name: string,
  share: number,
  sentiment: number
}

const Score = () => {

  const { user, userPortfolio, userPortfolioWeightings } = useContext(UserContext) as UserContextType;

  const [unfilteredPositions, setUnfilteredPositions] = useState<positionData[]>([])
  const [positions, setPositions] = useState<positionData[]>([])

  const [unavailableTickers, setunavailableTickers] = useState<string[]>([])
  const [weightings, setWeightings] = useState<Weighting[]>([])
  const [multiplier, setMultiplier] = useState<number>(1)
  const [sentiment, setSentiment] = useState<number|null>()
  const [userData, setUserData] = useState<onePosition[]>([])
  const [loadingMessage, setLoadingMessage] = useState<string>('No portfolio is registered.')
  const [errorMessage, setErrorMessage] = useState<string>()

  const [clicked, setClicked] = useState<boolean>(false)
  const [selectedPosition, setSelectedPosition] = useState<positionData|null>()
  const [commonWords, setCommonWords] = useState<Word>()
  const [sentimentedWords, setSentimentedWords] = useState<sentiment[]>([])


  useEffect(() => {
    if ((userPortfolio?.portfolio.length || 0 ) > 0) {
      findSentiments(userPortfolio!.portfolio!)
      setLoadingMessage('Loading...')
    }

  }, [userPortfolio])

  useEffect(() => {
    if ((userPortfolioWeightings?.weightings.length || 0) > 0) {
      setWeightings(userPortfolioWeightings!.weightings!)
    }
  }, [userPortfolioWeightings])

  useEffect(() => {
    if (weightings && weightings.length > 0 && unfilteredPositions && unfilteredPositions.length > 0) {
      filterRelevantSentiments(unfilteredPositions)
    }
  }, [unfilteredPositions])

  useEffect(() => {
    if (weightings && weightings.length > 0 && positions && positions.length > 0) {
      mapShareWeights()
    }
  }, [weightings, positions])

  useEffect(() => {
    if (weightings.length > 0 && userData.length > 0) {
      calculateSentiment()
    }
  }, [userData])

  useEffect(() => {
    setCommonWords(selectedPosition?.words)
    setSentimentedWords(selectedPosition?.sentiments || [])
  }, [selectedPosition])

  const findSentiments = (portfolio: Holdings[]) => {
    console.log(portfolio)
    if (portfolio.length > 1) {
      getCurrUserPortfolioSentiments(portfolio)
      .then((response) => {
        console.log(response)
        setUnfilteredPositions(response.portfolio)
      })
      .catch((error) => {
        console.log(error)
        setErrorMessage('There\'s been an eSrror in in calculating your portfolio.')
      })
    }
  }

  const filterRelevantSentiments = (portfolio: positionData[]) => {
    let filteredPositions = portfolio
      .filter(p => p["sentiment_score"] !== -1)
    let positionsNoData = portfolio
      .filter(p => p["sentiment_score"] === -1)
      .map(p => p["ticker"])
    let sentimentedProportion = portfolio
      .filter(p => p["sentiment_score"] !== -1)
      .reduce((acc, p) => { return acc + weightings!.filter(w => w["symbol"] === p["ticker"])[0]["proportion"] }, 0)

    setPositions(filteredPositions)
    setMultiplier(1/sentimentedProportion)
    setunavailableTickers(positionsNoData)
  }

  let percentage_option = {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }

  const percFormatter = new Intl.NumberFormat("en-US", percentage_option)
  const numFormatter = new Intl.NumberFormat("en-US", { minimumSignificantDigits: 2, maximumSignificantDigits: 2 });
  const colors = ["#75eab6", "#56a06c", "#ade64f", "#3d99ce", "#a7dcf9", "#aea2eb", "#fd95e8", "#f642d0", "#2af464", "#8f937f", "#dcd888", "#d6790b", "#fd5917", "#ffb4a2", "#fe707d", "#f4d403"]


  const mapShareWeights = () => {
    const uD = positions.map(p => ({
      ticker: p["ticker"],
      name: weightings!
        .filter(w => w["symbol"] === p["ticker"])[0]["name"],
      share: weightings!
        .filter(w => w["symbol"] === p["ticker"])[0]["proportion"]*multiplier,
      sentiment: p["sentiment_score"]
    }))
    console.log(uD)
    setUserData(uD)
  }

  const calculateSentiment = () => {
    let weighted_total = 0;
    let total_weight = 0;
    for (let i = 0; i < userData.length; i += 1) {
      weighted_total += userData[i].share * userData[i].sentiment;
      total_weight += userData[i].share
    }
    console.log(weighted_total / total_weight)
    setSentiment(Math.round(1000 * (weighted_total / total_weight))/10);
  }

  const options = {
    data: userData,
    series: [
      {
        type: "pie",
        title: {
          text: 'Your Volatile Score',
          fontSize: 44
        },
        labelKey: "ticker",
        calloutLabel: {
          fontSize: 16,
          fontWeight: 'bold'
        },
        angleKey: "share",
        radiusKey: "sentiment",
        sectorLabelKey: "name",
        innerRadiusOffset: -25,
        innerRadiusRatio: 0.60,
        fills: colors,
        fillOpacity: 0.70,
        strokes: ['white'],
        strokeWidth: 3,
        showInLegend: false,
        innerLabels: [
          { text: `${percFormatter.format((sentiment || 0)/100)}`, fontSize: 40, color: 'black' },
          { text: 'Sentiment', margin: 4 }
        ],
        innerCircle: {
            fill: 'white',
        },
        highlightStyle: {
          item: {
            fillOpacity: 0,
            stroke: "#000",
            strokeWidth: 1
          }
        },
        sectorLabel: {
          color: "white",
          fontSize: 14,
          fontWeight: "normal",
          formatter: ({ datum, angleKey }: any) => {
            const value = datum[angleKey];
            return percFormatter.format(value);
          }
        },
        tooltip: {
          renderer: ({ datum, sectorLabelKey, title, radiusKey }: any) => {
            return {
              title: `${datum[sectorLabelKey]}`,
              content: `Sentiment: ${numFormatter.format(
                datum[radiusKey]
              )}`
            };
          }
        },
        shadow: {
          enabled: true,
          color: 'gray',
          xOffset: 4,
          yOffset: 10
        },
        listeners: {
          nodeClick: ({ datum, calloutLabelKey  }: any) => {
            let selected = positions.find((q) => q.ticker === datum[calloutLabelKey])
            setSelectedPosition(selected)
            setClicked(true)
          }
        }
      }
    ]
  }

  return (
    <section id='score-page'>
      <div id='score-flex-container'>

      { sentiment! ?
          (<div id='score-section'>
            <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
              <AgChartsReact id="ag" options={options} />
              {unavailableTickers.length > 0 ? <Typography variant='subtitle2' color='gray' sx={{ textAlign: 'center', fontStyle: 'italic' }}>No news available for {unavailableTickers.join(", ")}</Typography> : ""}
            </Box>
          </div>) :
          (<Typography variant="h1" display="block" paddingTop={5} sx={{ fontSize: 50, fontWeight: 300, color: 'gray', letterSpacing: -1 }}>
            {loadingMessage}
            {loadingMessage === "Loading..." ?
              (<Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress color='inherit' />
                </Box>) : ""}
          </Typography>)}


          {errorMessage ? <Typography variant="body2" p={1} m={'auto'} sx={{ width: '500px', border: 1, borderColor: 'red'}}>{errorMessage}</Typography> : ""}

          <div id='sentimented-words-section' className='p-10'>
            {clicked ? <SentimentedWordList words={sentimentedWords} /> : <div></div>}
          </div>
          <div id='common-words-section' className='p-10'>
            {clicked ? <CommonWordsList {...commonWords} /> : <div></div>}
          </div>
        </div>

    </section>

  );
}

export default Score;