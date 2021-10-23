import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';

import { MESSAGES_FROM_CLIENT } from '../../../../common/Paths';
import { ApplicationContext } from '../../../../ApplicationContext/ApplicationProvider';
import { getMessagesFromClient } from '../../../../RequestHelper/RequestHelper';
import { SUCCESS_CODE } from '../../../../common/StatusCodes';

import RequestLoadingViewer from '../RequestLoadingViewer/RequestLoadingViewer';
import RequestErrorViewer from '../RequestErrorViewer/RequestErrorViewer';

import './MessageList.css';


const MessageList = () => {
    const [messages, setMessages] = useState([]);
    const { token } = useContext(ApplicationContext);
    const { error, isLoading, isError } = useQuery('getMessages', () => getMessagesFromClient(token), { onSuccess: (response) => {
        if (response.status === SUCCESS_CODE) {
            const { data } = response;
            setMessages([...data]);
        }
    }});

    if(isLoading){
        return <RequestLoadingViewer/>;
    }
    if(isError){
        return <RequestErrorViewer errorMessage={error.message} />;
    }

    const messagesList = messages.map(item => (
        <tr key={item.id}>
            <th>{`${item.clientName} ${item.clientSurname}`}</th>
            <th>{item.clientEmail}</th>
            <th>{item.content}</th>
            <th>{item.createdAt}</th>
            <th>{item.ifRead ? "Tak" : "Nie"}</th>
            <th>
                <Link to={`${MESSAGES_FROM_CLIENT}/${item.id}`} className="link-as-button button info-button">Info</Link>
            </th>
        </tr>
    ));

    return (
        <div className="center-div">
            <h1>Lista zgłoszeń od klientów</h1>
            <table className="message-table">
                <tbody>
                    <tr className="header-row">
                        <th>Imie i nazwisko</th>
                        <th>Email</th>
                        <th>Treść</th>
                        <th>Data utworzenia</th>
                        <th>Odczytane</th>
                        <th>Działania</th>
                    </tr>
                    {messagesList}
                </tbody>
            </table>
        </div>
    );
};

export default MessageList;