import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../LoginForm/LoginForm';

import './NavBar.css';

import logo from './logo.png';

import { MEALS_PATH, ACTIVITIES_PATH, REPORT_PATH, MY_ACCOUNT_PATH } from '../../common/Paths';
import RegisterForm from '../RegisterForm/RegisterForm';

const NavBar = () => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

    const handleOnLoginClose = () => setIsLoginModalOpen(false);
    const handleOnRegisterClose = () => setIsRegisterModalOpen(false);

    const handleOnClick = (e) => {
        if (e.target.innerText === "LOGOWANIE") {
            setIsLoginModalOpen(true);
        } else {
            setIsRegisterModalOpen(true);
        }
    }

    return (
            <header className="header">
                <Link to='' className="header-link"><img src={logo} alt="logo"/></Link>
                <Link to={MEALS_PATH} className="header-link">POSIŁKI</Link>
                <Link to={ACTIVITIES_PATH} className="header-link">AKTYWNOŚCI</Link>
                <Link to={REPORT_PATH} className="header-link">RAPORTY</Link>
                <div className="right-align">
                    <button className="header-button" onClick={handleOnClick}>LOGOWANIE</button>
                    <button className="header-button" onClick={handleOnClick}>REJESTRACJA</button>
                    <Link to={MY_ACCOUNT_PATH} className="header-right-link">MOJE KONTO</Link>
                </div>
                <LoginForm handleOnClose={handleOnLoginClose} isModalOpen={isLoginModalOpen}/>
                <RegisterForm handleOnClose={handleOnRegisterClose} isModalOpen={isRegisterModalOpen} />
            </header>
    )
};

export default NavBar;
