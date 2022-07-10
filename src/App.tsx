
import React from 'react';
import './App.css';
import MainScreen from './components/MainScreen/MainScreen';
import Topbar from './components/Topbar/Topbar';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import { Container } from '@mui/material';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';


const App = () => {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#262D32',
      },
      secondary: {
        main: '#ccccc7',
      },
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
            </Routes>
          </Container>
        </ThemeProvider>
      </div>
    </Router>
  );
}

export default App;
