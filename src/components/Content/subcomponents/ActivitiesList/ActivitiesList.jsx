import React, {useState, useContext} from 'react';
import { useMutation, useQuery } from 'react-query';

import './ActivitiesList.css';

import { getCurrentDate, getPreviousMonthDate, checkIfDateIsBetweenTwoDates} from '../../../DateUtilities';
import { ApplicationContext } from '../../../../ApplicationContext/ApplicationProvider';
import { deleteUserActivity, getUserActivities } from '../../../../RequestHelper/RequestHelper';
import { NO_CONTENT, SUCCESS_CODE } from '../../../../common/StatusCodes';

import RequestErrorViewer from '../RequestErrorViewer/RequestErrorViewer';
import RequestLoadingViewer from '../RequestLoadingViewer/RequestLoadingViewer';
import { FAST, MEDIUM, SLOW } from '../../../../common/ActivitySpeed';

const ActivitiesList = () => {
    const [ userActivities, setUserActivities ] = useState([]);
    const [ activityDate, setActivityDate ] = useState(getCurrentDate());
    const { userId, token } = useContext(ApplicationContext);
    const [ totallyBurnedCalories, setTotallyBurnedCalories ] = useState(0);
    const [ commonActivitySpeed, setCommonActivitySpeed ] = useState('brak danych');
    const [ averageActivityTime, setAverageActivityTime ]  = useState(0);
    const deleteQuery = useMutation(deleteUserActivity);
    const { error, isLoading, isError, refetch } = useQuery('getUserActivities', () => getUserActivities(userId, token, activityDate), { onSuccess: (response) => {
        if (response.status === SUCCESS_CODE) {
            const { data } = response;
            setUserActivities([...data]);
        }
    }});

    React.useEffect(() => {
        const computeTotallyBurnedCalories = () => {
            var burnedCalories = userActivities.reduce((prev, cur) => {
                return prev + cur.burnedCalories;
            }, 0);
            setTotallyBurnedCalories(burnedCalories);
        };
    
        const computeCommonSpeed = () => {
            var speedAmount = [{name: 'wolne', value: userActivities.filter(item => item.speed === SLOW).length},
                {name: 'umiarkowane', value: userActivities.filter(item => item.speed === MEDIUM).length},
                {name: 'szybkie', value: userActivities.filter(item => item.speed === FAST).length}];
            var maxValue = Math.max.apply(Math, speedAmount.map(item => item.value));
            if (maxValue === 0) {
                setCommonActivitySpeed('brak danych');
                return;
            }
            var maxAmountArray = speedAmount.filter(item => item.value === maxValue);
            setCommonActivitySpeed(maxAmountArray.map(item => item.name).join("/"));
        };
    
        const computeAverageActivityTime = () => {
            var activityTime = userActivities.reduce((prev, cur) => {
                return prev + cur.duration;
            }, 0);
            if (activityTime)
            {
                activityTime = parseInt(activityTime / userActivities.length, 10);
                setAverageActivityTime(activityTime);
                return;
            }
            setAverageActivityTime(0);
        };
        computeTotallyBurnedCalories();
        computeAverageActivityTime();
        computeCommonSpeed();
    }, [userActivities]);

    React.useEffect(() => {
        refetch();
    }, [activityDate, refetch]);

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

    const deleteItem = (id) => {
        deleteQuery.mutate({userActivityId: id, token}, {onSuccess: (response) => {
            if (response.status === NO_CONTENT)
            {
                setUserActivities((prevState) => prevState.filter(item => item.id !== id));
            } else {
                alert(`Serwer wysłał odpowiedź ze statusem ${response.status}, spróbuj ponownie za chwile lub skontaktuj się z administratorem`);
            }
        }, onError: (error) => {
            alert(`Wystąpił błąd: ${error.message}, spróbuj wykonać operacje ponownie lub skontaktuj się z administratorem`);
        }});
    };

    const getActivitySpeedName = (item) => {
        if (item === SLOW) {
            return "wolne";
        }
        if (item === MEDIUM) {
            return "umiarkowane";
        }
        return "szybkie";
    }

    const activitiesRow = userActivities.map(item => (
        <tr key={item.id}>
            <th>{item.activity.name}</th>
            <th>{item.duration}</th>
            <th>{getActivitySpeedName(item.speed)}</th>
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
                        <th className="font-weight-b">Najczęstsze tempo aktywności</th>
                        <th>{commonActivitySpeed}</th>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ActivitiesList;