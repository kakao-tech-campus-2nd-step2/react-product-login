import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

interface useInfiniteScrollProps {
  condition: boolean;
  fetchNextPage: () => void;
}

export default function useInfiniteScroll({ condition, fetchNextPage }: useInfiniteScrollProps) {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && condition) fetchNextPage();
  }, [inView, condition, fetchNextPage]);

  return ref;
}
