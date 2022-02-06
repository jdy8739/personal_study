import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { hourSelector, minuteState } from './atoms';
import DragDrop from './components/DragDrop';

function App() {

  const [minutes, setMinutes] = useRecoilState(minuteState);
  const [hours, setHours] = useRecoilState(hourSelector);

  const handleOnChangeMinutes = (event: React.FormEvent<HTMLInputElement>) => {
    setMinutes(+event.currentTarget.value);
  };

  const handleOnChangeHours = (event: React.FormEvent<HTMLInputElement>) => {
    setHours(+event.currentTarget.value);
  };

  return (
    <div className="App">
      <input placeholder='minutes' type='number' onChange={ handleOnChangeMinutes } value={ minutes }/>
      &emsp;
      <input placeholder='hours' type='number' onChange={ handleOnChangeHours } value={ hours }/>
      <DragDrop />
    </div>
  );
}

export default App;
