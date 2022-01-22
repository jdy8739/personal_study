import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Coin from './routes/Coin';
import Coins from './routes/Coins';
import GlobalStyles from './ResetCss';
import { ReactQueryDevtools } from "react-query/devtools";
import { ThemeProvider } from 'styled-components';
import { blackTheme, whiteTheme } from './theme';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from './atoms';

function App() {

  const isDark = useRecoilValue(isDarkAtom);
  
  return (
    <>
      <ThemeProvider theme={ isDark ? blackTheme : whiteTheme }>
        <GlobalStyles/>
        <div className="App">
          <BrowserRouter>
            <Switch>
              <Route path='/detail/:coinId'>
                <Coins/>
              </Route>
              <Route path='/'>
                <Coin/>
              </Route>
            </Switch>
          </BrowserRouter>
          <ReactQueryDevtools/>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
