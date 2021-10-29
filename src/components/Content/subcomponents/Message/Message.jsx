import React, { useState, useContext } from 'react';
import { useQuery, useMutation } from 'react-query';
import { useHistory, useParams } from 'react-router';

import { ApplicationContext } from '../../../../ApplicationContext/ApplicationProvider';
import { MY_ACCOUNT_PATH } from '../../../../common/Paths';
import { NO_CONTENT, SUCCESS_CODE} from '../../../../common/StatusCodes';
import { ADMIN } from '../../../../common/UserRole';

import RequestLoadingViewer from '../RequestLoadingViewer/RequestLoadingViewer';
import RequestErrorViewer from '../RequestErrorViewer/RequestErrorViewer';

import './Message.css';
import { getMessage, deleteMessage } from '../../../../RequestHelper/RequestHelper';
import SignInIsRequiredViewer from '../SignInIsRequiredViewer/SignInIsRequiredViewer';

const Message = () => {
    const [nameAndSurname, setNameAndSurname] = useState('');
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('');
    const [creationDate, setCreationDate] = useState('');
    const { token, role } = useContext(ApplicationContext);
    const { id: messageId } = useParams();
    const history = useHistory();
    const deleteQuery = useMutation(deleteMessage);
    const { error, isLoading, isError } = useQuery('getMessage', () => getMessage({messageId, token}), { onSuccess: (response) => {
        if (response.status === SUCCESS_CODE) {
            const { data } = response;
            setNameAndSurname(`${data.clientName} ${data.clientSurname}`);
            setEmail(data.clientEmail);
            setMessage(data.content);
            setCreationDate(data.createdAt);
        }
    }});

    if(isLoading){
        return <RequestLoadingViewer/>;
    }
    if(isError){
        return <RequestErrorViewer errorMessage={error.message} />;
    }

    const handleOnClick = () => {
        deleteQuery.mutate({messageId, token}, {onSuccess: (response) => {
            if (response.status === NO_CONTENT)
            {
                alert(`Usunieto zgloszenie o id ${messageId}`);
                history.push(`${MY_ACCOUNT_PATH}`);
            } else {
                alert(`Serwer wysłał odpowiedź ze statusem ${response.status}, spróbuj ponownie za chwile lub skontaktuj się z administratorem`);
            }
        }, onError: (error) => {
            alert(`Wystąpił błąd: ${error.message}, spróbuj wykonać operacje ponownie lub skontaktuj się z administratorem`);
        }});
    }

    return !(role === ADMIN) ? <SignInIsRequiredViewer/> : (
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
                    <button className="button delete-button full-width-button" onClick={handleOnClick}>
                        Usuń zgłoszenie
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Message;