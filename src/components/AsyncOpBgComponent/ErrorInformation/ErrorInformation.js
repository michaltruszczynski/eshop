import React from 'react';

import BackgroundContent from '../../BackgroundContent/BackgroundContent';

const ErrorInformation = ({ error, children }) => {

      const { status: errorStatusCode } = error;
      
      // 403 Forbidden
      // 401 Unauthorized
      if (errorStatusCode === 401) {

      }

      if (errorStatusCode >= 500) {

      }

      return (
            <BackgroundContent>

            </BackgroundContent>
      )
}

export default ErrorInformation