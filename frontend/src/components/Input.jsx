import React from 'react';

function Input({ inputElement, inputModificator, labelElement, errorElement,
    value, onChange, isError, errorText, defaultValue, refToInput, ...stdInputProps }) {

    return (
        <label className={`${labelElement}`}>
            <input className={`${inputElement} ${inputModificator}`}
                value={value}
                ref={refToInput}
                onChange={onChange}
                defaultValue={defaultValue}
                type={stdInputProps.type}
                name={stdInputProps.name}
                id={stdInputProps.id}
                placeholder={stdInputProps.placeholder}
                required={stdInputProps.required}
                minLength={stdInputProps.minLength}
                maxLength={stdInputProps.maxLength}
            />
            <span className={`${errorElement} ${isError ? `${errorElement}_visible` : ''}`}>{errorText}</span>
        </label>
    )

}

export default Input;

