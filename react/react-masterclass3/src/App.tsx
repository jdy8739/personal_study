import React from 'react';
import { GlobalStyles } from './resetCss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignupForm from './SignupForm';
import Todo from './routes/Todo';
import { ThemeProvider } from 'styled-components';
import { blackTheme, whiteTheme } from './theme';

function App() {
  return (
    <>
      <ThemeProvider theme={ blackTheme }>
        <GlobalStyles/>
        <div className="App">
          <BrowserRouter>
            <Switch>
              <Route path='/to-do'>
                <Todo/>
              </Route>
              <Route path='/'>
                <SignupForm/>
              </Route>
            </Switch>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
