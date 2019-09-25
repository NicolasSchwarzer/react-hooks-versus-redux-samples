import React, { memo, useEffect } from 'react';
import { useReducer, usePrevious } from '@/hooks';
import styles from './index.scss';

function reducer(state, action) {
  switch (action.type) {
    case 'increase':
      return { ...state, count: state.count + 1 };
    default:
      return { ...state };
  }
}

function Dashboard() {
  // Use function as initial state to avoid duplicate state creation,
  // especially usefull for performance optimization in expensive state creation,
  // https://reactjs.org/docs/hooks-faq.html#how-to-create-expensive-objects-lazily
  const [{ count }, dispatch] = useReducer(reducer, () => ({ count: 0 }));
  const prevCount = usePrevious(count);
  useEffect(() => {
    const intervalId = setInterval(() => dispatch({ type: 'increase' }), 1000);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className={styles.container}>
      Count
      {': '}
      {count}
      {'; '}
      Previous Count
      {': '}
      {prevCount}
    </div>
  );
}

export default memo(Dashboard);
