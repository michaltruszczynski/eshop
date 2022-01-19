import React, { useEffect } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setMessage } from '../../../store/actions';

const ErrorInformation = ({ error, children }) => {
      const dispatch = useDispatch();

      const location = useLocation();
      const { pathname } = location

      useEffect(() => {
            console.log('[ErrorInformation]', error)
            if (!error) return;
            const { status: errorStatusCode } = error.getErrorObject();
            if (errorStatusCode === 401 || errorStatusCode === 403) {
                  const { errorMessage, errorDetailsArray } = error.getErrorMessageData();
                  dispatch(setMessage(errorMessage, errorDetailsArray));
            }

      }, [error, dispatch]);


      if (!error) {
            return children;
      }

      const { status: errorStatusCode } = error.getErrorObject();

      // 401 Unauthorized 403 Forbidden
      if (errorStatusCode === 401 || errorStatusCode === 403) {
            return children;
      }

      if (errorStatusCode === 404) {
            const errorMessage = 'Server responded with error. Resources not found. Please let us know using contact form.'
            return <Redirect
                  to={{
                        pathname: "/servererror",
                        state: {
                              redirectFrom: pathname,
                              errorMessage: errorMessage
                        }
                  }}
            />
      }

      if (errorStatusCode >= 500) {
            const errorMessage = 'Error occured while processing your request. Please try again later.';
            return <Redirect
                  to={{
                        pathname: "/servererror",
                        state: {
                              redirectFrom: pathname,
                              errorMessage: errorMessage
                        }
                  }}
            />
      }

      return children;
}

export default ErrorInformation;