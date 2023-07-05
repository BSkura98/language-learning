import styled from 'styled-components';
import { LoadingButton } from '@mui/lab';

const getFontSize = (size?: 'small' | 'medium' | 'large'): string => {
  switch (size) {
    case 'small':
      return '1rem';
    case 'large':
      return '1.6rem';
    case 'medium':
    default:
      return '1.2rem';
  }
};

export const Button = styled(LoadingButton)`
  && {
    font-size: ${props => getFontSize(props.size)};
  }

  width: 10rem;
`;
