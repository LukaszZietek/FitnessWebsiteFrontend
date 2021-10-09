import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MESSAGES_FROM_CLIENT } from '../../../../common/Paths';

import './MessageList.css';

const MessageList = () => {
    const [dummyMessages, setDummyMessages] = useState([]);

    useEffect(() => {
        setDummyMessages([
            {
                id: 0,
                nameAndSurname: "Lukasz Nowak",
                email: "244244@gmail.com",
                message: "Witam, mam taki problem ...",
                creationDate: "2021-10-09",
                viewed: 1
            },
            {
                id: 1,
                nameAndSurname: "Lukasz Bartkowiak",
                email: "dwdwdwd@gmail.com",
                message: "Witam, pisze w takiej sprawie ...",
                creationDate: "2021-10-05",
                viewed: 0
            },
            {
                id: 2,
                nameAndSurname: "Maciek Nowak",
                email: "blkjl@gmail.com",
                message: "Czesc, chcialbym spytac sie ...",
                creationDate: "2021-09-08",
                viewed: 1
            },
            {
                id: 3,
                nameAndSurname: "Robert Nowak",
                email: "roberto@gmail.com",
                message: "Szanowni Panstwo, chcialbym dop...",
                creationDate: "2021-08-08",
                viewed: 0
            }
        ]);
    }, []);

    const messagesList = dummyMessages.map(item => (
        <tr key={item.id}>
            <th>{item.nameAndSurname}</th>
            <th>{item.email}</th>
            <th>{item.message}</th>
            <th>{item.creationDate}</th>
            <th>{item.viewed ? "Tak" : "Nie"}</th>
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