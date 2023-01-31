import { useState, MouseEvent } from 'react'
import { Popover, Typography } from '@mui/material'
import './CommonWord.css'

interface CommonWordProps {
  id: number
  color: string
  word: string
  frequency: number
}

const CommonWord = (props: CommonWordProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const backgroundColor = props.color

  return (
    <div>
      <Typography
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        sx={{ fontSize: 16, backgroundColor: {backgroundColor}, borderRadius: 1, padding: 0.3 }}
      >
        {props.word}
      </Typography>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1, fontSize: 10 }}>{props.frequency}</Typography>
      </Popover>
    </div>
  )

}

export default CommonWord;