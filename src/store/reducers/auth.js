import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../../utility/helpers';

const asyncStatusType = {
      IDLE: 'idle',
      SUCCESS: 'success',
      LOADING: 'loading',
      ERROR: 'error'
}

const initialState = {
      userId: null,
      userRole: null,
      token: null,
      error: false,
      asyncOperation: asyncStatusType.IDLE
}

const authSigninStart = (state, action) => {
      return updateObject(state, {
            error: false,
            asyncOperation: asyncStatusType.LOADING
      });
}

const authSigninSuccess = (state, action) => {
      const { userId, token, userRole } = action;
      return updateObject(state, {
            userId: userId,
            userRole: userRole,
            token: token,
            asyncOperation: asyncStatusType.SUCCESS
      });
}

const authSigninFail = (state, action) => {
      const { error } = action;
      return updateObject(state, {
            userId: null,
            userRole: null,
            token: null,
            error: error,
            asyncOperation: asyncStatusType.SUCCESS
      });
}

const authLogout = (state, action) => {
      return updateObject(state, {
            ...initialState,
            asyncOperation: asyncStatusType.SUCCESS
      })
}

const reducer = (state = initialState, action) => {
      switch (action.type) {
            case actionTypes.AUTH_SIGNIN_START:
                  return authSigninStart(state, action);
            case actionTypes.AUTH_SIGNIN_SUCCESS:
                  return authSigninSuccess(state, action);
            case actionTypes.AUTH_SIGNIN_FAIL:
                  return authSigninFail(state, action);
            case actionTypes.AUTH_LOGOUT:
                  return authLogout(state, action);
            default:
                  return state;
      }
}

export default reducer;