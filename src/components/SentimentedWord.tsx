import { Typography } from '@mui/material'
import './SentimentedWord.css'

interface SentimentedWordProps {
  word: string
}

const SentimentedWord = (props: SentimentedWordProps) => {

  return (
      <Typography component={'span'}
        sx={{ backgroundColor: 'lightgray', fontSize: 16, borderRadius: 1, padding: 0.3 }}
      >
        {props.word}
      </Typography>
  )

}

export default SentimentedWord;