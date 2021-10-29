import React, { useState, useRef, useContext } from 'react';
import { useMutation } from 'react-query';

import { ApplicationContext } from '../../../../ApplicationContext/ApplicationProvider';
import { addUserMeal } from '../../../../RequestHelper/RequestHelper';

import CreateSimpleReactValidator from '../../SimpleValidatorTranslation';

import './MealsAdder.css';

const MealsAdder = () => {
    const { token } = useContext(ApplicationContext);
    const [, forceUpdate] = useState();
    const simpleValidator = useRef(CreateSimpleReactValidator(forceUpdate));
    const [mealName, setMealName] = useState('');
    const [mealQuantity, setMealQuantity] = useState(1);
    const [quantityUnit, setQuantityUnit] = useState(0);
    const [mealCalories, setMealCalories] = useState(0);
    const [mealProteins, setMealProteins] = useState(0);
    const [mealFats, setMealFats] = useState(0);
    const [mealCarbohydrates, setMealCarbohydrates] = useState(0);
    const addQuery = useMutation(addUserMeal);


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
            addQuery.mutate({name: mealName, quantity: mealQuantity, quantityUnit, calories: mealCalories,
                 proteins: mealProteins, carbohydrates: mealCarbohydrates, fats: mealFats, token});
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
        simpleValidator.current.hideMessages();
    }

    return (
        <div className="meals-adder-container">
            <h1>Dodaj posiłek: </h1>
            <form onSubmit={handleOnSubmit} className="display-grid">
                <div className="first-row f-column">
                    <label for="mealName" className="m-right-10">Nazwa posiłku</label>
                </div>
                <div className="first-row s-column">
                    <input id="mealName" className="meal-adder-input full-input-width" type="text" maxLength="30" value={mealName} onChange={handleMealNameChange} />
                    <p className="validator-message">
                        {simpleValidator.current.message('nazwa posiłku', mealName,
                            'required|max:30,string')}
                    </p>
                </div>
                <div className="second-row f-column">
                    <label for="quantity" className="m-right-10">Ilość</label>
                </div>
                <div className="second-row s-column">
                    <input id="quantity" type="number" className="meal-adder-input half-input-width" value={mealQuantity} onChange={handleMealQuantityChange}
                         min="1" max="99" />
                   <select className="meal-adder-input select-input-width" onChange={handleQuantityUnitChange} value={quantityUnit} >
                        <option value="0">szt</option>
                        <option value="1">g</option>
                        <option value="2">ml</option>
                    </select>
                    <p className="validator-message">
                        {simpleValidator.current.message('ilość', mealQuantity,
                            'required|min:1,num|max:99,num')}
                    </p>
                    <p className="validator-message">
                        {simpleValidator.current.message('jednostka', quantityUnit,
                            'required')}
                    </p>
                </div>
                <div className="third-row f-column">
                    <label for="calories" className="m-right-10">Kaloryczność posiłku [kcal]</label> 
                </div>
                <div className="third-row s-column">
                    <input id="calories" className="meal-adder-input full-input-width" type="number" value={mealCalories} onChange={handleMealCaloriesChange}
                         min="0" max="10000" />
                    <p className="validator-message">
                        {simpleValidator.current.message('kaloryczność posiłku', mealCalories,
                            'required|min:0,num|max:10000,num')}
                    </p>
                </div>
                <div className="fourth-row f-column">
                    <label for="proteins" className="m-right-10">Ilość białka [g]</label> 
                </div>
                <div className="fourth-row s-column">
                    <input id="proteins" className="meal-adder-input full-input-width" type="number" value={mealProteins} onChange={handleMealProteinsChange}
                         min="0" max="1000" />
                    <p className="validator-message">
                        {simpleValidator.current.message('ilośc białka', mealProteins,
                            'required|min:0,num|max:1000,num')}
                    </p>
                </div>
                <div className="fifth-row f-column">
                    <label for="fats" className="m-right-10">Ilość tłuszczy [g]</label> 
                </div>
                <div className="fifth-row s-column">
                    <input id="fats" className="meal-adder-input full-input-width" type="number" value={mealFats} onChange={handleMealFatsChange}
                         min="0" max="1000" />
                    <p className="validator-message">
                        {simpleValidator.current.message('ilość tłuszczy', mealFats,
                            'required|min:0,num|max:1000,num')}
                    </p>
                </div>
                <div className="sixth-row f-column">
                    <label for="carbohydrates" className="m-right-10">Ilość węglowodanów [g]</label> 
                </div>
                <div className="sixth-row s-column">
                    <input id="carbohydrates" className="meal-adder-input full-input-width" type="number" value={mealCarbohydrates} onChange={handleMealCarbohydratesChange}
                         min="0" max="1000" />
                    <p className="validator-message">
                        {simpleValidator.current.message('ilośc węglowodanów', mealCarbohydrates,
                            'required|min:0,num|max:1000,num')}
                    </p>
                </div>
                <div className="seventh-row f-column-button">
                    <button type="button" className="button cancel-button" onClick={handleOnCancel}>Anuluj</button>
                </div>
                <div className="seventh-row s-column">
                    <button type="submit" className="button add-button">Dodaj</button>
                </div>
            </form>
        </div>
    );
};

export default MealsAdder;