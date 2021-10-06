import React, { useState, useRef, useEffect } from 'react';

import Modal from '../Modal/Modal';
import CreateSimpleReactValidator from '../Content/SimpleValidatorTranslation';

import { getPreviousCenturyDate, getMaxBirthDate, checkIfDateIsBetweenTwoDates } from '../DateUtilities';

const RegisterForm = ({handleOnClose, isModalOpen}) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [ifBirthDateWrong, setIfBirthDateWrong] = useState(false);
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');

    const [, forceUpdate] = useState();
    const simpleValidator = useRef(CreateSimpleReactValidator(forceUpdate));
    simpleValidator.current.messages['in'] = 'Hasla powinny byc jednakowe';

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
        const formValid = simpleValidator.current.allValid();
        if (!formValid) {
            simpleValidator.current.showMessages();
            forceUpdate(1);
        } else {
            alert('Konto założone');
            resetInputStates();
        }
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
                        <p className="validator-message">{simpleValidator.current.message('nazwa użytkownika', username, 'required|min:5,string|max:20,string')}</p>
                    </label>
                </div>
                <div className="modal-row">
                    <label className="modal-label">
                        Email:
                        <br/>
                        <input type="text" value={email} onChange={handleOnEmailChange} className="modal-input"/>
                        <p className="validator-message">{simpleValidator.current.message('email', email, 'required|email')}</p>
                    </label>
                </div>
                <div className="modal-row">
                    <label className="modal-label">
                        Data urodzenia:
                        <br/>
                        <input type="date" value={birthDate} onChange={handleOnBirthDateChange} 
                            min={getPreviousCenturyDate()} max={getMaxBirthDate()} />
                        {ifBirthDateWrong && <p className="validator-message">Podano złą date urodzenia</p> /* tutaj nie jestem pewien co do tej walidacji daty urodzenia */}
                    </label>
                    <br/>
                </div>
                <div className="modal-row">
                    <label className="modal-label">
                        Hasło:
                        <br/>
                        <input type="password" value={password} onChange={handleOnPasswordChange} className="modal-input"/>
                        <p className="validator-message">{simpleValidator.current.message('hasło', password, 'required|min:6,string|max:20,string|alpha_num_dash')}</p>
                    </label>
                </div>
                <div className="modal-row">
                    <label className="modal-label">
                        Powtórz hasło:
                        <br/>
                        <input type="password" value={repeatedPassword} onChange={handleOnRepeatedPasswordChange}
                            className="modal-input"/>
                        {console.log(simpleValidator)}
                        <p className="validator-message">{simpleValidator.current.message('powtórz hasło', repeatedPassword, `required|min:6,string|max:20,string|alpha_num_dash|in:${password}`)}</p>
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