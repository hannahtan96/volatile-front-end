import { Typography } from '@mui/material';

interface ErrorMessageProps {
  error: string
}

const ErrorMessage = (error: ErrorMessageProps) => {
  return (
    <Typography variant='subtitle2' color='gray' paddingBottom={1} sx={{ textAlign: 'center', fontStyle: 'italic' }}>{error.error}</Typography>
  )
}

export default ErrorMessage;