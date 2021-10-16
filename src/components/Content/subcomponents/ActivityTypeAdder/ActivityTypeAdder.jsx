import React, { useState, useRef } from 'react';

import './ActivityTypeAdder.css';

import CreateSimpleReactValidator from '../../SimpleValidatorTranslation';

const ActivityTypeAdder = () => {
    const [, forceUpdate] = useState();
    const simpleValidator = useRef(CreateSimpleReactValidator(forceUpdate));
    const [activityName, setActivityName] = useState('');
    const [slowSpeedMET, setSlowSpeedMET] = useState(0);
    const [mediumSpeedMET, setMediumSpeedMET] = useState(0);
    const [fastSpeedMET, setFastSpeedMET] = useState(0);

    const handleOnActivityNameChange = e => setActivityName(e.target.value);
    const handleOnSlowSpeedMETChange = e => setSlowSpeedMET(e.target.value);
    const handleOnMediumSpeedMETChange = e => setMediumSpeedMET(e.target.value);
    const handleOnFastSpeedMETChange = e => setFastSpeedMET(e.target.value);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const formValid = simpleValidator.current.allValid();
        if (!formValid) {
            simpleValidator.current.showMessages();
            forceUpdate(1);
        } else {
            alert('Dodano typ aktywności');
            resetInputs();
        }
    };

    const resetInputs = () => {
        setActivityName('');
        setSlowSpeedMET(0);
        setMediumSpeedMET(0);
        setFastSpeedMET(0);
    };

    return (
        <div className="center-div">
            <h1>Dodaj nowy typ aktywności</h1>
            <form onSubmit={handleOnSubmit}>
                <div className="activity-type-row">
                    <label className="center-div">
                        Nazwa aktywności:
                        <br/>
                        <input className="activity-type-input" type="text" value={activityName} 
                            onChange={handleOnActivityNameChange} />
                    </label>
                    <p className="validator-message">
                        {simpleValidator.current.message('nazwa aktywności', activityName,
                            'required|max:30,string')}
                    </p>
                </div>
                <div className="activity-type-row">
                    <label className="center-div">
                        Wskaźnik MET dla wolnego tempa aktywności:
                        <br/>
                        <input className="activity-type-input" type="number" value={slowSpeedMET} 
                            onChange={handleOnSlowSpeedMETChange} />
                    </label>
                    <p className="validator-message">
                        {simpleValidator.current.message('Wskaznik met', slowSpeedMET,
                            'required|min:1,num|max:200,num')}
                    </p>
                </div>
                <div className="activity-type-row">
                    <label className="center-div">
                        Wskaźnik MET dla średniego tempa aktywności:
                        <br/>
                        <input className="activity-type-input" type="number" value={mediumSpeedMET} 
                            onChange={handleOnMediumSpeedMETChange} />
                    </label>
                    <p className="validator-message">
                        {simpleValidator.current.message('Wskaznik met', mediumSpeedMET,
                            'required|min:1,num|max:200,num')}
                    </p>
                </div>
                <div className="activity-type-row">
                    <label className="center-div">
                        Wskaźnik MET dla szybkiego tempa aktywności:
                        <br/>
                        <input className="activity-type-input" type="number" value={fastSpeedMET} 
                            onChange={handleOnFastSpeedMETChange} />
                    </label>
                    <p className="validator-message">
                        {simpleValidator.current.message('Wskaznik met', fastSpeedMET,
                            'required|min:1,num|max:200,num')}
                    </p>
                </div>
                <div className="activity-type-row">
                    <button type="submit" className="button add-button activity-type-button">Dodaj</button>
                </div>
            </form>
        </div>
    );
};

export default ActivityTypeAdder;