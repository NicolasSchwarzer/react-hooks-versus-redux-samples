/**
 * Hook useLegacyState,
 * https://reactjs.org/docs/hooks-faq.html#should-i-use-one-or-many-state-variables
 */

import { useState, useCallback } from 'react';

/**
 * Hook useLegacyState.
 *
 * @param {object | () => object} initialState Initial state.
 * @returns {[state: object, setState: <T>(value: T) => void]} Current state & setState method.
 */
export default function useLegacyState(initialState) {
  const [state, originalSetState] = useState(initialState);

  const setState = useCallback((value) => (
    originalSetState((prevState) => ({
      ...prevState,
      ...typeof value === 'function' ? value(prevState) : value,
    }))
  ), []);

  return [state, setState];
}
