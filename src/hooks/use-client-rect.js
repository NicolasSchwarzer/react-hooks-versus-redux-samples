/**
 * Hook useClientRect,
 * https://reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node
 */

import { useState, useCallback } from 'react';

/**
 * Hook useClientRect.
 *
 * @returns {[rect: ClientRect | DOMRect, ref: (el: HTMLElement) => void]} Rect data & ref callback.
 */
export default function useClientRect() {
  const [rect, setRect] = useState(null);

  const ref = useCallback((el) => {
    if (el !== null) {
      setRect(el.getBoundingClientRect());
    }
  }, []);

  return [rect, ref];
}
