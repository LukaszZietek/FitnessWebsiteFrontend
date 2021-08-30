import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../LoginForm/LoginForm';

import './NavBar.css';

import logo from './logo.png';

import { MEALS_PATH, ACTIVITIES_PATH, REPORT_PATH, MY_ACCOUNT_PATH } from '../../common/Paths';

const NavBar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOnClose = () => setIsModalOpen(false);

    const handleOnClick = () => {
        setIsModalOpen(true);
    }

    return (
            <header className="header">
                <Link to='' className="header-link"><img src={logo} alt="logo"/></Link>
                <Link to={MEALS_PATH} className="header-link">POSIŁKI</Link>
                <Link to={ACTIVITIES_PATH} className="header-link">AKTYWNOŚCI</Link>
                <Link to={REPORT_PATH} className="header-link">RAPORTY</Link>
                <div className="right-align">
                    <button className="header-button" onClick={handleOnClick}>LOGOWANIE</button>
                    <Link to={MY_ACCOUNT_PATH} className="header-right-link">MOJE KONTO</Link>
                </div>
                <LoginForm handleOnClose={handleOnClose} isModalOpen={isModalOpen}/>
            </header>
    )
};

export default NavBar;
