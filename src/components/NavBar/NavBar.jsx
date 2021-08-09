import React from 'react';

import './NavBar.css';

const NavBar = () => {
    return (
        <header className="header">
            <button className="header-button">POSIŁKI</button>
            <button className="header-button">AKTYWNOŚCI</button>
            <button className="header-button">RAPORTY</button>
            <div className="right-align">
                <button className="header-button">LOGOWANIE</button>
                <button className="header-button">MOJE KONTO</button>
            </div>
        </header>
    )
};

export default NavBar;
