import { BrowserRouter, Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './routes/Home.js';
import Detail from './routes/Detail';


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/detail/:id">
            <Detail/>
          </Route>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
      </BrowserRouter>
      {/* url이 단순할수록 아래로 */}
    </div>
  );
}

export default App;
