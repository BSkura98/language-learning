import { Box, styled } from '@mui/material';

export const PageWrapper = styled(Box)`
  padding: 2rem 6rem 2rem 6rem;

  ${props => props.theme.breakpoints.down('sm')} {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;
