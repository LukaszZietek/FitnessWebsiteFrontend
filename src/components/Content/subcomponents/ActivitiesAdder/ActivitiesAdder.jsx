import React, { useRef, useState } from 'react';

import './ActivitiesAdder.css';

import {ACTIVITY_TYPE_TRANSLATION_DICT, ACTIVITY_SPEED_TRANSLATION_DICT} from '../ActivitiesTranslationDict';
import CreateSimpleReactValidator from '../../SimpleValidatorTranslation';

const ActivitiesAdder = () => {
    const [, forceUpdate] = useState();
    const simpleValidator = useRef(CreateSimpleReactValidator(forceUpdate));
    const [burnedCalories, setBurnedCalories] = useState(200);
    const [activityType, setActivityType] = useState('');
    const [activityTime, setActivityTime] = useState(1);
    const [activitySpeed, setActivitySpeed] = useState();

    const handleSelectChange = e => setActivityType(e.target.value);
    const handleActivityTimeChange = e => setActivityTime(e.target.value);
    const handleActivitySpeedChange = e => setActivitySpeed(e.target.value);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const formValid = simpleValidator.current.allValid();
        if (!formValid) {
            simpleValidator.current.showMessages();
            forceUpdate(1);
        } else {
            alert('Dodano aktywność');
            resetInputs();
        }
    }

    const handleOnCancel = () => {
        resetInputs();
    }

    const resetInputs = () => {
        setBurnedCalories(0);
        setActivityTime(1);
        setActivityType('');
        setActivitySpeed();
    }

    return (
        <div className="activities-container">
            <h1>Dodaj aktywność: </h1>
            <form onSubmit={handleOnSubmit}>
                <div>
                    <label>
                        Rodzaj aktywności:
                        <select name="type" onChange={handleSelectChange} value={activityType}>
                            <option value=""></option>
                            <option value="running">{ACTIVITY_TYPE_TRANSLATION_DICT['running']}</option>
                            <option value="jumping-rope">{ACTIVITY_TYPE_TRANSLATION_DICT['jumping-rope']}</option>
                            <option value="cycling">{ACTIVITY_TYPE_TRANSLATION_DICT['cycling']}</option>
                            <option value="strength-training">{ACTIVITY_TYPE_TRANSLATION_DICT['strength-training']}</option>
                        </select>
                    </label>
                    <p className="validator-message">{simpleValidator.current.message('rodzaj aktywności', activityType, 'required|in:running,jumping-rope,cycling,strength-training')}</p>
                </div>
                <div>
                    <label>
                        Czas aktywności [min]:
                        <input name="time" type="number" min="1" max="400" value={activityTime} onChange={handleActivityTimeChange} />
                    </label>
                    <p className="validator-message">{simpleValidator.current.message('czas aktywności', activityTime, 'required|numeric|min:1,num|max:400,num')}</p>
                </div>
                <div>
                    Tempo aktywności: <br/>
                    <input type="radio" id="slow" value="slow" checked={activitySpeed === "slow"} 
                        onChange={handleActivitySpeedChange} />
                    <label htmlFor="slow">{ACTIVITY_SPEED_TRANSLATION_DICT['slow']}</label> <br/>
                    <input type="radio" id="medium" value="medium" checked={activitySpeed === "medium"} 
                        onChange={handleActivitySpeedChange} />
                    <label htmlFor="medium">{ACTIVITY_SPEED_TRANSLATION_DICT['medium']}</label> <br/>
                    <input type="radio" id="fast" value="fast" checked={activitySpeed === "fast"} 
                        onChange={handleActivitySpeedChange} />
                    <label htmlFor="fast">{ACTIVITY_SPEED_TRANSLATION_DICT['fast']}</label>
                    <p className="validator-message">{simpleValidator.current.message('tempo aktywności', activitySpeed, 'required|in:slow,medium,fast')}</p>
                </div>
                <div>
                    <h3>Spalone kalorie [kcal]: </h3> {burnedCalories}
                </div>
                <div>
                    <button type="button" className="button cancel-button" onClick={handleOnCancel}>Anuluj</button>
                    <button type="submit" className="button add-button">Dodaj</button>
                </div>
            </form>
        </div>
    );
};

export default ActivitiesAdder;