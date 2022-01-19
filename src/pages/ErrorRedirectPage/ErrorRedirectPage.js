import React from 'react';
import { useLocation } from 'react-router-dom';

import BackgroundContent from '../../components/BackgroundContent/BackgroundContent';
import ButtonLink from '../../components/ButtonLink/ButtonLink'

const ErrorRedirectPage = () => {

      const location = useLocation();
      const { state: { redirectFrom, errorMessage } } = location;

      console.log(location);
      console.log(redirectFrom);

      let redirectButton = null;
      if (redirectFrom) {
            redirectButton = (<ButtonLink link={redirectFrom}>Try again</ButtonLink>)
      }

      return (
            <BackgroundContent>
                  {errorMessage ? errorMessage : null}
                  {redirectButton}
            </BackgroundContent>
      )
}

export default ErrorRedirectPage;