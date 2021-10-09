import React, { useState, useRef } from 'react';

import './PasswordChanger.css';

import CreateSimpleReactValidator from '../../SimpleValidatorTranslation';

const PasswordChanger = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');
    const [, forceUpdate] = useState();
    const simpleValidator = useRef(CreateSimpleReactValidator(forceUpdate));
    simpleValidator.current.messages['in'] = 'Hasla powinny byc jednakowe';

    const handleOnOldPasswordChange = e => setOldPassword(e.target.value);
    const handleOnNewPasswordChange = e => setNewPassword(e.target.value);
    const handleOnRepeatedPasswordChange = e => setRepeatedPassword(e.target.value);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const formValid = simpleValidator.current.allValid();
        if (!formValid) {
            simpleValidator.current.showMessages();
            forceUpdate(1);
        } else {
            alert('Hasło zmienione');
            resetInputStates();
        }
    }

    const resetInputStates = () => {
        setOldPassword('');
        setNewPassword('');
        setRepeatedPassword('');
    }

    return (
        <div className="center-div">
            <h1>Zmień hasło</h1>
            <form className="password-changer-form" onSubmit={handleOnSubmit}>
                <div className="password-row">
                    <label className="password-label">
                        Poprzednie hasło:
                        <br/>
                        <input className="password-changer-input" type="password" value={oldPassword}
                            onChange={handleOnOldPasswordChange}/>
                        <p className="validator-message">{simpleValidator.current.message('poprzednie hasło', oldPassword, 'required|min:6,string|max:20,string|alpha_num_dash')}</p>
                    </label>
                </div>
                <div className="password-row">
                    <label className="password-label">
                        Nowe hasło:
                        <br/>
                        <input className="password-changer-input" type="password" value={newPassword}
                            onChange={handleOnNewPasswordChange}/>
                        <p className="validator-message">{simpleValidator.current.message('nowe hasło', newPassword, 'required|min:6,string|max:20,string|alpha_num_dash')}</p>
                    </label>
                </div>
                <div className="password-row">
                    <label className="password-label">
                        Powtórz hasło:
                        <br/>
                        <input className="password-changer-input" type="password" value={repeatedPassword}
                            onChange={handleOnRepeatedPasswordChange}/>
                        <p className="validator-message">{simpleValidator.current.message('powtórz hasło', repeatedPassword, `required|min:6,string|max:20,string|alpha_num_dash|in:${newPassword}`)}</p>
                    </label>
                </div>
                <div className="password-row">
                    <button type="submit" className="password-button">Zmień hasło</button>
                </div>
            </form>
        </div>
    );
};

export default PasswordChanger;