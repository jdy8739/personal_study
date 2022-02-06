import { useForm } from "react-hook-form";
import styled from "styled-components"

interface UserForm {
    Email: string,
    Password: string,
    Password2: string,
    firstName: string,
    lastName: string
}

function LoginForm() {
    const { register, watch, handleSubmit, formState: { errors }, setError } = useForm<UserForm>({
        defaultValues: {
            Email: '@gmail.com'
        },
    });
    const onValid = (data: UserForm) => {
        const { Email, firstName, lastName } = watch();
        if(data.Password !== data.Password2) {
            setError('Password', 
            { message: 'Each Password does not match!' },
            { shouldFocus: true }
            )
        }
        
    };

    console.log(errors);
    return (
        <>
            <form onSubmit={ handleSubmit(onValid) }>
                <input { ...register('Email', 
                { 
                    required: 'Please. Input your Email.',
                    pattern: {
                        value: /^[A-Za-z0-9._%+-]+@gmail.com/g,
                        message: 'Only google mail available.'
                    }
                }) } 
                placeholder="email"
                />
                <span>{ errors?.Email?.message }</span>
                <br></br>
                <input { ...register('Password', 
                {
                    minLength: {
                        value: 12,
                        message: 'Password must be longer than 12.'
                    }
                }) } 
                placeholder="password"
                />
                <span>{ errors?.Password?.message }</span>
                <br></br>
                <input { ...register('Password2', 
                {
                    minLength: {
                        value: 12,
                        message: 'Password must be longer than 12.'
                    }
                }) } 
                placeholder="password2"
                />
                <br></br>
                <input { ...register('lastName') } placeholder="last name"/>
                <br></br>
                <input { ...register('firstName', 
                {
                    validate: {
                        noJack: function(value: string) {
                            return value.includes('jack') ? 'No Jack!' : true;
                        },
                        noNumber: function(value: string) {
                            return /^[0-9]/g ? 'No Number!' : true;
                        }
                    }
                }) } 
                placeholder="first name"
                />
                <span>{ errors?.firstName?.message }</span>
                <br></br>
                <button type="submit">submit</button>
            </form>
        </>
    )
}

export default LoginForm;