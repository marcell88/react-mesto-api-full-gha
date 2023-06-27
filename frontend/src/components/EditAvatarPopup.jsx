import React from 'react';
import PopupWithForm from './PopupWithForm';
import Input from './Input';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useFormAndValidation } from '../hooks/useFormAndValidation';

function EditAvatarPopup({ titleButton, isOpen, onClose, onUpdateAvatar }) {
    const currentUser = React.useContext(CurrentUserContext);
    const inputAvatarRef = React.useRef();

    //Validation hook
    const validation = useFormAndValidation();

    React.useEffect(() => {
        validation.resetForm(true);
    }, [isOpen]);

    //Callbacks
    const handleChange = (e) => {
        validation.handleChange(e);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const inputAvatar = inputAvatarRef.current;
        onUpdateAvatar({ avatar: inputAvatar.value });
    }

    return (
        <PopupWithForm
            name="ava"
            title="Обновить аватар"
            nameOfSubmit={titleButton}
            isOpen={isOpen}
            closeAllPopups={onClose}
            isSubmitActive={validation.isValid}
            onSubmit={handleSubmit}
        >

            <Input
                inputElement='popup__input'
                inputModificator='popup__input_type_ava-link'
                labelElement="popup__label"
                errorElement="popup__error"
                defaultValue={currentUser.avatar}
                refToInput={inputAvatarRef}
                isError={!validation.isValid}
                errorText={validation.errors['ava-link']}
                onChange={handleChange}
                type="url"
                name="ava-link"
                id="input-ava-link"
                placeholder="Ссылка на картинку"
                required
            />

        </PopupWithForm>
    );
}

export default EditAvatarPopup;