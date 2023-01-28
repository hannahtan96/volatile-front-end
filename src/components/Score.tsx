import { useState, useEffect, ChangeEvent } from 'react';
import { Doughnut } from 'react-chartjs-2'
import {Chart, ArcElement} from 'chart.js'
import DonutChart from 'react-donut-chart'
import './Score.css'
import { number } from 'yup/lib/locale';
import { Item } from 'react-donut-chart/dist/DonutChart';
import { AgChartsReact } from 'ag-charts-react';


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

interface sentiment {
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
  words: any
}

const Score = () => {

  const [positions, setPositions] = useState<positionData[]>([])
  Chart.register(ArcElement);

  useEffect(() => {
    setPositions([...positions, netflix])
    setPositions([...positions, microsoft])
  }, [])



  const colors = ["#75eab6", "#56a06c", "#ade64f", "#3d99ce", "#a7dcf9", "#aea2eb", "#fd95e8", "#f642d0", "#2af464", "#8f937f", "#dcd888", "#d6790b", "#fd5917", "#ffb4a2", "#fe707d", "#f4d403"]
  // let labels = ['Mon','Tue','Wed','Thurs','Fri']
  // let customLabels = labels.map((label,index) =>`${label}: ${data[index]}`)
  const data = {
    labels: ['Mon','Tue','Wed','Thurs','Fri'],
    datasets: [
      {
        label: 'Weekdays',
        data: [25,24,25,25,23],
        offset: 10,
        hoverOffset: 50,
        borderRadius: 5,
        borderColor: ['rgba(255,206,86,0.0)'],
        backgroundColor: colors,
        // pointBackgroundColor: 'rgba(255,206,86,0.2)',
        // backgroundImage: 'lightblue url("https://www.chartjs.org/img/chartjs-logo.svgf") no-repeat fixed center'
      }
    ]
  }

  const options = {
    data: [
      { os: "Vendor A", share: 56.9, satisfaction: 10 },
      { os: "Apex Mortgage", share: 22.5, satisfaction: 11 },
      { os: "Vendor Z", share: 6.8, satisfaction: 10 },
      { os: "Vendor C", share: 8.5, satisfaction: 9 }
    ],
    series: [
      {
        type: "pie",
        labelKey: "os",
        angleKey: "share",
        radiusKey: "satisfaction",
        innerRadiusOffset: -30
      }
    ]
  }

  const donut_data = [
    {
      label: 'Give you up',
      value: 25,
      color: 'white'
    },
    {
      label: 'Hello',
      value: 75,
      color: 'white'
    },
  ]

  const displayPosition = (item: Item, toggled: boolean) => {
    console.log(item)
    // return Senitment
  }

  const formatValues = (values: number
    , total: number) => {
    return `${(values / total * 100).toFixed(0)}%`
  }

  const reactDonutChartdata = [
    {
      label: "Asia",
      value: 20,
      color: "#00E396"
    },
    {
      label: "Europe",
      value: 35,
      color: "#FEB019"
    },
    {
      label: "Africa",
      value: 30,
      color: "#FF4560"
    },
    {
      label: "America",
      value: 10,
      color: "#775DD0"
    },
    {
      label: "Other",
      value: 5,
      color: "#775DD0"
    }
  ];
  const reactDonutChartBackgroundColor = [
    "#002396",
    "#4EB019",
    "#6F4560",
    "#175DD0",
    "#355312"
  ];
  const reactDonutChartInnerRadius = 0.6;
  const reactDonutChartSelectedOffset = 0.04;
  const reactDonutChartHandleClick = (item: Item, toggled: boolean) => {
    if (toggled) {
      console.log(item);
    }
  };
  let reactDonutChartStrokeColor = "#FFFFFF";
  const reactDonutChartOnMouseEnter = (item: Item) => {
    // if (reactDonutChartdata!) {
    //   let color = reactDonutChartdata?.find((q) => q.label === item.label).color;
    //   reactDonutChartStrokeColor = color;
    return item.label
  };



  return (
    // <DonutChart
    //   width={600}
    //   height={600}
    //   onMouseEnter={(item) => reactDonutChartOnMouseEnter(item)}
    //   strokeColor={reactDonutChartStrokeColor}
    //   data={reactDonutChartdata}
    //   colors={reactDonutChartBackgroundColor}
    //   innerRadius={reactDonutChartInnerRadius}
    //   selectedOffset={reactDonutChartSelectedOffset}
    //   toggledOffset={0.5}
    //   onClick={(item, toggled) => reactDonutChartHandleClick(item, toggled)}
    //   legend={false}
    // />

    <AgChartsReact options={options} />
  );
}

export default Score;