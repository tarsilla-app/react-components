import 'react-toastify/dist/ReactToastify.css';

import { JSX, useState } from 'react';

import styled from '@emotion/styled';
import { Id, toast, ToastContainer, ToastItem } from 'react-toastify';

const Container = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 0.5;
  background-color: black;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  z-index: 2;
`;

type LoadingProps = {
  loading: Id[];
};

function Loading({ loading }: LoadingProps) {
  return loading.length > 0 ? <Container /> : undefined;
}

//TODO error on console
//TODO get success, warning, error from tarsila UI
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
