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
            <div className="modal-header">
                Logowanie
            </div>
            <form className="modal-form" method="post" onSubmit={handleOnSubmit}>
                <div className="modal-row">
                    <label className="modal-label">
                        Email lub nazwa użytkownika
                        <br/>
                        <input type="text" value={login} onChange={handleOnLoginChange} className="modal-input"/>
                    </label>
                </div>
                <div className="modal-row">
                    <label className="modal-label">
                        Hasło
                        <br/>
                        <input type="password" value={password} onChange={handleOnPasswordChange} className="modal-input"/>
                    </label>
                </div>
                <div className="modal-row">
                    <button onClick={handleOnCloseModal} type="button" className="button cancel-button">Anuluj</button>
                    <button type="submit" className="button sign-in-button">Zaloguj</button>
                </div>
            </form>
        </Modal>
    )
}

export default LoginForm;