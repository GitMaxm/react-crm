import { useLayoutEffect } from 'react';

// Кастомный хук для изменения класса на body
const useBodyClass = (className) => {
  useLayoutEffect(() => {
    document.body.className = className;
  }, [className]);
};

export default useBodyClass;
