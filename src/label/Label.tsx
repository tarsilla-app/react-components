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
  style?: {
    color?: string;
    backgroundColor?: string;
  };
};

function Label({ id, value, style: { color = 'inherit', backgroundColor = 'inherit' } = {} }: LabelProps): JSX.Element {
  return (
    <Container id={id} color={color} backgroundColor={backgroundColor}>
      {value}
    </Container>
  );
}
Label.displayName = 'label';

export { Label, type LabelProps };
