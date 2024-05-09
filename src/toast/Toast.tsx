import { useState } from 'react';

import { Id, toast, ToastContainer, ToastItem } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './Toast.module.css';

type Props = {
  loading: Id[];
};

function Loading({ loading }: Props) {
  return loading.length > 0 ? <div className={styles.loading} /> : undefined;
}

//TODO error on console
function Toast(): JSX.Element {
  const [loading, setLoading] = useState<Id[]>([]);

  toast.onChange((toastItem: ToastItem) => {
    setLoading((loadingInter) => {
      if (toastItem.isLoading) {
        return [...loadingInter, toastItem.id];
      } else if (loadingInter.includes(toastItem.id)) {
        loadingInter.splice(loadingInter.indexOf(toastItem.id), 1);
        return [...loadingInter];
      }
      return loadingInter;
    });
  });

  return (
    <>
      <Loading loading={loading} />
      <ToastContainer position='top-right' theme='colored' />
    </>
  );
}

export { Toast };
