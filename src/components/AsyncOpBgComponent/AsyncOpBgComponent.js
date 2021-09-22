import React from 'react';

import BackgroundContent from '../BackgroundContent/BackgroundContent';
import Logo from '../Logo/Logo';

const AsyncOpBgComponent = ({status, children}) => {

      switch (status) {
            case 'idle':
                  return (
                        <BackgroundContent>
                              <Logo />
                        </BackgroundContent>
                  )
            case 'success':
                  return children;
            case 'error':
                  return (
                        <BackgroundContent>
                              Something went wrong.
                        </BackgroundContent>
                  );
            case 'loading':
                  return (
                        <BackgroundContent>
                              Loading...
                        </BackgroundContent>
                  );
            default:
                  return (
                        <BackgroundContent>
                              <Logo />
                        </BackgroundContent>
                  )
      }

}

export default AsyncOpBgComponent;