import React from 'react';
import { useHistory } from 'react-router-dom';

import './DeleteAccount.css';

const DeleteAccount = () => {
    var history = useHistory();

    const handleSubmitButton = () => {
        alert('Konto usunieto');
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