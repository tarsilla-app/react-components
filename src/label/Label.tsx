import styled from '@emotion/styled';
import { JSX } from 'react';

type ContainerProps = {
  backgroundColor: string;
  color: string;
};

const Container = styled.label<ContainerProps>`
  color: ${(props) => props.color};
  background-color: ${(props) => props.backgroundColor};
`;

type LabelProps = {
  id: string;
  theme?: {
    backgroundColor?: string;
    color?: string;
  };
  value?: string;
};

const DEFAULT_THEME: NonNullable<LabelProps['theme']> = {};

function Label({
  id,
  theme: { backgroundColor = 'white', color = 'inherit' } = DEFAULT_THEME,
  value,
}: LabelProps): JSX.Element {
  if (backgroundColor === 'inherit') {
    throw new Error('backgroundColor cannot be "inherit"');
  }

  return (
    <Container backgroundColor={backgroundColor} color={color} id={id}>
      {value}
    </Container>
  );
}
Label.displayName = 'label';

export { Label, type LabelProps };
