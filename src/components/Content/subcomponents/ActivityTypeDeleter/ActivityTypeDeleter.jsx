import React, { useState, useRef, useContext } from 'react';
import { useQuery, useMutation } from 'react-query';

import { getActivities, deleteActivity } from '../../../../RequestHelper/RequestHelper';
import { ApplicationContext } from '../../../../ApplicationContext/ApplicationProvider';

import './ActivityTypeDeleter.css';

import RequestErrorViewer from '../RequestErrorViewer/RequestErrorViewer';
import RequestLoadingViewer from '../RequestLoadingViewer/RequestLoadingViewer';
import CreateSimpleReactValidator from '../../SimpleValidatorTranslation';
import { SUCCESS_CODE } from '../../../../common/StatusCodes';

const ActivityTypeDeleter = () => {
    const [activityTypes, setActivityTypes] = useState([]);
    const [activityType, setActivityType] = useState('');
    const { token } = useContext(ApplicationContext);
    const deleteQuery = useMutation(deleteActivity);
    const { error, isError, isLoading } = useQuery('getActivities', getActivities, { onSuccess: (response) => {
        if (response.status === SUCCESS_CODE) {
            const { data } = response;
            setActivityTypes([...data]);
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

    const handleSelectChange = e => setActivityType(e.target.value);

    const handleOnSubmit = e => {
        e.preventDefault();
        const formValid = simpleValidator.current.allValid();
        if (!formValid) {
            simpleValidator.current.showMessages();
            forceUpdate(1);
        } else {
            deleteQuery.mutate({id: activityTypes.find(element => element.name === activityType).id, token});
            setActivityTypes(prevState => prevState.filter(item => item.name !== activityType));
            alert(`Usunieto typ aktywności: ${activityType}`);
            setActivityType('');
            simpleValidator.current.hideMessages();
        }
    }

    const selectOptions = activityTypes.map(item => (
        <option key={item.id} value={item.name}>
            {item.name}
        </option>
    ));

    return (
        <div className="center-div">
            <h1>Usuń jeden z dostępnych typów aktywności</h1>
            <form onSubmit={handleOnSubmit}>
                <div className="center-text">
                    <select className="activity-type-deleter-select" name="type" onChange={handleSelectChange} value={activityType}>
                        <option value=""></option>
                        {selectOptions}
                    </select>
                    <p className="validator-message">{simpleValidator.current.message('typ aktywności', activityType, 'required')}</p>
                </div>
                <div>
                    <button type="submit" className="button delete-button w-300 m-0">Usuń</button>
                </div>
            </form>
        </div>
    );
};

export default ActivityTypeDeleter;