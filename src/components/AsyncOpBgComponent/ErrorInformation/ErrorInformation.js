import React, { useEffect } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setMessage } from '../../../store/actions';

const ErrorInformation = ({ error, children, showErrorMessage = false }) => {
      const dispatch = useDispatch();

      const location = useLocation();
      const { pathname } = location

      useEffect(() => {

            if (!showErrorMessage || !error) return;

            const { status: errorStatusCode } = error.getErrorObject();

            if (errorStatusCode === 401 || errorStatusCode === 403 || errorStatusCode === 422) {
                  const { errorMessage, errorDetailsArray } = error.getErrorMessageData();
                  dispatch(setMessage(errorMessage, errorDetailsArray));
            }

      }, [error, showErrorMessage, dispatch]);

      if (!error) {
            return children;
      }

      const { status: errorStatusCode } = error.getErrorObject();

      // 401 Unauthorized
      if (errorStatusCode === 401) {
            const errorMessage = 'You are not authenticated to enter requested resources.'
            return <Redirect
                  to={{
                        pathname: "/servererror",
                        state: {
                              redirectFrom: pathname,
                              errorMessage: errorMessage,
                              errorCode: errorStatusCode
                        }
                  }}
            />
      }

      // 403 Forbidden
      if (errorStatusCode === 403) {
            const errorMessage = 'You are not authorized to enter requested resources.'
            return <Redirect
                  to={{
                        pathname: "/servererror",
                        state: {
                              redirectFrom: pathname,
                              errorMessage: errorMessage,
                              errorCode: errorStatusCode
                        }
                  }}
            />
      }


      if (errorStatusCode === 404) {
            const errorMessage = 'Server responded with error. Resources not found. Please let us know using contact form.'
            return <Redirect
                  to={{
                        pathname: "/servererror",
                        state: {
                              redirectFrom: pathname,
                              errorMessage: errorMessage,
                              errorCode: errorStatusCode
                        }
                  }}
            />
      }

      if (errorStatusCode >= 500 || !errorStatusCode) {
            const errorMessage = 'Error occured while processing your request. Please try again later.';
            return <Redirect
                  to={{
                        pathname: "/servererror",
                        state: {
                              redirectFrom: pathname,
                              errorMessage: errorMessage,
                              errorCode: errorStatusCode
                        }
                  }}
            />
      }

      return children;
}

export default ErrorInformation;