import styled from '@emotion/styled';

const Container = styled.label``;

type LabelProps = {
  id: string;
  value?: string;
  style?: {
    color?: string;
    backgroundColor?: string;
  };
};

function Label({ id, value, style: { color = 'black', backgroundColor = 'white' } = {} }: LabelProps): JSX.Element {
  return (
    <Container id={id} style={{ color, backgroundColor }}>
      {value}
    </Container>
  );
}
Label.displayName = 'label';

export { Label, type LabelProps };
