
import React from 'react';
import { Provider } from 'react-redux'
import './App.css';
import MainScreen from './MainScreen/MainScreen';
import Grid from '@mui/material/Grid';
import Topbar from './Topbar/Topbar';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import { Container } from '@mui/material';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';

const store = createStore(() => [], {}, applyMiddleware())

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
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
