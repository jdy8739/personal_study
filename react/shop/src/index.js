import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom'; //외부 라이브러리라 경로 x, HashRouter도 쓸 수 있음(안전한 라우팅)
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';

const defState =  //길면 다른 파일에 reducer.js라는 이름으로 빼야함
  [
    {
      name: 'AK-5',
      quantity: 28,
      size: '12inch'
    },
    {
      name: 'Suan 337',
      quantity: 24,
      size: '18inch'
    }
  ];

function reducer(state = defState, action) { //reducer에 if else 말고 switch를 써도됨.

  if(action.type === 'quantityIncrease') {
    const idx = action.payload.num;
    let copied = [...state];
    copied[idx].quantity ++;
    return copied;

  } else if(action.type === 'quantityDecrease') {
    const idx = action.payload.num;
    let copied = [...state];
    copied[idx].quantity --;

    if(copied[idx].quantity <= 0) copied.splice(idx, 1);
    return copied;

  } else if(action.type === 'addQuantity') {
    const added = action.payload;
    let copied = [...state];

    let a = false;
    copied.forEach(function(item, i, o) { //findIndex 써서 -1나오면 else 처리하는것도 괜찮을듯. 
      if(item.name === added.name) {
        item.quantity ++;
        a = true;
      }
    });

    if(a) return copied;

    copied.push(added);
    return copied;
  }
  else return state;
};


const isAlertShown = true;

function alertReducer(state = isAlertShown, action) {

  if(action.type === 'hideAlert') {
    return !isAlertShown;
  } 
  else return state;
}

const store = createStore(combineReducers({ reducer, alertReducer }));
  


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
