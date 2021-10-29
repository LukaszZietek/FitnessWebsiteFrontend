import React, { useState, useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import LoginForm from '../LoginForm/LoginForm';

import './NavBar.css';

import logo from './logo.png';

import { MEALS_PATH, ACTIVITIES_PATH, REPORT_PATH, MY_ACCOUNT_PATH } from '../../common/Paths';
import { ApplicationContext } from '../../ApplicationContext/ApplicationProvider';
import RegisterForm from '../RegisterForm/RegisterForm';

const NavBar = () => {
    const { token, setToken, setUsername, setRole, setUserId } = useContext(ApplicationContext);
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

    const handleLogout = (e) => {
        setToken('');
        setUsername('');
        setRole('');
        setUserId('');
    }

    const userAccountNavBar = token ?
    (
        <div className="right-align">
            <NavLink activeClassName="navbar-active" to={MY_ACCOUNT_PATH} className="header-right-link">MOJE KONTO</NavLink>
            <button className="header-button" onClick={handleLogout}>WYLOGUJ</button>
        </div>
    ) : 
    (
        <div className="right-align">
            <button className="header-button" onClick={handleOnClick}>LOGOWANIE</button>
            <button className="header-button" onClick={handleOnClick}>REJESTRACJA</button>
        </div>
    )

    return (
            <header className="header">
                <Link to='' className="header-link"><img src={logo} alt="logo"/></Link>
                <NavLink activeClassName="navbar-active" to={MEALS_PATH} className="header-link">POSIŁKI</NavLink>
                <NavLink activeClassName="navbar-active" to={ACTIVITIES_PATH} className="header-link">AKTYWNOŚCI</NavLink>
                <NavLink activeClassName="navbar-active" to={REPORT_PATH} className="header-link">RAPORTY</NavLink>
                {userAccountNavBar}
                <LoginForm handleOnClose={handleOnLoginClose} isModalOpen={isLoginModalOpen}/>
                <RegisterForm handleOnClose={handleOnRegisterClose} isModalOpen={isRegisterModalOpen} />
            </header>
    )
};

export default NavBar;
