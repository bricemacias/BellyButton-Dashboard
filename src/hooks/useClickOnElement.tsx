import { useEffect } from 'react';

/**
 * React hook that detects click outside an element
 *
 * @param {node} ref, element to detect click outside
 * @param {func} handler, function for invoking when click outside element is detected
 */
export const useClickOnElement = (
  ref: any,
  handler: any,
  inside: any = false
) => {
  useEffect(() => {
    if (!inside) {
      document.addEventListener('click', handleClickOutside, false);

      return () => {
        document.removeEventListener('click', handleClickOutside, false);
      };
    } else {
      document.addEventListener('click', handleClickInside, false);

      return () => {
        document.removeEventListener('click', handleClickInside, false);
      };
    }
  });

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      handler();
    }
  };

  const handleClickInside = (event: any) => {
    if (ref.current && ref.current.contains(event.target)) {
      handler();
    }
  };
};
