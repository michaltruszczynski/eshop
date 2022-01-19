import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import EmailInput from './EmailInput/EmailInput';
import PasswordInput from './PasswordInput/PasswordInput';
import Button from '../Button/Button';
import AsyncOpBgComponent from '../AsyncOpBgComponent/AsyncOpBgComponent';

import useForm from '../../hooks/useForm';

import { emailInputConfig } from './EmailInput/emailInputConfig';
import { passwordInputConfig } from './PasswordInput/passwordInputConfig';

import { authSigninSuccess, setMessage } from '../../store/actions';

import { authService } from '../../services/authService';
import { Message, ErrorMessage } from '../../utility/helpers';

import styles from './SigninForm.module.scss';

const asyncOperation = {
      IDLE: 'idle',
      SUCCESS: 'success',
      LOADING: 'loading',
      ERROR: 'error'
}

const SigninForm = () => {
      const [loading, setLoading] = useState(asyncOperation.SUCCESS);
      const [error, setError] = useState(null);
      const dispatch = useDispatch();
      const history = useHistory();
      const [emailData, emailIsValid, emailDataChangeHandler] = useForm(emailInputConfig);
      const [passwordData, passwordIsValid, passwordChangeHandler] = useForm(passwordInputConfig);

      const authState = useSelector(state => state.auth);
      const { userId } = authState;

      useEffect(() => {
            if (userId) {
                  history.push('/shop');
            }

      }, [userId, history])

      const resetInputFields = () => {
            emailDataChangeHandler('email')('', false);
            passwordChangeHandler('password')('', false);
      }

      const showSuccessSigninMessage = () => {
            const signinMessage = new Message('You are logged in.');
            signinMessage.addMessageDetails('Enjoy shopping.');
            const { message, messageDetailsArray } = signinMessage.getMessageData();
            dispatch(setMessage(message, messageDetailsArray));
      }

      const submitHandler = async (event) => {
            event.preventDefault();
            const userCredentials = {
                  email: emailData.email.value,
                  password: passwordData.password.value
            }
            try {
                  setLoading(asyncOperation.LOADING);
                  const response = await authService.signinUser(userCredentials);
                  console.log(response.data);
                  const { userId, token, userRoles } = response.data;
                  resetInputFields();
                  setLoading(asyncOperation.SUCCESS);
                  showSuccessSigninMessage();
                  dispatch(authSigninSuccess(token, userId, userRoles, null));
            } catch (error) {
                  console.log(error.response, error.request)
                  const errorMsg = new ErrorMessage(error);
                  const errorFormFieldsName = errorMsg.getErrorFormFieldsName();
                  if (errorFormFieldsName.length) {
                        errorFormFieldsName.forEach(fieldName => {
                              if (fieldName === 'password') {
                                    passwordChangeHandler('password')('', true);
                              }

                              if (fieldName === 'email') {
                                    emailDataChangeHandler('email')('', false);
                                    passwordChangeHandler('password')('', false);
                              }
                        });
                  }
                  setError(errorMsg);
                  setLoading(asyncOperation.ERROR);
            }
      }

      const isFormDataValid = passwordIsValid && emailIsValid;

      return (
            <AsyncOpBgComponent status={loading} error={error}>
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