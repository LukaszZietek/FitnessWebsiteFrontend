import React, { useState, useEffect, useRef } from 'react';

import {ACTIVITY_TYPE_TRANSLATION_DICT} from '../ActivitiesTranslationDict';
import CreateSimpleReactValidator from '../../SimpleValidatorTranslation';

import './ActivityTypeDeleter.css';

const ActivityTypeDeleter = () => {
    const [, forceUpdate] = useState();
    const simpleValidator = useRef(CreateSimpleReactValidator(forceUpdate));
    const [dummyTypes, setDummyTypes] = useState([]);
    const [activityType, setActivityType] = useState('');

    const handleSelectChange = e => setActivityType(e.target.value);

    const handleOnSubmit = e => {
        e.preventDefault();
        const formValid = simpleValidator.current.allValid();
        if (!formValid) {
            simpleValidator.current.showMessages();
            forceUpdate(1);
        } else {
            alert(`Usunieto typ aktywności: ${activityType}`);
            setActivityType('');
        }
    }

    useEffect(() => {
        setDummyTypes([
            {
                id: 1,
                name: 'running'
            },
            {
                id: 2,
                name: 'jumping-rope'
            },
            {
                id: 3,
                name: 'cycling'
            },
            {
                id: 4,
                name: 'strength-training'
            },
        ])
    }, []);

    const selectOptions = dummyTypes.map(item => (
        <option key={item.id} value={item.name}>
            {ACTIVITY_TYPE_TRANSLATION_DICT[`${item.name}`]}
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