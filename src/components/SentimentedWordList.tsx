import { useState, SyntheticEvent, useEffect } from 'react';
import { onePosition, sentiment } from './Score'
import { Box, Tabs, Tab } from '@mui/material'
import { Typography } from '@material-ui/core';
import SentimentedWord from './SentimentedWord';
import './SentimentedWordList.css'


interface sWLProps {
  words: sentiment[]
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {

  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const SentimentedWordList = ( props: sWLProps) => {

  console.log(props)

  const [value, setValue] = useState<number>(0);
  const [positiveList, setPositiveList] = useState<string[]>([])
  const [negativeList, setNegativeList] = useState<string[]>([])

  useEffect(() => {
    let pList = props.words
      .filter((word) => word.score_tag === 'P')
      .map((word) => word.text)
    let nList = props.words
      .filter((word) => word.score_tag === 'N')
      .map((word) => word.text)

    setPositiveList(pList)
    setNegativeList(nList)

  }, [props])

  let pkey_id = 0
  const positiveComponents = positiveList!.map((word) => {
      pkey_id++
      return (
        <li key={pkey_id}>
          <SentimentedWord
            word={word}
          ></SentimentedWord>
        </li>
      )
    }
  )

  let nkey_id = 0
  const negativeComponents = negativeList!.map((word) => {
      nkey_id++
      return (
        <li key={nkey_id}>
          <SentimentedWord
            word={word}
          ></SentimentedWord>
        </li>
      )
    }
  )

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Positive" {...a11yProps(0)} />
          <Tab label="Negative" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div className='sentimented-words-block'>
          {positiveComponents}
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <div className='sentimented-words-block'>
          {negativeComponents}
        </div>
      </TabPanel>
    </Box>
  );


}

export default SentimentedWordList;