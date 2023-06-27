import React from 'react';
import Input from './Input';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useFormAndValidation } from '../hooks/useFormAndValidation';

const Login = ({ handleLogin, navigateToRegister }) => {

    //Context
    const currentUser = React.useContext(CurrentUserContext);

    //Validation hook
    const validation = useFormAndValidation();

    //States and effects
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    React.useEffect(() => {
        validation.resetForm(true);
    }, [currentUser]);

    //Callbacks
    const handleEmailChange = (evt) => {
        setEmail(evt.target.value);
        validation.handleChange(evt);
    }

    const handlePasswordChange = (evt) => {
        setPassword(evt.target.value);
        validation.handleChange(evt);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin(password, email);
    }

    return (
        <section className="enter-form">
            <h2 className="enter-form__title">Вход</h2>
            <form className="enter-form__form" onSubmit={handleSubmit} noValidate>

                <Input
                    inputElement='enter-form__input'
                    inputModificator=''
                    labelElement="enter-form__label"
                    errorElement="enter-form__error"
                    value={email}
                    onChange={handleEmailChange}
                    isError={false}
                    errorText={''}
                    type="email"
                    name="email"
                    id="input-email"
                    placeholder="Email"
                    required
                />

                <Input
                    inputElement='enter-form__input'
                    inputModificator=''
                    labelElement="enter-form__label"
                    errorElement="enter-form__error"
                    value={password}
                    onChange={handlePasswordChange}
                    isError={false}
                    errorText={''}
                    type="password"
                    name="password"
                    id="input-pass"
                    placeholder="Пароль"
                    minLength="6"
                    maxLength="40"
                    required
                />

                <button className="enter-form__button" type="submit">Войти</button>

            </form>

            <button className="enter-form__footer-button"
                type="button"
                name="footer-button"
                onClick={navigateToRegister}
            >
                Нет аккаунта? Зарегистрируйтесь!
            </button>

        </section>
    )
}

export default Login; 