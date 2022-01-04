/* eslint-disable */
import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const posts = [['First Post', '01 . 03. 2022'], ['Where i live', '01 . 04. 2022'], ['Dinner party review', '01 . 06. 2022']];

  const [ title, alter ] = useState(posts);
  // const [ title1, alter1 ] = useState( ['Second Post', '01 . 04. 2022'] );
  // const [ title2, alter2 ] = useState( ['Third Post', '01 . 06. 2022'] );

  let [ likedNum, likedNumAlter ] = useState(0);

  function changeTitle() {
    const newArr = [...title]; //spread operator 필요
    newArr[0] = '여자코트 추천';
    alter(newArr); //원래 자료형에 맞게 넣어야한다. 변경 함수에 직접 넣어야 재렌더링이 원할하게 된다. 재렌더링하려면 useState로 변수를 만들고 전용 값 바꾸기 함수로 바꿔줘야한다.
  }

  function arrangeTitle() {
    const sortedPosts = [...posts].sort();

    alter(sortedPosts);
  }

  return (
    <div className="App">
      <div className='nav-bar'>
        <h3>React Blog</h3>
        <p>posts</p>
        <p>friends</p>
        <p>story</p>
        <p>about me</p>
        <p>contact</p>
        <div style={ { width: '100px'} }></div>
      </div>
      <div className='container'>
        <div className='btn-section'>
          <button onClick={ changeTitle }>버튼</button>
          <button onClick={ arrangeTitle }>가나다 정렬</button>
        </div>
        <div>
          <h5 className='title'>{ title[0][0] }&ensp;<span onClick={ () => { likedNumAlter(likedNum + 1) } }>👍</span>&ensp;{ likedNum }</h5>
          <p className='date'>{ title[0][1] }</p>
          <hr></hr>
        </div>
        <div>
          <h5 className='title'>{ title[1][0] }</h5>
          <p className='date'>{ title[1][1] }</p>
          <hr></hr>
        </div>
        <div>
          <h5 className='title'>{ title[2][0] }</h5>
          <p className='date'>{ title[2][1] }</p>
          <hr></hr>
        </div>
      </div>
    </div>
  );
}

export default App;
