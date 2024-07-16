import { RefObject, useEffect, useState } from 'react';

interface UseInViewProps {
  ref: RefObject<HTMLElement>;
  threshold: number;
}

function useInView({ ref, threshold }: UseInViewProps) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setInView((prevState) => {
        if (prevState === entry.isIntersecting) return prevState;

        return entry.isIntersecting;
      });
    }, {
      threshold,
    });

    const observeTarget = ref.current;

    if (observeTarget) {
      observer.observe(observeTarget);
    }

    return () => { // component unmount시 unobserve
      if (observeTarget) {
        observer.unobserve(observeTarget);
      }
    };
  }, [threshold, ref]);

  return { inView };
}

export default useInView;
