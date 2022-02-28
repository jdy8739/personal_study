const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');

const todoInput = todoForm.querySelector('input');

const TODO_LENGTH_LIMIT = 10;

function makeList(newTodo) {
    const li = document.createElement('li');
    li.id = newTodo.id;

    const span = document.createElement('span');
    const delBtn = document.createElement('button');
    
    delBtn.innerText = 'X';
    span.innerText = newTodo.text;

    delBtn.addEventListener('click', delTodo);
    span.addEventListener('dblclick', modifyTodo);

    li.appendChild(span);
    li.appendChild(delBtn);
    todoList.appendChild(li);
};

function delTodo(event) {
    //console.dir(event.target.parentElement.innerText)
    const li = event.target.parentElement ;
    //parentNode와 parentElement의 차이?

    todos = todos.filter((todo) => todo.id != li.id);

    saveInLocalStore(todos);
    li.remove();
}

function modifyTodo(event) {
    const word = event.target.innerText;

    const li = event.target.parentNode;
    li.childNodes[0].style.visibility = 'hidden';
    li.childNodes[1].style.visibility = 'hidden';

    const modiForm = document.createElement('form')
    const modiInput = document.createElement('input');
    modiInput.value = word;
    modiInput.required = true;

    const modiBtn = document.createElement('button');
    modiBtn.innerText = '수정';

    modiForm.addEventListener('submit', modiText);

    modiForm.append(modiInput);
    modiForm.append(modiBtn);

    const cancelBtn = document.createElement('button');
    cancelBtn.addEventListener('click', cancelModi);
    cancelBtn.innerText = '취소'

    modiForm.append(cancelBtn);
    
    li.prepend(modiForm);
};

function modiText(event) {
    event.preventDefault();
    const value = event.target.childNodes[0].value;
    const li = event.target.parentNode;

    li.childNodes[1].style.visibility = 'visible';
    li.childNodes[2].style.visibility = 'visible';

    const preText = li.childNodes[1].innerText;
    const targetIndex = todos.findIndex(v => v.text == preText);

    todos[targetIndex].text = value;
    saveInLocalStore(todos);

    li.childNodes[1].innerText = value;

    li.removeChild(li.childNodes[0]);
};

function cancelModi(event) {
    event.preventDefault();
    const li = event.target.parentNode.parentNode;
    
    li.removeChild(li.childNodes[0]);
  
    li.childNodes[0].style.visibility = 'visible';
    li.childNodes[1].style.visibility = 'visible';
};

function handleTodoSubmit(event) {
    event.preventDefault();

    if(checkTodoLengthMoreThanLimit()) {
        if(askDeleteFirstTodo()) deleteFirstTodo();
        else return;
    }

    const value = todoInput.value;

    const todoObj = { id: Date.now(), text: value };
    todos.push(todoObj);
    saveInLocalStore(todos);
    todoInput.value = '';
    makeList(todoObj);
};

todoForm.addEventListener('submit', handleTodoSubmit);

let todos = [];

function saveInLocalStore(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
};

const savedTodo = localStorage.getItem('todos');

if(savedTodo !== null) {
    todos = JSON.parse(savedTodo); //const는 재초기화 불가
    todos.forEach(makeList);
    showTodoList();
};

function showTodoList() {
    const list = JSON.parse(savedTodo);

    list.forEach(item => console.log(`this item is ${item}`)); // ()를 안붙임
};

function sayHello(item) { //item을 자동으로 줌
    console.log(`this is the turn of ${item}`);
};

function checkTodoLengthMoreThanLimit() {
    if(todos.length >= TODO_LENGTH_LIMIT) {
        return true;
    } else return false;
};

const askDeleteFirstTodo = () => {
    const askDeleteFirstTodo = confirm(
        "To-do's length is beyond the limit. Will you delete first to-do?"
    );
    return askDeleteFirstTodo;
};

const deleteFirstTodo = () => {
    todos.shift();
    saveInLocalStore(todos);
    todoList.childNodes[0].remove();
};

