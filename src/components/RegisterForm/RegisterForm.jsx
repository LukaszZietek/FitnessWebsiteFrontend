import React, { useState } from 'react';
import { useEffect } from 'react';

import Modal from '../Modal/Modal';

import { getPreviousCenturyDate, getMaxBirthDate, checkIfDateIsBetweenTwoDates } from '../DateUtilities';

const RegisterForm = ({handleOnClose, isModalOpen}) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [ifBirthDateWrong, setIfBirthDateWrong] = useState(false);
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');

    const handleOnUsernameChange = e => setUsername(e.target.value);
    const handleOnEmailChange = e => setEmail(e.target.value);
    const handleOnPasswordChange = e => setPassword(e.target.value);
    const handleOnRepeatedPasswordChange = e => setRepeatedPassword(e.target.value);

    const handleOnBirthDateChange = e => {
        if(checkIfDateIsBetweenTwoDates(getPreviousCenturyDate(), getMaxBirthDate(), e.target.value)) {
            setBirthDate(e.target.value);
            setIfBirthDateWrong(false);
        } else {
            setBirthDate(getMaxBirthDate());
            setIfBirthDateWrong(true);
        }
    }

    const resetInputStates = () => {
        setUsername('');
        setEmail('');
        setBirthDate('');
        setIfBirthDateWrong('');
        setPassword('');
        setRepeatedPassword('');
    }
    
    const handleOnCloseModal = e => {
        e.preventDefault();
        handleOnClose();
    }

    const handleOnSubmit = e => {
        e.preventDefault();
        alert('Konto założone');
        resetInputStates();
    }

    useEffect(() => {
        if (isModalOpen) {
            resetInputStates();
        }
    }, [isModalOpen]);

    return (
        <Modal handleOnClose={handleOnClose} isOpen={isModalOpen} shouldBeClosedOnOutsideClick={false}>
            <div className="modal-header">
                Rejestracja
            </div>
            <form className="modal-form" method="post" onSubmit={handleOnSubmit}>
                <div className="modal-row">
                    <label className="modal-label">
                        Nazwa użytkownika:
                        <br/>
                        <input type="text" value={username} onChange={handleOnUsernameChange} className="modal-input"/>
                    </label>
                </div>
                <div className="modal-row">
                    <label className="modal-label">
                        Email:
                        <br/>
                        <input type="text" value={email} onChange={handleOnEmailChange} className="modal-input"/>
                    </label>
                </div>
                <div className="modal-row">
                    <label className="modal-label">
                        Data urodzenia:
                        <br/>
                        <input type="date" value={birthDate} onChange={handleOnBirthDateChange} 
                            min={getPreviousCenturyDate()} max={getMaxBirthDate()} />
                    </label>
                    <br/>
                    {ifBirthDateWrong && <p>Podano złą date</p>}
                </div>
                <div className="modal-row">
                    <label className="modal-label">
                        Hasło:
                        <br/>
                        <input type="password" value={password} onChange={handleOnPasswordChange} className="modal-input"/>
                    </label>
                </div>
                <div className="modal-row">
                    <label className="modal-label">
                        Powtórz hasło:
                        <br/>
                        <input type="password" value={repeatedPassword} onChange={handleOnRepeatedPasswordChange}
                            className="modal-input"/>
                    </label>
                </div>
                <div className="modal-row">
                    <button onClick={handleOnCloseModal} type="button" className="button cancel-button">Anuluj</button>
                    <button type="submit" className="button add-button">Zarejestruj</button>
                </div>
            </form>
        </Modal>
    );
};

export default RegisterForm;