import styles from './Loading.module.css';

type Props = {
  id?: string;
  color?: string;
};

function Loading({ id, color = 'black' }: Props): JSX.Element {
  return (
    <div id={id} className={styles.loader} style={{ '--color': color }}></div>
  );
}

export { Loading };
