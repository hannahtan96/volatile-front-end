import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { UserContextType } from "../types/user.type";
import { UserContext } from '../context/userContext';
import { AgChartsReact } from 'ag-charts-react';
import './Score2.css'
import CommonWordsList from './CommonWordsList';
import SentimentedWordList from './SentimentedWordList';
import { Weighting } from '../types/user.type';


const netflix = {
  "date": "20230127",
  "headliners": [
      {
          "confidence": "97",
          "irony": "NONIRONIC",
          "score_tag": "N",
          "text": "‘The Witcher:"
      },
      {
          "confidence": "100",
          "irony": "NONIRONIC",
          "score_tag": "P",
          "text": "Striving to Make Netflix’s Harry and Meghan Series ‘Personal and Raw’"
      }
  ],
  "sentiment_score": 0.5,
  "sentiments": [
      {
          "confidence": "97",
          "score_tag": "N",
          "text": "be>late"
      },
      {
          "confidence": "97",
          "score_tag": "N",
          "text": "Blood Origin’ Is TV’s Latest Big Fantasy Prequel"
      },
      {
          "confidence": "97",
          "score_tag": "N",
          "text": "blood"
      },
      {
          "confidence": "97",
          "score_tag": "N",
          "text": "origin"
      },
      {
          "confidence": "100",
          "score_tag": "P",
          "text": "strive"
      },
      {
          "confidence": "100",
          "score_tag": "P",
          "text": "Striving to Make Netflix’s Harry and Meghan Series"
      },
      {
          "confidence": "100",
          "score_tag": "P",
          "text": "Striving to Make Netflix’s Harry and Meghan Series ‘Personal and Raw’"
      },
      {
          "confidence": "100",
          "score_tag": "P",
          "text": "serie"
      },
      {
          "confidence": "100",
          "score_tag": "P",
          "text": "Netflix"
      },
      {
          "confidence": "100",
          "score_tag": "P",
          "text": "Harry"
      },
      {
          "confidence": "100",
          "score_tag": "P",
          "text": "Meghan"
      }
  ],
  "ticker": "NFLX",
  "words": {
      "1,200": 1,
      "2019": 12,
      "A": 13,
      "AND": 12,
      "BEEN": 31,
      "BEFORE": 21,
      "BY": 13,
      "COGAN": 11,
      "COMPANY": 11,
      "DAN": 13,
      "DEBUT": 14,
      "DOCUMENTARY": 21,
      "EVENTS": 13,
      "FILMMAKER": 41,
      "FROM": 12,
      "GARBUS": 14,
      "HAS": 15,
      "HER": 17,
      "HIGH-PROFILE": 1,
      "HUSBAND": 20,
      "IN": 13,
      "IS": 14,
      "ITS": 12,
      "LIZ": 16,
      "MINI-SERIES": 21,
      "MOST": 11,
      "MOST-WATCHED": 51,
      "NETFLIX’S": 22,
      "OF": 22,
      "ONE": 3,
      "PLACE": 22,
      "PROJECT": 7,
      "RUN": 9,
      "SERIES": 4,
      "SHOWS": 24,
      "SINCE": 35,
      "STORY": 46,
      "SYNDICATE": 15,
      "TAKES": 6,
      "THE": 7,
      "WHICH": 2,
      "WITCHER,”": 2,
      "YEARS": 6,
      "“THE": 7
  }
}

