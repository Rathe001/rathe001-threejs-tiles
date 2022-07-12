import { useEffect } from 'react';

function useKeyboard(keyEventMap = {}) {
  const keyDownHandler = (e) => {
    const { key } = e;
    if (keyEventMap[key]) {
      keyEventMap[key]();
    }
  };
  const keyUpHandler = (e) => {
    const { key } = e;

    if (keyEventMap[key]) {
      // Do somrthing
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler);
    window.addEventListener('keyup', keyUpHandler);

    return () => {
      window.removeEventListener('keydown', keyDownHandler);
      window.removeEventListener('keyup', keyUpHandler);
    };
  }, []);
}

export default useKeyboard;
