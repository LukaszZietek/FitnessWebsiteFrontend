import React, { useRef, useState, useContext } from 'react';
import { useQuery, useMutation } from 'react-query';

import './ActivitiesAdder.css';

import { ApplicationContext } from '../../../../ApplicationContext/ApplicationProvider';
import { getUserInfo, addUserActivity, getActivities } from '../../../../RequestHelper/RequestHelper';
import { SUCCESS_CODE } from '../../../../common/StatusCodes';
import CreateSimpleReactValidator from '../../SimpleValidatorTranslation';
import RequestErrorViewer from '../RequestErrorViewer/RequestErrorViewer';
import RequestLoadingViewer from '../RequestLoadingViewer/RequestLoadingViewer';
import { FAST, MEDIUM, SLOW } from '../../../../common/ActivitySpeed';

const ActivitiesAdder = () => {
    const { token, userId } = useContext(ApplicationContext);
    const [, forceUpdate] = useState();
    const simpleValidator = useRef(CreateSimpleReactValidator(forceUpdate));
    const [burnedCalories, setBurnedCalories] = useState(0);
    const [activityId, setActivityId] = useState(0);
    const [activityTime, setActivityTime] = useState(1);
    const [activitySpeed, setActivitySpeed] = useState(0);
    const [userInfo, setUserInfo] = useState({});
    const [activitiesList, setActivitiesList] = useState([]);
    const addQuery = useMutation(addUserActivity);
    const { error, isLoading : userIsLoading, isError: userIsError } = useQuery('getUserInfo', () => getUserInfo(userId, token),
     { onSuccess: (response) => {
        if (response.status === SUCCESS_CODE) {
            const { data } = response;
            setUserInfo(data);
        }
    }});
    const { error: activitiesError , isLoading: activitiesIsLoading, isError: activitiesIsError } = useQuery('getActivities',
     getActivities, { onSuccess: (response) => {
        if (response.status === SUCCESS_CODE) {
            const { data } = response;
            setActivitiesList([...data]);
        }
    }});

    React.useEffect(() => {
        const computeBurnedCalories = () => {
            if (!(activityId && activityTime && (activitySpeed === SLOW || activitySpeed === MEDIUM || activitySpeed === FAST))) {
                return;
            }
            var met = 0;
            var item = activitiesList.find( item => item.id === activityId);
            if (!item) {
                return;
            }
            if (activitySpeed === SLOW) {
                met = item.slowSpeedMet;
            }
            if (activitySpeed === MEDIUM) {
                met = item.mediumSpeedMet;
            }
            if (activitySpeed === FAST) {
                met = item.fastSpeedMet;
            }
            setBurnedCalories(parseInt(userInfo.weight * met * activityTime / 60));
        };
        computeBurnedCalories();
    }, [activityId, activityTime, activitySpeed, activitiesList, userInfo]);

    if(activitiesIsLoading || userIsLoading){
        return <RequestLoadingViewer/>;
    }
    if(userIsError || activitiesIsError){
        return <RequestErrorViewer errorMessage={error ? error.message : activitiesError.message} />;
    }

    const handleSelectChange = e => {
        setActivityId(parseInt(e.target.value));
    };
    const handleActivityTimeChange = e => {
        setActivityTime(e.target.value);
    };
    const handleActivitySpeedChange = e => {
        setActivitySpeed(parseInt(e.target.value));  
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const formValid = simpleValidator.current.allValid();
        if (!formValid) {
            simpleValidator.current.showMessages();
            forceUpdate(1);
        } else {
            addQuery.mutate({activityId: activityId, activityTime, activitySpeed, burnedCalories, token});
            alert('Dodano aktywność');
            resetInputs();
        }
    };

    const handleOnCancel = () => {
        resetInputs();
    };

    const resetInputs = () => {
        setBurnedCalories(0);
        setActivityTime(1);
        setActivityId('');
        setActivitySpeed(0);
        simpleValidator.current.hideMessages();
    };

    const selectOptions = activitiesList.map(item => (
        <option key={item.id} value={item.id}>{item.name}</option>
    ));

    return (
        <div className="activities-container">
            <h1>Dodaj aktywność: </h1>
            {/* <form onSubmit={handleOnSubmit}>
                <div>
                    <label>
                        Rodzaj aktywności:
                        <select name="type" onChange={handleSelectChange} value={activityId}>
                            <option value={0}></option>
                            {selectOptions}
                        </select>
                    </label>
                    <p className="validator-message">{simpleValidator.current.message('rodzaj aktywności', activityId,
                     'required')}</p>
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
                    <input type="radio" id="slow" value={SLOW} checked={activitySpeed === SLOW} 
                        onChange={handleActivitySpeedChange} />
                    <label htmlFor="slow">Wolne</label> <br/>
                    <input type="radio" id="medium" value={MEDIUM} checked={activitySpeed === MEDIUM} 
                        onChange={handleActivitySpeedChange} />
                    <label htmlFor="medium">Umiarkowane</label> <br/>
                    <input type="radio" id="fast" value={FAST} checked={activitySpeed === FAST} 
                        onChange={handleActivitySpeedChange} />
                    <label htmlFor="fast">Szybkie</label>
                    <p className="validator-message">{simpleValidator.current.message('tempo aktywności', activitySpeed, 'required')}</p>
                </div>
                <div>
                    <h3>Spalone kalorie [kcal]: </h3> {burnedCalories}
                </div>
                <div>
                    <button type="button" className="button cancel-button" onClick={handleOnCancel}>Anuluj</button>
                    <button type="submit" className="button add-button">Dodaj</button>
                </div>
            </form> */}
            <form onSubmit={handleOnSubmit} className="display-grid">
                <div className="first-row f-column">
                    <label for="activity-id" className="m-right-10">Rodzaj aktywności</label>
                </div>
                <div className="first-row s-column">
                    <select id="activity-id" className="activities-input" name="type" onChange={handleSelectChange} value={activityId}>
                        <option value={0}></option>
                        {selectOptions}
                    </select>
                    <p className="validator-message">{simpleValidator.current.message('rodzaj aktywności', activityId,
                        'required')}</p>
                </div>

                <div className="second-row f-column">
                    <label for="activity-time" className="m-right-10">Czas aktywności [min]</label>
                </div>
                <div className="second-row s-column">
                    <input id="activity-time" className="activities-input" name="time" type="number" min="1" max="400" value={activityTime} onChange={handleActivityTimeChange} />
                    <p className="validator-message">{simpleValidator.current.message('czas aktywności',
                     activityTime, 'required|numeric|min:1,num|max:400,num')}</p>
                </div>

                <div className="third-row f-column">
                    <label className="m-right-10">Tempo aktywności</label>
                </div>
                <div className="third-row s-column">
                    <input type="radio" id="slow" value={SLOW} checked={activitySpeed === SLOW} 
                        onChange={handleActivitySpeedChange} />
                    <label htmlFor="slow">Wolne</label> <br/>
                    <input type="radio" id="medium" value={MEDIUM} checked={activitySpeed === MEDIUM} 
                        onChange={handleActivitySpeedChange} />
                    <label htmlFor="medium">Umiarkowane</label> <br/>
                    <input type="radio" id="fast" value={FAST} checked={activitySpeed === FAST} 
                        onChange={handleActivitySpeedChange} />
                    <label htmlFor="fast">Szybkie</label>
                    <p className="validator-message">{simpleValidator.current.message('tempo aktywności', activitySpeed, 'required')}</p>
                </div>

                <div className="fourth-row f-column-button">
                    <h3>Spalone kalorie [kcal]: </h3>
                </div>
                <div className="fourth-row s-column">
                    <h3>{burnedCalories} </h3>
                </div>

                <div className="fifth-row f-column-button">
                <button type="button" className="button cancel-button" onClick={handleOnCancel}>Anuluj</button>
                </div>
                <div className="fifth-row s-column">
                    <button type="submit" className="button add-button">Dodaj</button>
                </div>
            </form>
        </div>
    );
};

export default ActivitiesAdder;