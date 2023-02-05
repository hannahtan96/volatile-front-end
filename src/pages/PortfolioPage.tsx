import React, { useState, useEffect } from 'react';
import { AgChartsReact } from 'ag-charts-react';
import { useContext } from 'react';
import { UserContextType } from "../types/user.type";
import { UserContext } from '../context/userContext';
import Portfolio from '../components/Portfolio';
import { getCurrUserPortfolio } from '../services/user.service';

interface Weights {
  ticker: string
  shares: number
  // weight:
}

const PortfolioPage = () => {

  const { user, userPortfolio } = useContext(UserContext) as UserContextType;

  const [weights, setWeightings] = useState<number>()

  useEffect(() => {

    if ((userPortfolio?.portfolio.length || 0) > 0) {
      calculateWeightings()
    }
  }, [userPortfolio])


  let percentage_option = {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }

  const percFormatter = new Intl.NumberFormat("en-US", percentage_option)
  const numFormatter = new Intl.NumberFormat("en-US");
  const colors = ["#75eab6", "#56a06c", "#ade64f", "#3d99ce", "#a7dcf9", "#aea2eb", "#fd95e8", "#f642d0", "#2af464", "#8f937f", "#dcd888", "#d6790b", "#fd5917", "#ffb4a2", "#fe707d", "#f4d403"]

  const calculateWeightings = () => {
    let weighted_total = 0;
    let total_weight = 0;
    let port = userPortfolio!.portfolio
    for (let i = 0; i < port.length; i += 1) {
      weighted_total += port[i].shares
      //  * port[i].sentiment;
      total_weight += port[i].shares
    }
    setWeightings(100 * (weighted_total / total_weight));
  }

  console.log(userPortfolio?.portfolio)
  const options = {
    data: userPortfolio?.portfolio,
    series: [
      {
        type: "pie",
        labelKey: "ticker",
        angleKey: "shares",
        sectorLabelKey: "ticker",
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
          formatter: ({ datum, sectorLabelKey }: any) => {
            const value = datum[sectorLabelKey];
            return percFormatter.format(value/100);
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
          {userPortfolio?.user ? <AgChartsReact options={options} /> : ""}
          <Portfolio />
        </section>
      ) : <div>You need to be logged in!</div>)
  )


}
export default PortfolioPage;