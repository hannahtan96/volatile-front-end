import { useState, useEffect } from 'react';
import * as d3 from "d3";
import CommonWord from './CommonWord';
import './CommonWordsList.css'
import { Box, Tab, Typography } from '@mui/material';
import { fontSize } from '@mui/system';

interface Word {
  [key: string]: number;
}

const CommonWordsList = (props: Word) => {

  const [q1, setQ1] = useState<number>()
  const [q2, setQ2] = useState<number>()
  const [q3, setQ3] = useState<number>()
  const [keyArray, setKeyArray] = useState<[string, number][]>([])

  useEffect(() => {

    const keyArray = Object.entries(props)
      .filter((word) => {return (bannedWords.indexOf(word[0]) === -1 ? true : false)})
      .filter((item) => item[1] !== 1)

    const freqArray = keyArray
      .map((item) => item[1]);

    setQ1(d3.quantile(freqArray, 0.25) || 0)
    setQ2(d3.quantile(freqArray, 0.50) || 0)
    setQ3(d3.quantile(freqArray, 0.75) || 0)
    setKeyArray(keyArray)

  }, [props])

  const color = (freq: number) => {
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

  const bannedWords = ['THE','A','AN','HE','HIM','HIS','I','MY','ME','SHE','HER','HERS','WE','OUR','THEY','US',
  'THEM','THEIRS','THEIR','EVERY','EVER','ANY','ANYONE','ANYWHERE','HAS','HAD','HAVE','TOO','IS', 'IN','OFF',
  'WAS','WERE','WILL','BE','SO','AND','OUR','COULD','SHOULD','WOULD','BY','FROM','FOR','NOT','ARE','THIS','THAT',
  'IT','ITS','TO','WITH','ARE','WHO','WHERE','WHY','WHILE','WHAT','WHICH','WHEN','HOW','AS','ON','ABOUT','IF',
  'OF','HOWEVER','BUT','ONE','TWO','THREE','DOES','DO','BEEN','SUCH','MUCH','MANY','MOST','YOU','YOUR','YOURS',
  'SOME','OVER','AT','MORE','SAID']
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
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tab label="KEYWORDS" />
      </Box>
      <Box p={3} sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', gap: '3px' }}>
        {commonWordsComponent}
      </Box>
    </Box>
  );
}

export default CommonWordsList;