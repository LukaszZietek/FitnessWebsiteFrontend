import React from 'react';
import { Link } from 'react-router-dom';

import './MyAccountAside.css';

const MyAccountAside = () => {
    return (
        <div className="my-account-div">
            <Link to="/myaccount/change-password" className="aside-account-link">Zmień hasło</Link>
            <Link to="/myaccount/delete-account" className="aside-account-link">Usuń konto</Link>
        </div>
    );
};

export default MyAccountAside;