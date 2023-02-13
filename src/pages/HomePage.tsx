import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {

  return (
    <section className='p-20'>
      <Typography variant="h1" display="block" paddingTop={5} sx={{ fontFamily: 'serif', fontSize: 150, fontWeight: 900, color: 'lightgray', fontStyle: 'italic', letterSpacing: -1 }}>
        volatile:
      </Typography>

      <Typography variant="overline" display="block" paddingBottom={3} sx={{ fontSize: 14, letterSpacing: 2 }}>
        /ˈvälədl/ | adjective
      </Typography>

      <Typography variant="body2" display="block" sx={{ fontSize: 24, letterSpacing: 0 }}>
        1. Likely to change suddenly and unexpectedly, especially by getting worse
      </Typography>

      <Typography variant="body2" display="block" sx={{ fontSize: 24, letterSpacing: 0 }}>
        2. Likely to change emotional state very suddenly, especially by becoming angry
      </Typography>

      <Box border={1} p={5} m={10}>
        <Typography variant="body2" display="block" sx={{ fontFamily: 'serif', color: 'gray', fontSize: 24, fontWeight: 400, fontStyle: 'italic', letterSpacing: -0.5 }}>
          <Typography component='span' sx={{ fontFamily: 'serif', color: '#1976d2', fontWeight: 800, fontSize: 24 }}>Volatile </Typography>
          is an analytical tool that merges quantitative and qualitative analysis to derive a sentiment score of your overall stock portfolio.
        </Typography>

        <Button component={Link} to="/login">
          Login
        </Button>
        <Button component={Link} to="/register">
          Register
        </Button>

      </Box>

    </section>
  )


}
export default HomePage;