import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from 'react-query';
import { ApplicationContext } from '../../../../ApplicationContext/ApplicationProvider';
import { deleteUser } from '../../../../RequestHelper/RequestHelper';
import { NO_CONTENT } from '../../../../common/StatusCodes';

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
        deleteAccount.mutate(token, {onSuccess: (response) => {
            if (response.status === NO_CONTENT)
            {
                resetContext();
                alert('Konto usunieto');
                history.push('/');
            } else {
                alert(`Serwer wysłał odpowiedź ze statusem ${response.status}, spróbuj ponownie za chwile lub skontaktuj się z administratorem`);
            }
        }, onError: (error) => {
            alert(`Wystąpił błąd: ${error.message}, spróbuj wykonać operacje ponownie lub skontaktuj się z administratorem`);
        }});
    }
    const handleCancelButton = () => {
        history.push('/');
    }

    return (
        <div className="delete-container">
            <h1>Czy aby na pewno chcesz usunąć swoje konto? Zabieg ten jest nieodwracalny</h1>
            <button className="button add-button" onClick={handleSubmitButton}>Tak</button>
            <button className="button cancel-button" onClick={handleCancelButton}>Nie</button>
        </div>
    )
}

export default DeleteAccount;