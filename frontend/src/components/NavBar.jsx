import React, { useEffect } from 'react';

function NavBar({ email, button, handleButtonClick }) {

    return (
        <section className='header__navbar'>
            <p className="header__email">{email}</p>
            <button className="header__button" type="button" onClick={handleButtonClick}>
                {button}
            </button>
        </section>
    )

}

export default NavBar;