import React, { useState, useContext } from 'react';
import { useMutation, useQuery } from 'react-query';

import './MealsList.css';

import { checkIfDateIsBetweenTwoDates, getCurrentDate, getPreviousMonthDate } from '../../../DateUtilities';
import { NO_CONTENT, SUCCESS_CODE } from '../../../../common/StatusCodes';
import { deleteUserMeal, getUserInfo, getUserMeals } from '../../../../RequestHelper/RequestHelper';
import { ApplicationContext } from '../../../../ApplicationContext/ApplicationProvider';

import RequestErrorViewer from '../RequestErrorViewer/RequestErrorViewer';
import RequestLoadingViewer from '../RequestLoadingViewer/RequestLoadingViewer';
import { SZT, ML } from '../../../../common/QuantityUnit';

const MealsList = () => {
    const { userId, token } = useContext(ApplicationContext);
    const [userMeals, setUserMeals] = useState([]);
    const [mealsDate, setMealsDate] = useState(getCurrentDate());
    const [ eatenCalories, setEatenCalories ] = useState(0);
    const [ eatenCarbohydrates, setEatenCarbohydrates ] = useState(0);
    const [ eatenFats, setEatenFats ] = useState(0);
    const [ eatenProteins, setEatenProteins ] = useState(0);
    const [ caloricDemand, setCaloricDemand ] = useState(0);
    const [ proteinsDemand, setProteinsDemand ] = useState(0);
    const [ carbohydratesDemand, setCarbohydratesDemand ] = useState(0);
    const [ fatsDemand, setFatsDemand ] = useState(0);
    const deleteQuery = useMutation(deleteUserMeal);
    const { error: userError, isLoading: userIsLoading, isError: userIsError } = 
        useQuery('getUserInfo', () => getUserInfo(userId, token), { onSuccess : (response) => {
            if (response.status === SUCCESS_CODE) {
                const { data } = response;
                if (!data) {
                    return;
                }
                setCaloricDemand(data.caloricDemand);
                setProteinsDemand(data.proteinsDemand);
                setCarbohydratesDemand(data.carbohydratesDemand);
                setFatsDemand(data.fatsDemand);
            }
        }});

    const { error: mealsError, isLoading: mealsIsLoading, isError : mealsIsError, refetch } = 
        useQuery('getUserMeals', () => getUserMeals(userId, token, mealsDate),
            { onSuccess: (response) => {
                if (response.status === SUCCESS_CODE) {
                    const { data } = response;
                    if (!data) {
                        return;
                    }
                    setUserMeals([...data]);
                }
            }});
    
    React.useEffect( () => {
        const computeTotallyEatenCalories = () => {
            var eatenCaloriesByUser = userMeals.reduce((prev, cur) => {
                return prev + cur.calories;
            }, 0);
            setEatenCalories(eatenCaloriesByUser);
        };
   
       const computeTotallyEatenCarbohydrates = () => {
           var eatenCarbohydratesByUser = userMeals.reduce((prev, cur) => {
               return prev + cur.carbohydrates;
           }, 0);
           setEatenCarbohydrates(eatenCarbohydratesByUser);
       };
       const computeTotallyEatenFats = () => {
           var eatenFatsByUser = userMeals.reduce((prev, cur) => {
               return prev + cur.fats;
           }, 0);
           setEatenFats(eatenFatsByUser);
       };
   
       const computeTotallyEatenProteins = () => {
           var eatenProteinsByUser = userMeals.reduce((prev, cur) => {
               return prev + cur.proteins;
           }, 0);
           setEatenProteins(eatenProteinsByUser);
       };
       computeTotallyEatenCalories();
       computeTotallyEatenCarbohydrates();
       computeTotallyEatenProteins();
       computeTotallyEatenFats();
    }, [userMeals]);

    React.useEffect(() => {
        refetch();
    }, [mealsDate, refetch]);

    if(userIsLoading || mealsIsLoading){
        return <RequestLoadingViewer/>;
    }
    if(userIsError){
        return <RequestErrorViewer errorMessage={userError.message} />;
    }
    if (mealsIsError) {
        return <RequestErrorViewer errorMessage={mealsError.message} />;
    }

    const handleDateChange = (e) => {
        if (checkIfDateIsBetweenTwoDates(getPreviousMonthDate(), getCurrentDate(), e.target.value)) {
             setMealsDate(e.target.value);
         } else {
            setMealsDate(getCurrentDate());
         }
    }

    const deleteItem = (id) => {
        deleteQuery.mutate({mealId: id, token}, {onSuccess: (response) => {
            if (response.status === NO_CONTENT)
            {
                setUserMeals((prevState) => prevState.filter(item => item.id !== id))
            } else {
                alert(`Serwer wysłał odpowiedź ze statusem ${response.status}, spróbuj ponownie za chwile lub skontaktuj się z administratorem`);
            }
        }, onError: (error) => {
            alert(`Wystąpił błąd: ${error.message}, spróbuj wykonać operacje ponownie lub skontaktuj się z administratorem`);
        }});
    };

    const getQuantityUnitName = (item) => {
        if (item === SZT) {
            return 'szt';
        }
        if (item === ML) {
            return 'ml';
        }
        return 'g';
    }

    const mealsRow = userMeals.map(item => (
        <tr key={item.id}>
            <th>{item.name}</th>
            <th>{`${item.quantity} ${getQuantityUnitName(item.quantityUnit)}`}</th>
            <th>{item.calories}</th>
            <th>{item.proteins}</th>
            <th>{item.fats}</th>
            <th>{item.carbohydrates}</th>
            <th>
                <button className="button delete-button" onClick={() => deleteItem(item.id)} >
                    Usuń
                </button>
            </th>
        </tr>
    ))

    return (
        <div className="meals-container">
            <input type="date" value={mealsDate} onChange={handleDateChange} 
                min={getPreviousMonthDate()} max={getCurrentDate()} />
            <h1>Lista posiłków z dnia {mealsDate}</h1>
            <table className="meals-table">
                <tbody>
                    <tr className="header-row">
                        <th>Nazwa</th>
                        <th>Ilość</th>
                        <th>Kalorie [kcal]</th>
                        <th>Białka [g]</th>
                        <th>Tłuszcze [g]</th>
                        <th>Węglowodany [g]</th>
                        <th>Działania</th>
                    </tr>
                    {mealsRow}
                </tbody>
            </table>
            <h2>Podsumowanie</h2>
            <table className="meals-table">
                <tbody>
                    <tr>
                        <th className="font-weight-b">Spożyte kalorie / Zapotrzebowanie kaloryczne [kcal]/[kcal]</th>
                        <th>{`${eatenCalories}/${caloricDemand}`}</th>
                    </tr>
                    <tr>
                        <th className="font-weight-b">Spożyte białka / Zapotrzebowanie na białka [g]/[g]</th>
                        <th>{`${eatenProteins}/${proteinsDemand}`}</th>
                    </tr>
                    <tr>
                        <th className="font-weight-b">Spożyte tłuszcze / Zapotrzebowanie na tłuszcze [g]/[g]</th>
                        <th>{`${eatenFats}/${fatsDemand}`}</th>
                    </tr>
                    <tr>
                        <th className="font-weight-b">Spożyte węglowodany / Zapotrzebowanie na węglowodany [g]/[g]</th>
                        <th>{`${eatenCarbohydrates}/${carbohydratesDemand}`}</th>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default MealsList;