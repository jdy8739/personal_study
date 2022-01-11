/* eslint-warning */

import logo from './logo.svg';
import './App.css';
import { Container, Row, Col, Button, Navbar, Nav, Card, Table } from 'react-bootstrap';
import importedProducts from './product';
import { Link, Route, Switch } from 'react-router-dom';
import { useHistory, useParams } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { CSSTransition } from 'react-transition-group';

import { connect } from 'react-redux';

import Cart from './Cart.js';
import AboutUs from './AboutUs';

const stockContext = React.createContext();

function App(props) {
  const red = { backgroundColor: 'red' };
  const pink = { backgroundColor: 'pink' };
  const green = { backgroundColor: 'green' };

  const productStock = [30, 40, 25, 22, 44, 38, 29];

  const [products, altProducts] = useState(importedProducts);
  const [stock, altStock] = useState(productStock);

  let history = useHistory();

  function highToLowAlign() {
    const aligned = [...products].sort(function(a, b) {
      return b.price - a.price;
    });

    altProducts(aligned);
  }

  function lowToHighAlign() {
    const aligned = [...products].sort(function(a, b) {
      return a.price - b.price;
    });

    altProducts(aligned);
  }

  function reset() {
    altProducts(importedProducts);
  }

  function showMoreProducts() {
    axios.get('https://codingapple1.github.io/shop/data2.json')
      .then((res) => {
        altProducts([...products, ...res.data]);
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <Switch>
      <div className="App">
        <Navbar bg="primary" variant="dark">
          <Container>
          <Navbar.Brand href="#/">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#/">Home</Nav.Link>
            <Nav.Link href="#/products">Products</Nav.Link>
            <Nav.Link href="#/about_us">About us</Nav.Link>
            <Nav.Link href="#/cart">Cart</Nav.Link>
          </Nav>
          </Container>
        </Navbar>
        <Card className="text-center">
          <Card.Header>Featured</Card.Header>
          <Card.Body>
            <Card.Title>Special title treatment</Card.Title>
            <Card.Text>
              With supporting text below as a natural lead-in to additional content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
          <Card.Footer className="text-muted">2 days ago</Card.Footer>
        </Card>
        <Route exact path='/'>
          <div>This is a Main Page.</div>
        </Route>
        <Route exact path='/products'>
          <div className='container'>
            <div className='row'>
              <p style={ red } className='col-md-4' onClick={ highToLowAlign }>High to Low</p>
              <p style={ pink } className='col-md-4' onClick={ lowToHighAlign }>Low to High</p>
              <p style={ green } className='col-md-4' onClick={ reset }>Reset</p>
            </div>
            <div className='row'>
              {
                products.map((item, i) => {
                  return (
                    <div key={i} className="col-md-3">
                      <Product product={item}></Product>
                    </div>
                  );
                })
              }
            </div>
            <Button variant="primary" className='mt-5' onClick={ showMoreProducts }>상품 더보기</Button>
          </div>
        </Route>
        <Route exact path='/detail/:id'> { /* component={Detail}> */ }
          
          <stockContext.Provider value={stock}>
            <Detail products={products} stock={stock} altStock={altStock}/>
          </stockContext.Provider>

        </Route>

        <Route path='/cart'>
          <Cart/>
        </Route>

        <Route path='/about_us'>
          <AboutUs/>
        </Route>
      </div>
    </Switch>
  );
}


function Product(props) {

  let history = useHistory();
  const idx = props.product.id;

  return (
    <>
      <div onClick={ () => { history.push(`/detail/${ idx }`) } }>
        <img src={ `https://codingapple1.github.io/shop/shoes${ idx + 1 }.jpg` } width="100%" />
        <h4>{ props.product.title }</h4>
        <p>{ props.product.content } & { props.product.price }</p>
      </div>
    </>
  )
}


let AlertBox = styled.div`
  background-color: rgb(255, 0, 0, 0.15);
  width: 100%;
  height: 60px;
  border-radius: 10px;
  color: red;
  display: flex;
  align-items: center;
  justify-content: center;
`;


function Detail(props) {

  useEffect(() => {
    const offAlertBox = setTimeout(() => {
      alterisAlertShown(false);
    }, 5000);

    return () => { 
      console.log('Component destroyed!');
      clearTimeout(offAlertBox);
    };
  }, [  ]);

  const [isAlertShown, alterisAlertShown] = useState(true);

  let history = useHistory();
  let { id } = useParams();

  function subStock() {
    const subedStock = [...props.stock];
    subedStock[id] --;
    props.altStock(subedStock);
  }

  const [tabNumber, altTabNumber] = useState(0);
  const [change, altChange] = useState(false);

  return (
    <>
      <div className="container">
        { 
          isAlertShown ?
          <AlertBox className='mt-3'>
            About to Sold Out!
          </AlertBox>
          : null
        }
        <div className="row">
          <div className="col-md-6">
            <img src={ `https://codingapple1.github.io/shop/shoes${ parseInt(id) + 1 }.jpg` } width="100%" />
          </div>
          <div className="col-md-6 mt-4">
            <h4 className="pt-5">{ props.products[id].title }</h4>
            <p>{ props.products[id].content }</p>
            <p>{ props.products[id].price }</p>
            <button className="btn btn-danger" onClick={ subStock }>주문하기</button>
            &emsp;
            <button className="btn btn-danger" onClick={ () => { history.goBack(); } }>
              뒤로
            </button>
            &emsp;
            <button className="btn btn-danger" onClick={ () => { history.push('/products'); } }>
              모든 상품 보기
            </button>
            <Stock stock={props.stock[id]} id={id}/>
          </div>
        </div>
      </div>
      <Nav fill variant="tabs" defaultActiveKey="/">
        {
          [1, 2, 3].map((a, i) => {
            return (       
              <div key={ i }>
                <Nav.Item>
                  <Nav.Link eventKey={ `eventKey-${ i }` } onClick={ () => { altTabNumber(i); altChange(false); } }>{ a }</Nav.Link>
                </Nav.Item>
              </div>
            )
          })
        }
      </Nav>
      <CSSTransition in={ change } classNames='pop' timeout = { 1000 }>
        <TabContent tabNumber={ tabNumber } altChange={ altChange }/>
      </CSSTransition>
    </>
  )
}


function TabContent(props) {

  useEffect(function() {
    props.altChange(true);
  });

  if(props.tabNumber === 0) {
    return (
      <>
        <p>Content 0</p>
      </>
    )
  }
  if(props.tabNumber === 1) {
    return (
      <>
        <p>Content 1</p>
      </>
    )
  }
  if(props.tabNumber === 2) {
    return (
      <>
        <p>Content 2</p>
      </>
    )
  }
}


function Stock(props) {
  
  const stock = useContext(stockContext);

  return (
    <>
      <p className='mt-5'>남은 재고 { props.stock }개</p>
      <p>useContext로 전송한 재고 { stock[props.id] }</p>
    </>
  )
}


export default App;
export { AlertBox };