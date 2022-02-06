
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { todoState, Itodo, categoryState } from '../todos';

const Warning = styled.span`
    color: red;
`;

function CreateTodo() {

    const { register, handleSubmit, setError, setValue, formState } = useForm<Itodo>();

    const setTodos = useSetRecoilState(todoState);

    const category = useRecoilValue(categoryState);

    function checkTodo(value: string) {
        const arr = value.split('');
        let cnt = 0;
        arr.forEach(i => {
            if(i === 'a' || i === 'c' || i === 'h') cnt ++;
        });
        return cnt > 0 ? "char 'a', 'c', 'h' is included!" : true
    };

    type A = (data: Itodo) => void;

    const saveTodo: A = function(data) {

        if(data?.text.length > 12) setError('text', { message: 'To-do is longer than 16!' }, { shouldFocus: true });

        setTodos((oldTodo) => [ ...oldTodo, { text: data.text, id: Date.now(), category: category as any } ]); //as any
        setValue('text', '');
    };

    return (
        <>
            <Warning>{ formState?.errors?.text?.message }</Warning>
            <br></br>
            <br></br>
            <form onSubmit={ handleSubmit(saveTodo) }>
                <input { ...register('text', 
                {   
                    required: 'Pls write down your todo.',
                    minLength: { 
                        value: 10, 
                        message: 'To-do must longer than 10!'
                    },
                    validate: {
                        noZero: value => {
                            return checkTodo(value);
                        }
                    }
                }) } placeholder="Write down your to-do!"/>
                &ensp;
                <button>add</button>
            </form>
        </>
    )
}

export default CreateTodo;