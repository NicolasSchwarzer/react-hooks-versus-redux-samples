/**
 * Hook usePrevious,
 * https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
 */

import { useRef, useEffect } from 'react';

/**
 * Hook usePrevious.
 *
 * @param {any} value Current value.
 * @returns {any} Previous value.
 */
export default function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
