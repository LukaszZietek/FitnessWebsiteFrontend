import React, {useState, useContext} from 'react';
import { useQuery } from 'react-query';

import './ActivitiesList.css';

import { ACTIVITY_TYPE_TRANSLATION_DICT, ACTIVITY_SPEED_TRANSLATION_DICT } from '../ActivitiesTranslationDict';
import { getCurrentDate, getPreviousMonthDate, checkIfDateIsBetweenTwoDates} from '../../../DateUtilities';
import { ApplicationContext } from '../../../../ApplicationContext/ApplicationProvider';
import { getUserActivites } from '../../../../RequestHelper/RequestHelper';
import { SUCCESS_CODE } from '../../../../common/StatusCodes';

import RequestErrorViewer from '../RequestErrorViewer/RequestErrorViewer';
import RequestLoadingViewer from '../RequestLoadingViewer/RequestLoadingViewer';

const ActivitiesList = () => {
    const [userActivities, setUserActivities] = useState([]);
    const [activityDate, setActivityDate] = useState(getCurrentDate());
    const { userId, token } = useContext(ApplicationContext);
    const totallyBurnedCalories = 1000;
    const averageActivitySpeed = "Umiarkowane";
    const averageActivityTime = 200;
    const { error, isLoading, isError } = useQuery('getUserActivities', () => getUserActivites(userId, token, activityDate), { onSuccess: (response) => {
        if (response.status === SUCCESS_CODE) {
            const { data } = response;
            setUserActivities([...data]);
        }
    }});

    if(isLoading){
        return <RequestLoadingViewer/>;
    }
    if(isError){
        return <RequestErrorViewer errorMessage={error.message} />;
    }

    const handleDateChange = (e) => {
        if (checkIfDateIsBetweenTwoDates(getPreviousMonthDate(), getCurrentDate(), e.target.value)) {
            setActivityDate(e.target.value);
        } else {
            setActivityDate(getCurrentDate());
        }
     };

    const deleteItem = (id) => setUserActivities((prevState) => prevState.filter(item => item.id !== id));

    const activitiesRow = userActivities.map(item => (
        <tr key={item.id}>
            <th>{ACTIVITY_TYPE_TRANSLATION_DICT[`${item.activityType}`]}</th>
            <th>{item.activityTime}</th>
            <th>{ACTIVITY_SPEED_TRANSLATION_DICT[`${item.activitySpeed}`]}</th>
            <th>{item.burnedCalories}</th>
            <th>
                <button className="button delete-button" onClick={() => deleteItem(item.id)}>
                    Usuń
                </button>
            </th>
        </tr>
    ));

    return (
        <div className="activities-container">
            <input type="date" value={activityDate} onChange={handleDateChange} 
                min={getPreviousMonthDate()} max={getCurrentDate()} />
            <h1>Aktywność z dnia {activityDate}</h1>
            <table className="activities-table">
                <tbody>
                    <tr className="header-row">
                        <th>Typ aktywności</th>
                        <th>Czas aktywności [min]</th>
                        <th>Tempo aktywności</th>
                        <th>Spalone kalorie [kcal]</th>
                        <th>Działania</th>
                    </tr>
                    {activitiesRow}
                </tbody>
            </table>
            <h2>Ogółem</h2>
            <table className="activities-table">
                <tbody>
                    <tr>
                        <th className="font-weight-b">Spalone kalorie [kcal]</th>
                        <th>{totallyBurnedCalories}</th>
                    </tr>
                    <tr>
                        <th className="font-weight-b">Średni czas aktywności [min]</th>
                        <th>{averageActivityTime}</th>
                    </tr>
                    <tr>
                        <th className="font-weight-b">Średnie tempo aktywności</th>
                        <th>{averageActivitySpeed}</th>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ActivitiesList;