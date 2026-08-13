import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollPageToTop } from './scrollContainer.utils';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    scrollPageToTop();
  }, [pathname]);

  return null;
};

export default ScrollToTop;
