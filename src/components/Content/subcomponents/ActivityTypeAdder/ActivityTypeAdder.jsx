import React, { useState, useRef, useContext } from 'react';
import { useMutation } from 'react-query';

import './ActivityTypeAdder.css';

import { ApplicationContext } from '../../../../ApplicationContext/ApplicationProvider';

import CreateSimpleReactValidator from '../../SimpleValidatorTranslation';
import { addActivity } from '../../../../RequestHelper/RequestHelper';
import { CREATED } from '../../../../common/StatusCodes';

const ActivityTypeAdder = () => {
    const { token } = useContext(ApplicationContext);
    const addQuery = useMutation(addActivity);
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
            addQuery.mutate({activityName, slowSpeedMet : slowSpeedMET, mediumSpeedMet: mediumSpeedMET, 
            fastSpeedMet: fastSpeedMET, token}, {onSuccess: (response) => {
                if (response.status === CREATED)
                {
                    alert('Dodano typ aktywności');
                    resetInputs();
                } else {
                    alert(`Serwer wysłał odpowiedź ze statusem ${response.status}, spróbuj ponownie za chwile lub skontaktuj się z administratorem`);
                }
            }, onError: (error) => {
                alert(`Wystąpił błąd: ${error.message}, spróbuj wykonać operacje ponownie lub skontaktuj się z administratorem`);
            }});
        }
    };

    const resetInputs = () => {
        setActivityName('');
        setSlowSpeedMET(0);
        setMediumSpeedMET(0);
        setFastSpeedMET(0);
        simpleValidator.current.hideMessages();
    };

    return (
        <div className="center-div">
            <h1>Dodaj nowy typ aktywności</h1>
             <form onSubmit={handleOnSubmit} className="activity-type-form">
                <div className="first-row f-column">
                    <label htmlFor="name" className="m-right-10">Nazwa aktywności</label>
                </div>
                <div className="first-row s-column">
                    <input id="name" className="activity-type-input" type="text" value={activityName} 
                        onChange={handleOnActivityNameChange} />
                    <p className="validator-message">
                        {simpleValidator.current.message('nazwa aktywności', activityName,
                            'required|max:30,string')}
                    </p>
                </div>

                <div className="second-row f-column">
                    <label htmlFor="lowMet" className="m-right-10">Wskaźnik MET dla wolnego tempa aktywności</label>
                </div>
                <div className="second-row s-column">
                    <input id="lowMet" className="activity-type-input" type="number" value={slowSpeedMET} 
                        onChange={handleOnSlowSpeedMETChange} />
                    <p className="validator-message">
                        {simpleValidator.current.message('Wskaznik met', slowSpeedMET,
                            'required|min:1,num|max:200,num')}
                    </p>
                </div>

                <div className="third-row f-column">
                    <label htmlFor="mediumMet" className="m-right-10">Wskaźnik MET dla średniego tempa aktywności</label>
                </div>
                <div className="third-row s-column">
                    <input id="mediumMet" className="activity-type-input" type="number" value={mediumSpeedMET} 
                        onChange={handleOnMediumSpeedMETChange} />
                    <p className="validator-message">
                        {simpleValidator.current.message('Wskaznik met', mediumSpeedMET,
                            'required|min:1,num|max:200,num')}
                    </p>
                </div>

                <div className="fourth-row f-column">
                    <label htmlFor="fastMet" className="m-right-10">Wskaźnik MET dla szybkiego tempa aktywności</label>
                </div>
                <div className="fourth-row s-column">
                    <input id="fastMet" className="activity-type-input" type="number" value={fastSpeedMET} 
                        onChange={handleOnFastSpeedMETChange} />
                    <p className="validator-message">
                        {simpleValidator.current.message('Wskaznik met', fastSpeedMET,
                            'required|min:1,num|max:200,num')}
                    </p>
                </div>
                <div className="button-row">
                    <button type="submit" className="button add-button activity-type-button">Dodaj</button>
                </div>
            </form>
        </div>
    );
};

export default ActivityTypeAdder;