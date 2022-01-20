import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider } from 'styled-components';

import { blackTheme, whiteTheme } from './theme';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={blackTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


