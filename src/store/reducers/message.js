import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../../utility/helpers';

const initialState = {
      message: '',
      messageDetails: [],
      type: null
}


const setMessage = (state, action) => {
      return updateObject(state, {
            message: action.message,
            messageDetails: action.messageDetails,
            type: action.MessageTypes
      });
}

const clearMessage = (state, action) => {
      return updateObject(state, {
            message: '',
            messageDetails: [],
            type: null
      });
}

const reducer = (state = initialState, action) => {
      switch (action.type) {
            case actionTypes.SET_MESSAGE: return setMessage(state, action);
            case actionTypes.CLEAR_MESSAGE: return clearMessage(state, action);
            default: return state;
      }
}

export default reducer;