import React from 'react';

import SignupInputs from './SignupInputs/SignupInputs';

import useForm from '../../hooks/useForm';

import { signupInputConfig } from './SignupInputs/signupInputsConfig';

import styles from './SignupForm.module.scss';

const SignupForm = () => {

      const [inputSignupData, inputSignupDataIsValid, inputSignupDataChangeHandler] = useForm(signupInputConfig)

      return (
            <form className={styles['form']}>
                  <SignupInputs
                        inputSignupData={inputSignupData}
                        inputSignupDataChangeHandler={inputSignupDataChangeHandler}
                  />

            </form>
      )
}

export default SignupForm;