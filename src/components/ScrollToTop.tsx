import { useEffect } from 'react';

/**
 * Scrolls to top on route change
 */

interface ScrollToTopProps {
  children: JSX.Element;
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return children || null;
};

export default ScrollToTop;
