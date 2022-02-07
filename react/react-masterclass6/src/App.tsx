import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { arr } from './atoms';
import { useRecoilState } from 'recoil';
import Board from './components/Board';
import Trash from './components/Trash';
import { ITodoList } from './atoms';
import TodoCreator from './components/TodoCreator';

const mtStyle = { 
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'start',
  height: '300px',
  width: '70vw',
  margin: '100px auto'
};

function App() {

  const [ todoList, setTodoList ] = useRecoilState(arr);

  const handleOnDragEnd = ({ destination, source }: DropResult) => {
    if(!destination) return;

    if(source.droppableId === 'window') {
      setTodoList((oldTodos) => {
        const newTodosKeies = Object.keys(oldTodos);
        const target = newTodosKeies[source.index];
        newTodosKeies.splice(source.index, 1);
        newTodosKeies.splice(destination.index, 0, target);

        const newTodos :ITodoList = {};
        let keyName = '';
        newTodosKeies.forEach((key, i) => {
          keyName = newTodosKeies[i];
          newTodos[keyName] = oldTodos[keyName];
        });
        return newTodos;
      });
      return;
    }

    if(destination.droppableId === 'trash-box') {
      setTodoList((oldTodos) => {
        const copied = [...oldTodos[source.droppableId]];
        copied.splice(source.index, 1);
        return { ...oldTodos, [source.droppableId]: copied };
      });
      return;
    }
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
      <TodoCreator />
      <DragDropContext onDragEnd={ handleOnDragEnd }>
        <Droppable droppableId='window' direction='horizontal'>
          {
            (provided) =>
            <div style={mtStyle} 
            ref={provided.innerRef} 
            {...provided.droppableProps} 
            >
              {
                Object.keys(todoList).map((list, index) => {
                  return (
                    <div key={ index }>
                      <Board todos={todoList[list]} id={ list } index={ index }/>
                    </div>
                  )
                })
              }
              { provided.placeholder }
            </div>
          }
        </Droppable>
        <Trash />
      </DragDropContext>
    </div>
  );
}

export default App;