/* eslint-disable */
import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  let posts = [['First Post', '01 . 03. 2022'], ['Where i live', '01 . 04. 2022'], ['Dinner party review', '01 . 06. 2022']];

  const writtenTitle = document.querySelector('.write-title');

  const [ title, alter ] = useState(posts);
  // const [ title1, alter1 ] = useState( ['Second Post', '01 . 04. 2022'] );
  // const [ title2, alter2 ] = useState( ['Third Post', '01 . 06. 2022'] );

  let [ likedNum, likedNumAlter ] = useState([1, 2, 3]);

  function addLikes(i, e) {
    e.stopPropagation();
    const dupli = [...likedNum];

    // dupli.forEach((a, i, o) => {
    //   o[i] = a + 1;
    // });

    dupli[i] ++;

    likedNumAlter(dupli);
  }

  function changeTitle() {
    const newPosts = [...posts]; //spread operator 필요
    newPosts[0] = ['여자코트 추천', '01 . 23. 2022'];
    alter(newPosts); //원래 자료형에 맞게 넣어야한다. 변경 함수에 직접 넣어야 재렌더링이 원할하게 된다. 재렌더링하려면 useState로 변수를 만들고 전용 값 바꾸기 함수로 바꿔줘야한다.
  }

  function arrangeTitle() {
    const sortedPosts = [...posts].sort();

    alter(sortedPosts);
  }

  let [showModal, showModalAlter] = useState(false);

  function onShowModal(i) {

    csNumAlter(i);

    if(showModal && chosenNum === i) {
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

  let [chosenNum, csNumAlter] = useState(0); 

  let [newTitle, alterNewTitle] = useState('');

  function publish(e) {
    e.preventDefault();

    const now = new Date();
    const date = String(now.getDate()).padStart(2, '0');
    const month = String(parseInt(now.getMonth()) + 1).padStart(2, '0');
    const year = now.getFullYear();

    const newPosts = [...title];
    newPosts.push([ newTitle, `${month} . ${date}. ${year}` ]);
    alter(newPosts);

    const newLikedNums = [...likedNum];
    newLikedNums.push(0);
    likedNumAlter(newLikedNums);

    writtenTitle.value = '';
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
          title.map(function(item, i) { //리액트 돔으로 자동 조작하고자하는 변수는 꼭 useState로 생성해야함. 일반 변수는 조작 불가.
            return (
              <div key={i} onClick={ () => { onShowModal(i); } }>
                <h5 className='title'>{ item[0] }&ensp;<span className='thumb' onClick={ (e) => { addLikes(i, e); } }>👍</span>&ensp;{ likedNum[i] }</h5>
                <p className='date'>{ item[1] }</p>
                <hr></hr>
              </div>
            );
          })
        }
        <div className='write-box'>
          <h4>The title of new post</h4>
          <form>
            <input className='write-title' onInput={ (e) => { alterNewTitle(e.target.value); } } required/>
            <br></br><br></br>
            <button onClick={ publish }>publish</button>
          </form>
        </div>
        {
          showModal === true
          ? <Modal title={title} chosenNum={chosenNum}></Modal>
          : null
        }
      </div>
    </div>
  );
}

//이렇게 <></>로 묶을 수도 있음

function Modal(props) {
  const idx = props.chosenNum;
  return (
    <> 
    <div className='modal'>
      <h3>{ props.title[idx][0] }</h3>
      <p>content</p>
      <p>{ props.title[idx][1] }</p>
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