const microsoft = {
  "date": "20230127",
  "headliners": [
      {
          "confidence": "90",
          "irony": "IRONIC",
          "score_tag": "N",
          "text": "Microsoft Gambles on 'Nice Guy' Strategy to Close Activision Megadeal"
      },
      {
          "confidence": "100",
          "irony": "NONIRONIC",
          "score_tag": "N",
          "text": "Lina Khan, Aiming to Block Microsoft's Activision Deal, Faces a Challenge"
      }
  ],
  "sentiment_score": 0.25,
  "sentiments": [
      {
          "confidence": "97",
          "score_tag": "N",
          "text": "be>late"
      },
      {
          "confidence": "97",
          "score_tag": "N",
          "text": "Blood Origin’ Is TV’s Latest Big Fantasy Prequel"
      },
      {
          "confidence": "97",
          "score_tag": "N",
          "text": "blood"
      },
      {
          "confidence": "97",
          "score_tag": "N",
          "text": "origin"
      },
      {
          "confidence": "100",
          "score_tag": "P",
          "text": "strive"
      },
      {
          "confidence": "100",
          "score_tag": "P",
          "text": "Striving to Make Netflix’s Harry and Meghan Series"
      },
      {
          "confidence": "100",
          "score_tag": "P",
          "text": "Striving to Make Netflix’s Harry and Meghan Series ‘Personal and Raw’"
      },
      {
          "confidence": "100",
          "score_tag": "P",
          "text": "serie"
      },
      {
          "confidence": "100",
          "score_tag": "P",
          "text": "Netflix"
      },
      {
          "confidence": "100",
          "score_tag": "P",
          "text": "Harry"
      },
      {
          "confidence": "100",
          "score_tag": "P",
          "text": "Meghan"
      }
  ],
  "ticker": "MSFT",
  "words": {
      "1,200": 1,
      "2019": 1,
      "A": 1,
      "AND": 1,
      "BEEN": 1,
      "BEFORE": 1,
      "BY": 1,
      "COGAN": 1,
      "COMPANY": 1,
      "DAN": 1,
      "DEBUT": 1,
      "DOCUMENTARY": 1,
      "EVENTS": 1,
      "FILMMAKER": 1,
      "FROM": 1,
      "GARBUS": 1,
      "HAS": 1,
      "HER": 1,
      "HIGH-PROFILE": 1,
      "HUSBAND": 1,
      "IN": 1,
      "IS": 1,
      "ITS": 1,
      "LIZ": 1,
      "MINI-SERIES": 1,
      "MOST": 1,
      "MOST-WATCHED": 1,
      "NETFLIX’S": 1,
      "OF": 2,
      "ONE": 1,
      "PLACE": 1,
      "PROJECT": 1,
      "RUN": 1,
      "SERIES": 1,
      "SHOWS": 1,
      "SINCE": 1,
      "STORY": 1,
      "SYNDICATE": 1,
      "TAKES": 1,
      "THE": 5,
      "WHICH": 1,
      "WITCHER,”": 1,
      "YEARS": 1,
      "“THE": 1
  }
}

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

class CommonWord {
  word: string;
  frequency: number;

  constructor( word: string, frequency: number ) {
    this.word = word
    this.frequency = frequency
  }
}

const Score = () => {

  const { user, userPortfolioWeightings, saveUserPortfolioWeightings } = useContext(UserContext) as UserContextType;

  const [positions, setPositions] = useState<positionData[]>([netflix, microsoft])
  const [weightings, setWeightings] = useState<Weighting[]>([])
  const [sentiment, setSentiment] = useState<number|null>()
  const [userData, setUserData] = useState<onePosition[]>([])

  const [clicked, setClicked] = useState<boolean>(false)
  const [selectedPosition, setSelectedPosition] = useState<positionData|null>()
  const [commonWords, setCommonWords] = useState<Word>()
  const [sentimentedWords, setSentimentedWords] = useState<sentiment[]>([])


  useEffect(() => {
    // console.log(weightings)
    if ((userPortfolioWeightings?.weightings.length || 0) > 0) {
      const w = userPortfolioWeightings!.weightings!
      setWeightings(w)

    }
  }, [userPortfolioWeightings])

  useEffect(() => {
    if (weightings.length > 0) {
      mapShareWeights()
    }

  }, [weightings])

  useEffect(() => {

    if (weightings.length > 0 && userData.length > 0) {
      calculateSentiment()
    }

  }, [userData])

  useEffect(() => {
    // let words = selectedPosition?.words
    setCommonWords(selectedPosition?.words)
    setSentimentedWords(selectedPosition?.sentiments || [])
  }, [selectedPosition])


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
        .filter(w => w["01. symbol"] === p["ticker"])[0]["13. name"],
      share: weightings!
        .filter(w => w["01. symbol"] === p["ticker"])[0]["12. proportion"],
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
          // fontSize: 14,
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

      { (sentiment! > 0) ?
          (<div id='score-section'>
            <AgChartsReact id="ag" options={options} />
          </div>)
          : <div>No portfolio registered.</div> }

          <div id='sentimented-words-section' className='p-20'>
            {clicked ? <SentimentedWordList words={sentimentedWords} /> : <div></div>}
          </div>
          <div id='common-words-section' className='p-20'>
            {clicked ? <CommonWordsList {...commonWords} /> : <div></div>}
          </div>
        </div>

    </section>

  );
}

export default Score;