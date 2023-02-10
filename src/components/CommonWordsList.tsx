import { useState, useEffect } from 'react';
import * as d3 from "d3";
import CommonWord from './CommonWord';
import './CommonWordsList.css'
import { Box, Tab } from '@mui/material';

interface Word {
  [key: string]: number;
}

const CommonWordsList = (props: Word) => {

  const [q1, setQ1] = useState<number>()
  const [q2, setQ2] = useState<number>()
  const [q3, setQ3] = useState<number>()
  const [keyArray, setKeyArray] = useState<[string, number][]>([])


  useEffect(() => {
    console.log(props)
    const keyArray = Object.entries(props)
      .filter((word) => {return (bannedWords.indexOf(word[0]) === -1 ? true : false)})
      // .map(([o_key, o_val]) => [o_key.replace(/[^\w\s]/gi, ""), o_val])
    const freqArray = keyArray.map((item) => item[1]);
    setQ1(d3.quantile(freqArray, 0.25) || 0)
    setQ2(d3.quantile(freqArray, 0.50) || 0)
    setQ3(d3.quantile(freqArray, 0.75) || 0)
    setKeyArray(keyArray)
  }, [props])

  const color = (freq: number) => {
    console.log(q1, q2, q3)
    if (freq <= q1!) {
      return '#caf0f8'
    } else if (freq <= q2!) {
      return '#90e0ef'
    } else if (freq <= q3!) {
      return '#00b4d8'
    } else {
      return '#0077b6'
    }
  }


  const bannedWords = ['SO','MY',"I'M",'ME','WHAT','WHERE','HOW','WHILE','TOO','MORE','AS','US','THEY','FOR','CAN','SEE','ABOUT','OUR','COULD','BUT','THEN','IF','IT','TO','WHICH','HER','HIM','HAS','SINCE','BETWEEN','BEFORE','IN','THE','AN','A','ITS','OF','THIS','AND','AT','THERE','SHE','HE','HAVE','FROM','BEEN','IS','I','YOU','THAT','WAS','ON','ARE','WITH','BE','OR','HAD','BY','NOT','MOST']
  let key_id = 0


  const commonWordsComponent = keyArray
    .sort((a, b) => a[1] < b[1] ? 1 : -1)

    .map((word) => {
      key_id++
      return (
        <li key={key_id}>
          <CommonWord
            id={key_id}
            color={color(word[1])}
            word={word[0]}
            frequency={word[1]}
          ></CommonWord>
        </li>
      )
    }
  )


  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tab label="KEYWORDS" />
      </Box>
      <ul id='common-words-block'>{commonWordsComponent}</ul>
    </div>
  );


}

export default CommonWordsList;