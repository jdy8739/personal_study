/* eslint-disable */
import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const posts = [['First Post', '01 . 03. 2022'], ['Where i live', '01 . 04. 2022'], ['Dinner party review', '01 . 06. 2022']];

  const [ title, alter ] = useState(posts);
  // const [ title1, alter1 ] = useState( ['Second Post', '01 . 04. 2022'] );
  // const [ title2, alter2 ] = useState( ['Third Post', '01 . 06. 2022'] );

  let [ likedNum, likedNumAlter ] = useState([1, 2, 3]);

  function addLikes(i) {
    const dupli = [...likedNum];

    // dupli.forEach((a, i, o) => {
    //   o[i] = a + 1;
    // });

    dupli[i] ++;

    likedNumAlter(dupli);
  }

  function changeTitle() {
    const newPosts = [...title]; //spread operator 필요
    newPosts[0] = '여자코트 추천';
    alter(newPosts); //원래 자료형에 맞게 넣어야한다. 변경 함수에 직접 넣어야 재렌더링이 원할하게 된다. 재렌더링하려면 useState로 변수를 만들고 전용 값 바꾸기 함수로 바꿔줘야한다.
  }

  function arrangeTitle() {
    const sortedPosts = [...posts].sort();

    alter(sortedPosts);
  }

  let [showModal, showModalAlter] = useState(false);

  function onShowModal() {
    if(showModal) {
      showModalAlter(false);
    } else {
      showModalAlter(true);
    }
  }

  let [showMenu, showMenuAlter] = useState(false);

  function onShowMenu() {
    if(showMenu) {
      showMenuAlter(false);
    } else {
      showMenuAlter(true);
    }
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
        <div className='hamburgerMenu' onClick={ onShowMenu }>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div style={ { width: '70px'} }></div>
        {
          showMenu
          ? <MenuBar></MenuBar>
          : null
        }
      </div>
      <div className='container'>
        <div className='btn-section'>
          <button onClick={ changeTitle }>버튼</button>
          <button onClick={ arrangeTitle }>가나다 정렬</button>
        </div>
        {/* <div>
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
          <h5 className='title' onClick={ onShowModal }>{ title[2][0] }</h5>
          <p className='date'>{ title[2][1] }</p>
          <hr></hr>
        </div> */}
        {
          posts.map(function(item, i) {
            return (
              <div key={item[0]}>
                <h5 className='title'>{ item[0] }&ensp;<span onClick={ () => { addLikes(i) } }>👍</span>&ensp;{ likedNum[i] }</h5>
                <p className='date'>{ item[1] }</p>
                <hr></hr>
              </div>
            );
          })
        }
        {
          showModal === true
          ? <Modal></Modal>
          : null
        }
      </div>
    </div>
  );
}

//이렇게 <></>로 묶을 수도 있음

function Modal() {
  return (
    <> 
    <div className='modal'>
      <h3>title</h3>
      <p>content</p>
      <p>date</p>
    </div>
    </>
  )
}

function MenuBar() {
  return (
    <div className='menu-bar'>
      <div>
        <p style={ { color: 'black', fontSize: '12px', margin: '18px 0px' } }>Ipsum Loren</p>
        <p style={ { color: 'black', fontSize: '12px', margin: '18px 0px' } }>Ipsum Loren</p>
        <p style={ { color: 'black', fontSize: '12px', margin: '18px 0px' } }>Ipsum Loren</p>
        <p style={ { color: 'black', fontSize: '12px', margin: '18px 0px' } }>Ipsum Loren</p>
        <p style={ { color: 'black', fontSize: '12px', margin: '18px 0px' } }>Ipsum Loren</p>
      </div>
    </div>
  )
}

export default App;
