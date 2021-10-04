import React, { useState, useRef } from 'react';

import './MealsAdder.css';
import CreateSimpleReactValidator from '../../SimpleValidatorTranslation';

const MealsAdder = () => {
    const [, forceUpdate] = useState();
    const simpleValidator = useRef(CreateSimpleReactValidator(forceUpdate));
    const [mealName, setMealName] = useState('');
    const [mealQuantity, setMealQuantity] = useState(1);
    const [quantityUnit, setQuantityUnit] = useState('szt.')
    const [mealCalories, setMealCalories] = useState(0);
    const [mealProteins, setMealProteins] = useState(0);
    const [mealFats, setMealFats] = useState(0);
    const [mealCarbohydrates, setMealCarbohydrates] = useState(0);

    const handleMealNameChange = (e) => setMealName(e.target.value);
    const handleMealQuantityChange = (e) => setMealQuantity(e.target.value);
    const handleQuantityUnitChange = (e) => setQuantityUnit(e.target.value);
    const handleMealCaloriesChange = (e) => setMealCalories(e.target.value);
    const handleMealProteinsChange = (e) => setMealProteins(e.target.value);
    const handleMealFatsChange = (e) => setMealFats(e.target.value);
    const handleMealCarbohydratesChange = (e) => setMealCarbohydrates(e.target.value);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const formValid = simpleValidator.current.allValid();
        if (!formValid) {
            simpleValidator.current.showMessages();
            forceUpdate(1);
        } else {
            alert('Dodano posiłek');
            resetInputs();
        }
    };

    const handleOnCancel = () => {
        resetInputs();
    }

    const resetInputs = () => {
        setMealName('');
        setMealQuantity(1);
        setMealCalories(0);
        setMealProteins(0);
        setMealFats(0);
        setMealCarbohydrates(0);
    }

    return (
        <div className="meals-adder-container">
            <h1>Dodaj posiłek: </h1>
            <form onSubmit={handleOnSubmit}>
                <div>
                    <label>
                        Nazwa posiłku:
                        <input type="text" maxLength="30" value={mealName} onChange={handleMealNameChange} />
                    </label>
                    <p className="validator-message">
                        {simpleValidator.current.message('nazwa posiłku', mealName,
                            'required|max:30,string')}
                    </p>
                </div>
                <div>
                    <label>
                        Ilość:
                        <input type="number" value={mealQuantity} onChange={handleMealQuantityChange}
                         min="1" max="99" />
                    </label>
                    <select onChange={handleQuantityUnitChange} value={quantityUnit} >
                        <option value="szt.">szt.</option>
                        <option value="g">g</option>
                        <option value="ml">ml</option>
                    </select>
                    <p className="validator-message">
                        {simpleValidator.current.message('ilość', mealQuantity,
                            'required|min:1,num|max:99,num')}
                    </p>
                    <p className="validator-message">
                        {simpleValidator.current.message('jednostka', quantityUnit,
                            'required|in:szt.,g,ml')}
                    </p>
                </div>
                <div>
                    <label>
                        Kaloryczność posiłku [kcal]:
                        <input type="number" value={mealCalories} onChange={handleMealCaloriesChange}
                         min="0" max="10000" />
                    </label>
                    <p className="validator-message">
                        {simpleValidator.current.message('kaloryczność posiłku', mealCalories,
                            'required|min:0,num|max:10000,num')}
                    </p>
                </div>
                <div>
                    <label>
                        Ilość białka [g]:
                        <input type="number" value={mealProteins} onChange={handleMealProteinsChange}
                         min="0" max="1000" />
                    </label>
                    <p className="validator-message">
                        {simpleValidator.current.message('ilośc białka', mealCalories,
                            'required|min:0,num|max:1000,num')}
                    </p>
                </div>
                <div>
                    <label>
                        Ilość tłuszczy [g]:
                        <input type="number" value={mealFats} onChange={handleMealFatsChange}
                         min="0" max="1000" />
                    </label>
                    <p className="validator-message">
                        {simpleValidator.current.message('ilość tłuszczy', mealCalories,
                            'required|min:0,num|max:1000,num')}
                    </p>
                </div>
                <div>
                    <label>
                        Ilość węglowodanów [g]:
                        <input type="number" value={mealCarbohydrates} onChange={handleMealCarbohydratesChange}
                         min="0" max="1000" />
                    </label>
                    <p className="validator-message">
                        {simpleValidator.current.message('ilośc węglowodanów', mealCalories,
                            'required|min:0,num|max:1000,num')}
                    </p>
                </div>
                <div>
                    <button type="button" className="button cancel-button" onClick={handleOnCancel}>Anuluj</button>
                    <button type="submit" className="button add-button">Dodaj</button>
                </div>
            </form>
        </div>
    );
};

export default MealsAdder;