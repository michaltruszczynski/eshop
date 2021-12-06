import React, { useState } from 'react';

import EmailInput from './EmailInput/EmailInput';
import PasswordInput from './PasswordInput/PasswordInput';
import Button from '../Button/Button';
import AsyncOpBgComponent from '../AsyncOpBgComponent/AsyncOpBgComponent';

import useForm from '../../hooks/useForm';
import { signinUser } from '../../services/authService';

import { emailInputConfig } from './EmailInput/emailInputConfig';
import { passwordInputConfig } from './PasswordInput/passwordInputConfig';

import styles from './SigninForm.module.scss';

const asyncOperation = {
      IDLE: 'idle',
      SUCCESS: 'success',
      LOADING: 'loading',
      ERROR: 'error'
}

const SigninForm = () => {

      const [emailData, emailIsValid, emailDataChangeHandler] = useForm(emailInputConfig)
      const [passwordData, passwordIsValid, passwordChangeHandler ] = useForm(passwordInputConfig)

      const [asyncCallStatus, setAsyncCallStatus] = useState(asyncOperation.SUCCESS);


      const submitHandler = async (event) => {
            event.preventDefault();
            const user = {
                  email: emailData.email.value,
                  password: passwordData.password.value
            }
            console.log(user)
            setAsyncCallStatus(asyncOperation.LOADING);
            try {
                  const response = await signinUser(user);
                  console.log(response);
                  setAsyncCallStatus(asyncOperation.SUCCESS);
            } catch (error) {
                  console.log(error.response)
                  console.log(error.request)
                  setAsyncCallStatus(asyncCallStatus.ERROR)
            }
      }

      const isFormDataValid = passwordIsValid && emailIsValid;

      return (
            <AsyncOpBgComponent status={asyncCallStatus}>
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