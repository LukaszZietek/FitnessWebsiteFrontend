import React, { useContext, useRef, useState } from 'react';
import CreateSimpleReactValidator from '../../SimpleValidatorTranslation';

import { SZT, G, ML } from '../../../../common/QuantityUnit';
import { CREATED } from '../../../../common/StatusCodes';

import './MealTypeAdder.css';
import { useMutation } from 'react-query';
import { addUserMealType } from '../../../../RequestHelper/RequestHelper';
import { ApplicationContext } from '../../../../ApplicationContext/ApplicationProvider';

const MealTypeAdder = () => {
    const { token } = useContext(ApplicationContext);
    const [, forceUpdate] = useState();
    const simpleValidator = useRef(CreateSimpleReactValidator(forceUpdate));
    const [mealName, setMealName] = useState('');
    const [quantityUnit, setQuantityUnit] = useState(0);
    const [caloriesIn100Unit, setCaloriesIn100Unit] = useState(0);
    const [proteinsIn100Unit, setProteinsIn100Unit] = useState(0);
    const [carbohydratesIn100Unit, setCarbohydratesIn100Unit] = useState(0);
    const [fatsIn100Unit, setFatsIn100Unit] = useState(0);
    const addQuery = useMutation(addUserMealType);

    const handleOnMealNameChange = (e) => setMealName(e.target.value);
    const handleOnSelectChange = (e) => setQuantityUnit(parseInt(e.target.value));
    const handleOnCaloriesChange = (e) => setCaloriesIn100Unit(e.target.value);
    const handleOnProteinsChange = (e) => setProteinsIn100Unit(e.target.value);
    const handleOnCarbohydratesChange = (e) => setCarbohydratesIn100Unit(e.target.value);
    const handleOnFatsChange = (e) => setFatsIn100Unit(e.target.value);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const formValid = simpleValidator.current.allValid();
        if (!formValid) {
            simpleValidator.current.showMessages();
            forceUpdate(1);
        } else {
            addQuery.mutate({name: mealName, quantityUnit, caloriesIn100Unit, 
                proteinsIn100Unit, carbohydratesIn100Unit, fatsIn100Unit, token}, {onSuccess: (response) => {
                if (response.status === CREATED)
                {
                    alert('Dodano typ posiłku');
                    resetInputs();
                } else {
                    alert(`Serwer wysłał odpowiedź ze statusem ${response.status}, spróbuj ponownie za chwile lub skontaktuj się z administratorem`);
                }
            }, onError: (error) => {
                alert(`Wystąpił błąd: ${error.message}, spróbuj wykonać operacje ponownie lub skontaktuj się z administratorem`);
            }});
        }
    }

    const handleOnCancel = () => {
        resetInputs();
    }

    const resetInputs = () => {
        setMealName('');
        setQuantityUnit(0);
        setCarbohydratesIn100Unit(0);
        setCaloriesIn100Unit(0);
        setProteinsIn100Unit(0);
        setFatsIn100Unit(0);
        simpleValidator.current.hideMessages();
    }

    return (
        <div className="meal-type-container">
        <h1>Dodaj nowy typ posiłku:</h1>
         <form onSubmit={handleOnSubmit} className="display-grid meal-type-form">
            <div className="first-row f-column">
                <label htmlFor="name" className="m-right-10">Nazwa posiłku</label>
            </div>
            <div className="first-row s-column">
                <input id="name" className="meal-type-input" type="text" value={mealName} 
                    onChange={handleOnMealNameChange} />
                <p className="validator-message">
                    {simpleValidator.current.message('nazwa posiłku', mealName,
                        'required|max:30,string')}
                </p>
            </div>

            <div className="second-row f-column">
                <label htmlFor="quantity-unit" className="m-right-10">Jednostka ilości</label>
            </div>
            <div className="second-row s-column">
                <select id="quantity-unit" className="meal-type-input" name="quantityUnit" onChange={handleOnSelectChange} value={quantityUnit}>
                    <option value={SZT}>szt</option>
                    <option value={G}>g</option>
                    <option value={ML}>ml</option>
                </select>
                <p className="validator-message">{simpleValidator.current.message('jednostka ilości', quantityUnit,
                        'required')}</p>
            </div>

            <div className="third-row f-column">
                <label htmlFor="calories" className="m-right-10">Ilość kalorii w 100 jednostkach produktu [kcal]</label>
            </div>
            <div className="third-row s-column">
                <input id="calories" className="meal-type-input" type="number" value={caloriesIn100Unit} 
                    onChange={handleOnCaloriesChange} />
                <p className="validator-message">
                    {simpleValidator.current.message('ilość kalorii', caloriesIn100Unit,
                        'required|min:1,num|max:32767,num')}
                </p>
            </div>

            <div className="fourth-row f-column">
                <label htmlFor="proteins" className="m-right-10">Ilość białka w 100 jednostkach produktu [g]</label>
            </div>
            <div className="fourth-row s-column">
                <input id="proteins" className="meal-type-input" type="number" value={proteinsIn100Unit} 
                    onChange={handleOnProteinsChange} />
                <p className="validator-message">
                    {simpleValidator.current.message('ilość białka', proteinsIn100Unit,
                        'required|min:1,num|max:32767,num')}
                </p>
            </div>

            <div className="fifth-row f-column">
                <label htmlFor="carbohydrates" className="m-right-10">Ilość węglowodanów w 100 jednostkach produktu [g]</label>
            </div>
            <div className="fifth-row s-column">
                <input id="carbohydrates" className="meal-type-input" type="number" value={carbohydratesIn100Unit} 
                    onChange={handleOnCarbohydratesChange} />
                <p className="validator-message">
                    {simpleValidator.current.message('ilość węglowodanów', carbohydratesIn100Unit,
                        'required|min:1,num|max:32767,num')}
                </p>
            </div>

            <div className="sixth-row f-column">
                <label htmlFor="fats" className="m-right-10">Ilość tłuszczy w 100 jednostkach produktu [g]</label>
            </div>
            <div className="sixth-row s-column">
                <input id="fats" className="meal-type-input" type="number" value={fatsIn100Unit} 
                    onChange={handleOnFatsChange} />
                <p className="validator-message">
                    {simpleValidator.current.message('ilość tłuszczy', fatsIn100Unit,
                        'required|min:1,num|max:32767,num')}
                </p>
            </div>

            <div className="seventh-row f-column-button">
                    <button type="button" className="button cancel-button meal-type-button" onClick={handleOnCancel}>Anuluj</button>
            </div>
            <div className="seventh-row s-column">
                    <button type="submit" className="button add-button meal-type-button">Dodaj</button>
            </div>
        </form>
    </div>
    );
};

export default MealTypeAdder;