import React, { useState, useRef, useContext } from 'react';

import './PasswordChanger.css';

import CreateSimpleReactValidator from '../../SimpleValidatorTranslation';
import { useMutation } from 'react-query';
import { changeUserPassword } from '../../../../RequestHelper/RequestHelper';
import { ApplicationContext } from '../../../../ApplicationContext/ApplicationProvider';
import { NO_CONTENT } from '../../../../common/StatusCodes';

const PasswordChanger = () => {
    const { token } = useContext(ApplicationContext);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');
    const changePasswordQuery = useMutation(changeUserPassword);
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
            changePasswordQuery.mutate({ oldPassword, newPassword, token }, {onSuccess: (response) => {
                if (response.status === NO_CONTENT)
                {
                    alert('Hasło zmienione');
                    resetInputStates();
                } else {
                    alert(`Serwer wysłał odpowiedź ze statusem ${response.status}, spróbuj ponownie za chwile lub skontaktuj się z administratorem`);
                }
            }, onError: (error) => {
                alert(`Wystąpił błąd: ${error.message}, spróbuj wykonać operacje ponownie lub skontaktuj się z administratorem`);
            }})
        }
    }

    const resetInputStates = () => {
        setOldPassword('');
        setNewPassword('');
        setRepeatedPassword('');
        simpleValidator.current.hideMessages();
    }

    return (
        <div className="center-div">
            <h1>Zmień hasło</h1>
            <form className="password-changer-form" onSubmit={handleOnSubmit}>
                <div className="first-row f-column">
                    <label htmlFor="oldPassword" className="m-right-10">Poprzednie hasło</label>
                </div>
                <div className="first-row s-column">
                    <input id="oldPassword" className="password-changer-input" type="password" value={oldPassword}
                        onChange={handleOnOldPasswordChange}/>
                    <p className="validator-message">{simpleValidator.current.message('poprzednie hasło',
                        oldPassword, 'required|min:6,string|max:20,string|alpha_num_dash')}</p>
                </div>

                <div className="second-row f-column">
                    <label htmlFor="newPassword" className="m-right-10">Nowe hasło</label>
                </div>
                <div className="second-row s-column">
                    <input id="newPassword" className="password-changer-input" type="password" value={newPassword}
                        onChange={handleOnNewPasswordChange}/>
                    <p className="validator-message">{simpleValidator.current.message('nowe hasło',
                        newPassword, 'required|min:6,string|max:20,string|alpha_num_dash')}</p>
                </div>

                <div className="third-row f-column">
                    <label htmlFor="repeatedPassword" className="m-right-10">Powtórz hasło</label>
                </div>
                <div className="third-row s-column">
                    <input id="repeatedPassword" className="password-changer-input" type="password" value={repeatedPassword}
                        onChange={handleOnRepeatedPasswordChange}/>
                    <p className="validator-message">{simpleValidator.current.message('powtórz hasło',
                        repeatedPassword, `required|min:6,string|max:20,string|alpha_num_dash|in:${newPassword}`)}</p>
                </div>
                <div className="button-row">
                    <button type="submit" className="button add-button password-button">Zmień hasło</button>
                </div>
            </form>
        </div>
    );
};

export default PasswordChanger;