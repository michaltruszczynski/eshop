import React from 'react';

import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ children, path, isAuth, roles = [] }) => {

      console.log(roles)

      return (
            isAuth ?
                  <Route path={path}>
                        {children}
                  </Route>
                  :
                  <Redirect to={{
                        pathname: '/'
                  }} />
      );
}

export default ProtectedRoute;