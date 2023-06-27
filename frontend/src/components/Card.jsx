import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card({card, onCardClick, onDeleteClick, onCardDelete, onCardLike}) {

    const currentUser = React.useContext(CurrentUserContext);
    const isOwner = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    function clickCard() {
        onCardClick(card);
    }

    function likeCard() {
        onCardLike(card);
    }

    function deleteCard() {
        onDeleteClick(card);
    }

    return (
        <div className="gallery__card">
            <img src={card.link} alt={card.name} className="gallery__pic" onClick={clickCard} />
            <div className="gallery__text-cont">
                <h2 className="gallery__text">{card.name}</h2>
                <div className="gallery__heart-cont">
                    <button className={`gallery__heart ${isLiked && "gallery__heart_active"}`} type="button" onClick={likeCard}/>
                    <p className="gallery__heart-likes">{card.likes.length}</p>
                </div>
            </div>
            <button className={`gallery__delete ${isOwner && "gallery__delete_displayed"}`} type="button" onClick={deleteCard} />
        </div>   
    )

}

export default Card;