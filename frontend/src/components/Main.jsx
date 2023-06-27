import React from 'react';
import Card from '../components/Card.jsx';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main({cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onDeleteClick, onCardDelete, onCardLike}) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        
        <main className="main">

            <section className="profile">
                <div className="profile__description">
                    <button className="profile__avatar" type="button" style={{ backgroundImage: `url(${currentUser.avatar})` }} onClick={onEditAvatar} />
                    <div className="profile__text-cont">
                        <div className="profile__name-cont">
                            <h1 className="profile__name">{currentUser.name}</h1>
                            <button className="profile__edit-button" type="button" onClick={onEditProfile} />    
                        </div>
                        <p className="profile__about">{currentUser.about}</p>
                    </div>
                </div>
                <button className="profile__add-button" type="button" onClick={onAddPlace} />
            </section>

            <section className="gallery">
                {cards.map( item => (
                    <Card 
                        card={item} 
                        onCardLike={onCardLike}
                        onDeleteClick={onDeleteClick} 
                        onCardDelete={onCardDelete}
                        onCardClick={onCardClick} 
                        key={item._id} 
                    />
                ))}
            </section>

        </main>
    )    

}

export default Main;