import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const NotLoggedInLinks = () => {

  const preventDefault = (event: React.SyntheticEvent) => event.preventDefault();

  return (

    <Box p={5}>

      <Typography variant="body2" display="block" sx={{ fontSize: 24, letterSpacing: 0 }}>
        You're not logged in.
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          typography: 'body1'
        }}
        onClick={preventDefault}
      >
        <Button component={Link} to="/login">
          Login
        </Button>
        <Button component={Link} to="/register">
          Register
        </Button>
      </Box>

    </Box>
  )
}

export default NotLoggedInLinks;