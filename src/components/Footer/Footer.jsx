import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import './Footer.css';

import { ABOUT_US_PATH, CONTACT_PATH } from '../../common/Paths';
import CreateSimpleReactValidator from '../Content/SimpleValidatorTranslation';

const Footer = () => {
    const [, forceUpdate] = useState();
    const simpleValidator = useRef(CreateSimpleReactValidator(forceUpdate));
    const [nameAndSurname, setNameAndSurname] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [message, setMessage] = useState('');

    const handleOnNameAndSurnameChange = e => setNameAndSurname(e.target.value);
    const handleOnEmailAddressChange = e => setEmailAddress(e.target.value);
    const handleOnMessageChange = e => setMessage(e.target.value);
    const handleOnSubmit = (e) => {
        e.preventDefault();
        const formValid = simpleValidator.current.allValid();
        if (!formValid) {
            simpleValidator.current.showMessages();
            forceUpdate(1);
        } else {
            alert('Wiadomość wysłana, odpowiedź przyjdzie na maila');
            resetInputs();
        }
    }

    const resetInputs = () => {
        setNameAndSurname('');
        setEmailAddress('');
        setMessage('');
    }

    return (
            <footer className="footer-class">
                <div className="footer-column">
                    <p className="footer-column-header">NAPISZ DO NAS</p>
                    <form className="footer-column-content" onSubmit={handleOnSubmit}>
                            <input className="footer-column-element footer-input" type="text" 
                                placeholder="Imie i Nazwisko" value={nameAndSurname} onChange={handleOnNameAndSurnameChange}/>
                            <p className="validator-message">{simpleValidator.current.message('imie i nazwisko', nameAndSurname, 'required')}</p>
                            <input className="footer-column-element footer-input" type="text" placeholder="Email"
                                value={emailAddress} onChange={handleOnEmailAddressChange}/>
                            <p className="validator-message">{simpleValidator.current.message('email', emailAddress, 'required|email')}</p>
                            <textarea className="footer-column-element footer-text-input" placeholder="Treść wiadomości..." value={message}
                                onChange={handleOnMessageChange} />
                            <p className="validator-message">{simpleValidator.current.message('treść wiadomości',message , 'required|min:20,num|max:250,num')}</p>
                            <button className="footer-column-element-button" type="submit">Wyslij</button>
                    </form>
                </div>
                <div className="footer-column">
                    <p className="footer-column-header">MENU</p>
                    <div className="footer-column-content">
                        <Link to={ABOUT_US_PATH} className="footer-column-element">O nas</Link>
                    </div>
                    <div className="footer-column-content">
                        <Link to={CONTACT_PATH} className="footer-column-element">Kontakt</Link>
                    </div>
                </div>
                <div className="footer-column">
                    <p className="footer-column-header">DANE ADRESOWE</p>
                    <div className="footer-column-content">
                        adres: Matejki xx/7, 67-100 Nowa Sól
                        <br/>
                        tel. +48 888 999 999
                        <br/>
                        email: 249400@student.pwr.edu.pl
                    </div>
                </div>
            </footer>
    )
};

export default Footer;
