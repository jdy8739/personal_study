import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Search from './components/Search';
import Tv from './components/Tv';
import './App.css';
import NavBar from './components/NavBar';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path='/search' element={ <Search /> } />
          <Route path='/tv' element={ <Tv /> } />
          <Route path='/' element={ <Home /> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
