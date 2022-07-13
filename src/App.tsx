
import MainScreen from './components/MainScreen/MainScreen';
import Topbar from './components/Topbar/Topbar';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import { Container, Typography } from '@mui/material';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';


const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#262D32',
      },
      secondary: {
        main: '#ccccc7',
      }
    },
  });

  return (
    <Router>
      <div className='App'>
        <ThemeProvider theme={theme}>
          <Topbar />
          <Container maxWidth="lg">
            <Routes>
              <Route path='/lists/:id' element={<MainScreen />} />
              <Route path='*' element={<Typography>Choose or create List!</Typography>} />
            </Routes>
          </Container>
        </ThemeProvider>
      </div>
    </Router>
  );
}

export default App;
