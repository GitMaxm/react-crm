import { useLayoutEffect } from 'react';

const useBodyClass = (className) => {
  useLayoutEffect(() => {
    document.body.className = className;
  }, [className]);
};

export default useBodyClass;
