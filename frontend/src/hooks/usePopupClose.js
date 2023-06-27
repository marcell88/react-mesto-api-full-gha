import React from "react";

export function usePopupClose(isOpen, closePopup) {

    function handleEscapePress(evt) {
        if (evt.key === 'Escape') {
            closePopup();
        }
    }

    const handleOverlay = (event) => {
        if (event.target.classList.contains("popup_opened")) {
            closePopup();
        }
    };

    React.useEffect(() => {
        if (!isOpen) return;
        document.addEventListener('keydown', handleEscapePress);
        document.addEventListener('mousedown', handleOverlay);
        return () => {
            document.removeEventListener('keydown', handleEscapePress);
            document.removeEventListener('mousedown', handleOverlay);
        };
    }, [isOpen])

}