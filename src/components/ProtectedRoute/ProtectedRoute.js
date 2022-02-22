import React from 'react';

import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ children, path, isAuth = false, roles = [], userRoles = [] }) => {

      console.log(roles)
      console.log(isAuth)
      console.log(userRoles)

      const isUserAuthorized = (allowedRoles) => {
            return allowedRoles.reduce((userIsAuthorized, role) => {
                  return userIsAuthorized || userRoles.includes(role)
            }, false);
      }

      console.log(isUserAuthorized(roles))

      return (
            isAuth && isUserAuthorized(roles) ?
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