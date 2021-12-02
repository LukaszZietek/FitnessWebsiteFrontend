import React, { useContext, useState, useRef } from 'react';
import { useMutation, useQuery } from 'react-query';

import { ApplicationContext } from '../../../../ApplicationContext/ApplicationProvider';
import { deleteUserMealType, getUserMealTypes } from '../../../../RequestHelper/RequestHelper';
import { SUCCESS_CODE, NO_CONTENT } from '../../../../common/StatusCodes';

import CreateSimpleReactValidator from '../../SimpleValidatorTranslation';
import RequestLoadingViewer from '../RequestLoadingViewer/RequestLoadingViewer';
import RequestErrorViewer from '../RequestErrorViewer/RequestErrorViewer';

import './MealTypeDeleter.css';

const MealTypeDeleter = () => {
    const { token, userId } = useContext(ApplicationContext);
    const [userMealTypes, setUserMealTypes] = useState([]);
    const [mealType, setMealType] = useState('');
    const deleteQuery = useMutation(deleteUserMealType);
    const { error, isError, isLoading } = useQuery('getMealTypes', () => getUserMealTypes(userId, token), { onSuccess: (response) => {
        console.log(response);
        if (response.status === SUCCESS_CODE) {
            const { data } = response;
            setUserMealTypes([...data]);
        }
    }});
    const [, forceUpdate] = useState();
    const simpleValidator = useRef(CreateSimpleReactValidator(forceUpdate));

    if(isLoading){
        return <RequestLoadingViewer/>;
    }
    if(isError){
        return <RequestErrorViewer errorMessage={error.message} />;
    }

    const handleSelectChange = e => setMealType(e.target.value);

    const handleOnSubmit = e => {
        e.preventDefault();
        const formValid = simpleValidator.current.allValid();
        if (!formValid) {
            simpleValidator.current.showMessages();
            forceUpdate(1);
        } else {
            deleteQuery.mutate({id: userMealTypes.find(element => element.name === mealType).id, token}, {onSuccess: (response) => {
                if (response.status === NO_CONTENT)
                {
                    setUserMealTypes(prevState => prevState.filter(item => item.name !== mealType));
                    alert(`Usunieto typ aktywności: ${mealType}`);
                    setMealType('');
                    simpleValidator.current.hideMessages();
                } else {
                    alert(`Serwer wysłał odpowiedź ze statusem ${response.status}, spróbuj ponownie za chwile lub skontaktuj się z administratorem`);
                }
            }, onError: (error) => {
                alert(`Wystąpił błąd: ${error.message}, spróbuj wykonać operacje ponownie lub skontaktuj się z administratorem`);
            }});
        }
    }

    const selectOptions = userMealTypes.map(item => (
        <option key={item.id} value={item.name}>
            {item.name}
        </option>
    ))

    return (
        <div className="meal-type-center-div">
            <h1>Usuń jeden ze stworzonych typów posiłku</h1>
            <form onSubmit={handleOnSubmit}>
                <div className="center-text">
                    <select className="meal-type-deleter-select" name="type" onChange={handleSelectChange} value={mealType}>
                        <option value=""></option>
                        {selectOptions}
                    </select>
                    <p className="validator-message">{simpleValidator.current.message('typ posiłku', mealType, 'required')}</p>
                </div>
                <div>
                    <button type="submit" className="button cancel-button w-300 m-0">Usuń</button>
                </div>
            </form>
        </div>
    );
};

export default MealTypeDeleter;