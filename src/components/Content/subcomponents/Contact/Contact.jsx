import React from 'react';

import './Contact.css';

import logo from '../../../NavBar/logo.png';


const Contact = () => {
    return (
        <div className="contact-container center-div">
            <div className="inner-contact-div">
                <h2>FITNESS WEBSITE</h2>
                <img src={logo} alt="logo" />
                <h1>Kontakt</h1>
                <h3>Adres: </h3> ul.Matejki xx/7 67-100 Nowa Sól
                <h3>Tel:</h3> +48 888 999 999
                <h3>Email: </h3> 249400@student.pwr.edu.pl
                <h3>Fax: </h3> 888 999 991
                <h3>Nawiązanie współpracy:</h3> lukaszzietekk@gmail.com
            </div>
        </div>
    );
};

export default Contact;