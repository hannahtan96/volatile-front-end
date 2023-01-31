// import * as yF from 'yahoo-finance';
// import yahooFinance from 'yahoo-finance';
import { useForm } from "react-hook-form";
import { useState, ChangeEvent } from "react";

type FormInputs = {
  ticker: string
  shares: number
}


const Portfolio = () => {

  const [inputList, setInputList] = useState([{ ticker: "", shares: 0 }]);

  // handle input change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index: number) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { ticker: "", shares: 0 }]);
  };

  return (
    <div>
      {inputList.map((x, i) => {
        return (
          <div className="box">
            <input
              name="ticker"
              placeholder="Enter Ticker"
              value={x.ticker}
              onChange={e => handleInputChange(e, i)}
            />
            <input
              className="ml10"
              name="shares"
              placeholder="Enter Number of Shares"
              value={x.shares}
              onChange={e => handleInputChange(e, i)}
            />
            <div className="btn-box">
              {inputList.length !== 1 && <button
                className="mr10"
                onClick={() => handleRemoveClick(i)}>Remove</button>}
              {inputList.length - 1 === i && <button onClick={handleAddClick}>Add</button>}
            </div>
          </div>
        );
      })}
      <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>
    </div>
  );
}

export default Portfolio;