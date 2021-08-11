import React, { useState } from 'react';
import { useEffect } from 'react';

import Modal from '../Modal/Modal';

import './LoginForm.css';

const LoginForm = ({handleOnClose, isModalOpen}) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleOnLoginChange = e => setLogin(e.target.value);
    const handleOnPasswordChange = e => setPassword(e.target.value);
    const handleOnCloseModal = e => {
        e.preventDefault();
        handleOnClose();
    }

    const resetInputStates = () => {
        setLogin('');
        setPassword('');
    }

    const handleOnSubmit = e => {
        e.preventDefault();
        alert('Zalogowano');
    }

    useEffect(() => {
        if (isModalOpen) {
            resetInputStates();
        }
    }, [isModalOpen])


    return (
        <Modal handleOnClose={handleOnClose} isOpen={isModalOpen} shouldBeClosedOnOutsideClick={true}>
            <div className="sign-in-header">
                Logowanie
            </div>
            <form className="login-form" method="post" onSubmit={handleOnSubmit}>
                <div className="sign-in-row">
                    <label className="login-label">
                        Email lub nazwa użytkownika
                        <br/>
                        <input type="text" value={login} onChange={handleOnLoginChange} className="login-form-input"/>
                    </label>
                </div>
                <div className="sign-in-row">
                    <label className="login-label">
                        Hasło
                        <br/>
                        <input type="password" value={password} onChange={handleOnPasswordChange} className="login-form-input"/>
                    </label>
                </div>
                <div className="sign-in-row">
                    <button onClick={handleOnCloseModal} type="button" className="button cancel-button">Anuluj</button>
                    <button type="submit" className="button sign-in-button">Zaloguj</button>
                </div>
            </form>
        </Modal>
    )
}

export default LoginForm;