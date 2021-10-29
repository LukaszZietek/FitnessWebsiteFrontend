import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from 'react-query';

import './Footer.css';

import { ABOUT_US_PATH, CONTACT_PATH } from '../../common/Paths';
import CreateSimpleReactValidator from '../Content/SimpleValidatorTranslation';
import { sendClientMessage } from '../../RequestHelper/RequestHelper';

const Footer = () => {
    const [, forceUpdate] = useState();
    const simpleValidator = useRef(CreateSimpleReactValidator(forceUpdate));
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [message, setMessage] = useState('');
    const addQuery = useMutation(sendClientMessage);

    const handleOnNameChange = e => setName(e.target.value);
    const handleOnSurnameChange = e => setSurname(e.target.value);
    const handleOnEmailAddressChange = e => setEmailAddress(e.target.value);
    const handleOnMessageChange = e => setMessage(e.target.value);
    const handleOnSubmit = (e) => {
        e.preventDefault();
        const formValid = simpleValidator.current.allValid();
        if (!formValid) {
            simpleValidator.current.showMessages();
            forceUpdate(1);
        } else {
            addQuery.mutate({clientName: name, clientSurname: surname, clientEmail: emailAddress, content: message});
            alert('Wiadomość wysłana, odpowiedź przyjdzie na maila');
            resetInputs();
        }
    }

    const resetInputs = () => {
        setName('');
        setSurname('');
        setEmailAddress('');
        setMessage('');
        simpleValidator.current.hideMessages();
    }

    return (
            <footer className="footer-class">
                <div className="footer-column first-row f-column">
                    <p className="footer-column-header">NAPISZ DO NAS</p>
                    <form className="footer-column-content" onSubmit={handleOnSubmit}>
                            <input className="footer-column-element footer-input" type="text" 
                                placeholder="Imie" value={name} onChange={handleOnNameChange}/>
                            <p className="validator-message">{simpleValidator.current.message('imie', name, 'required|max:15,string')}</p>

                            <input className="footer-column-element footer-input" type="text" 
                                placeholder="Nazwisko" value={surname} onChange={handleOnSurnameChange}/>
                            <p className="validator-message">{simpleValidator.current.message('nazwisko', surname, 'required|max:15,string')}</p>

                            <input className="footer-column-element footer-input" type="text" placeholder="Email"
                                value={emailAddress} onChange={handleOnEmailAddressChange}/>
                            <p className="validator-message">{simpleValidator.current.message('email', emailAddress, 'required|email')}</p>

                            <textarea className="footer-column-element footer-text-input" placeholder="Treść wiadomości..." value={message}
                                onChange={handleOnMessageChange} />
                            <p className="validator-message">{simpleValidator.current.message('treść wiadomości', message , 'required|min:20,string|max:250,string')}</p>
                            <button className="footer-column-element-button" type="submit">Wyslij</button>
                    </form>
                </div>
                <div className="footer-column first-row s-column">
                    <p className="footer-column-header">MENU</p>
                    <div className="footer-column-content">
                        <Link to={ABOUT_US_PATH} className="footer-column-element">O nas</Link>
                    </div>
                    <div className="footer-column-content">
                        <Link to={CONTACT_PATH} className="footer-column-element">Kontakt</Link>
                    </div>
                </div>
                <div className="footer-column first-row t-column">
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
