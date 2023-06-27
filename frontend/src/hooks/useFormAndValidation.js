import React from "react";

export function useFormAndValidation() {
    const [ values, setValues ] = React.useState({}); //nameOfInput: valueOfInput
    const [ errors, setErrors ] = React.useState({}); //nameOfInput: errorMeassage
    const [ isValid, setIsValid ] = React.useState(true); //status of all form (true or false)

    const handleChange = (e) => {
        //e.target -> input where chage occured
        const {name, value} = e.target

        //add values and error messages to the arrays of inputs, status - for all form
        setValues({...values, [name]: value });
        setErrors({...errors, [name]: e.target.validationMessage});
        setIsValid(e.target.closest('form').checkValidity());
    };

    //reset form validation
    const resetForm = React.useCallback((newIsValid = false, newValues = {}, newErrors = {}) => {
        setValues(newValues);
        setErrors(newErrors);
        setIsValid(newIsValid);
    }, [setValues, setErrors, setIsValid]);

    return { values, errors, isValid, handleChange, resetForm, setValues, setIsValid };

}