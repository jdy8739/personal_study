import React, { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { arr, ITodo } from "../atoms";
import Card from "./Card";

interface IBoardFormProps {
    isDraggingOver: boolean, 
    isDraggingFrom: boolean
}

const BoardHeader = styled.div`
    color: black;
    text-align: center; 
    margin-bottom: 15px;
    position: relative;
`;

const BoardForm = styled.div<IBoardFormProps>`
  color: white;
  transition: all 1s;
  background-color: ${ props => props.isDraggingOver ? 'pink' : props.isDraggingFrom ? 'teal' : 'rgb(236, 236, 236)' };
  width: 250px;
  min-height: 200px;
  margin: 8px;
  padding: 12px;
`;

function Board({ todos, id, index }: { todos: ITodo[], id: string, index: number }) {

    const [ newTodoText, setNewTodoText ] = useState('');

    const addNewTodoElem = useSetRecoilState(arr);

    const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
        setNewTodoText(e.currentTarget.value);
    };

    const handleOnClick = (id: string) => {
        let reallyDeleteThisBoard = confirm('Are you surely going to delete this board?');
        if(!reallyDeleteThisBoard) return;
        addNewTodoElem((oldTodos) => {
            const copied = { ...oldTodos };
            delete copied[id];
            return copied;
        });
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
            <Draggable draggableId={ id + '' } index={ index } key={ id + '' }>
                {
                    (provided) =>        
                    <div 
                    ref={provided.innerRef} 
                    { ...provided.dragHandleProps }
                    { ...provided.draggableProps }
                    >
                        <Droppable 
                        droppableId={ id }
                        type={ true ? 'active' : 'none' }
                        >
                            {
                                (provided, effect) =>
                                <BoardForm 
                                ref={provided.innerRef} 
                                {...provided.droppableProps} 
                                isDraggingOver={ effect.isDraggingOver }
                                isDraggingFrom={ Boolean(effect.draggingFromThisWith) }
                                >   
                                    <BoardHeader>
                                        <button 
                                        style={{ right: '10px', top: '-10px', position: 'absolute' }}
                                        onClick={() => { handleOnClick(id) }}
                                        >x</button>
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
                                    </BoardHeader>
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
                    </div>
                }
            </Draggable>
        </>
    )
}

export default React.memo(Board);