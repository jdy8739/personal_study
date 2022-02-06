import { useForm } from "react-hook-form";
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components"
import { Itodo, todoState, todoSelector, categoryState, Categories } from "../todos";
import CreateTodo from "../components/CreateTodo";
import TodoElem from "../components/Todo";
import React from "react";

const Container = styled.div`
    margin-top: 200px;
    text-align: center;
`;

function Todo() {

    const todos = useRecoilValue<Itodo[]>(todoState);
    const categorizedTodos = useRecoilValue(todoSelector);

    const [category, setCategory] = useRecoilState<Categories>(categoryState);

    const handleCategoryChange = (e: React.FormEvent<HTMLSelectElement>) => {
        setCategory(e.currentTarget.value as any);
    };

    return (
        <>  
            <Container>
                    <CreateTodo/>
                    <select onChange={ handleCategoryChange } value={ category }>
                        <option value={ Categories.TO_DO }>TO DO</option>
                        <option value={ Categories.DOING }>DOING</option>
                        <option value={ Categories.DONE }>DONE</option>
                    </select>
                <br></br>
                <ul>
                    {
                        categorizedTodos.map((todo, i) => {
                            return (
                                <>  
                                    <div key={ todo.id }>
                                        <TodoElem { ...todo }/>
                                    </div>
                                </>
                            )
                        })
                    }
                </ul>
            </Container>
        </>
    )
}

export default Todo;