import { styled } from '@mui/material';

import { PageWrapper } from '../../components/PageWrapper/styled';

export const RepetitionsPageWrapper = styled(PageWrapper)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .MuiFormControl-root {
    margin-bottom: 1rem;
    margin-top: 1rem;

    textarea {
      text-shadow: 0 0 black;
    }
  }

  .MuiStack-root {
    width: 100%;

    button {
      width: 100%;
      max-width: 15rem;
    }
  }
`;
