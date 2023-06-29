import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { Route, Routes, useNavigate } from 'react-router-dom';

import HeaderLoggedIn from './HeaderLoggedIn.jsx';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import EditProfilePopup from './EditProfilePopup.jsx';
import EditAvatarPopup from './EditAvatarPopup.jsx';
import AddPlacePopup from './AddPlacePopup.jsx';
import SubmitCardDelete from './SubmitCardDelete.jsx';
import InfoTooltip from './InfoTooltip.jsx';
import ImagePopup from './ImagePopup.jsx';
import ProtectedRouteElement from './ProtectedRouteElement.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';

import Api from '../utils/api.js';
import * as auth from '../utils/auth.js';

import { SERVER_BASE_URL } from '../utils/serverConnections.js'

function App() {

    //States

    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
    const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = React.useState(false);

    const [api, setApi] = React.useState({});
    const [selectedCard, setSelectedCard] = React.useState({ link: '', name: '' });
    const [currentUser, setCurrentUser] = React.useState({ about: '', name: '' });
    const [cardToDelete, setCardToDelete] = React.useState({ link: '', name: '' });
    const [cards, setCards] = React.useState([]);

    const [isLoggedIn, setLoggedIn] = React.useState(false);
    const [isLoading, setLoading] = React.useState(false);
    const [isLoadingPopup, setIsLoadingPopup] = React.useState(false);

    const [userEmail, setUserEmail] = React.useState('');
    const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
    const [isRegistrationSuccessful, setRegistrationSuccessful] = React.useState(false);

    //Effects
    React.useEffect(() => {
        if (Object.keys(api).length > 0) {
            api.getUserInfo()
                .then(user => {
                    if (user) {
                        setCurrentUser(user);
                    }
                })
                .catch(err => { console.log(err) });
        }
    }, [api]);

    React.useEffect(() => {
        if (Object.keys(api).length > 0) {
            api.getInitialCards()
                .then(cards => {
                    setCards(cards.reverse());
                })
                .catch(err => { console.log(err) });
        }
    }, [api]);

    React.useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            setLoading(true);
            auth.checkToken(jwt)
                .then(res => {
                    setLoggedIn(true);
                    setUserEmail(res.email);
                    setApi(new Api({
                        baseUrl: SERVER_BASE_URL,
                        headers: {
                            authorization: `Bearer ${localStorage.getItem('jwt')}`,
                            'Content-Type': 'application/json'
                        }
                    }));
                    navigate('/');
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => { setLoading(false) })
        }
    }, []);

    //Callbacks
    const handleEditAvatarClick = () => {
        setEditAvatarPopupOpen(true);
    }

    const handleEditProfileClick = () => {
        setEditProfilePopupOpen(true);
    }

    const handleAddPlaceClick = () => {
        setAddPlacePopupOpen(true);
    }

    const handleDeleteCardClick = (card) => {
        setDeleteCardPopupOpen(true);
        setCardToDelete(card);
    }

    const handleCardDelete = (card) => {
        const isOwner = card.owner._id === currentUser._id;
        setIsLoadingPopup(true);
        if (isOwner) {
            api.deleteCard(card._id)
                .then(data => {
                    setCards(cards.filter(c => c._id !== card._id));
                    closeAllPopups();
                })
                .catch(err => { console.log(err) })
                .finally(() => setIsLoadingPopup(false))
        }
    }

    const handleCardClick = (card) => {
        setSelectedCard(card);
    }

    const handleCardLike = (card) => {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked).then(newCard => {
            setCards(cards.map(c => c._id === card._id ? newCard : c));
        })
            .catch(err => { console.log(err) });
    }

    const handleUpdateUser = (user) => {
        setIsLoadingPopup(true);
        api.editProfile(user)
            .then(data => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch(err => { console.log(err) })
            .finally(() => setIsLoadingPopup(false))
    }

    const handleUpdateAvatar = (user) => {
        setIsLoadingPopup(true);
        api.editAvatar(user)
            .then(data => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch(err => { console.log(err) })
            .finally(() => setIsLoadingPopup(false))
    }

    const handleAddPlaceSubmit = ({ name, link }) => {
        setIsLoadingPopup(true);
        api.addNewCard({ name, link })
            .then(newCard => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch(err => { console.log(err) })
            .finally(() => setIsLoadingPopup(false))
    }

    const closeAllPopups = () => {
        setEditAvatarPopupOpen(false);
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setDeleteCardPopupOpen(false);
        setInfoTooltipOpen(false);
        setRegistrationSuccessful(false);
        setSelectedCard({ link: '', name: '' });
        setCardToDelete({ link: '', name: '' });
    }

    //Navigation
    const navigate = useNavigate();
    const navigateToLogin = () => {
        navigate('/sign-in');
    }
    const navigateToRegister = () => {
        navigate('/sign-up');
    }

    //Auth
    const handleLogin = (password, email) => {
        auth.authorization(password, email)
            .then(res => {
                localStorage.setItem('jwt', res.token);
                setLoggedIn(true);
                setUserEmail(email);
                navigate('/');
                setApi(new Api({
                    baseUrl: SERVER_BASE_URL,
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('jwt')}`,
                        'Content-Type': 'application/json'
                    }
                }));
            })
            .catch(err => {
                setRegistrationSuccessful(false);
                setInfoTooltipOpen(true);
                console.log(err);
            })
    }

    const handleRegister = (password, email) => {
        auth.register(password, email)
            .then(res => {
                navigate('/sign-in');
                setRegistrationSuccessful(true);
            })
            .catch(err => {
                setRegistrationSuccessful(false);
                console.log(err);
            })
            .finally(() => { setInfoTooltipOpen(true) })
    }

    const handleLogOut = () => {
        localStorage.removeItem('jwt');
        setLoggedIn(false);
        setApi({});
        navigate('/sign-in');
    }

    if (isLoading) return (
        <>
            <Header email="" button="" handleButtonClick={() => { }} />
            <div className='loader' />
        </>
    )

    //App
    return (

        <CurrentUserContext.Provider value={currentUser}>

            <div className="page">

                {/* Main pages*/}

                <Routes>
                    <Route path="/" element={<HeaderLoggedIn email={userEmail} button="Выйти" handleButtonClick={handleLogOut} />} />
                    <Route path="/sign-in" element={<Header email="" button="Регистрация" handleButtonClick={navigateToRegister} />} />
                    <Route path="/sign-up" element={<Header email="" button="Вoйти" handleButtonClick={navigateToLogin} />} />
                </Routes>

                <Routes>
                    <Route path="/" element={<ProtectedRouteElement
                        element={Main}
                        loggedIn={isLoggedIn}
                        cards={cards}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onCardClick={handleCardClick}
                        onDeleteClick={handleDeleteCardClick}
                        onCardDelete={handleCardDelete}
                        onCardLike={handleCardLike}
                    />} />
                    <Route path="/sign-in" element={<Login handleLogin={handleLogin} navigateToRegister={navigateToRegister} />} />
                    <Route path="/sign-up" element={<Register handleRegister={handleRegister} navigateToLogin={navigateToLogin} />} />
                </Routes>

                <Routes>
                    <Route path="/" element={<Footer />} />
                    <Route path="/sign-in" element={<></>} />
                    <Route path="/sign-up" element={<></>} />
                </Routes>

                {/* Popups*/}

                <InfoTooltip
                    isOpen={isInfoTooltipOpen}
                    isRegistered={isRegistrationSuccessful}
                    onClose={closeAllPopups}
                />

                <EditProfilePopup
                    titleButton={isLoadingPopup ? "Сохранение..." : "Сохранить"}
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />

                <AddPlacePopup
                    titleButton={isLoadingPopup ? "Создание..." : "Создать"}
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPic={handleAddPlaceSubmit}
                />

                <EditAvatarPopup
                    titleButton={isLoadingPopup ? "Сохранение..." : "Сохранить"}
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />

                <SubmitCardDelete
                    titleButton={isLoadingPopup ? "Удаление..." : "Удалить"}
                    isOpen={isDeleteCardPopupOpen}
                    onClose={closeAllPopups}
                    onSubmitDelete={handleCardDelete}
                    cardToDelete={cardToDelete}
                />

                {(selectedCard.name !== '' && selectedCard.link !== '') && <ImagePopup
                    card={selectedCard}
                    isOpen={Object.keys(selectedCard).length > 0}
                    closeAllPopups={closeAllPopups}
                />}

            </div>

        </CurrentUserContext.Provider>

    );
}

export default App;
