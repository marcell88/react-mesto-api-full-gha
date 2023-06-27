import React from 'react';
import { usePopupClose } from '../hooks/usePopupClose';

function PopupWithForm({ isSubmitActive, name, title, nameOfSubmit, isOpen, children, closeAllPopups, onSubmit }) {

    usePopupClose(isOpen, closeAllPopups);

    return isOpen && (
        <div className={`popup popup_type_${name} popup_opened`} >
            <div className="popup__containter">
                <h2 className="popup__title">{title}</h2>
                <button className="popup__close" type="button" onClick={closeAllPopups} />
                <form className="popup__form" name={`${name}-card-form`} onSubmit={onSubmit} noValidate>
                    {children}
                    <button
                        className={`popup__button ${isSubmitActive ? '' : 'popup__button_disabled'}`}
                        disabled={!isSubmitActive}
                        type="submit"
                    >
                        {nameOfSubmit}
                    </button>
                </form>
            </div>
        </div>
    )

}

export default PopupWithForm;