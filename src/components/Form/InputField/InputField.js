import React, { useEffect } from 'react';

import InputError from '../InpurtError/InputError';

import styles from './InputField.module.scss';

const InputField = ({ label, elementType, elementConfig, value, changeInput, touched, isValid, disabled = false, errors }) => {

      const inputChangeHandler = (event) => {
            const { value } = event.target;
            changeInput(value);
      }

      // useEffect(() => {
      //       if (elementType === 'select' && elementConfig.placeholder) {
      //             changeInput("empty")
      //       }
      // }, []);

      const inputFieldClasses = htmlElementType => {
            let classesArray = [styles[`field__${htmlElementType}`]];
            if (!isValid && touched) {
                  classesArray.push(styles[`field__${htmlElementType}--error`])
            }
            return classesArray.join(' ');
      }

      let inputElement = null;
      switch (elementType) {
            case ('inputText'):
                  inputElement = (
                        <input
                              value={value}
                              type={elementConfig.type}
                              name={elementConfig.name}
                              id={elementConfig.id}
                              placeholder={elementConfig.placeholder}
                              onChange={inputChangeHandler}
                              className={inputFieldClasses('input')}
                              disabled={disabled}
                        />
                  );
                  break;
            case ('inputNumber'):
                  inputElement = (
                        <input
                              value={value}
                              type={elementConfig.type}
                              name={elementConfig.name}
                              id={elementConfig.id}
                              placeholder={elementConfig.placeholder}
                              onChange={inputChangeHandler}
                              className={inputFieldClasses('input')}
                              min="0"
                              disabled={disabled}
                        />
                  );
                  break;
            case ('textarea'):
                  inputElement = (
                        <textarea
                              value={value}
                              name={elementConfig.name}
                              id={elementConfig.id}
                              placeholder={elementConfig.placeholder}
                              onChange={inputChangeHandler}
                              className={inputFieldClasses('textarea')}
                              maxLength="500"
                              disabled={disabled}
                        />
                  );
                  break;
            case ('select'):
                  inputElement = (
                        <select
                              value={value}
                              name={elementConfig.name}
                              id={elementConfig.id}
                              onChange={inputChangeHandler}
                              // className={styles['field__select']}
                              className={inputFieldClasses('select')}
                              disabled={disabled}
                        >
                              <option key={"empty"} value={"empty"}>
                                    {elementConfig.placeholder}
                              </option>
                              { elementConfig.options.length ? (elementConfig.options.map(option => (
                                    <option key={option.value} value={option.value}>
                                          {option.displayValue}
                                    </option>
                              ))) : null
                              }
                        </select>
                  );
                  break;
            case ('radio'):
                  inputElement = (
                        elementConfig.options.map(radio => (
                              <label key={radio.system} className={styles['field__name']}>
                                    <input
                                          type="radio"
                                          value={radio.system}
                                          name={elementConfig.name}
                                          id={elementConfig.id}
                                          onChange={inputChangeHandler}
                                          className={styles['field__radio']}
                                          checked={radio.system === value}
                                          disabled={disabled}
                                    />
                                    <span>{radio.displayValue}</span>
                              </label>
                        ))
                  );
                  break;
            default:
                  inputElement = (
                        <input
                              value={value}
                              type={elementConfig.type}
                              name={elementConfig.name}
                              id={elementConfig.id}
                              placeholder={elementConfig.placeholder}
                              onChange={inputChangeHandler}
                              className={inputFieldClasses('input')}
                              disabled={disabled}
                        />
                  );
      }


      if (elementType === 'radio') {
            return (
                  <div className={styles['field']}>
                        <p className={styles['field__name']}>{label}:</p>
                        {inputElement}
                        <InputError touched={touched} isValid={isValid} errors={errors} />
                  </div>
            );
      }

      return (
            <div className={styles['field']} >
                  {label && (<label
                        htmlFor={elementConfig.name}
                        className={styles['field__name']}
                  >
                        {label}:
                  </label>)}
                  {inputElement}
                  <InputError touched={touched} isValid={isValid} errors={errors} />
            </div>
      );
}

export default InputField;