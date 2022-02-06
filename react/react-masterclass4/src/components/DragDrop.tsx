import styled from "styled-components"
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

function DragDrop() {
    const onDragEnd = () => {

    };
    return (
        <>
            <DragDropContext onDragEnd= { onDragEnd }>
                <div>
                    <Droppable droppableId="one">
                        {
                            (magic) => (
                                <ul ref={ magic.innerRef } { ...magic.droppableProps }>
                                    <Draggable draggableId="first" index={0}>
                                        { (magic) => (
                                            <li 
                                                ref={ magic.innerRef }
                                                { ...magic.draggableProps } 
                                            >One
                                                <span { ...magic.dragHandleProps }>💥</span>
                                            </li>
                                        ) }
                                    </Draggable>
                                    <Draggable draggableId="second" index={1}>
                                        { (magic) => (
                                            <li 
                                                ref={ magic.innerRef }
                                                { ...magic.draggableProps }
                                            >Two
                                                <span { ...magic.dragHandleProps }>💥</span>
                                            </li> 
                                        )}
                                    </Draggable>
                                    <Draggable draggableId="third" index={2}>
                                        { (magic) => (
                                            <li 
                                                ref={ magic.innerRef }
                                                { ...magic.draggableProps }
                                            >Three
                                                <span { ...magic.dragHandleProps }>💥</span>
                                            </li>
                                        )}
                                    </Draggable>
                                </ul>
                            )
                        }
                    </Droppable>
                </div>
            </DragDropContext>
        </>
    )
}

export default DragDrop;