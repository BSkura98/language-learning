import styled from 'styled-components';

export const Wrapper = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  padding-top: 12.8rem;
`;

export const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  border: 0.1rem solid #42a5f5;
  border-radius: 1rem;

  width: 50%;
  max-width: 30rem;
  padding: 5rem;

  .MuiFormControl-root {
    width: 100%;
    margin: 0 0 1rem 0;
  }
`;
