import React, { useEffect } from 'react';

import styles from './Checkbox.module.scss';

const Checkbox = ({ elementConfig, editable, disabled, value, onInputChange }) => {

      const inputChangeHandler = (event) => {
            const isChecked = event.target.checked;
            if (isChecked) {
                  const newUserRoles = [...value, event.target.value];
                  onInputChange(newUserRoles);
            } else {
                  const index = value.indexOf(event.target.value);
                  value.splice(index, 1)
                  const newUserRoles = [...value];
                  onInputChange(newUserRoles);
            }
      }

      console.log(disabled)
      const checkboxInputs =
            elementConfig.options.map(checkbox => {
                  return (
                        <div key={checkbox.name}>
                              <input
                                    type="checkbox"
                                    name={checkbox.name}
                                    id={checkbox.name}
                                    value={checkbox.name}
                                    onChange={inputChangeHandler}
                                    className={styles['field__radio']}
                                    checked={value.includes(checkbox.name)}
                              // disabled={editable ? disabled : true}
                              />
                              <label className={styles['field__name']} htmlFor={checkbox.name}>{checkbox.displayValue}</label>
                        </div>
                  )
            })
            ;
      return checkboxInputs;
}

export default Checkbox;