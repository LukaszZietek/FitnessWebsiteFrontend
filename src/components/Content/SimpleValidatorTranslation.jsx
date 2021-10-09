import SimpleReactValidator from 'simple-react-validator';

const CreateSimpleReactValidator = (forceUpdateVariable) => {
    return (
        new SimpleReactValidator({
            autoForceUpdate: {forceUpdate: forceUpdateVariable},
            messages: {
                required: 'Pole :attribute jest wymagane',
                in: 'Pole :attribute wymaga wybrania jednej z dostępnych opcji',
                numeric: 'Podana wartość w polu :attribute musi być typu liczbowego',
                min: 'Wartość w polu :attribute nie może być mniejsza/krótsza niż :min',
                max: 'Wartość w polu :attribute nie może być większa/dłuższa niż :max',
                alpha: 'Wartość w polu :attribute nie powinna zawierać cyfr',
                alpha_num_dash: 'Wartość w polu :attribute nie może zawierać spacji',
                email: 'Email w polu :attribute jest nieprawidłowy',
                default: 'Wartość w polu :attribute jest niepoprawna',
            }})
    );
};

export default CreateSimpleReactValidator;