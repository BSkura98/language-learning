import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { CircularProgress, TablePagination } from '@mui/material';

import { PageWrapper } from '../../components/PageWrapper/styled';
import Api from '../../api/api';
import { PhrasesTable } from './PhrasesTable';
import { CircularProgressContainer, Heading } from './styled';

export const Phrases = (): JSX.Element => {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.phrases' });
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(0);

  const getRepetitionsQuery = useQuery({
    queryKey: ['getRepetitions'],
    queryFn: async () =>
      await Api.getRepetitions({
        take: rowsPerPage,
        skip: rowsPerPage * page,
      }),
  });

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event: unknown, newPage: number): void => {
    setPage(newPage);
  };

  const getLoadingPage = (): JSX.Element => (
    <CircularProgressContainer>
      <CircularProgress />
    </CircularProgressContainer>
  );

  const getLoadedPage = (): JSX.Element => (
    <>
      <Heading variant="h6" gutterBottom>
        {t('savedPhrases')}
      </Heading>
      <PhrasesTable repetitions={getRepetitionsQuery.data} />
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={getRepetitionsQuery.data?.length ?? 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );

  const getPageContent = (): JSX.Element => (getRepetitionsQuery.isLoading ? getLoadingPage() : getLoadedPage());

  return (
    <>
      <Helmet>
        <title>{t('pageTitle')}</title>
        <meta name="description" content={`${t('pageDescription')}`} />
      </Helmet>
      <PageWrapper>{getPageContent()}</PageWrapper>
    </>
  );
};
