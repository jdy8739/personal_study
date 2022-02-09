import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useTransform, useViewportScroll } from 'framer-motion';
import styled from 'styled-components';
import Logo from './logo';

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 40px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  place-items: center;
`;

const Circle = styled(motion.div)`
  width: 70px;
  height: 70px;
  background-color: pink;
  border-radius: 50%;
`;

const Elem = styled(motion.div)`
  background-color: white;
  width: 72%;
  height: 125px;
  display: inline-block;
  margin: 2px 4px;
  border-radius: 20px;
  box-sizing: border-box;
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.4);
  position: absolute;
`;

const boxVar = {
  start: {
    scale: 0.5
  },
  end: {
    scale: 1,
    transition: {
      duration: 1,
      type: 'spring',
      bounce: 0.8,
      delayChildren: 0.5,
      staggerChildren: 0.3
    }
  },
  hover: {
    scale: 1.1,
    rotateZ: 180
  },
  tap: {
    borderRadius: '0%'
  },
  drag: {
    backgroundColor: 'rgba(42, 54, 193)',
    transition: {
      duration: 2
    }
  }
};

const circleVar = {
  start: {
    scale: 0.1,
    opacity: 0,
    y: -100
  },
  end: {
    scale: 1.3,
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      type: 'spring',
      bounce: 0.4
    }
  }
};

const BiggerBox = styled.div`
  width: 600px;
  height: 600px;
  background-color: rgb(255, 255, 255, 0.4);
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const boxVar2 = {
  start: function(isBack: boolean) {
    return ({
      opacity: 0,
      x: isBack ? -200 : 200,
      scale: 0
    })
  },
  end: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 1
    }
  },
  leaving: (isBack: boolean) => ({
    opacity: 0,
    x: isBack ? 200 : -200,
    scale: 0,
    transition: {
      duration: 1
    }
  })
}

function App() {
  const biggerBoxRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const rotateZ = useTransform(x, [-800, 0, 800], [0, 360, 720]);
  const bgGradient = useTransform(x, [-800, 0, 800],
    [
      'linear-gradient(135deg, rgb(0, 238, 155), rgb(238, 178, 0))',
      'linear-gradient(135deg, rgb(0, 177, 42), rgb(145, 154, 66))',
      'linear-gradient(135deg, rgb(121, 76, 23), rgb(140, 21, 110))'
    ])
  x.onChange(() => {
    //console.log(x.get());
    //console.log(scale.get());
  });
  const { scrollY, scrollYProgress } = useViewportScroll();

  const scale = useTransform(scrollYProgress, [0, 1], [1, 5])
  const y = useTransform(scrollYProgress, [0, 1], [0, 3000])

  const [toggleBox, setTogleBox] = useState(false);

  const [visibleIndex, setVisibleIndex] = useState(1);

  const [isBack, setIsback] = useState(false);

  const showNext = () => {
    setVisibleIndex(index => index += 1);
    setIsback(false);
  };

  const showPrev = () => {
    setVisibleIndex(i => i -=  1);
    setIsback(true);
  };

  const [overlay, setOverlay] = useState(false);
  const showOverlay = () => {
    setOverlay(prev => !prev);
  };

  const [id, setId] = useState<string | null>(null);
  const setBoxId = (id: string) => {
    setId(id);
  };

  return (
    <div className="App">
      <div>
        <Wrapper style={{ background: bgGradient }} onClick={ showOverlay }>
          {/* <Box 
          variants={boxVar} 
          initial="start" 
          animate="end" 
          whileHover="hover"
          whileTap="tap"
          >
            <Circle variants={circleVar} />
            <Circle variants={circleVar} />
            <Circle variants={circleVar} />
            <Circle variants={circleVar} />
          </Box>
          <BiggerBox ref={biggerBoxRef}>
            <Box 
            variants={boxVar}
            whileDrag="drag"
            dragSnapToOrigin
            dragConstraints={biggerBoxRef}
            dragElastic={0.2}
            drag/>
          </BiggerBox>
          <Box 
          style={{ x, rotateZ }}
          drag='x' 
          dragSnapToOrigin
          >
            <button onClick={() => { x.set(x.get() + 200) }}>click me</button>
          </Box>
          <Box style={{ scale, y }}/> */}

          {/* <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <button onClick={ () => setTogleBox(toggle => !toggle) }>toggle</button>
            <AnimatePresence>
              {
                toggleBox ?
                <Box 
                variants={boxVar2}
                initial="start"
                animate="end"
                exit="leaving"
                /> : null
              }
            </AnimatePresence>
          </div> */}
          {/* <AnimatePresence exitBeforeEnter custom={isBack}>
            {
              [1, 2, 3, 4, 5, 6, 7, 8, 9].map(item => 
                visibleIndex === item ? 
                <Box key={visibleIndex}
                variants={boxVar2}
                initial='start'
                animate='end'
                exit='leaving'
                custom={isBack}
                >{ visibleIndex }</Box> : null
              )
            }
          </AnimatePresence>
          <button onClick={showNext}>next please</button>
          <button onClick={showPrev}>prev please</button> */}
          {/* <div style={{
            width: '800px',
          }}>
            <Elem layoutId='hello'/>
            <Elem style={{
              width: '25%'
            }}
            />
            <Elem style={{
              width: '25%'
            }}/>
            <Elem />
          </div> */}
          {
            [1, 2, 3, 4].map(i => 
            <Box key={i} 
            style={{ margin: '20px', marginBottom: '200px' }} 
            layoutId={ i + '' }
            onClick={ () => { setBoxId(i + '') } }
            >{ i }</Box>)
          }
          <AnimatePresence>
            {
              overlay ? 
                <Overlay 
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1
                }}
                exit={{
                  opacity: 0
                }}
                transition={{ duration: 0.3 }}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                >
                  
                  <Box layoutId={ id + '' }>{ id }</Box>
                </Overlay>
              : null
            }
          </AnimatePresence>
        </Wrapper>
      </div>
    </div>
  );
}

export default App;
