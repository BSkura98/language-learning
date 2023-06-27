import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

import { LogIn } from './pages/LogIn';
import { Translator } from './pages/Translator';
import { NotFound } from './pages/NotFound';
import { PrivateRoutes, PublicRoutes } from './components/Routes';
import { Repetitions } from './pages/Repetitions';
import { StartRepetitions } from './pages/StartRepetitions';
import { Words } from './pages/Words';
import { FinishedRepetitions } from './pages/FinishedRepetitions';

function App(): JSX.Element {
  const { t } = useTranslation();

  return (
    <BrowserRouter>
      <Helmet
        titleTemplate={`%s - ${t('defaultPageTitle')}`}
        defaultTitle={`${t('defaultPageTitle')}`}
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content={`${t('pageDescription')}`} />
      </Helmet>

      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/translator" element={<Translator />} />
          <Route path="/repetitions" element={<Repetitions />} />
          <Route path="/startRepetitions" element={<StartRepetitions />} />
          <Route path="/finishedRepetitions" element={<FinishedRepetitions />} />
          <Route path="/words" element={<Words />} />
          <Route path="/" element={<Navigate to="/translator" replace />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<LogIn />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
