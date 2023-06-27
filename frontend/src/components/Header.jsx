import logoPath from '../images/header-logo.svg';

function Header({ email, button, handleButtonClick }) {

    return (

        <header className="header">
            <img className="header__logo" src={logoPath} alt="Логотип проекта Mesto Russia" />
            <div className="header__container">
                <p className="header__email">{email}</p>
                <button className="header__button" type="button" onClick={handleButtonClick}>
                    {button}
                </button>
            </div>
        </header>

    )

}

export default Header;