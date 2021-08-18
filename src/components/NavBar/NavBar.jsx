import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
                <Link to='meals' className="header-link">POSIŁKI</Link>
                <Link to="activities" className="header-link">AKTYWNOŚCI</Link>
                <Link to="reports" className="header-link">RAPORTY</Link>
                <div className="right-align">
                    <button className="header-button" onClick={handleOnClick}>LOGOWANIE</button>
                    <Link to="myaccount" className="header-right-link">MOJE KONTO</Link>
                </div>
                <LoginForm handleOnClose={handleOnClose} isModalOpen={isModalOpen}/>
            </header>
    )
};

export default NavBar;
