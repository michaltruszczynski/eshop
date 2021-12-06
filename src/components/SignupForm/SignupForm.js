import React, { useState } from 'react';

import SignupInputs from './SignupInputs/SignupInputs';
import PasswordInput from './PasswordInput/PasswordInput';
import ConfirmPasswordInput from './ConfirmPasswordInput/ConfirmPasswordInput';
import Button from '../Button/Button';
import AsyncOpBgComponent from '../AsyncOpBgComponent/AsyncOpBgComponent';

import useForm from '../../hooks/useForm';
import { signupUser } from '../../services/authService';

import { signupInputConfig } from './SignupInputs/signupInputsConfig';
import { passwordInputConfig } from './PasswordInput/passwordInputConfig';

import styles from './SignupForm.module.scss';

const asyncOperation = {
      IDLE: 'idle',
      SUCCESS: 'success',
      LOADING: 'loading',
      ERROR: 'error'
}

const SignupForm = () => {

      const [inputSignupData, inputSignupDataIsValid, inputSignupDataChangeHandler] = useForm(signupInputConfig)
      const [passwordData, passwordIsValid, passwordChangeHandler, passwordFocusChangeHandler] = useForm(passwordInputConfig)
      const [confirmPasswordData, confirmPasswordChangeHandler] = useState({
            value: '',
            touched: false,
            isValid: false,
            errors: []
      });

      const [asyncCallStatus, setAsyncCallStatus] = useState(asyncOperation.SUCCESS);

      const { isValid: confirmPasswordIsValid } = confirmPasswordData;

      const submitHandler = async (event) => {
            event.preventDefault();
            const newUser = {
                  name: inputSignupData.name.value,
                  email: inputSignupData.email.value,
                  password: passwordData.password.value
            }
            console.log(newUser)
            setAsyncCallStatus(asyncOperation.LOADING);
            try {
                  const response = await signupUser(newUser);
                  console.log(response);
                  setAsyncCallStatus(asyncOperation.SUCCESS);
            } catch (error) {
                  console.log(error.response)
                  console.log(error.request)
                  setAsyncCallStatus(asyncCallStatus.ERROR)
            }
      }

      const isFormDataValid = confirmPasswordIsValid && passwordIsValid && inputSignupDataIsValid;

      return (
            <AsyncOpBgComponent status={asyncCallStatus}>
                  <form className={styles['form']}>
                        <SignupInputs
                              inputSignupData={inputSignupData}
                              inputSignupDataChangeHandler={inputSignupDataChangeHandler}
                        />
                        <PasswordInput
                              passwordData={passwordData}
                              passwordChangeHandler={passwordChangeHandler}
                              passwordFocusChangeHandler={passwordFocusChangeHandler}
                        />
                        <ConfirmPasswordInput
                              confirmPasswordData={confirmPasswordData}
                              confirmPasswordChangeHandler={confirmPasswordChangeHandler}
                              passwordData={passwordData}
                        />
                        <Button
                              onClick={submitHandler}
                              buttonType="success"
                              buttonStyle="standard"
                              disabled={!isFormDataValid}
                              type="submit"
                        >
                              Submit
                        </Button>
                  </form>
            </AsyncOpBgComponent>
      )
}

export default SignupForm;