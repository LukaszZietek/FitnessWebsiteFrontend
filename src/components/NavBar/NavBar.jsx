import React, { useState } from 'react';
import LoginForm from '../LoginForm/LoginForm';

import './NavBar.css';

const NavBar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOnClose = () => setIsModalOpen(false);

    const handleOnClick = () => {
        setIsModalOpen(true);
    }

    return (
        <header className="header">
            <button className="header-button">POSIŁKI</button>
            <button className="header-button">AKTYWNOŚCI</button>
            <button className="header-button">RAPORTY</button>
            <div className="right-align">
                <button className="header-button" onClick={handleOnClick}>LOGOWANIE</button>
                <button className="header-button">MOJE KONTO</button>
            </div>
            <LoginForm handleOnClose={handleOnClose} isModalOpen={isModalOpen}/>
        </header>
    )
};

export default NavBar;
