import React, { useState } from 'react';

import './PasswordChanger.css';

const PasswordChanger = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');

    const handleOnOldPasswordChange = e => setOldPassword(e.target.value);
    const handleOnNewPasswordChange = e => setNewPassword(e.target.value);
    const handleOnRepeatedPasswordChange = e => setRepeatedPassword(e.target.value);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        alert('Zmieniono hasło');
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
                    </label>
                </div>
                <div className="password-row">
                    <label className="password-label">
                        Nowe hasło:
                        <br/>
                        <input className="password-changer-input" type="password" value={newPassword}
                            onChange={handleOnNewPasswordChange}/>
                    </label>
                </div>
                <div className="password-row">
                    <label className="password-label">
                        Powtórz hasło:
                        <br/>
                        <input className="password-changer-input" type="password" value={repeatedPassword}
                            onChange={handleOnRepeatedPasswordChange}/>
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