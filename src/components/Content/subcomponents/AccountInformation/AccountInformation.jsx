import React, { useState, useContext } from 'react';

import { useQuery } from 'react-query';
import { getUserInfo } from '../../../../RequestHelper/RequestHelper';
import { ApplicationContext } from '../../../../ApplicationContext/ApplicationProvider';
import { MAN } from '../../../../common/UserGender';

import './AccountInformation.css';

import RequestErrorViewer from '../RequestErrorViewer/RequestErrorViewer';
import RequestLoadingViewer from '../RequestLoadingViewer/RequestLoadingViewer';
import { SUCCESS_CODE } from '../../../../common/StatusCodes';

const AccountInformation = () => {
    const {userId, token} = useContext(ApplicationContext);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');
    const [creationDate, setCreationDate] = useState('');
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [gender, setGender] = useState('man');
    const { error, isError, isLoading } = useQuery('getPersonalInfo', () => getUserInfo(userId, token), { onSuccess: (response) => {
        if (response.status === SUCCESS_CODE) {
            const { data } = response;
            setUsername(data.user.username);
            setEmail(data.user.email);
            setDate(data.birthDate);
            setCreationDate(data.user.createdAt);
            setHeight(data.height);
            setWeight(data.weight);
            if (data.gender === MAN) {
                setGender('man');
            } else {
                setGender('woman');
            }
        }
    }});

    if(isLoading){
        return <RequestLoadingViewer/>;
    }
    if(isError){
        return <RequestErrorViewer errorMessage={error.message} />;
    }

    const translateGender = {
        'man': 'Męzczyzna',
        'woman': 'Kobieta'
    }

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