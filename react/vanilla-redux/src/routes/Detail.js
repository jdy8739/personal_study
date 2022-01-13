import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { actionCreators } from "../store";


function Detail({ todoList, dispatchDelTodo }) {

    const navi = useNavigate();

    const { id } = useParams();
    const [content, setContent] = useState('');

    useEffect(() => {
        const idx = todoList.findIndex(todo => todo.id === parseInt(id));
        setContent(todoList[idx].text);
    }, []);


    function handleDelTodo(e) {
        dispatchDelTodo(e.target.id);
        navi('/');
    }

    return (
        <>
            <p>This is a detail page.</p>
            <p>content: { content }</p>
            <p>created at { id }</p>
            <button onClick={ handleDelTodo } id={ id }>DEL</button>
        </>
    )
}

function mapStateToProps(state) {
    return { todoList: state };
};

function mapDispatchToProps(dispatch) {
    return { dispatchDelTodo: (id) => { dispatch(actionCreators.delTodo(parseInt(id))); } };
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);