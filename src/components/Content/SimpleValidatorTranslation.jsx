import SimpleReactValidator from 'simple-react-validator';

const CreateSimpleReactValidator = (forceUpdateVariable) => {
    return (
        new SimpleReactValidator({
            autoForceUpdate: {forceUpdate: forceUpdateVariable},
            messages: {
                required: 'Pole :attribute jest wymagane',
                in: 'Pole :attribute wymaga wybrania jednej z dostępnych opcji',
                numeric: 'Podana wartość w polu :attribute musi być typu liczbowego',
                min: 'Wartość w polu :attribute nie może być mniejsza niż :min:type',
                max: 'Wartość w polu :attribute nie może być większa niż :max:type',
                default: 'Wartość w polu :attribute jest niepoprawna'
            }})
    );
};

export default CreateSimpleReactValidator;