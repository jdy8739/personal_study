/*eslint-disable*/

import logo from './logo.svg';
import './App.css';
import Post from './Components/Post.js';
import React, { useState } from 'react';

function App() {
  const a = 'NEW POST';

  function b() {
    return '안녕하세요 :)';
  }

  const [content, altContent] = useState([ { title: '오늘할거', thumbs: 10 }, { title: '내일할거', thumbs: 12 }, { title: '심심하다', thumbs: 6 } ]);
  const flexBox = { width: '100%', display: 'flex', justifyContent: 'center', flexWrap: 'wrap' };

  const [showModal, altShowModal] = useState(false);
  const [chosenNum, altChosenNum] = useState(-1);

  function switchModal(i) {
    if(!showModal) {
      altShowModal(true);
      altChosenNum(i);
    }

    else if(showModal && i === chosenNum) {
      altShowModal(false);
    }
    altChosenNum(i);
  }

  function publish() {
    const inputVal = document.querySelector('#newPost').value;
    const newPost = { title: inputVal, thumbs: 0 };
    altContent([ ...content, newPost ]);
    document.querySelector('#newPost').value = '';
  }
 
  return (
    <div className="App">
      <p>{ a }</p>
      <p>{ b() }</p>
      <p>{ content[0].title }</p>
      <p>{ content[1].title }</p>
      <div style={ flexBox }>
        {
          content.map((a, i) => {
            return (
              <div key={i} className="post-card" onClick={ () => { switchModal(i) } }>
                <Post content={content} idx={i} altContent={ altContent }></Post>
              </div>
            )
          })
        }
      </div>
      <div>
        <input id='newPost'/>
        &nbsp;
        <span>
          <button onClick={ publish }>publish</button>
        </span>
      </div>
      {
        showModal
        ? <Modal content={content} chosenNum={chosenNum}/>
        : null
      }
      <OldCompStyle/>
    </div>
  );
}



function Modal(props) {
  return (
    <>
      <div className='modal'>
        <h2>{ props.content[props.chosenNum].title }</h2>
        <p>title</p>
        <p>{ props.content[props.chosenNum].thumbs }</p>
      </div>
    </>
  )
}



class OldCompStyle extends React.Component {
  constructor() {
    super()
    this.state = { 
      post: [ { title: '안녕', date: '2022 01 05' }, { title: 'ㅎㅇ', date: '2022 01 09' } ]
    }
  }

  changeState() {
    this.setState({ post: [{ title: 'ㅋㅋ', date: '2022 01 07' }] });
  }

  render() {
    return (
      <>
        <p>옛 스타일 컴포넌트 만들기</p>
        <p>{ this.state.post[0].title }</p>
        <button onClick={ this.changeState }>click me!</button>
      </>
    )
  }
}

export default App;
