import React, { useState } from 'react';
import { Link} from 'react-router-dom';

import './Footer.css';

const Footer = () => {
    const [nameAndSurname, setNameAndSurname] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [message, setMessage] = useState('');

    const handleOnNameAndSurnameChange = e => setNameAndSurname(e.target.value);
    const handleOnEmailAddressChange = e => setEmailAddress(e.target.value);
    const handleOnMessageChange = e => setMessage(e.target.value);
    const handleOnSubmit = (e) => {
        e.preventDefault();
        alert('Wiadomość wysłana');
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
                            <br/>
                            <input className="footer-column-element footer-input" type="text" placeholder="Email"
                                value={emailAddress} onChange={handleOnEmailAddressChange}/>
                            <br/>
                            <textarea className="footer-column-element footer-text-input" placeholder="Treść wiadomości..." value={message}
                                onChange={handleOnMessageChange} />
                            <br/>
                            <button className="footer-column-element-button" type="submit">Wyslij</button>
                    </form>
                </div>
                <div className="footer-column">
                    <p className="footer-column-header">MENU</p>
                    <div className="footer-column-content">
                        <Link to="about-us" className="footer-column-element">O nas</Link>
                    </div>
                    <div className="footer-column-content">
                        <Link to="contact" className="footer-column-element">Kontakt</Link>
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
