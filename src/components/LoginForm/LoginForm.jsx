import React, { useState, useEffect, useContext } from 'react';
import { useMutation } from 'react-query';

import Modal from '../Modal/Modal';

import './LoginForm.css';

import { authorizeUser } from '../../RequestHelper/RequestHelper';
import { ApplicationContext } from '../../ApplicationContext/ApplicationProvider';

const LoginForm = ({handleOnClose, isModalOpen}) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const {setToken, setRole, setUsername} = useContext(ApplicationContext);
    const loginQuery = useMutation(authorizeUser, { onSuccess: ({data}) => {
        setToken(data.token);
        setRole(data.role);
        setUsername(data.username);
        console.log(data);
    }});

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
        loginQuery.mutate({login, password});
        alert('Zalogowano');
        handleOnClose();
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
                    <button type="submit" className="button add-button">Zaloguj</button>
                </div>
            </form>
        </Modal>
    )
}

export default LoginForm;