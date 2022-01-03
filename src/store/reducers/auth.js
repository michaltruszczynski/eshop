import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../../utility/helpers';

const initialState = {
      userId: null,
      token: null,
      error: false,
      loading: false,
      authRedirectPath: null,
      authSignupSuccess: false,
      authSigninSuccess: false
}

//Signup

const authSignupStart = (state, action) => {
      return updateObject(state, {
            loading: true,
            error: false,
            authSignupSuccess: false,
            authRedirectPath: null
      });
}

const authSignupSuccess = (state, action) => {
      const { redirectPath } = action;
      return updateObject(state, {
            loading: false,
            authSignupSuccess: true,
            authRedirectPath: redirectPath
      });
}

const authSignupFail = (state, action) => {
      return updateObject(state, {
            loading: false,
            authSignupSuccess: false,
            error: action.error
      });
}

const authSignupStatuReset = (state, action) => {
      return updateObject(state, {
            authSignupSuccess: false,
            authRedirectPath: null
      });
}

//Signin

const authSigninStart = (state, action) => {
      return updateObject(state, {
            loading: true,
            error: false,
            authSigninSuccess: false,
            authRedirectPath: null
      });
}

const authSigninSuccess = (state, action) => {
      const { userId, token, redirectPath } = action;
      return updateObject(state, {
            userId: userId,
            token: token,
            loading: false,
            authSigninSuccess: true,
            authRedirectPath: redirectPath
      });
}

const authSigninFail = (state, action) => {
      return updateObject(state, {
            loading: false,
            authSigninSuccess: false,
            error: action.error
      });
}

const authSigninStatuReset = (state, action) => {
      return updateObject(state, {
            authSigninSuccess: false,
            authRedirectPath: null
      });
}

const authLogout = (state, action) => {
      return updateObject(state, {
            ...initialState
      })
}

const reducer = (state = initialState, action) => {
      switch (action.type) {
            case actionTypes.AUTH_SIGNUP_START:
                  return authSignupStart(state, action);
            case actionTypes.AUTH_SIGNUP_SUCCESS:
                  return authSignupSuccess(state, action);
            case actionTypes.AUTH_SIGNUP_FAIL:
                  return authSignupFail(state, action);
            case actionTypes.AUTH_SIGNUP_STATUS_RESET:
                  return authSignupStatuReset(state, action);
            case actionTypes.AUTH_SIGNIN_START:
                  return authSigninStart(state, action);
            case actionTypes.AUTH_SIGNIN_SUCCESS:
                  return authSigninSuccess(state, action);
            case actionTypes.AUTH_SIGNIN_FAIL:
                  return authSigninFail(state, action);
            case actionTypes.AUTH_SIGNIN_STATUS_RESET:
                  return authSigninStatuReset(state, action);
            case actionTypes.AUTH_LOGOUT:
                  return authLogout(state, action);
            default:
                  return state;
      }
}

export default reducer;