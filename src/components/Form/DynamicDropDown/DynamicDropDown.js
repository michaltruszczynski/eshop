import React from 'react';
import InputError from '../InpurtError/InputError';

import styles from './DynamicDropDown.module.scss';

const DynamicDropDown = ({ label, elementConfig, value, options, changeInput, touched, isValid, errors }) => {

      const inputChangeHandler = (event) => {
            const { value } = event.target;
            changeInput(value);
      }

      const inputFieldClasses = htmlElementType => {
            let classesArray = [styles[`field__${htmlElementType}`]];
            if (!isValid && touched) {
                  classesArray.push(styles[`field__${htmlElementType}--error`])
            }
            return classesArray.join(' ');
      }

      return (
            <div className={styles['field']} >
                  {label && (<label
                        htmlFor={elementConfig.name}
                        className={styles['field__name']}
                  >
                        {label}:
                  </label>)}
                  <select
                        value={value}
                        name={elementConfig.name}
                        id={elementConfig.id}
                        onChange={inputChangeHandler}
                        className={inputFieldClasses('select')}
                  >
                        <option key={"empty"} value={""}>
                              {elementConfig.placeholder}
                        </option>
                        {options.length ? (options.map(option => (
                              <option key={option.value} value={option.value}>
                                    {option.displayValue}
                              </option>
                        ))) : (
                              <option key={'loading'} value={'loading'}>
                                    {'Loading....'}
                              </option>
                        )
                        }
                  </select>
                  <InputError touched={touched} isValid={isValid} errors={errors} />
            </div>
      );
}

export default DynamicDropDown;