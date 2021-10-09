import React, { useState, useEffect } from 'react';

import './AccountInformation.css';

const AccountInformation = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');
    const [creationDate, setCreationDate] = useState('');
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [gender, setGender] = useState('man');

    const translateGender = {
        'man': 'Męzczyzna',
        'woman': 'Kobieta'
    }

    useEffect(() => {
        setUsername('Bogdan');
        setEmail('lukaszzietekk@gmail.com');
        setDate('1999-09-25');
        setCreationDate('2021-10-04');
        setHeight(160);
        setWeight(90);
        setGender('man');
    }, [])

    return (
        <div className="center-div">
            <h1>Informacje o koncie</h1>
            <div className="account-grid">
                <div className="first-row f-column">
                    <p>Nazwa użytkownika:</p>
                    <input className="grid-input" type="text" value={username} disabled />
                </div>
                <div className="first-row s-column">
                    <p>Email</p>
                    <input className="grid-input" type="text" value={email} disabled />
                </div>
                <div className="second-row f-column">
                    <p>Data urodzenia:</p>
                    <input className="grid-input" type="date" value={date} disabled />
                </div>
                <div className="second-row s-column">
                    <p>Data utworzenia konta:</p>
                    <input className="grid-input" type="date" value={creationDate} disabled />
                </div>
                <div className="third-row f-column">
                    <p>Wzrost [cm]:</p>
                    <input className="grid-input" type="text" value={height} disabled />
                </div>
                <div className="third-row s-column">
                    <p>Waga [kg]:</p>
                    <input className="grid-input" type="text" value={weight} disabled />
                </div>
                <div className="fourth-row f-column">
                    <p>Płeć:</p>
                    <input className="grid-input" type="text" value={translateGender[`${gender}`]} disabled />
                </div>
            </div>
        </div>
    );
};

export default AccountInformation;