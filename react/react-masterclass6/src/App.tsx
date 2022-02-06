import React from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Card from './components/Card';
import { arr } from './atoms';
import { useRecoilState } from 'recoil';
import Board from './components/Board';

const mtStyle = { 
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'start',
  marginTop: '100px'
 };


function App() {

  const [ todoList, setTodoList ] = useRecoilState(arr);

  const handleOnDragEnd = ({ destination, source, draggableId }: DropResult) => {
    if(!destination) return;
    if(destination?.droppableId === source.droppableId) {
      setTodoList((oldTodos) => {
        const copied = [...oldTodos[source.droppableId]];
        const target = { ...copied[source.index] };

        copied.splice(source.index, 1);
        copied.splice(destination.index, 0, target);
        return { ...oldTodos, [source.droppableId]: copied };
      });
    } else {
      setTodoList((oldTodos) => {
        const copied = [...oldTodos[source.droppableId]];
        const targetBoard = [...oldTodos[destination.droppableId]];
        const target = { ...copied[source.index] };

        copied.splice(source.index, 1);
        targetBoard.splice(destination.index, 0, target);
        return { ...oldTodos, [source.droppableId]: copied, [destination.droppableId]: targetBoard };
      });
    }
  };

  return (
    <div className="App">
      <DragDropContext onDragEnd={ handleOnDragEnd }>
        <div style={mtStyle}>
          {
            Object.keys(todoList).map((list, index) => {
              return (
                <div key={ index }>
                  <Board todos={todoList[list]} id={ list }/>
                </div>
              )
            })
          }
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;