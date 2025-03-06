import { JSX } from 'react';

import styled from '@emotion/styled';

type ContainerProps = {
  color: string;
  backgroundColor: string;
};

const Container = styled.label<ContainerProps>`
  color: ${(props) => props.color};
  background-color: ${(props) => props.backgroundColor};
`;

type LabelProps = {
  id: string;
  value?: string;
  theme?: {
    color?: string;
    backgroundColor?: string;
  };
};

function Label({ id, value, theme: { color = 'inherit', backgroundColor = 'white' } = {} }: LabelProps): JSX.Element {
  if (backgroundColor === 'inherit') {
    throw new Error('backgroundColor cannot be "inherit"');
  }

  return (
    <Container id={id} color={color} backgroundColor={backgroundColor}>
      {value}
    </Container>
  );
}
Label.displayName = 'label';

export { Label, type LabelProps };
