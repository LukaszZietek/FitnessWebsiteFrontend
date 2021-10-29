import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import '../AsideMenu.css';

import {CHANGE_PASSWORD_PATH, DELETE_ACCOUNT_PATH, MY_ACCOUNT_PATH, REPORT_PATH, ADD_PERSONAL_INFO_PATH,
     MESSAGES_FROM_CLIENT, ADD_NEW_ACTIVITY_TYPE_PATH, DELETE_ACTIVITY_TYPE_PATH} from '../../../common/Paths';
import { ApplicationContext } from '../../../ApplicationContext/ApplicationProvider';
import { ADMIN } from '../../../common/UserRole';

const MyAccountAside = () => {
    const { role } = useContext(ApplicationContext);

    const adminOptions = role === ADMIN ? (
        <>
            <NavLink activeClassName="aside-active" exact to={MESSAGES_FROM_CLIENT} className="aside-link">Zgłoszenia</NavLink>
            <NavLink activeClassName="aside-active" exact to={ADD_NEW_ACTIVITY_TYPE_PATH} className="aside-link">Dodaj typ aktywności</NavLink>
            <NavLink activeClassName="aside-active" exact to={DELETE_ACTIVITY_TYPE_PATH} className="aside-link">Usuń typ aktywności</NavLink>
        </>
    ) : null;

    return (
        <div className="aside-div">
            <NavLink activeClassName="aside-active" exact to={MY_ACCOUNT_PATH} className="aside-link">Informacje</NavLink>
            <NavLink activeClassName="aside-active" exact to={CHANGE_PASSWORD_PATH} className="aside-link">Zmień hasło</NavLink>
            <NavLink activeClassName="aside-active" exact to={ADD_PERSONAL_INFO_PATH} className="aside-link">Dodaj informacje</NavLink>
            <NavLink activeClassName="aside-active" exact to={DELETE_ACCOUNT_PATH} className="aside-link">Usuń konto</NavLink>
            <NavLink activeClassName="aside-active" exact to={REPORT_PATH} className="aside-link">Moje raporty</NavLink>
            {adminOptions}
        </div>
    );
};

export default MyAccountAside;