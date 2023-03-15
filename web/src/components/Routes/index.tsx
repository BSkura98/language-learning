import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { type CognitoUserSession } from 'amazon-cognito-identity-js';

import { AccountContext } from '../../utils/cognito/Account';

interface RoutesProps {
  elementIfAuthorized: React.ReactElement;
  elementIfNotAuthorized: React.ReactElement;
}

const Routes = ({ elementIfAuthorized, elementIfNotAuthorized }: RoutesProps): React.ReactElement => {
  const { getSession } = useContext(AccountContext);
  const auth: CognitoUserSession | null = getSession();
  return auth !== null ? elementIfAuthorized : elementIfNotAuthorized;
};

const PrivateRoutes = (): React.ReactElement => (
  <Routes elementIfAuthorized={<Outlet />} elementIfNotAuthorized={<Navigate to="/login" />} />
);

const PublicRoutes = (): React.ReactElement => (
  <Routes elementIfAuthorized={<Navigate to="/" />} elementIfNotAuthorized={<Outlet />} />
);

export { PrivateRoutes, PublicRoutes };
