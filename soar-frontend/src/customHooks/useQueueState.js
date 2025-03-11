import { useState, useCallback } from 'react';

/**
 * Custom React hook that returns the dimensions of the window with the specified padding.
 * @returns An object containing the width and height of the window.
 */
function useQueueState(initialList) {
  const [list, setList] = useState([...initialList]);

  const enqueue = useCallback(
    (item) => {
      const newList = [...list, item];
      setList(newList);
      return newList.length;
    },
    [list],
  );

  const dequeue = useCallback(() => {
    if (list.length > 0) {
      const firstItem = list[0];
      setList([...list.slice(1)]);
      return firstItem;
    }
    return undefined;
  }, [list]);

  const peek = useCallback(() => {
    if (list.length > 0) {
      return list[0];
    }
    return undefined;
  }, [list]);

  const reset = useCallback(() => {
    setList([]);
  }, []);

  const controls = {
    dequeue,
    enqueue,
    length: list.length,
    peek,
    reset,
  };

  return [list, controls];
}

export default useQueueState;
