import react, { useContext, useEffect, useState } from 'react';
import './Detail.css';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Nav } from 'react-bootstrap';

import { manuDateContext } from '../App.js';

import { CSSTransition } from 'react-transition-group';
import { connect, useDispatch, useSelector } from 'react-redux';

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

    const state = useSelector((state) => state);
    const dispatch = useDispatch();

    let { id } = useParams();
    let history = useHistory();

    let [showAlert, alterShowAlert] = useState(true); 

    useEffect(function() {
        const timer = setTimeout(function() {
            alterShowAlert(false);
        }, 2000);

        return function() { clearTimeout(timer) }; //return문은 해당 컴포넌트가 삭제될 때 작동
    }, [ showAlert ]); //여기 대괄호 안의 state가 변경될 때만 해당 useEffect가 작동하게 만들 수 있음. 그럼 mounted용 useEffect는 따로 만들면됨.

    useEffect(function() {
    }, [ ]); //안에 아무것도 안넣으면 mounted 시에만 작동.

    let [inputText, alterInputText] = useState('');

    function saveInputText(e) {
        const inputText = e.target.value;
        alterInputText(inputText);
    }

    const idx = props.shoes.findIndex(item => item.id == parseInt(id));

    let manuDateList = useContext(manuDateContext);

    function reduceStock(idx) {

        const reducedStock = [ ...props.productStock ];
        reducedStock[idx] --;

        props.stockAlter(reducedStock);
    }

    let [tabNum, alterTabNum] = useState(0);

    let [tabSwitch, alterTabSwitch] = useState(false);

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

                    <button className="btn btn-danger" onClick={ () => { 
                   
                        reduceStock(idx); 
                        dispatch({ type: 'addQuantity', payload: { name: props.shoes[idx].title, quantity: 1, size: '14inch' } });
                        history.push('/cart');
                        
                    } }>주문하기</button> 

                    <div>남은 재고<StockShower stock={ props.productStock[idx] }></StockShower></div>
                    <p>{ manuDateList[idx] }</p>
                </div>
            </div>
            <Nav fill variant="tabs" defaultActiveKey="/home">
                <Nav.Item>
                    <Nav.Link onClick={ () => { alterTabSwitch(false); alterTabNum(3); } }>Active</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1" onClick={ () => { alterTabSwitch(false); alterTabNum(0); } }>Loooonger NavLink</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2" onClick={ () => { alterTabSwitch(false); alterTabNum(1); } }>Link</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-3" onClick={ () => { alterTabSwitch(false); alterTabNum(2); } }>Link</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-4" disabled>
                    </Nav.Link>
                </Nav.Item>
            </Nav>
            <CSSTransition in={ tabSwitch } classNames="pop" timeout={ 1000 }>
                <TabContent tabNum={ tabNum } alterTabSwitch = {alterTabSwitch}/>
            </CSSTransition>
        </div> 
        </>
    );
}

// function storeToProps(state) {
//     return {
//         stateList: state.reducer,
//         stateAlert: state.alertReducer
//     }
// }

// export default connect(storeToProps)(Detail); //이건 옛날 방식

export default Detail;


function StockShower(props) {
    return (
        <div>
            <p>{ props.stock }</p>
        </div>
    );
}

function TabContent(props) {

    useEffect(() => {
        props.alterTabSwitch(true);
    });

    if(props.tabNum === 0) {
        return ( <div>내용0</div> )
    }
    else if(props.tabNum === 1) {
        return ( <div>내용1</div> )
    }
    else if(props.tabNum === 2) {
        return ( <div>내용2</div> )
    }
    else if(props.tabNum === 3) {
        return ( <div>내용3</div> )
    };
}