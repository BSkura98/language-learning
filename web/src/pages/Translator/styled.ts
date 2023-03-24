import styled from 'styled-components';

import { PageWrapper } from '../../components/PageWrapper/styled';

export const TranslatorPageWrapper = styled(PageWrapper)`
  .MuiGrid2-container {
    margin-top: 1rem;
  }

  .MuiTextField-root {
    margin-top: 1rem;
  }

  #translation-textfield {
    text-shadow: 0 0 black;
  }

  #reserve-languages-button-grid {
    display: grid;
    align-items: center;
  }
`;

export const ButtonContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;

  button {
    width: 10rem;
  }
`;
