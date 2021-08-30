import React from 'react';

import '../Reports.css';

const DailyReports = () => {
    const calories = 0;
    const proteins = 1;
    const fats = 2;
    const carbohydrates = 3;
    const burnedCalories = 111;

    return (
        <div className="report-container">
            <h1>Raport dzienny</h1>
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
                    <th className="left-th">Spalone kalorie [kcal]: </th>
                    <th className="right-th">{burnedCalories}</th>
                </tr>
            </table>
        </div>
    );
};

export default DailyReports;