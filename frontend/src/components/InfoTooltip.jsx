import React from 'react';
import success from '../images/success.svg';
import failed from '../images/failed.svg';
import { usePopupClose } from '../hooks/usePopupClose';

function InfoTooltip({ isOpen, isRegistered, onClose }) {

    usePopupClose(isOpen, onClose);

    return isOpen && (
        <div className="popup popup_type_info-reg popup_opened">
            <div className="popup__containter-info-reg">
                <img
                    className={"popup__success-image"}
                    src={isRegistered ? success : failed}
                    alt="success or not"
                />
                <h2 className={"popup__success-description"}>{isRegistered ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h2>
                <button className="popup__close" type="button" onClick={onClose} />
            </div>
        </div>
    )
}

export default InfoTooltip;