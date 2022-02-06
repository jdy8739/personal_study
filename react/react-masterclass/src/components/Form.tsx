import React, { useState } from "react";


function Form() {
    const [value, setValue] = useState('');

    const handleOnChange = (event: React.FormEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value);
    };

    const handleOnSubmit = function(event: React.FormEvent<HTMLFormElement>) :void {
        event.preventDefault();
        console.log(value);
        setValue('');
    };

    return (
        <>
            <form onSubmit={ handleOnSubmit }>
                <input onChange={ handleOnChange } value={ value }/>
            </form>
        </>
    )
}

export default Form;