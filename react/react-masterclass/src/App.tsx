import styled, { keyframes } from 'styled-components';
import Circle2 from './components/Circle2';
import Form from './components/Form';

const rotateAni = keyframes`
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(360deg);
  }
`;

const Box = styled.div`
  display: flex;
  padding: 20px;
  background-color: ${ (props) => props.theme.bgColor };
  span {
    font-size: 36px;
    transition: all 1s;
    &:hover {
      background-color: blue;
      animation: ${ rotateAni } 3s linear infinite;
      font-size: 50px;
    }
  }
`;

interface SquareProps {
  bgColor?: string
}

const Square = styled.div<SquareProps>`
  background-color: ${ props => props.bgColor };
  width: 200px;
  min-width: 200px;
  height: 200px;
`;

const Circle = styled(Square)`
  border-radius: 50%;
  border: 1px solid grey;
  position: relative;
  animation: ${ rotateAni } 3s linear infinite;
`;

const Title = styled.h2`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -100%);
`;

const Input = styled.input.attrs({ required: true, minLength: 12 })`
  background-color: tomato;
`;

const Btn = styled.button`
  background-color: red;
`;

function App() {
  return (
    <div className="App">
      <Box>
        <Square />
        <Square bgColor='purple'/>
        <Circle bgColor='alice-blue'>
          <Title as='button'>Hi! 😘</Title>
        </Circle>
      </Box>
      <Box>
        <Input/>
        <Btn as='a' href='https://www.naver.com'>HI</Btn>
      </Box>
      <Box>
        <span>😘</span>
      </Box>
      <Circle2 bgColor='yellow' borderColor='green'></Circle2>
      <Circle2 bgColor='red'></Circle2>
      <Form/>
    </div>
  );
}

export default App;
