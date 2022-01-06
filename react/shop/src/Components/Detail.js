import react, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';

// styled-components는 꼭 대문자로 작성해줘야함!
let Title = styled.h4`  
    font-size : 25px;
    color: ${ props => props.textcolor };
`;

const Alert = styled.div`
    width: 90%;
    height: 60px;
    background-color: rgb(255, 205, 205);
    border-radius: 8px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const AlertText = styled.p`
    color: red;
    font-size: 20px;
    margin-bottom: 0px;
`;

function Detail(props) {
    let { id } = useParams();
    let history = useHistory();

    let [showAlert, alterShowAlert] = useState(true); 

    useEffect(function() {
        const timer = setTimeout(function() {
            alterShowAlert(false);
        }, 2000);

        return function() { clearTimeout(timer) };
    }, [ showAlert ]); //여기 대괄호 안의 state가 변경될 때만 해당 useEffect가 작동하게 만들 수 있음. 그럼 mounted용 useEffect는 따로 만들면됨.

    useEffect(function() {
        alert('x')
    }, [ ]); //안에 아무것도 안넣으면 mounted 시에만 작동.

    let [inputText, alterInputText] = useState('');

    function saveInputText(e) {
        const inputText = e.target.value;
        alterInputText(inputText);
    }

    const idx = props.shoes.findIndex(item => item.id == parseInt(id));

    return (
        <>
        <div className="container">
            <br></br>
            <Title textcolor={ 'red' }>Detail Page</Title>
            <div>
                 <input onChange={ (e) => { saveInputText(e) } }/>
                 <span>
                     { inputText }
                 </span>
            </div>
            <div className='alert-box'>
                {
                    showAlert ? (
                    <Alert>
                        <AlertText>
                            sale only this week
                        </AlertText>
                    </Alert> )
                    : null
                }
            </div>
            <div className="row">
            <div className="col-md-6">
                <img src={ `${ props.shoes[idx].imgSrc }` } width="100%" />
            </div>
            <div className="col-md-6 mt-4">
                <h4 className="pt-5"></h4>
                <p>{ props.shoes[idx].title }</p>
                <p>{ props.shoes[idx].price }</p>
                <button className="btn btn-danger">주문하기</button> 
            </div>
            </div>
        </div> 
        </>
    );
}

export { Detail };