/* eslint-disable */

import logo from './logo.svg';
import './App.css';
import { Navbar, Container, DropdownButton, Dropdown, Button } from 'react-bootstrap';
import products from './products';
import { useState } from 'react';

import { Detail } from './Components/Detail.js';
import { useHistory } from 'react-router-dom';

import { Link, Route, Switch } from 'react-router-dom';

function App() {

  let [ productsData, prodAlter ] = useState(products);
    
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
          </div>
        </Route>
        <Route path="/detail/:id">
          <Detail shoes={ productsData }></Detail>
        </Route>
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
export default App;
