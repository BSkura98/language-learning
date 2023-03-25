/* eslint-disable */
import React, { useContext, useEffect, useMemo } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { type CognitoUserSession } from 'amazon-cognito-identity-js';

import { AccountContext } from '../../utils/users/Account';
import AppBar from '../AppBar';

interface RoutesProps {
  elementIfAuthorized: React.ReactElement;
  elementIfNotAuthorized: React.ReactElement;
}

const Routes = ({ elementIfAuthorized, elementIfNotAuthorized }: RoutesProps): React.ReactElement => {
  const { getSession } = useContext(AccountContext);
  const location = useLocation();
  const auth: CognitoUserSession | null = useMemo(() => getSession(), [location.pathname]);

  return auth !== null ? elementIfAuthorized : elementIfNotAuthorized;
};

const PrivateRoutes = (): React.ReactElement => (
  <Routes
    elementIfAuthorized={
      <>
        <AppBar />
        <Outlet />
      </>
    }
    elementIfNotAuthorized={<Navigate to="/login" />}
  />
);

const PublicRoutes = (): React.ReactElement => {
  return <Routes elementIfAuthorized={<Navigate to="/" />} elementIfNotAuthorized={<Outlet />} />;
};

export { PrivateRoutes, PublicRoutes };
