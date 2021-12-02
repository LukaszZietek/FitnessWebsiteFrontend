import React, { useState, useRef, useContext } from 'react';
import { useMutation, useQuery } from 'react-query';

import { ApplicationContext } from '../../../../ApplicationContext/ApplicationProvider';
import { CREATED, SUCCESS_CODE } from '../../../../common/StatusCodes';
import { addUserMeal, getMealTypes } from '../../../../RequestHelper/RequestHelper';
import { SZT, ML } from '../../../../common/QuantityUnit';

import CreateSimpleReactValidator from '../../SimpleValidatorTranslation';
import RequestErrorViewer from '../RequestErrorViewer/RequestErrorViewer';
import RequestLoadingViewer from '../RequestLoadingViewer/RequestLoadingViewer';

import './MealsAdder.css';

const MealsAdder = () => {
    const { token } = useContext(ApplicationContext);
    const [, forceUpdate] = useState();
    const simpleValidator = useRef(CreateSimpleReactValidator(forceUpdate));
    const [mealTypes, setMealTypes] = useState([]);
    const [mealId, setMealId] = useState('');
    const [mealQuantity, setMealQuantity] = useState(1);
    const [quantityUnit, setQuantityUnit] = useState(0);
    const [mealCalories, setMealCalories] = useState(0);
    const [mealProteins, setMealProteins] = useState(0);
    const [mealFats, setMealFats] = useState(0);
    const [mealCarbohydrates, setMealCarbohydrates] = useState(0);
    const addQuery = useMutation(addUserMeal);
    const { error, isLoading, isError } = useQuery('getMeals',
    () => getMealTypes(token), { onSuccess: (response) => {
       if (response.status === SUCCESS_CODE) {
           const { data } = response;
           setMealTypes([...data]);
       }
   }});

   React.useEffect(() => {
       const computeEatenMeals = () => {
           if (!(mealQuantity && mealId && mealTypes)) {
                return;
           }

           var item = mealTypes.find( item => item.id === mealId);
           if (!item) {
               return;
           }
           setMealCalories(parseInt(item.caloriesIn100Unit * mealQuantity / 100));
           setMealProteins(parseInt(item.proteinsIn100Unit * mealQuantity / 100));
           setMealCarbohydrates(parseInt(item.carbohydratesIn100Unit * mealQuantity / 100));
           setMealFats(parseInt(item.fatsIn100Unit * mealQuantity / 100));
       }
       computeEatenMeals();
   }, [mealQuantity, mealId, mealTypes]);

   if (isLoading) {
       return <RequestLoadingViewer/>
   }
   if (isError) {
       return <RequestErrorViewer errorMessage={error.message}/>
   }



    const handleMealQuantityChange = (e) => setMealQuantity(e.target.value);
    const handleSelectChange = e => {
        var index = parseInt(e.target.value);
        setMealId(index);
        setQuantityUnit(mealTypes.find( item => item.id === index).quantityUnit);
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const formValid = simpleValidator.current.allValid();
        if (!formValid) {
            simpleValidator.current.showMessages();
            forceUpdate(1);
        } else {
            addQuery.mutate({quantity: mealQuantity, mealId, token}, {onSuccess: (response) => {
                    if (response.status === CREATED)
                    {
                        alert('Dodano posiłek');
                        resetInputs();
                    } else {
                        alert(`Serwer wysłał odpowiedź ze statusem ${response.status}, spróbuj ponownie za chwile lub skontaktuj się z administratorem`);
                    }
                }, onError: (error) => {
                    alert(`Wystąpił błąd: ${error.message}, spróbuj wykonać operacje ponownie lub skontaktuj się z administratorem`);
                }});
        }
    };

    const handleOnCancel = () => {
        resetInputs();
    }

    const resetInputs = () => {
        setMealId('');
        setMealQuantity(1);
        setMealCalories(0);
        setMealProteins(0);
        setMealFats(0);
        setMealCarbohydrates(0);
        simpleValidator.current.hideMessages();
    }

    const selectOptions = mealTypes.map(item => (
        <option key={item.id} value={item.id}>{item.name}</option>
    ));

    const getQuantityUnitName = (item) => {
        if (item === SZT) {
            return 'szt';
        }
        if (item === ML) {
            return 'ml';
        }
        return 'g';
    }

    return (
        <div className="meals-adder-container">
            <h1>Dodaj posiłek: </h1>
            <form onSubmit={handleOnSubmit} className="display-grid">
                <div className="first-row f-column">
                    <label htmlFor="meal-id" className="m-right-10">Rodzaj posiłku</label>
                </div>
                <div className="first-row s-column">
                    <select id="meal-id" className="activities-input" name="type" onChange={handleSelectChange} value={mealId}>
                        <option value={0}></option>
                        {selectOptions}
                    </select>
                    <p className="validator-message">{simpleValidator.current.message('rodzaj posiłku', mealId,
                        'required')}</p>
                </div>
                <div className="second-row f-column">
                    <label htmlFor="quantity" className="m-right-10">Ilość</label>
                </div>
                <div className="second-row s-column">
                    <input id="quantity" type="number" className="meal-adder-input full-input-width" value={mealQuantity} onChange={handleMealQuantityChange}
                         min="1" max="10000" />
                    <span className="quantity-container">{getQuantityUnitName(quantityUnit)}</span>
                    <p className="validator-message">
                        {simpleValidator.current.message('ilość', mealQuantity,
                            'required|min:1,num|max:10000,num')}
                    </p>
                </div>
                <div className="third-row f-column" style={{"padding-top": "0px"}}>
                    <h3>Kaloryczność posiłku [kcal]:</h3>
                </div>
                <div className="third-row s-column">
                    <h3>{mealCalories}</h3>
                </div>
                <div className="fourth-row f-column" style={{"padding-top": "0px"}}>
                    <h3>Ilość białka [g]:</h3>
                </div>
                <div className="fourth-row s-column">
                    <h3>{mealProteins}</h3>
                </div>
                <div className="fifth-row f-column" style={{"padding-top": "0px"}}>
                    <h3>Ilość tłuszczy [g]:</h3>
                </div>
                <div className="fifth-row s-column">
                    <h3>{mealFats}</h3>
                </div>
                <div className="sixth-row f-column" style={{"padding-top": "0px"}}>
                    <h3>Ilość węglowodanów [g]:</h3>
                </div>
                <div className="sixth-row s-column">
                    <h3>{mealCarbohydrates}</h3>
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