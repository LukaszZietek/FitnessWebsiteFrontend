import React, { useState, useContext} from 'react';
import { useQuery } from 'react-query';

import '../Reports.css';

import { getUserMeals, getUserActivities } from '../../../../RequestHelper/RequestHelper';
import { getCurrentDate } from '../../../DateUtilities';
import { ApplicationContext } from '../../../../ApplicationContext/ApplicationProvider';
import { SUCCESS_CODE } from '../../../../common/StatusCodes';

import RequestErrorViewer from '../RequestErrorViewer/RequestErrorViewer';
import RequestLoadingViewer from '../RequestLoadingViewer/RequestLoadingViewer';

const DailyReports = () => {
    const {userId, token} = useContext(ApplicationContext);
    const [ calories, setCalories ] = useState(0);
    const [ proteins, setProteins ] = useState(0);
    const [ fats, setFats ] = useState(0);
    const [ carbohydrates, setCarbohydrates ] = useState(0);
    const [ burnedCalories, setBurnedCalories ] = useState(0);
    const { error: mealsError, isLoading: mealsIsLoading, isError : mealsIsError } = 
    useQuery('getUserMeals', () => getUserMeals(userId, token, getCurrentDate()),
        { onSuccess: (response) => {
            if (response.status === SUCCESS_CODE) {
                const { data } = response;
                if (!data) {
                    return;
                }
                const computeTotallyEatenCalories = () => {
                    var eatenCaloriesByUser = data.reduce((prev, cur) => {
                        return prev + cur.calories;
                    }, 0);
                    setCalories(eatenCaloriesByUser);
                };
           
               const computeTotallyEatenCarbohydrates = () => {
                   var eatenCarbohydratesByUser = data.reduce((prev, cur) => {
                       return prev + cur.carbohydrates;
                   }, 0);
                   setCarbohydrates(eatenCarbohydratesByUser);
               };
               const computeTotallyEatenFats = () => {
                   var eatenFatsByUser = data.reduce((prev, cur) => {
                       return prev + cur.fats;
                   }, 0);
                   setFats(eatenFatsByUser);
               };
           
               const computeTotallyEatenProteins = () => {
                   var eatenProteinsByUser = data.reduce((prev, cur) => {
                       return prev + cur.proteins;
                   }, 0);
                   setProteins(eatenProteinsByUser);
               };
               computeTotallyEatenCalories();
               computeTotallyEatenCarbohydrates();
               computeTotallyEatenProteins();
               computeTotallyEatenFats();
            }
    }});
    const { error: activitiesError, isLoading: activitiesIsLoading, isError : activitiesIsError } = 
    useQuery('getUserActivities', () => getUserActivities(userId, token, getCurrentDate()),
    { onSuccess: (response) => {
        if (response.status === SUCCESS_CODE) {
            const { data } = response;
            if (!data) {
                return;
            }
            const computeBurnedCalories = () => {
                var burnedCaloriesByUser = data.reduce((prev, cur) => {
                    return prev + cur.burnedCalories;
                }, 0);
                setBurnedCalories(burnedCaloriesByUser);
            };
            computeBurnedCalories();
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
            <h1>Raport dzienny</h1>
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
                        <th className="left-th">Spalone kalorie [kcal]: </th>
                        <td className="right-th">{burnedCalories}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default DailyReports;