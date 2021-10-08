import React from 'react';
import { Link } from 'react-router-dom';

import '../AsideMenu.css';

import {CHANGE_PASSWORD_PATH, DELETE_ACCOUNT_PATH, MY_ACCOUNT_PATH, REPORT_PATH, ADD_PERSONAL_INFO_PATH} from '../../../common/Paths';

const MyAccountAside = () => {
    return (
        <div className="aside-div">
            <Link to={MY_ACCOUNT_PATH} className="aside-link">Informacje</Link>
            <Link to={CHANGE_PASSWORD_PATH} className="aside-link">Zmień hasło</Link>
            <Link to={ADD_PERSONAL_INFO_PATH} className="aside-link">Dodaj informacje</Link>
            <Link to={DELETE_ACCOUNT_PATH} className="aside-link">Usuń konto</Link>
            <Link to={REPORT_PATH} className="aside-link">Moje raporty</Link>
        </div>
    );
};

export default MyAccountAside;