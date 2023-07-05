import styled from 'styled-components';

export const Wrapper = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  padding-top: 8rem;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  border: 0.1rem solid #42a5f5;
  border-radius: 1rem;

  width: 40%;
  max-width: 30rem;
  padding: 3rem 5rem 3rem 5rem;

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
    /* margin: 0 auto 1rem 0; */
  }

  .MuiPaper-root {
    margin-bottom: 1rem;
  }

  .MuiLoadingButton-root {
    margin-top: 1rem;
    /* width: 10rem; */
  }
`;
