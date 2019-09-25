import { useState, useCallback } from 'react';

/**
 * Hook useReducer.
 *
 * @param {(state: object, action: object) => object} reducer The reducer to handle state.
 * @param {object | () => object} initialState Initial state.
 * @returns {[state: object, dispatch: (action: object) => void]} Current state & dispatch method.
 */
export default function useReducer(reducer, initialState) {
  const [state, setState] = useState(initialState);

  const dispatch = useCallback((action) => {
    setState((prevState) => reducer(prevState, action));
  }, [reducer]);

  return [state, dispatch];
}
