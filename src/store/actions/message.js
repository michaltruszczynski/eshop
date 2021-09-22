import * as actionTypes from '../actions/actionTypes';

export const setMessage = (message, messageDetails, type) => {
      return {
            type: actionTypes.SET_MESSAGE,
            message: message,
            messageDetails: messageDetails,
            messageType: type
      }
}

export const clearMessage = () => {
      return {
            type: actionTypes.CLEAR_MESSAGE
      }
}

