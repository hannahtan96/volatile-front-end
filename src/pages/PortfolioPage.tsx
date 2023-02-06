import React, { useState, useEffect } from 'react';
import { AgChartsReact } from 'ag-charts-react';
import { useContext } from 'react';
import { UserContextType, Weighting } from "../types/user.type";
import { UserContext } from '../context/userContext';
import Portfolio from '../components/Portfolio';
import { getCurrUserPortfolio } from '../services/user.service';

interface Weights {
  ticker: string
  shares: number
  // weight:
}

const PortfolioPage = () => {

  const { user, userPortfolioWeightings } = useContext(UserContext) as UserContextType;

  const [weightings, setWeightings] = useState<Weighting[]>([])
  const [display, setDisplay] = useState<boolean>(false)

  useEffect(() => {
    if ((userPortfolioWeightings?.weightings.length || 0) > 0) {
      setDisplay(true)
    }
  }, [userPortfolioWeightings])


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
    data: userPortfolioWeightings?.weightings,
    series: [
      {
        type: "pie",
        labelKey: "01. symbol",
        angleKey: "12. proportion",
        radiusKey: "05. price",
        sectorLabelKey: "13. name",
        innerRadiusOffset: -25,
        innerRadiusRatio: 0.60,
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
              content: `Price: ${dollarFormatter.format(
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
        }
      }
    ]
  }


  return (
    (user?.displayName ?
      (
        <section>
          <h2>YOUR PORTFOLIO</h2>
          {display ?
            (<div>
              <AgChartsReact options={options} />
            </div>)
          :  <div></div>}

          <Portfolio />
        </section>
      ) : <div>You need to be logged in!</div>)
  )


}
export default PortfolioPage;