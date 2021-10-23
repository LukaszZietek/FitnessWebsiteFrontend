import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from 'react-query';
import { ApplicationContext } from '../../../../ApplicationContext/ApplicationProvider';
import { deleteUser } from '../../../../RequestHelper/RequestHelper';

import './DeleteAccount.css';

const DeleteAccount = () => {
    const { token, setToken, setRole, setUsername, setUserId } = useContext(ApplicationContext);
    const deleteAccount = useMutation(deleteUser);
    var history = useHistory();

    const resetContext = () => {
        setToken('');
        setRole('');
        setUsername('');
        setUserId('');
    }

    const handleSubmitButton = () => {
        deleteAccount.mutate(token);
        resetContext();
        alert('Konto usunieto');
        history.push('/');
    }
    const handleCancelButton = () => {
        history.push('/');
    }

    return (
        <div className="delete-container">
            <h1>Czy aby na pewno chcesz usunąć swoje konto? Zabieg ten jest nieodwracalny</h1>
            <button className="ok-button" onClick={handleSubmitButton}>Tak</button>
            <button className="delete-button" onClick={handleCancelButton}>Nie</button>
        </div>
    )
}

export default DeleteAccount;