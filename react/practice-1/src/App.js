import './App.css';
import Button from './components/Button';
import Coin from './components/Coin.js';

import { useState } from 'react';


function App() {

  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setTodos((currentArr) => [ ...currentArr, todo ]); //이게 어떻게 되지? <-- set 함수는 자동으로 콜백함수의 첫 인자에 자신의 state값을 넣는다.
    setTodo('');
  };

  const handleOnChange = (e) => {
    setTodo(e.target.value);
  };

  const deleteTodo = (idx) => {
    const copied = [...todos];
    copied.splice(idx, 1);
    setTodos(copied);
  };

  return (
    <div className="App">
      <p>todos length: { todos.length }</p>
      <form onSubmit={ handleOnSubmit }>
        <input onChange={ handleOnChange } value={ todo }/>
      </form>
      <ul>
        {
          todos.map((a, i) => {
            return (
              <li key={i} onDoubleClick={ () => { deleteTodo(i) } }>{ a }</li>
            )
          }) 
        }
      </ul>
      <Coin/>
    </div>
  );
}

export default App;
