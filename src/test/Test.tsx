import { Test2 } from '../test2';

function Test({ title }: { title: string }): JSX.Element {
  return <Test2 title={title} />;
}

export { Test };
