/* eslint-warning */

import logo from './logo.svg';
import './App.css';
import { Container, Row, Col, Button, Navbar, Nav, Card } from 'react-bootstrap';
import products from './product';
import { Link, Route, Switch } from 'react-router-dom';
import { useHistory, useParams } from 'react-router-dom';

function App() {
  const red = { backgroundColor: 'red' };
  const pink = { backgroundColor: 'pink' };
  const green = { backgroundColor: 'green' };

  let history = useHistory();

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
          <div className='contatiner'>
            <div className='row'>
              <p style={ red } className='col-md-4'>x</p>
              <p style={ pink } className='col-md-4'>x</p>
              <p style={ green } className='col-md-4'>x</p>
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
          </div>
        </Route>
        <Route exact path='/detail/:id'> { /* component={Detail}> */ }
          <Detail products={products}/>
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


function Detail(props) {

  let history = useHistory();
  let { id } = useParams();

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <img src={ `https://codingapple1.github.io/shop/shoes${ parseInt(id) + 1 }.jpg` } width="100%" />
          </div>
          <div className="col-md-6 mt-4">
            <h4 className="pt-5">{ props.products[id].title }</h4>
            <p>{ props.products[id].content }</p>
            <p>{ props.products[id].price }</p>
            <button className="btn btn-danger">주문하기</button>
            &emsp;
            <button className="btn btn-danger" onClick={ () => { history.goBack(); } }>
              뒤로
            </button>
            &emsp;
            <button className="btn btn-danger" onClick={ () => { history.push('/products'); } }>
              모든 상품 보기
            </button> 
          </div>
        </div>
      </div> 
    </>
  )
}

export default App;
