/**
 * Hook useEventCallback,
 * https://.reactjs.org/docs/hooks-faq.html#how-to-read-an-often-changing-value-from-usecallback
 */

import { useRef, useEffect, useCallback } from 'react';

/**
 * Hook useEventCallback, an optimization above useCallback,
 * as we know useCallback will mutate while dependencies change,
 * useEventCallback will never mutate no matter how dependencies change,
 * which will never cause sub components' unnecessary updating,
 * at least from an event callback prop's perspective.
 *
 * @param {Function} func Event handler function.
 * @param {any[]} dependencies Dependency array for memoization.
 * @returns {Function} Memoized event handler function.
 */
export default function useEventCallback(func, dependencies) {
  const ref = useRef(() => {
    throw new Error('Cannot not call an event handler while rendering.');
  });

  useEffect(() => {
    ref.current = func;
  }, [func, ...dependencies]); // eslint-disable-line react-hooks/exhaustive-deps

  return useCallback(() => ref.current(), []);
}
