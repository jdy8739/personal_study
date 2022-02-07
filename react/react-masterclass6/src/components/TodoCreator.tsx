import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { arr } from "../atoms";

const Creator = styled.div`
    margin-top: 100px;
    display: block;
    text-align: center;
    input {
        width: 280px;
        padding: 4px;
        border-radius: 8px;
    }
`;

function TodoCreator() {

    const setTodoList = useSetRecoilState(arr);

    const [newTodoName, setNewTodoName] = useState<string>('');

    const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
        setNewTodoName(e.currentTarget.value);
    };

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setTodoList((oldTodos) => {
            let isDuplicatedName = true;
            Object.keys(oldTodos).forEach(key => {
                if(key === newTodoName) {
                    alert('Board Name duplicated!');
                    isDuplicatedName = false;
                    return;
                }
            });
            if(isDuplicatedName) {
                setNewTodoName('');
                return { ...oldTodos, [newTodoName]: [] };
            } else {
                return { ...oldTodos };
            }
        });
    };

    return (
        <Creator>  
            <h2 style={{ color: 'white' }}>Welcome to To-do world!</h2>
            <form onSubmit={handleOnSubmit}>
                <input placeholder="input new to-do name here!" onChange={ handleOnChange } value={ newTodoName }/>
                &ensp;
                <button>Add new Todo!</button>
            </form>
        </Creator>
    )
}

export default TodoCreator;