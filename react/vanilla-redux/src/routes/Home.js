import { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { actionCreators } from "../store";


function Home({ todoList, ...rest }) { //props만을 넣으면 아래에서 props.todoList, props.dispatchAddTodo() 이렇게 사용해야함.
    console.log(rest);

    const [todo, setTodo] = useState();

    const handleOnSubmit = (e) => {
        e.preventDefault();
        rest.dispatchAddTodo(todo);
        setTodo('');
    };

    const handleOnChange = (e) => {
        setTodo(e.target.value);
    };

    const handleDeleteTodo = (id) => {
        rest.dispatchDelTodo(id);
    };

    return (
        <>
            <div>
                <form onSubmit={ handleOnSubmit }>
                    <input onChange={ handleOnChange } value={todo}/>
                </form>
                <ul>
                    {
                        todoList.map((todo, i) => {
                            return (
                                <li key={i}>
                                    <Link to={ `/detail/${ todo.id }` }>
                                        <p>{ todo.text }</p>
                                    </Link>
                                    <span><button onClick={ () => { handleDeleteTodo(todo.id) } }>DEL</button></span>
                                </li>
                            )
                        }) 
                    }
                </ul>
            </div>
        </>
    )
}


function mapStateToProps(state) {
    console.log(state)
    return { todoList: state, sexy: true }; 
    //여기서 sexy라는 state는 store.js에서 받지 않았지만, 여기서 임의로 추가해줄 수 있음.
    //위에 인자로 받는 state는 store에서 전송되는 state 데이터들만 딱 포함됨.(dispatch는 들어가지않음.)
    //그리고 return되는 객체에서 설정한 key값에 state의 값들을 할당해줄 수 있음. state를 todoList에 넣은것처럼.
    //위 코드는 state에 store.js에있는 reducer가 return하는 todo 배열값(state)만 존재.
}

function mapDispatchToProps(dispatch) { 
    //이 함수가 없다면 props에는 그냥 dispatch가 들어감. 
    //그러나 여기 함수에서 dispatch를 받아 여러 함수가 든 객체를
    //return함으로써 위 컴포넌트의 props에서 여기서 return되는 함수들을 사용할 수 있음.
    //즉 mapDispatchToProps 함수의 목적은 단순히 props.dispatch를 사용해 store.js에
    //action 요청을 보내는것이 아니라, 여기 함수에 dispatch를 인자로 넣고 dispatch 함수를 좀 더 세분화하여,
    //세밀한 dispatch 코드를 작성하려는데 의의가있음.
    return { 
        dispatchAddTodo: (todo) => { dispatch(actionCreators.addTodo(todo)); },
        dispatchDelTodo: (id) => { dispatch(actionCreators.delTodo(parseInt(id))); }
    };
}

//위 두 함수에서 return하는 객체의 값들은 props라는 전체 객체로 합쳐진다.
//아래 connect 함수는 두 함수가 return하는 변수와 함수를 합쳐 props로 받을 수 있게한다.
//하지만 위 컴포넌트에서 props를 받을 때는 destructuring 문법으로 받는게 좀 더 명확하고 편하다.

export default connect(mapStateToProps, mapDispatchToProps)(Home);

//mapStateToProps가 필요없을 경우, null을 넣어주면된다.