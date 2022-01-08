/* eslint-disable */

import logo from './logo.svg';
import './App.css';
import { Navbar, Container, DropdownButton, Dropdown, Button } from 'react-bootstrap';
import products from './products';
import React, { memo, useEffect, useState, lazy, Suspense } from 'react';
import axios from 'axios';

import { useHistory } from 'react-router-dom';

import { Link, Route, Switch } from 'react-router-dom';

import styled from 'styled-components';

// import Detail from './Components/Detail.js';
// import Cart from './Components/Cart';
// import AgeCalculator from './Components/AgeCalcul.js';

let Detail = lazy(() => { return import('./Components/Detail.js') });
let Cart = lazy(() => { return import('./Components/Cart.js') });
let AgeCalculator = lazy(() => { return import('./Components/AgeCalcul.js') });

export let manuDateContext = React.createContext();


const ShowMoreBtn = styled.button`
  padding: 8px;
  border: none;
  border-radius: 10px;
`;

function App() {

  useEffect(() => {

  }, [  ]); 

  let [ productsData, prodAlter ] = useState(products);

  let [ productStock, stockAlter ] = useState([ 11, 24, 17 ]);

  let [ manufacturedDate, alterManuDate ] = useState(['2021', '2020', '2022']);

  function getMoreProducts() {
    axios.get('https://codingapple1.github.io/shop/data2.json')
      .then((res) => {
        
        const addedProducts = [ ...productsData, ...res.data ];
        prodAlter(addedProducts);
      })
      .catch(err => {
        console.log(err);
      });
  }
    
  return (
    <div className="App">
      <>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">
              <img
                alt=""
                src="/logo.svg"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{' '}
            React Bootstrap
            </Navbar.Brand>
          </Container>
        </Navbar>
        <div className='jumbotron'>
          <h1>20% Season Off</h1>
          <div className='grey-bg'>
            <p>
              "It is a period of civil war. Rebel spaceships, striking from a hidden base, 
              have won their first victory against the evil Galactic Empire. During the battle, 
              Rebel spies managed to steal secret plans to the Empire’s ultimate weapon, 
              the DEATH STAR, an armoured space station with enough power to destroy an entire planet. 
            </p>
          </div>
          <div>
            <DropdownButton id="dropdown-basic-button" title="Dropdown button" style={{ display: 'inline-block', marginRight: '20px' }}>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </DropdownButton>
            <button style={ { color: 'white' } }><Link to="/detail/0">detail</Link></button>
          </div>
        </div>
        <Route exact path="/">
          <br></br>
          <div className='container'>
            <div className='row'>
              {
                productsData.map((item, i) => {
                  return (
                    <ProductList key={i} item={item}></ProductList>
                  )
                })
              }
            </div>
            <ShowMoreBtn className='mt-5' onClick={ getMoreProducts }>Show More</ShowMoreBtn>
          </div>
        </Route>
        <manuDateContext.Provider value={ manufacturedDate }>
          <Route path="/detail/:id">
            <Suspense fallback={ <div>로딩중...</div> }>
              <Detail shoes={ productsData } productStock={ productStock } stockAlter={ stockAlter }></Detail>
            </Suspense>
          </Route>
        </manuDateContext.Provider>
        <Route exact path="/cart">
          <Suspense fallback={ <div>로딩중...</div> }>
            <Cart/>
          </Suspense>
        </Route>
        <Route exact path="/calc_age">
          <Suspense fallback={ <div>로딩중...</div> }>
            <AgeCalculator/>
          </Suspense>
        </Route>
        <Parent a={'a'} b={'b'}></Parent> { /* 여기서 props를 하나라도 변경하면 props가 바뀌지않는 하위 컴포넌트도 전부 재렌더링됨. */ }
      </>
    </div>
  );
}



function ProductList(props) {
  const product = props.item

  let history = useHistory();

  return (
    <div className='col-md-4' onClick={ () => { history.push(`/detail/${ product.id }`) } }>
      <div className='card product-box'>
        <img src={ product.imgSrc }></img>
        <p>{ product.title }&emsp;<span>{ product.price }</span></p>
        <p>{ product.content }</p>
      </div>
    </div>
  );
}


const Parent = function(props) {
  return (
    <>
      <Child1 a={props.a}></Child1>
      <Child2 b={props.b}></Child2>
    </>
  )
};

const Child1 = memo(function(props) { //memo로 감싸면 실제 이 컴포넌트가 받는 props의 값이 변경될 때만 재렌더링됨.

  useEffect(() => {
    console.log(props.a)
  });

  return (
    <div>{props.a}</div>
  )
});

const Child2 = memo(function(props) {

  useEffect(() => {
    console.log(props.b)
  });

  return (
    <div>{props.b}</div>
  )
});






export default App;
