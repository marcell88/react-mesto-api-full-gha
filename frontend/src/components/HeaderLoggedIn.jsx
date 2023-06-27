import React, { useEffect } from 'react';
import Header from './Header';
import NavBar from './NavBar';
import openMenu from '../images/openMenu.svg';
import closeMenu from '../images/close.svg';


function HeaderLoggedIn({ email, button, handleButtonClick }) {

    //States
    const [isMenuOpen, setMenuOpen] = React.useState(false);
    const [windowWidth, setWindowWidth] = React.useState(0);
    useEffect(() => {
        setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => { window.removeEventListener("resize", handleResize); }
    }, [])

    //Callback
    const handleButtonNarrowClick = () => {
        setMenuOpen(!isMenuOpen);
    }

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    }

    return windowWidth > 600
        ? (<Header email={email} button={button} handleButtonClick={handleButtonClick} />)
        : (
            <>
                {isMenuOpen && <NavBar email={email} button={button} handleButtonClick={handleButtonClick} />}
                <Header
                    email=""
                    button={(<img
                        className={isMenuOpen ? "header__close-menu" : "header__open-menu"}
                        src={isMenuOpen ? closeMenu : openMenu}
                        alt="Menu"
                    />)}
                    handleButtonClick={handleButtonNarrowClick}
                />
            </>
        )

}

export default HeaderLoggedIn;