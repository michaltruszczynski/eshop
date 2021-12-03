import { useState, useLayoutEffect } from 'react';

import { validateInput } from '../utility/validators';

const useForm = fromData => {
      const [formInput, setFormInput] = useState(() => {
            const formInputKeys = Object.keys(fromData);
            const formInput = {};

            formInputKeys.forEach(key => {
                  //dodana validacja dle default value!!!!
                  const { isValid, errorMessages } = validateInput(fromData[key].elementConfig.validators, fromData[key].elementConfig.defaultValue);
                  return formInput[key] = {
                        value: fromData[key].elementConfig.defaultValue,
                        touched: false,
                        isValid: isValid,
                        // isValid: false,
                        errors: errorMessages,
                        // errors: [],
                        validators: fromData[key].elementConfig.validators
                  }
            });

            return formInput
      });

      const [formIsValid, setFormIsValid] = useState(false);

      useLayoutEffect(() => {
            const checkIsFormValid = () => {
                  const inputKeys = Object.keys(formInput);
                  const formIsValid = inputKeys.reduce((valid, key) => {
                        return valid && formInput[key].isValid
                  }, true);
                  setFormIsValid(formIsValid);
            }

            checkIsFormValid();
      }, [formInput])


      const inputChangeHandler = key => (value, touched = true) => {
            console.log('value', value)
            setFormInput(formInput => {
                  const { isValid, errorMessages } = validateInput(formInput[key].validators, value);
                  const newFormInput = {
                        ...formInput,
                        [key]: {
                              ...formInput[key],
                              value: value,
                              touched: touched,
                              isValid: isValid,
                              errors: errorMessages
                        }
                  };

                  return newFormInput;
            })
      }

      return [formInput, formIsValid, inputChangeHandler]

}

export default useForm;