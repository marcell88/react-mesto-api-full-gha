import React from 'react';
import PopupWithForm from './PopupWithForm';

function SubmitCardDelete({titleButton, isOpen, onClose, onSubmitDelete, cardToDelete}) {

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmitDelete(cardToDelete);
    }

    return (

        <PopupWithForm 
            name="delete" 
            title="Вы уверены?" 
            nameOfSubmit={titleButton} 
            isOpen={isOpen} 
            closeAllPopups={onClose} 
            onSubmit={handleSubmit}
            isSubmitActive={true}
        />

    );
}

export default SubmitCardDelete;