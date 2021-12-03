import { useEffect, useReducer } from 'react';

import axios from 'axios';

const URL_API = 'http://localhost:5000/api';

const reducer = (state, action) => {
      switch (action.type) {
            case "loading":
                  return {
                        ...state,
                        status: "loading",
                        // data: null,
                        error: false
                  }
            case "success":
                  return {
                        ...state,
                        status: "success",
                        data: action.data
                  }
            case "error":
                  return {
                        ...state,
                        status: "error",
                        error: action.error
                  }
            default:
                  return state
      }
}

const initialState = {
      status: 'idle',
      data: null,
      error: false,
}

const useFetch = (url) => {
      const [state, dispatch] = useReducer(reducer, initialState);

      useEffect(() => {
            const fetchData = async () => {
                  dispatch({ type: 'loading' })
                  try {
                        const response = await axios.get(`${URL_API}${url}`);
                        dispatch({ type: 'success', data: response.data });
                  } catch (error) {
                        dispatch({ type: 'error', error: error });
                  }
            };
            if (url) {
                  fetchData();
            }

      }, [url]);

      return [state]
}

export default useFetch;