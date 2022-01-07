import react from 'react';
import './Detail.css';
import { Table } from 'react-bootstrap';
import { connect, useDispatch, useSelector } from 'react-redux';

function Cart(props) {

    const state = useSelector((state) => state);
    const dispatch = useDispatch();

    return (
        <>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                    <th>*</th> 
                    {/* 정확한 프로퍼티를value를 써줘야함 */}
                    <th>name</th>
                    <th>quantity</th>
                    <th>size</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.reducer.map((item, i) => { //props.stateList로 안써도됨.
                            return(
                                <tr key={i}>
                                    <th>{ i }</th>
                                    <th>{ item.name }</th>
                                    <th>
                                        { item.quantity } 
                                        &nbsp;
                                        <button onClick={ () => { 
                                            dispatch({ type: 'quantityIncrease', payload: { num: i } }) } 
                                        }>+</button>
                                        <button onClick={ () => { 
                                            dispatch({ type: 'quantityDecrease', payload: { num: i } }) } //props.dispatch로 안써도됨.
                                        }>-</button>
                                    </th>
                                    <th>{ item.size }</th>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            {
                state.alertReducer ? (
                <div className='alert-box'>
                    <p>On Sale till Jan 27</p>
                    &emsp;
                    <button onClick={ () => { dispatch({ type: 'hideAlert' }) } }>x</button>
                </div> )
                : null
            }
        </>
    )
}

// function storeToProps(state) {
//     return {
//         stateList: state.reducer,
//         stateAlert: state.alertReducer
//     }
// }

// export default connect(storeToProps)(Cart);

export default Cart;