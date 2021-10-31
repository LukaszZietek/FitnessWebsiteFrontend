import React, {useState, useContext} from 'react';
import { useQuery } from 'react-query';

import { ApplicationContext } from '../../../../ApplicationContext/ApplicationProvider';
import { getUserActivitiesForTimePeriod, getUserMealsForTimePeriod } from '../../../../RequestHelper/RequestHelper';
import { getCurrentDate, getNumberOfDaysBetweenTwoDates, getPreviousWeekDate } from '../../../DateUtilities';
import { SUCCESS_CODE } from '../../../../common/StatusCodes';

import RequestErrorViewer from '../RequestErrorViewer/RequestErrorViewer';
import RequestLoadingViewer from '../RequestLoadingViewer/RequestLoadingViewer';

import '../Reports.css';

const WeeklyReports = () => {
    const { userId, token } = useContext(ApplicationContext);
    const [ calories, setCalories ] = useState(0);
    const [ proteins, setProteins ] = useState(0);
    const [ fats, setFats ] = useState(0);
    const [ carbohydrates, setCarbohydrates ] = useState(0);
    const [ averageCalories, setAverageCalories ] = useState(0);
    const [ averageProteins, setAverageProteins ] = useState(0);
    const [ averageFats, setAverageFats ] = useState(0);
    const [ averageCarbohydrates, setAverageCarbohydrates ] = useState(0);
    const [ burnedCalories, setBurnedCalories ] = useState(0);
    const [ averageBurnedCalories, setAverageBurnedCalories ] = useState(0);

    const { error: mealsError, isLoading: mealsIsLoading, isError : mealsIsError } = 
    useQuery('getUserMealsForTimePeriod', () => getUserMealsForTimePeriod(userId, token, getPreviousWeekDate(), getCurrentDate()),
        { onSuccess: (response) => {
            if (response.status === SUCCESS_CODE) {
                const { data } = response;
                if (!data) {
                    return;
                }
                const computeEatenCalories = () => {
                    return (data.reduce((prev, cur) => {
                        return prev + cur.calories;
                    }, 0));
                }

                const setEatenCalories = () => {
                    var eatenCaloriesByUser = computeEatenCalories();
                    setCalories(eatenCaloriesByUser);
                };

                const computeEatenCarbohydrates = () => {
                    return (data.reduce((prev, cur) => {
                        return prev + cur.carbohydrates;
                    }, 0));
                }
           
                const setEatenCarbohydrates = () => {
                   var eatenCarbohydratesByUser = computeEatenCarbohydrates();
                   setCarbohydrates(eatenCarbohydratesByUser);
                };

                const computeEatenFats = () => {
                   return (data.reduce((prev, cur) => {
                       return prev + cur.fats;
                   }, 0));
                };

                const setEatenFats = () => {
                    var eatenFatsByUser = computeEatenFats();
                    setFats(eatenFatsByUser);
                };

                const computeEatenProteins = () => {
                   return (data.reduce((prev, cur) => {
                        return prev + cur.proteins;
                    }, 0));
                }

                const setEatenProteins = () => {
                    var eatenProteinsByUser = computeEatenProteins();
                    setProteins(eatenProteinsByUser);
                };

                const setAverageEatenCalories = () => {
                    var eatenCaloriesByUser = computeEatenCalories();
                    setAverageCalories(parseInt(eatenCaloriesByUser / 
                        getNumberOfDaysBetweenTwoDates(getPreviousWeekDate(), getCurrentDate())));
                };

                const setAverageEatenProteins = () => {
                   var eatenProteinsByUser = computeEatenProteins();
                   setAverageProteins(parseInt(eatenProteinsByUser / 
                        getNumberOfDaysBetweenTwoDates(getPreviousWeekDate(), getCurrentDate())));
                };

                const setAverageEatenCarbohydrates = () => {
                    var eatenCarbohydratesByUser = computeEatenCarbohydrates();
                    setAverageCarbohydrates(parseInt(eatenCarbohydratesByUser / 
                        getNumberOfDaysBetweenTwoDates(getPreviousWeekDate(), getCurrentDate())));
                };

                const setAverageEatenFats = () => {
                    var eatenFatsByUser = computeEatenFats();
                    setAverageFats(parseInt(eatenFatsByUser / 
                        getNumberOfDaysBetweenTwoDates(getPreviousWeekDate(), getCurrentDate())));
                };

               setEatenCalories();
               setEatenCarbohydrates();
               setEatenProteins();
               setEatenFats();
               setAverageEatenCalories();
               setAverageEatenProteins();
               setAverageEatenCarbohydrates();
               setAverageEatenFats();
            }
    }});

    const { error: activitiesError, isLoading: activitiesIsLoading, isError : activitiesIsError } = 
    useQuery('getUserActivities', () => getUserActivitiesForTimePeriod(userId, token, getPreviousWeekDate(), getCurrentDate()),
    { onSuccess: (response) => {
        if (response.status === SUCCESS_CODE) {
            const { data } = response;
            if (!data) {
                return;
            }

            const computeBurnedCalories = () => {
                return (data.reduce((prev, cur) => {
                    return prev + cur.burnedCalories;
                }, 0));
            }

            const setBurnedCaloriesByUser = () => {
                var burnedCaloriesByUser = computeBurnedCalories();
                setBurnedCalories(burnedCaloriesByUser);
            };

            const setAverageBurnedCaloriesByUser = () => {
                var burnedCaloriesByUser = computeBurnedCalories();
                setAverageBurnedCalories(parseInt(burnedCaloriesByUser / 
                    getNumberOfDaysBetweenTwoDates(getPreviousWeekDate(), getCurrentDate())));
            }

            setBurnedCaloriesByUser();
            setAverageBurnedCaloriesByUser();
        }
    }});


    if(mealsIsLoading || activitiesIsLoading){
        return <RequestLoadingViewer/>;
    }
    if(mealsIsError){
        return <RequestErrorViewer errorMessage={mealsError.message} />;
    }
    if (activitiesIsError) {
        return <RequestErrorViewer errorMessage={activitiesError.message} />;
    }
    return (
        <div className="report-container">
            <h1>Raport tygodniowy</h1>
            <table className="report-table app-table">
                <tbody>
                    <tr>
                        <th className="left-th">Spożyta wartość energetyczna [kcal]: </th>
                        <td className="right-th">{calories}</td>
                    </tr>
                    <tr>
                        <th className="left-th">Spożyte białko [g]: </th>
                        <td className="right-th">{proteins}</td>
                    </tr>
                    <tr>
                        <th className="left-th">Spożyte węglowodany [g]: </th>
                        <td className="right-th">{carbohydrates}</td>
                    </tr>
                    <tr>
                        <th className="left-th">Spożyte tłuszcze [g]: </th>
                        <td className="right-th">{fats}</td>
                    </tr>
                    <tr>
                        <th className="left-th">Średnia spożywana wartość energetyczna w ciągu dnia [kcal]: </th>
                        <td className="right-th">{averageCalories}</td>
                    </tr>
                    <tr>
                        <th className="left-th">Średnia spożywana wartość białka w ciągu dnia [g]: </th>
                        <td className="right-th">{averageProteins}</td>
                    </tr>
                    <tr>
                        <th className="left-th">Średnia spożywana wartość węglowodanów w ciągu dnia [g]: </th>
                        <td className="right-th">{averageCarbohydrates}</td>
                    </tr>
                    <tr>
                        <th className="left-th">Średnia spożywana wartość tłuszczy w ciągu dnia [g]: </th>
                        <td className="right-th">{averageFats}</td>
                    </tr>
                    <tr>
                        <th className="left-th">Spalone kalorie [kcal]: </th>
                        <td className="right-th">{burnedCalories}</td>
                    </tr>
                    <tr>
                        <th className="left-th">Średnia spalona wartość kalorii w ciągu dnia [kcal]: </th>
                        <td className="right-th">{averageBurnedCalories}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default WeeklyReports;