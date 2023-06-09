import React from 'react';
import { useLocation } from 'react-router';

export const Repetitions = (): JSX.Element => {
  const { state } = useLocation();

  return (
    <>
      <p>{JSON.stringify(state)}</p>
    </>
  );
};
