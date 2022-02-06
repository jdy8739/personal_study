import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { arr, ITodoList } from "../atoms";

const CardForm = styled.div<{ isDragging: boolean }>`
  background-color: ${ props => props.isDragging ? 'tomato' : 'white' };
  border-radius: 4px;
  color: black;
  height: 40px;
  padding: 5px;
  box-sizing: border-box;
  margin: 4px 0px;
  box-shadow: ${ props => props.isDragging ? '12px 12px 2px 1px rgba(0, 0, 255, .2)' : 'none' };
  position: relative;
`;

const DelBtn = styled.button`
  position: absolute;
  right: 10px;
  top: 11px;
  border: none;
  cursor: pointer;
`;

function Card({ item, index, id, subject }: { item: string, index: number, id: number, subject: string }) {

    const setTodoList = useSetRecoilState(arr);

    const deleteTodo = (id: number) => {
        setTodoList(function(oldTodos) {
            const copied = [...oldTodos[subject]];
            const targetIndex = copied.findIndex(todo => todo.id === id);
            copied.splice(targetIndex, 1);
            return { ...oldTodos, [subject]: copied };
        });
    };

    return (
        <>
            <Draggable draggableId={ id + '' } index={ index } key={ id + '' }>
                {
                    (provided, effect) =>
                    <CardForm 
                    ref={provided.innerRef}
                    {...provided.dragHandleProps} 
                    {...provided.draggableProps}
                    isDragging={ effect.isDragging }
                    >
                        { item }
                        <DelBtn onClick={ () => { deleteTodo(id) } }>x</DelBtn>
                    </CardForm>
                }
            </Draggable>
        </>
    )
}

export default React.memo(Card);