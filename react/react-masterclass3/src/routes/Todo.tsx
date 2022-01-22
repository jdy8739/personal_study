import { useForm } from "react-hook-form";
import styled from "styled-components"

const Container = styled.div`
    margin-top: 200px;
    text-align: center;
`;

const Warning = styled.span`
    color: red;
`;

interface Itodo {
    todo: string
}

function Todo() {

    const { register, handleSubmit, setValue, setError, formState, watch } = useForm<Itodo>();
    const errors = formState.errors;

    const saveTodo = function(data: Itodo) :void {

        if(data?.todo.length > 12) setError('todo', { message: 'To-do is longer than 16!' }, { shouldFocus: true });

        setValue('todo', '');
    };

    // console.log(watch());
    console.log(errors);

    function checkTodo(value: string) {
        const arr = value.split('');
        let cnt = 0;
        arr.forEach(i => {
            if(i === 'a' || i === 'c' || i === 'h') cnt ++;
        });
        return cnt > 0 ? "char 'a', 'c', 'h' is included!" : true
    };

    return (
        <>  
            <Container>
                <form onSubmit={ handleSubmit(saveTodo) }>
                    <input { ...register('todo', 
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
                <br></br>
                <Warning>{ errors?.todo?.message }</Warning>
            </Container>
        </>
    )
}

export default Todo;