import { useEffect, useRef } from 'react';

/**
 * Attaches an IntersectionObserver to a container ref.
 * All children with class `reveal`, `reveal-left`, `reveal-right`,
 * or `reveal-stagger` inside the container will receive `is-visible`
 * when they enter the viewport.
 */
export default function useScrollReveal(options = {}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const { threshold = 0.12, rootMargin = '0px 0px -60px 0px' } = options;
    const targets = containerRef.current
      ? containerRef.current.querySelectorAll(
          '.reveal, .reveal-left, .reveal-right, .reveal-stagger'
        )
      : [];

    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // animate once
          }
        });
      },
      { threshold, rootMargin }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return containerRef;
}
