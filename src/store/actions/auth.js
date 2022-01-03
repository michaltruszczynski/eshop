import * as actionTypes from './actionTypes';

import { authService } from '../../services/authService';
import { setMessage } from './index';

import { Message, ErrorMessage } from '../../utility/helpers';

//Signup

export const authSignup = ({ name, email, password }) => {
      return async dispatch => {
            dispatch(authSignupStart())
            try {
                  const newUser = {
                        name,
                        email,
                        password
                  }
                  const response = await authService.signupUser(newUser);
                  dispatch(authSignupSuccess('/signin'));
                  const signupMessage = new Message('You have been successfully registered.');
                  signupMessage.addMessageDetails('Please signin.');
                  const { message, messageDetailsArray } = signupMessage.getMessageData();
                  dispatch(setMessage(message, messageDetailsArray));
            } catch (error) {
                  const errorMsg = new ErrorMessage(error);
                  const { errorMessage, errorDetailsArray } = errorMsg.getErrorMessageData();
                  dispatch(authSignupFail(errorMsg.getErrorObject()));
                  dispatch(setMessage(errorMessage, errorDetailsArray));
            }
      }
}

export const authSignupStart = () => {
      return {
            type: actionTypes.AUTH_SIGNUP_START
      }
}

export const authSignupSuccess = (redirectPath) => {
      return {
            type: actionTypes.AUTH_SIGNUP_SUCCESS,
            redirectPath: redirectPath
      }
}

export const authSignupFail = (error) => {
      return {
            type: actionTypes.AUTH_SIGNUP_FAIL,
            error: error
      }
}

export const authSignupStatusReset = () => {
      return {
            type: actionTypes.AUTH_SIGNUP_STATUS_RESET
      }
}

//Signin


export const authSignin = ({ email, password }) => {
      return async dispatch => {
            dispatch(authSigninStart())
            try {
                  const user = {
                        email,
                        password
                  }
                  const response = await authService.signinUser(user);
                  const { userId, token, expirationDate } = response.data;
                  dispatch(authSigninSuccess(token, userId, '/shop'));
                  const signupMessage = new Message('You are logged in.');
                  signupMessage.addMessageDetails('Enjoy shopping.');
                  const { message, messageDetailsArray } = signupMessage.getMessageData();
                  dispatch(setMessage(message, messageDetailsArray));
            } catch (error) {
                  const errorMsg = new ErrorMessage(error);
                  const { errorMessage, errorDetailsArray } = errorMsg.getErrorMessageData();
                  dispatch(authSigninFail(errorMsg.getErrorObject()));
                  dispatch(setMessage(errorMessage, errorDetailsArray));
            }
      }
}

export const authSigninStart = () => {
      return {
            type: actionTypes.AUTH_SIGNIN_START
      }
}

export const authSigninSuccess = (token, userId, redirectPath) => {
      return {
            type: actionTypes.AUTH_SIGNIN_SUCCESS,
            redirectPath: redirectPath,
            token: token,
            userId: userId
      }
}

export const authSigninFail = (error) => {
      return {
            type: actionTypes.AUTH_SIGNIN_FAIL,
            error: error
      }
}

export const authSigninStatusReset = () => {
      return {
            type: actionTypes.AUTH_SIGNIN_STATUS_RESET
      }
}

//AutoSignIn

export const authCheck = () => {
      return async dispatch => {
            dispatch(authSigninStart());
            try {
                  console.log('authCheck')
                  const response = await authService.checkUser();
                  const { userId, token } = response.data;
                  dispatch(authSigninSuccess(token, userId, null));
            } catch (error) {
                  const errorMsg = new ErrorMessage(error);
                  // console.dir(error)
                  // console.log(error.response)
                  // console.log('error.request', error.request)
                  dispatch(authSigninFail(errorMsg.getErrorObject()));
                  dispatch(logout());
            }
      }
}

//logout

export const logout = () => {
      authService.logout();
      return {
            type: actionTypes.AUTH_LOGOUT
      }
}