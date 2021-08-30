import React from 'react';

import '../Reports.css';

const MonthlyReports = () => {
    const calories = 0;
    const proteins = 1;
    const fats = 2;
    const carbohydrates = 3;
    const averageCalories = 4;
    const averageProteins = 5;
    const averageFats = 6;
    const averageCarbohydrates = 7;

    return (
        <div className="report-container">
            <h1>Raport miesięczny</h1>
            <table className="report-table">
                <tr>
                    <th className="left-th">Spożyta wartość energetyczna [kcal]: </th>
                    <th className="right-th">{calories}</th>
                </tr>
                <tr>
                    <th className="left-th">Spożyte białko [g]: </th>
                    <th className="right-th">{proteins}</th>
                </tr>
                <tr>
                    <th className="left-th">Spożyte węglowodany [g]: </th>
                    <th className="right-th">{carbohydrates}</th>
                </tr>
                <tr>
                    <th className="left-th">Spożyte tłuszcze [g]: </th>
                    <th className="right-th">{fats}</th>
                </tr>
                <tr>
                    <th className="left-th">Średnia spożywana wartość energetyczna w ciągu dnia [kcal]: </th>
                    <th className="right-th">{averageCalories}</th>
                </tr>
                <tr>
                    <th className="left-th">Średnia spożywana wartość białka w ciągu dnia [g]: </th>
                    <th className="right-th">{averageProteins}</th>
                </tr>
                <tr>
                    <th className="left-th">Średnia spożywana wartość tłuszczy w ciągu dnia [g]: </th>
                    <th className="right-th">{averageFats}</th>
                </tr>
                <tr>
                    <th className="left-th">Średnia spożywana wartość węglowodanów w ciągu dnia [g]: </th>
                    <th className="right-th">{averageCarbohydrates}</th>
                </tr>
            </table>
        </div>
    );
};

export default MonthlyReports;