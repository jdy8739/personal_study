/* eslint-warning */

import { connect, useDispatch, useSelector } from "react-redux";
import { Table } from 'react-bootstrap';

import styled from "styled-components";
import { AlertBox } from './App.js';


function Cart(props) {

    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const isAlertShown = useSelector((state) => state.reducer2);

    return (
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>quan</th>
            <th>stock</th>
          </tr>
        </thead>
        <tbody>
          {
              state.reducer.map((a, i) => {
                  return (            
                    <tr key={i}>
                        <td>{ state.reducer[i].id }</td>
                        <td>{ state.reducer[i].name }</td>
                        <td>{ state.reducer[i].quan } { state.reducer[0].firstId }</td>
                        <td>
                            <button onClick={ () => { dispatch({ type: 'addStock', payload: { id: `${i}` } }) } }>+</button>
                            &emsp;
                            <button onClick={ () => { dispatch({ type: 'subStock', payload: { id: `${i}` } }) } }>-</button>
                        </td>
                    </tr>
                  )
              })
          }
          <br></br>
          {
              isAlertShown ?
              (
                <AlertBox>
                    About to Sold out!
                    &emsp;
                    <button onClick={ () => { dispatch({ type: 'hideAlert' }) } }>close</button>
                </AlertBox>
              )
              : null
          }
        </tbody>
      </Table>
    )
}

// function stateToProps(state) {
//     console.log(state);
//     return {
//         state: state.reducer,
//         firstId: state.reducer[0].id,
//         isAlertShown: state.reducer2
//     }
// }

// export default connect(stateToProps)(Cart);

export default Cart;


