import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

import './App.css';
import { LogIn } from './pages/LogIn';
import { Translator } from './pages/Translator';
import { NotFound } from './pages/NotFound';

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
        <Route path="/login" element={<LogIn />} />
        <Route path="/translator" element={<Translator />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
