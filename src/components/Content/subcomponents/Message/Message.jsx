import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { MESSAGES_FROM_CLIENT } from '../../../../common/Paths';

import './Message.css';

const Message = () => {
    const { id: messageId } = useParams();
    const history = useHistory();
    const [nameAndSurname, setNameAndSurname] = useState('');
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('');
    const [creationDate, setCreationDate] = useState('');

    const deleteMessage = () => {
        alert(`Usunieto zgloszenie o id ${messageId}`);
        history.push(`${MESSAGES_FROM_CLIENT}`);
    }

    useEffect(() => {
        setNameAndSurname('Lukasz Nowak');
        setEmail('24244@gmail.com');
        setMessage('Witam mam problem z zalozeniem konta');
        setCreationDate('2021-10-09');
    }, [])

    return (
        <div className="center-div">
            <h1>Zgłoszenie nr {messageId}</h1>
            <div className="message-grid">
                <div className="first-row f-column">
                    <p>Imie i Nazwisko</p>
                    <input className="grid-message-input" type="text" value={nameAndSurname} disabled />
                </div>
                <div className="first-row s-column">
                    <p>Email</p>
                    <input className="grid-message-input" type="text" value={email} disabled />
                </div>
                <div className="first-row t-column">
                    <p>Data Utworzenia</p>
                    <input className="grid-message-input" type="date" value={creationDate} disabled />
                </div>
                <div className="second-row all-column">
                    <p>Treść</p>
                    <textarea className="grid-textarea-input" value={message} disabled/>
                </div>
                <div className="third-row all-column">
                    <button className="button delete-button full-width-button" onClick={deleteMessage}>
                        Usuń zgłoszenie
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Message;