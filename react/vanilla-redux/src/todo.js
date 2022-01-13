//redux로 만든 todo

import { createStore } from "redux";

const body = document.querySelector('body');
const todoForm = document.createElement('form');
const todoInput = document.createElement('input');
const todoList = document.createElement('ul');

todoForm.append(todoInput);
body.append(todoForm);
body.append(todoList);

todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  todoStore.dispatch({ type: 'PUT_NEW_TODO', data: todoInput.value });
  todoInput.value = '';
});

const todoReducer = (state = [], action) => {
  switch (action.type) {
    case 'PUT_NEW_TODO':
      const newTodo = action.data;
      addTodo(newTodo);
      return [...state, newTodo];
    
    case 'DEL_TODO':
      const delIdx = action.data;
      const copied = [...state];
      copied.splice(delIdx, 1); //filter를 쓰는 로직도 가능.
      return copied;
  }
};

const todoStore = createStore(todoReducer);

todoStore.subscribe(() => { 
  console.log('now state: ' + todoStore.getState());
});


function addTodo(newTodo) {
  const li = document.createElement('li');
  li.innerText = newTodo;
  li.className = Date.now();

  const delBtn = document.createElement('button');
  delBtn.innerText = 'DEL';

  delBtn.addEventListener('click', delTodo);

  li.appendChild(delBtn);
  todoList.appendChild(li);
};

function delTodo(e) {
  const idToDel = e.target.parentNode.className;
  const todoListArr = todoList.querySelectorAll('li');
  const delIdx = Array.from(todoListArr).findIndex(todo => todo.className === idToDel);
  todoListArr[delIdx].remove();

  todoStore.dispatch({ type: 'DEL_TODO', data: delIdx });
}



// reducer로 state + - 시키기.

// const plus = document.getElementById('plus');
// const minus = document.getElementById('minus');
// const number = document.querySelector('span');

// number.innerText = 0;

// const ADD = 'ADD';
// const MINUS = 'MINUS';

// const reducer = (state = 0, action) => {
//   switch(action.type) {
//     case ADD:
//       return state + 1;
//     case MINUS:
//       return state - 1;
//   }
// };

// const store = createStore(reducer);

// plus.addEventListener('click', addNumber);
// minus.addEventListener('click', minusNumber);

// console.log(store.getState());
// store.subscribe(showNumber);

// function addNumber() {
//   store.dispatch({ type: ADD });
// }

// function minusNumber() {
//   store.dispatch({ type: MINUS });
// }

// function showNumber() {
//   console.log(store.getState());
//   number.innerText = store.getState();
// }



// 옛날 방식 예시
// let count = 0;

// number.innerText = count;

// plus.addEventListener('click', () => {
//   count ++;
//   updateFn();
// });

// minus.addEventListener('click', () => {
//   count --;
//   updateFn();
// });

// const updateFn = function() {
//   number.innerText = count;
// };