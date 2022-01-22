import styled from "styled-components"
import { useForm } from "react-hook-form";

interface IForm {
    Email: string,
    Password: string,
    PasswordConfirm: string,
    Name: string,
    City: string,
    extraError?: string
}

type A = (a: IForm) => void;

function SignupForm() {
    const { register, watch, handleSubmit, formState: { errors }, setError } = useForm<IForm>({ defaultValues: { City: 'Seoul' } });
    // console.log(watch());

    // console.log(errors);

    const onValid: A = (data) => {

        // console.log(data);
        // setError('extraError', { message: 'Server down.' });
        
        if(data.Password !== data.PasswordConfirm) {
            setError('PasswordConfirm', { message: 'Password and Confirm do not match!' }, { shouldFocus: true });
        };
    }; 

    return (
        <>  
            <form onSubmit={ handleSubmit(onValid) }>
                <input { ...register('Email', { required: 'Email is required.', pattern: {
                    value: /^[A-Za-z0-9._%+-]+@naver.com$/,
                    message: 'Only @naver.com allowed.'
                }
                }) } placeholder="Email"/>
                <span>{ errors?.Email?.message }</span>
                <br></br>
                <input { ...register('Password', { required: 'Password required.', minLength: { value: 10, message: 'Password is too short!' } }) } placeholder="Password"/>
                <span>{ errors?.Password?.message }</span>
                <br></br>
                <input { ...register('PasswordConfirm', { required: 'Password Confirm required.', minLength: { value: 10, message: 'Password is too short!' } }) } placeholder="Password Confirm"/>
                <span>{ errors?.PasswordConfirm?.message }</span>
                <br></br>
                <input { ...register(
                    'Name', 
                    { required: 'Name is required.',
                        validate: {
                            noJack: (value) => value.includes('jack') ? 'No Jack allowed.' : true,
                            noKane: (value) => value.includes('kane') ? 'No kane allowed.' : true,
                        }
                    }) } placeholder="Name"/>
                <span>{ errors?.Name?.message }</span>
                <br></br>
                <input { ...register('City', { required: 'City is required.' }) } placeholder="City"/>
                <span>{ errors?.City?.message }</span>
                <br></br>
                <button>submit</button>
                <span>{ errors?.extraError?.message }</span>
            </form>
        </>
    )
}

export default SignupForm;