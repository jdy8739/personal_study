import React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Itodo, todoState, Categories } from "../todos";

const TodoItem = styled.li`
    margin: 5px;
    font-weight: bold;
    display: inline-block;
`;


function TodoElem({ text, category, id }: Itodo) {

    const setTodos = useSetRecoilState(todoState);

    const changeCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
        const { innerText }: any = e.currentTarget;

        setTodos((oldTodos) => {
            const targetIndex = oldTodos.findIndex(todo => todo.id === id);
            const targetTodo = oldTodos[targetIndex];
            const newTodos = [ ...oldTodos ];
            newTodos.splice(targetIndex, 1, { text: targetTodo.text, category: innerText, id: targetTodo.id });
            return newTodos;
        });
    };

    return (
        <>
            <TodoItem>{ text }</TodoItem>
            { category !== Categories.TO_DO && <button onClick={changeCategory}>TO_DO</button> }
            { category !== Categories.DONE && <button onClick={changeCategory}>DONE</button> }
            { category !== Categories.DOING && <button onClick={changeCategory}>DOING</button> }
        </>
    )
}

export default TodoElem;