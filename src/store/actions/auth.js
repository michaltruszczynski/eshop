import * as actionTypes from './actionTypes';

import { authService } from '../../services/authService';

import { ErrorMessage } from '../../utility/helpers';

export const authSigninStart = () => {
      return {
            type: actionTypes.AUTH_SIGNIN_START
      }
}

export const authSigninSuccess = (token, userId, userRoles, redirectPath) => {
      return {
            type: actionTypes.AUTH_SIGNIN_SUCCESS,
            redirectPath: redirectPath,
            token: token,
            userId: userId,
            userRoles: userRoles
      }
}

export const authSigninFail = (error) => {
      return {
            type: actionTypes.AUTH_SIGNIN_FAIL,
            error: error
      }
}

export const authCheck = () => {
      return async dispatch => {
            dispatch(authSigninStart());
            try {
                  const response = await authService.checkUser();
                  const { userId, token, userRoles } = response.data;
                  dispatch(authSigninSuccess(token, userId, userRoles, null));
            } catch (error) {
                  const errorMsg = new ErrorMessage(error);
                  dispatch(authSigninFail(errorMsg.getErrorObject()));
            }
      }
}

export const logout = () => {
      authService.logout();
      return {
            type: actionTypes.AUTH_LOGOUT
      }
}