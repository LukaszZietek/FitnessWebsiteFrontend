import React, { useState } from 'react';

import './MealsList.css';

import { checkIfDateIsBetweenTwoDates, getCurrentDate, getPreviousMonthDate } from '../../../DateUtilities';

const MealsList = () => {
    const [dummyMeals, setDummyMeals] = useState([
        {
            id: 0,
            name: "Kromka chleba",
            quantity: 4,
            quantityUnit: "g",
            calories: 530,
            proteins: 20,
            fats: 50,
            carbohydrates: 40,
            date: "2021-09-11"
        },
        {
            id: 1,
            name: "Bułka",
            quantity: 10,
            quantityUnit: "szt.",
            calories: 200,
            proteins: 40,
            fats: 30,
            carbohydrates: 200,
            date: "2021-09-11"
        },
        {
            id: 2,
            name: "Spaghetti",
            quantity: 1,
            quantityUnit: "ml",
            calories: 570,
            proteins: 422,
            fats: 370,
            carbohydrates: 250,
            date: "2021-09-11"
        },
        {
            id: 3,
            name: "Schabowy",
            quantity: 1,
            quantityUnit: "ml",
            calories: 1000,
            proteins: 30,
            fats: 70,
            carbohydrates: 400,
            date: "2021-09-11"
        }
    ]);
    const [mealsDate, setMealsDate] = useState(getCurrentDate());
    const eatenCalories = 500;
    const eatenCarbohydrates = 1200;
    const eatenFats = 400;
    const eatenProteins = 70;
    const caloricDemand = 700;
    const proteinsDemand = 100;
    const carbohydratesDemand = 200;
    const fatsDemand = 150;

    const handleDateChange = (e) => {
        if (checkIfDateIsBetweenTwoDates(getPreviousMonthDate(), getCurrentDate(), e.target.value)) {
             setMealsDate(e.target.value);
         } else {
            setMealsDate(getCurrentDate());
         }
    }

    const deleteItem = (id) => setDummyMeals((prevState) => prevState.filter(item => item.id !== id));

    const mealsRow = dummyMeals.map(item => (
        <tr key={item.id}>
            <th>{item.name}</th>
            <th>{`${item.quantity} ${item.quantityUnit}`}</th>
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