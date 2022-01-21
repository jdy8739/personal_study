import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Coin from './routes/Coin';
import Coins from './routes/Coins';
import GlobalStyles from './ResetCss';
import { ReactQueryDevtools } from "react-query/devtools";

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
