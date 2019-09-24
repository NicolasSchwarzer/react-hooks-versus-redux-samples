import React, { memo, useEffect } from 'react';
import { useReducer } from '@/hooks';
import styles from './index.scss';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increase':
      return { ...state, count: state.count + 1 };
    default:
      return { ...state };
  }
}

function Dashboard() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const intervalId = setInterval(() => dispatch({ type: 'increase' }), 1000);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className={styles.container}>
      Count
      {' '}
      {state.count}
    </div>
  );
}

export default memo(Dashboard);
