import React from 'react';
import { RecoilRoot } from 'recoil';
import TodoList from './components/TodoList';
import LoginForm from './components/LoginForm';

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <TodoList />
        {/* <LoginForm /> */}
      </RecoilRoot>
    </div>
  );
}

export default App;
