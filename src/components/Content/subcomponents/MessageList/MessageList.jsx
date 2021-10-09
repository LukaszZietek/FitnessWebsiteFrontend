import React, { useState } from 'react';

import './MessageList.css';

const MessageList = () => {
    const [dummyMessages, setDummyMessages] = useState([
        {
            id: 0,
            nameAndSurname: "Lukasz Nowak",
            email: "244244@gmail.com",
            message: "Witam, mam taki problem ...",
            creationDate: "09-10-2021",
            viewed: 1
        },
        {
            id: 1,
            nameAndSurname: "Lukasz Bartkowiak",
            email: "dwdwdwd@gmail.com",
            message: "Witam, pisze w takiej sprawie ...",
            creationDate: "05-10-2021",
            viewed: 0
        },
        {
            id: 2,
            nameAndSurname: "Maciek Nowak",
            email: "blkjl@gmail.com",
            message: "Czesc, chcialbym spytac sie ...",
            creationDate: "08-09-2021",
            viewed: 1
        },
        {
            id: 3,
            nameAndSurname: "Robert Nowak",
            email: "roberto@gmail.com",
            message: "Szanowni Panstwo, chcialbym dop...",
            creationDate: "08-08-2021",
            viewed: 0
        }
    ]);

    const messagesList = dummyMessages.map(item => (
        <tr key={item.id}>
            <th>{item.nameAndSurname}</th>
            <th>{item.email}</th>
            <th>{item.message}</th>
            <th>{item.creationDate}</th>
            <th>{item.viewed ? "Tak" : "Nie"}</th>
            <th>
                <button className="button info-button">Info</button>
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