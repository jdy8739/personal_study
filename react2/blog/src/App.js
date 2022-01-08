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

  function switchModal() {
    if(showModal) altShowModal(false);
    else altShowModal(true);
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
              <div key={i} className="post-card" onClick={ switchModal }>
                <Post content={content} idx={i} altContent={ altContent }></Post>
              </div>
            )
          })
        }
      </div>
      {
        showModal
        ? <Modal/>
        : null
      }
    </div>
  );
}



function Modal() {
  return (
    <>
      <div className='modal'>
        <h2>Modal</h2>
        <p>title</p>
        <p>thumbs</p>
      </div>
    </>
  )
}

export default App;
