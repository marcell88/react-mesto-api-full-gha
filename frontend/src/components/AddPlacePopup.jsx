import React from 'react';
import Input from './Input';
import PopupWithForm from './PopupWithForm';
import { useFormAndValidation } from '../hooks/useFormAndValidation';

function AddPlacePopup({ titleButton, isOpen, onClose, onAddPic }) {

    //Validation hook
    const validation = useFormAndValidation();

    //States and effects
    React.useEffect(() => {
        validation.resetForm(false, { 'pic-name': '', 'pic-link': '' });
    }, [isOpen]);

    //Callbacks
    const handleChange = (e) => {
        validation.handleChange(e);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddPic({
            name: validation.values['pic-name'],
            link: validation.values['pic-link'],
        });
    }

    return (

        <PopupWithForm
            name="add"
            title="Новое место"
            nameOfSubmit={titleButton}
            isOpen={isOpen}
            closeAllPopups={onClose}
            onSubmit={handleSubmit}
            isSubmitActive={validation.isValid}
        >

            <Input
                inputElement='popup__input'
                inputModificator='popup__input_type_pic-name'
                labelElement="popup__label"
                errorElement="popup__error"
                value={validation.values['pic-name']}
                onChange={handleChange}
                isError={!validation.isValid}
                errorText={validation.errors['pic-name']}
                type="text"
                name="pic-name"
                id="input-pic-name"
                placeholder="Название"
                required
                minLength="2"
                maxLength="30"
            />

            <Input
                inputElement='popup__input'
                inputModificator='popup__input_type_pic-link'
                labelElement="popup__label"
                errorElement="popup__error"
                value={validation.values['pic-link']}
                onChange={handleChange}
                isError={!validation.isValid}
                errorText={validation.errors['pic-link']}
                type="url"
                name="pic-link"
                id="input-pic-link"
                placeholder="Ссылка на картинку"
                required
            />

        </PopupWithForm>

    );
}

export default AddPlacePopup;