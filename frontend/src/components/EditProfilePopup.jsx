import React from 'react';
import PopupWithForm from './PopupWithForm';
import Input from './Input';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useFormAndValidation } from '../hooks/useFormAndValidation';

function EditProfilePopup({ titleButton, isOpen, onClose, onUpdateUser }) {

    //Context
    const currentUser = React.useContext(CurrentUserContext);

    //Validation hook
    const validation = useFormAndValidation();

    //States and effects
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
        validation.resetForm(true);
    }, [currentUser, isOpen]);

    //Callbacks
    const handleNameChange = (evt) => {
        setName(evt.target.value);
        validation.handleChange(evt);
    }

    const handleAboutChange = (evt) => {
        setDescription(evt.target.value);
        validation.handleChange(evt);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (

        <PopupWithForm
            name="edit"
            title="Редактировать профиль"
            nameOfSubmit={titleButton}
            isOpen={isOpen}
            closeAllPopups={onClose}
            isSubmitActive={validation.isValid}
            onSubmit={handleSubmit}
        >

            <Input
                inputElement='popup__input'
                inputModificator='popup__input_type_name'
                labelElement="popup__label"
                errorElement="popup__error"
                value={name}
                onChange={handleNameChange}
                isError={!validation.isValid}
                errorText={validation.errors.name}
                type="text"
                name="name"
                id="input-name"
                placeholder="Ваше имя"
                required
                minLength="2"
                maxLength="40"
            />

            <Input
                inputElement='popup__input'
                inputModificator='popup__input_type_job'
                labelElement="popup__label"
                errorElement="popup__error"
                value={description}
                onChange={handleAboutChange}
                isError={!validation.isValid}
                errorText={validation.errors.job}
                type="text"
                name="job"
                id="input-job"
                placeholder="Расскажите о себе"
                required
                minLength="2"
                maxLength="200"
            />

        </PopupWithForm>

    );
}

export default EditProfilePopup;