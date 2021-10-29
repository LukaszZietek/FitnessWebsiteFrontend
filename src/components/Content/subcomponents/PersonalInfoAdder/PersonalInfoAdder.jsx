import React, { useState, useRef, useContext } from 'react';

import CreateSimpleReactValidator from '../../SimpleValidatorTranslation';

import './PersonalInfoAdder.css';

import { MAN, WOMAN } from '../../../../common/UserGender';
import { useMutation } from 'react-query';
import { ApplicationContext } from '../../../../ApplicationContext/ApplicationProvider';
import { updateUserInfo } from '../../../../RequestHelper/RequestHelper';
import { NO_CONTENT } from '../../../../common/StatusCodes';

const PersonalInfoAdder = () => {
    const { userId, token } = useContext(ApplicationContext);
    const DEFAULT_VALUE = -1;
    const [, forceUpdate] = useState();
    const simpleValidator = useRef(CreateSimpleReactValidator(forceUpdate));
    const addQuery = useMutation(updateUserInfo);
    const [height, setHeight] = useState(100);
    const [weight, setWeight] = useState(30);
    const [gender, setGender] = useState(DEFAULT_VALUE);

    const handleOnHeightChange = e => setHeight(e.target.value);
    const handleOnWeightChange = e => setWeight(e.target.value);
    const handleOnGenderChange = e => setGender(e.target.value);

    const resetInputs = () => {
        setHeight(100);
        setWeight(30);
        setGender(DEFAULT_VALUE);
        simpleValidator.current.hideMessages();
    }

    const handleOnCancel = () => {
        resetInputs();
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const formValid = simpleValidator.current.allValid();
        if (!formValid) {
            simpleValidator.current.showMessages();
            forceUpdate(1);
        } else {
            addQuery.mutate({weight, height, gender, token, userId}, {onSuccess: (response) => {
                if (response.status === NO_CONTENT)
                {
                    alert('Dodano informacje');
                    resetInputs();
                } else {
                    alert(`Serwer wysłał odpowiedź ze statusem ${response.status}, spróbuj ponownie za chwile lub skontaktuj się z administratorem`);
                }
            }, onError: (error) => {
                alert(`Wystąpił błąd: ${error.message}, spróbuj wykonać operacje ponownie lub skontaktuj się z administratorem`);
            }});
        }
    }

    return (
        <div className="center-div">
            <h1>Dodaj informacje</h1>
            <form className="personal-info-form" onSubmit={handleOnSubmit}>
                <div className="personal-info-row">
                    <label>
                        Wzrost [cm]:
                        <br/>
                        <input className="form-input" type="number" min="100" max="250" value={height}
                            onChange={handleOnHeightChange} />
                    </label>
                    <p className="validator-message">{simpleValidator.current.message('wzrost', height, 'min:100,num|max:250,num')}</p>
                </div>
                <div className="personal-info-row">
                    <label>
                        Waga [kg]:
                        <br/>
                        <input className="form-input" type="number" min="30" max="200" value={weight}
                            onChange={handleOnWeightChange} />
                    </label>
                    <p className="validator-message">{simpleValidator.current.message('waga', weight, 'min:30,num|max:200,num')}</p>
                </div>
                <div className="personal-info-row">
                    <label>
                        Płeć
                        <br/>
                        <select className="form-input select-input" name="type" value={gender} onChange={handleOnGenderChange}>
                            <option value={DEFAULT_VALUE}></option>
                            <option value={MAN}>Męzczyzna</option>
                            <option value={WOMAN}>Kobieta</option>
                        </select>
                    </label>
                    <p className="validator-message">{simpleValidator.current.message('płeć', gender, 'in:0,1')}</p>
                </div>
                <div>
                    <button type="button" className="button cancel-button" onClick={handleOnCancel}>Anuluj</button>
                    <button type="submit" className="button add-button">Dodaj</button>
                </div>
            </form>
        </div>
    );
};

export default PersonalInfoAdder;
