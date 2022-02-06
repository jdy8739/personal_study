import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components"
import { todoState, ITodo, todoSelector, categoryState, Categories } from "../atoms";

const ButtonBox = styled.div`
    display: flex;
    transition: all 1s;
    button:hover {
        color: red;
        font-weight: bold;
    }
`;

interface INewtodo {
    todo: string
}

function TodoList() {

    const { register, watch, handleSubmit, formState: { errors }, setValue } = useForm<INewtodo>(); 
    const [ todoList, setTodoList ] = useRecoilState(todoState);
    const todoSelectorList = useRecoilValue(todoSelector);

    const [category, setCategory] = useRecoilState(categoryState);

    function saveTodo(data: INewtodo) {
        if(watch('todo') === data.todo) {
            setValue('todo', '');
            setTodoList([ ...todoList, { todo: data.todo, id: Date.now(), category: category } ])
        }
    }

    const changeCategory = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
        const newCategory = e.currentTarget.innerText;
        const targetIndex = todoList.findIndex(todo => {
            return todo.id === id;
        })
        const changedTodo = { ...todoList[targetIndex] };
        changedTodo.category = newCategory as Categories;

        setTodoList([ ...todoList.slice(0, targetIndex), changedTodo, ...todoList.slice(targetIndex + 1, todoList.length) ]);
    };

    const handleChangeCategory = (e: React.FormEvent<HTMLSelectElement>) => {
        setCategory(e.currentTarget.value as Categories);
    };

    const deleteTodo = (id: number) => {
        const targetIndex = todoList.findIndex(todo => {
            return todo.id === id;
        })
        const copied = [...todoList];
        copied.splice(targetIndex, 1);
        setTodoList(copied);
    };

    return (
        <>
            <form onSubmit={ handleSubmit(saveTodo) }>
                <input { ...register('todo',
                {
                    required: 'Write down it on here!',
                    maxLength: {
                        value: 30,
                        message: 'To-do must be shorter than 30.'
                    }
                }) 
                } placeholder="Write down your to-do!" />
                <span>{ errors?.todo?.message }</span>
                <br></br>
                <button type="submit">save</button>
                <select onChange={ handleChangeCategory }>
                    <option value={ Categories.TO_DO }>TO DO</option>
                    <option value={ Categories.DOING }>DOING</option>
                    <option value={ Categories.DONE }>DONE</option>
                </select>
            </form>
            {
                todoSelectorList.map((item, i) => {
                    return (
                        <>  
                            <ButtonBox key={ i }>
                                <p onClick={ (e) => { deleteTodo(item.id) } }>{ item.todo }</p>
                                &emsp;
                                { item.category !== Categories.TO_DO && <button onClick={(e) => { changeCategory(e, item.id) }}>TO_DO</button> }
                                { item.category !== Categories.DOING && <button onClick={(e) => { changeCategory(e, item.id) }}>DOING</button> }
                                { item.category !== Categories.DONE && <button onClick={(e) => { changeCategory(e, item.id) }}>DONE</button> }
                            </ButtonBox>
                        </>
                    )
                })
            }
        </>
    )
}

export default TodoList;