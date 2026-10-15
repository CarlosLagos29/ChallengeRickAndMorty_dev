import { useSyncExternalStore } from 'react';

const useMediaQuery = (query: string): boolean =>
  useSyncExternalStore(
    (onChange) => {
      const mediaQueryList = window.matchMedia(query);
      mediaQueryList.addEventListener('change', onChange);
      return () => mediaQueryList.removeEventListener('change', onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );

export default useMediaQuery;
