import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { arr, ITodo } from "../atoms";
import Card from "./Card";

interface IBoardFormProps {
    isDraggingOver: boolean, 
    isDraggingFrom: boolean
}

const BoardForm = styled.div<IBoardFormProps>`
  color: white;
  transition: all 1s;
  background-color: ${ props => props.isDraggingOver ? 'pink' : props.isDraggingFrom ? 'teal' : 'rgb(236, 236, 236)' };
  width: 250px;
  min-height: 200px;
  margin: auto 8px;
  padding: 12px;
`;

function Board({ todos, id }: { todos: ITodo[], id: string }) {

    const [ newTodoText, setNewTodoText ] = useState('');

    const addNewTodoElem = useSetRecoilState(arr);

    const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
        setNewTodoText(e.currentTarget.value);
    };

    const addNewTodo = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!newTodoText) return;
        addNewTodoElem((oldTodos) => {
            const copied = [...oldTodos[id]];
            copied.splice(copied.length, 0, { todo: newTodoText, id: Date.now() });
            return { ...oldTodos, [id]: copied };
        });
        setNewTodoText('');
    };

    return (
        <>  
            <Droppable droppableId={ id }>
                {
                (provided, effect) =>
                <BoardForm 
                ref={provided.innerRef} 
                {...provided.droppableProps} 
                isDraggingOver={ effect.isDraggingOver }
                isDraggingFrom={ Boolean(effect.draggingFromThisWith) }
                >   
                    <div style={{ color: 'black', textAlign: 'center', marginBottom: '15px' }}>
                        <h3>{ id }</h3>
                        <form onSubmit={addNewTodo}>
                            <input 
                            placeholder={`Input new ${ id }.`} 
                            onChange={ handleOnChange } 
                            value={ newTodoText }
                            required
                            />
                            &ensp;
                            <button type="submit">ADD</button>
                        </form>
                    </div>
                    {
                        todos.map((item, index) => {
                            return (
                            <Card item={ item.todo } id={ item.id } index={ index } key={ index } subject={ id }/>
                            )
                        })
                    }
                    { provided.placeholder }
                </BoardForm>
                }
            </Droppable>
        </>
    )
}

export default Board;