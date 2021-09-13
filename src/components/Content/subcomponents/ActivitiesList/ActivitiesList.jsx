import React, {useState} from 'react';

import './ActivitiesList.css';

import { ACTIVITY_TYPE_TRANSLATION_DICT, ACTIVITY_SPEED_TRANSLATION_DICT } from '../ActivitiesTranslationDict';
import { getCurrentDate, getPreviousMonthDate, checkIfDateIsBetweenTwoDates} from '../DateUtilities';

const ActivitiesList = () => {
    const [dummyActivities, setDummyActivities] = useState([
        {
            id: 0,
            activityType: "running",
            activityTime: 60,
            activitySpeed: "slow",
            burnedCalories: 400,
            activityDate: "2021-09-11"
        },
        {
            id: 1,
            activityType: "jumping-rope",
            activityTime: 20,
            activitySpeed: "medium",
            burnedCalories: 499,
            activityDate: "2021-09-11"
        },
        {
            id: 2,
            activityType: "cycling",
            activityTime: 120,
            activitySpeed: "fast",
            burnedCalories: 900,
            activityDate: "2021-09-11"
        },
        {
            id: 3,
            activityType: "strength-training",
            activityTime: 40,
            activitySpeed: "medium",
            burnedCalories: 800,
            activityDate: "2021-09-11"
        },
        {
            id: 4,
            activityType: "running",
            activityTime: 120,
            activitySpeed: "slow",
            burnedCalories: 800,
            activityDate: "2021-09-11"
        },
    ]);
    const [activityDate, setActivityDate] = useState(getCurrentDate());
    const totallyBurnedCalories = 1000;
    const averageActivitySpeed = "Umiarkowane";
    const averageActivityTime = 200;

    const handleDateChange = (e) => {
        if (checkIfDateIsBetweenTwoDates(getPreviousMonthDate(), getCurrentDate(), e.target.value)) {
            setActivityDate(e.target.value);
        } else {
            setActivityDate(getCurrentDate());
        }
     };

    const deleteItem = (id) => setDummyActivities((prevState) => prevState.filter(item => item.id !== id));

    const activitiesRow = dummyActivities.map(item => (
        <tr key={item.id}>
            <th>{ACTIVITY_TYPE_TRANSLATION_DICT[`${item.activityType}`]}</th>
            <th>{item.activityTime}</th>
            <th>{ACTIVITY_SPEED_TRANSLATION_DICT[`${item.activitySpeed}`]}</th>
            <th>{item.burnedCalories}</th>
            <th>
                <button onClick={() => deleteItem(item.id)}>
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