import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'

import EmailInput from './EmailInput/EmailInput';
import PasswordInput from './PasswordInput/PasswordInput';
import Button from '../Button/Button';
import AsyncOpBgComponent from '../AsyncOpBgComponent/AsyncOpBgComponent';

import useForm from '../../hooks/useForm';

import { emailInputConfig } from './EmailInput/emailInputConfig';
import { passwordInputConfig } from './PasswordInput/passwordInputConfig';

import { authSignin, authSigninStatusReset } from '../../store/actions';

import { authService } from '../../services/authService'

import styles from './SigninForm.module.scss';

const SigninForm = () => {
      const dispatch = useDispatch();
      const history = useHistory();
      const [emailData, emailIsValid, emailDataChangeHandler] = useForm(emailInputConfig);
      const [passwordData, passwordIsValid, passwordChangeHandler] = useForm(passwordInputConfig);

      const authState = useSelector(state => state.auth);
      const { error, loading, authSigninSuccess, authRedirectPath } = authState;
      console.log(error, loading);

      useEffect(() => {
            if (authSigninSuccess && authRedirectPath) {
                  history.push(authRedirectPath);
            }

            // authService.signinUser()

            return () => {
                  dispatch(authSigninStatusReset());
            }
      }, [authSigninSuccess, authRedirectPath, history, dispatch]);

      useEffect(() => {
            dispatch(authSigninStatusReset())
      }, []);

      const submitHandler = async (event) => {
            event.preventDefault();
            const user = {
                  email: emailData.email.value,
                  password: passwordData.password.value
            }

            emailDataChangeHandler('email')('', false);
            passwordChangeHandler('password')('', false);
            dispatch(authSignin(user));
      }

      const isFormDataValid = passwordIsValid && emailIsValid;

      const getAsyncOperationStatus = (error, loading) => {
            if (!error && !loading) { return 'success' }
            if (error) { return 'error' }
            if (loading) { return 'loading' }
            return 'idle';
      }

      return (
            <AsyncOpBgComponent status={getAsyncOperationStatus(error, loading)} error={error}>
                  <form className={styles['form']}>
                        <EmailInput
                              emailData={emailData}
                              emailDataChangeHandler={emailDataChangeHandler}
                        />
                        <PasswordInput
                              passwordData={passwordData}
                              passwordChangeHandler={passwordChangeHandler}
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

export default SigninForm;