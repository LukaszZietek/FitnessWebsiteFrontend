import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import '../AsideMenu.css';

import {CHANGE_PASSWORD_PATH, DELETE_ACCOUNT_PATH, MY_ACCOUNT_PATH, REPORT_PATH, ADD_PERSONAL_INFO_PATH,
     MESSAGES_FROM_CLIENT, ADD_NEW_ACTIVITY_TYPE_PATH, DELETE_ACTIVITY_TYPE_PATH} from '../../../common/Paths';
import { ApplicationContext } from '../../../ApplicationContext/ApplicationProvider';
import { ADMIN } from '../../../common/UserRole';

const MyAccountAside = () => {
    const { role } = useContext(ApplicationContext);

    const adminOptions = role === ADMIN ? (
        <>
            <Link to={MESSAGES_FROM_CLIENT} className="aside-link">Zgłoszenia</Link>
            <Link to={ADD_NEW_ACTIVITY_TYPE_PATH} className="aside-link">Dodaj typ aktywności</Link>
            <Link to={DELETE_ACTIVITY_TYPE_PATH} className="aside-link">Usuń typ aktywności</Link>
        </>
    ) : null;

    return (
        <div className="aside-div">
            <Link to={MY_ACCOUNT_PATH} className="aside-link">Informacje</Link>
            <Link to={CHANGE_PASSWORD_PATH} className="aside-link">Zmień hasło</Link>
            <Link to={ADD_PERSONAL_INFO_PATH} className="aside-link">Dodaj informacje</Link>
            <Link to={DELETE_ACCOUNT_PATH} className="aside-link">Usuń konto</Link>
            <Link to={REPORT_PATH} className="aside-link">Moje raporty</Link>
            {/* <Link to={MESSAGES_FROM_CLIENT} className="aside-link">Zgłoszenia</Link>
            <Link to={ADD_NEW_ACTIVITY_TYPE_PATH} className="aside-link">Dodaj typ aktywności</Link>
            <Link to={DELETE_ACTIVITY_TYPE_PATH} className="aside-link">Usuń typ aktywności</Link> */}
            {adminOptions}
        </div>
    );
};

export default MyAccountAside;