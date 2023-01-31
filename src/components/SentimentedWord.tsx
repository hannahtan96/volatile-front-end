import { useState, MouseEvent } from 'react'
import { Typography } from '@mui/material'
import './SentimentedWord.css'

interface SentimentedWordProps {
  word: string
}

const SentimentedWord = (props: SentimentedWordProps) => {

  return (
    <div>
      <Typography
        sx={{ backgroundColor: 'lightgray', fontSize: 16, borderRadius: 1, padding: 0.3 }}
      >
        {props.word}
      </Typography>
    </div>
  )

}

export default SentimentedWord;