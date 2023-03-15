import React, { createContext } from 'react';
import { AuthenticationDetails, CognitoUser, type CognitoUserSession } from 'amazon-cognito-identity-js';
import { useTranslation } from 'react-i18next';

import Pool from './UserPool';

const AccountContext = createContext<any>(null);

const AccountProvider = (props: any): JSX.Element => {
  const { t } = useTranslation('translation', { keyPrefix: 'utils.users' });

  const getSession = (): CognitoUserSession | null => {
    const user = Pool.getCurrentUser();
    let session = null;
    if (user) {
      user.getSession((err: Error | null, userSession: CognitoUserSession | null) => {
        if (!err) {
          session = userSession;
        }
      });
    }
    return session;
  };

  const authenticate = async (Username: string, Password: string): Promise<any> => {
    return await new Promise((resolve, reject) => {
      const user = new CognitoUser({ Username, Pool });
      const authDetails = new AuthenticationDetails({ Username, Password });

      user.authenticateUser(authDetails, {
        onSuccess: data => {
          resolve(data);
        },
        onFailure: err => {
          reject(err);
        },
        newPasswordRequired: () => {
          reject(new Error(t('newPasswordRequired').toString()));
        },
      });
    });
  };

  return <AccountContext.Provider value={{ authenticate, getSession }}>{props.children}</AccountContext.Provider>;
};

export { AccountProvider, AccountContext };
