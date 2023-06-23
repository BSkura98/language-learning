import { Box, styled } from '@mui/material';

export const PageWrapper = styled(Box)<{ $variant?: 'narrow' | 'average' }>`
  padding: 2rem 6rem 2rem 6rem;

  ${props => props.theme.breakpoints.down('sm')} {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  ${props => props.$variant === 'narrow' && props.theme.breakpoints.up('sm')} {
    padding-left: 0rem;
    padding-right: 0rem;
    margin-left: auto;
    margin-right: auto;
    width: 30rem;
  }
`;
