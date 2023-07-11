import styled from 'styled-components';

export const Wrapper = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  padding-top: 8rem;
`;

export const Logo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #1976d2;
  text-shadow: 1px 1px 2px #000000;

  svg {
    filter: drop-shadow(1px 1px 2px rgb(0 0 0 / 0.4));
    margin-right: 1rem;
  }

  h4 {
    color: white;
    -webkit-text-stroke: 1px #1976d2;
    padding: 0 0.2rem 0.3rem 0;
    font-family: cursive;
    font-weight: 700;
  }
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  border: 0.1rem solid #42a5f5;
  border-radius: 1rem;

  width: 40%;
  max-width: 30rem;
  padding: 3rem 5rem 3rem 5rem;
  margin-top: 2rem;

  && > * {
    margin-left: auto;
    margin-right: auto;
  }

  .MuiTypography-root {
    margin-bottom: 2rem;
    text-align: center;
  }

  .MuiFormControl-root {
    width: 80%;
    margin-top: 0rem;
    margin-bottom: 1rem;
  }

  .MuiPaper-root {
    margin-bottom: 1rem;
  }

  .MuiLoadingButton-root {
    margin-top: 1rem;
  }
`;
