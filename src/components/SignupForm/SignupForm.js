import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'

import SignupInputs from './SignupInputs/SignupInputs';
import PasswordInput from './PasswordInput/PasswordInput';
import ConfirmPasswordInput from './ConfirmPasswordInput/ConfirmPasswordInput';
import Button from '../Button/Button';
import AsyncOpBgComponent from '../AsyncOpBgComponent/AsyncOpBgComponent';

import useForm from '../../hooks/useForm';

import { signupInputConfig } from './SignupInputs/signupInputsConfig';
import { passwordInputConfig } from './PasswordInput/passwordInputConfig';

import { authSignup, authSignupStatusReset } from '../../store/actions';

import styles from './SignupForm.module.scss';

const SignupForm = () => {
      const dispatch = useDispatch();
      const history = useHistory();
      const [inputSignupData, inputSignupDataIsValid, inputSignupDataChangeHandler] = useForm(signupInputConfig)
      const [passwordData, passwordIsValid, passwordChangeHandler, passwordFocusChangeHandler] = useForm(passwordInputConfig)
      const [confirmPasswordData, confirmPasswordChangeHandler] = useState({
            value: '',
            touched: false,
            isValid: false,
            errors: []
      });

      const authState = useSelector(state => state.auth);
      const { error, loading, authSignupSuccess, authRedirectPath } = authState;

      useEffect(() => {
            if (authSignupSuccess && authRedirectPath) {
                  history.push(authRedirectPath)
            }

            return () => {
                  dispatch(authSignupStatusReset())
            }
      }, [authSignupSuccess, authRedirectPath, history, dispatch]);

      const submitHandler = async (event) => {
            event.preventDefault();
            const newUser = {
                  name: inputSignupData.name.value,
                  email: inputSignupData.email.value,
                  password: passwordData.password.value
            }
            console.log(newUser)

            dispatch(authSignup(newUser));
      }

      const { isValid: confirmPasswordIsValid } = confirmPasswordData;
      const isFormDataValid = confirmPasswordIsValid && passwordIsValid && inputSignupDataIsValid;
      
      const getAsyncOperationStatus = (error, loading) => {
            if (!error && !loading) { return 'success' }
            if (error) { return 'error' }
            if (loading) { return 'loading' }
            return 'idle';
      }

      return (
            <AsyncOpBgComponent status={getAsyncOperationStatus(error, loading)}>
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