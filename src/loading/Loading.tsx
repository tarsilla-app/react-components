import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { JSX } from 'react';

type ContainerProps = {
  color: string;
};

const spin = keyframes`
  0% {
    transform: rotate(0deg)
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Container = styled.div<ContainerProps>`
  border: 8px solid #f3f3f3;
  border-top-color: ${({ color }) => color};
  border-top-style: solid;
  border-top-width: 8px;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: ${spin} 2s linear infinite;
  margin: auto;
`;

type LoadingProps = {
  id?: string;
  theme?: {
    color?: string;
  };
};

const DEFAULT_THEME: NonNullable<LoadingProps['theme']> = {};

function Loading({ id, theme: { color = 'inherit' } = DEFAULT_THEME }: LoadingProps): JSX.Element {
  return <Container color={color} id={id} />;
}

export { Loading, type LoadingProps };
