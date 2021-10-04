import React, { useState } from 'react';

import './AccountInformation.css';

const AccountInformation = () => {
    const [username, setUsername] = useState('Bogdan');
    const [email, setEmail] = useState('lukaszzietekk@gmail.com');
    const [date, setDate] = useState('1999-09-25');
    const [creationDate, setCreationDate] = useState('2021-10-04');

    return (
        <div className="center-div">
            <h1>Informacje o koncie</h1>
            <div className="account-grid">
                <div className="f-row f-column">
                    <p>Nazwa użytkownika:</p>
                    <input className="grid-input" type="text" value={username} disabled />
                </div>
                <div className="f-row s-column">
                    <p>Email</p>
                    <input className="grid-input" type="text" value={email} disabled />
                </div>
                <div className="s-row f-column">
                    <p>Data urodzenia:</p>
                    <input className="grid-input" type="date" value={date} disabled />
                </div>
                <div className="s-row s-column">
                    <p>Data utworzenia konta:</p>
                    <input className="grid-input" type="date" value={creationDate} disabled />
                </div>
            </div>
        </div>
    );
};

export default AccountInformation;