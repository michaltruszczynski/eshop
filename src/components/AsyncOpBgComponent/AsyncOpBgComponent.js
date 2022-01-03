import React from 'react';

import ErrorInformation from './ErrorInformation/ErrorInformation';
import BackgroundContent from '../BackgroundContent/BackgroundContent';
import Logo from '../Logo/Logo';

const AsyncOpBgComponent = ({ status, error, children }) => {

      console.log(error)
      console.log(status)
      // const { status: errorStatusCode } = error;

      switch (status) {
            case 'idle':
                  return (
                        <BackgroundContent>
                              <Logo />
                        </BackgroundContent>
                  )
            case 'success':
                  return children;
            case 'loading':
                  return (
                        <BackgroundContent>
                              Loading...
                        </BackgroundContent>
                  );
            case 'error':
                  // if (errorStatusCode === 401) {
                  //       return children;
                  // }
                  return <ErrorInformation error={error} />
                  // return (
                  //       <BackgroundContent>
                  //             Something went wrong.
                  //       </BackgroundContent>
                  // );
            default:
                  return (
                        <BackgroundContent>
                              <Logo />
                        </BackgroundContent>
                  )
      }
}

export default AsyncOpBgComponent;