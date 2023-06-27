import React from 'react';
import { usePopupClose } from '../hooks/usePopupClose';

function ImagePopup({ card, isOpen, closeAllPopups }) {

    usePopupClose(isOpen, closeAllPopups);

    return isOpen && (
        <div className="popup popup_type_pic popup_opened">
            <div className="popup__containter-pic">
                <img src={card.link} alt={card.name} className="popup__pic" />
                <h2 className="popup__text">{card.name}</h2>
                <button className="popup__close" type="button" onClick={closeAllPopups} />
            </div>
        </div>
    )
}

export default ImagePopup;