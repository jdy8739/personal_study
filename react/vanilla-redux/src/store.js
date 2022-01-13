import { createStore } from "redux";

const ADD = 'ADD';
const DEL = 'DEL';

const addTodo = text => {
    return { type: ADD, text: text };
};

const delTodo = id => {
    return { type: DEL, id: id };
}

let TODO_LIST = localStorage.getItem('todo-list');
if(TODO_LIST === null) {
    TODO_LIST = [];
} else TODO_LIST = JSON.parse(TODO_LIST);

const reducer = (state = TODO_LIST, action) => {
    switch (action.type) {
        case ADD:
            const newTodo = { text: action.text, id: Date.now() };

            TODO_LIST.push(newTodo); 
            localStorage.setItem('todo-list', JSON.stringify(TODO_LIST));
            
            return TODO_LIST;
        case DEL:
            const id = action.id;

            const copied = state.filter(item => item.id !== id);
            TODO_LIST = [...copied];
            localStorage.setItem('todo-list', JSON.stringify(TODO_LIST));

            return copied;
        default:
            return state;
    }
};

const store = createStore(reducer);

export const actionCreators = { addTodo, delTodo };

export default store;

