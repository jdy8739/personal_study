import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const CardForm = styled.div<{ isDragging: boolean }>`
  background-color: ${ props => props.isDragging ? 'tomato' : 'white' };
  border-radius: 4px;
  color: black;
  height: 40px;
  padding: 5px;
  box-sizing: border-box;
  margin: 4px 0px;
  box-shadow: ${ props => props.isDragging ? '12px 12px 2px 1px rgba(0, 0, 255, .2)' : 'none' };
`;

function Card({ item, index, id }: { item: string, index: number, id: number }) {
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
                    >{ item }</CardForm>
                }
            </Draggable>
        </>
    )
}

export default React.memo(Card);