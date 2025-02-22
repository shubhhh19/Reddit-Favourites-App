import { useEffect, useRef } from 'react';

/**
 * Custom hook to handle scroll animations
 * @param {Object} options - Configuration options
 * @param {string} options.animationClass - The animation class to apply
 * @param {string} options.visibleClass - The class to add when element is visible
 * @param {number} options.threshold - Visibility threshold (0-1)
 * @param {boolean} options.once - Whether to animate only once
 */
export const useScrollAnimation = ({
  animationClass = 'fade-in',
  visibleClass = 'visible',
  threshold = 0.1,
  once = true
} = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Add the animation class immediately
    element.classList.add(animationClass);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add visible class when element comes into view
            element.classList.add(visibleClass);
            
            // If once is true, unobserve after animation
            if (once) {
              observer.unobserve(element);
            }
          } else if (!once) {
            // Remove visible class when element leaves viewport
            // Only if once is false
            element.classList.remove(visibleClass);
          }
        });
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [animationClass, visibleClass, threshold, once]);

  return ref;
};

/**
 * Component wrapper that applies scroll animation
 */
const ScrollAnimation = ({
  children,
  animationClass = 'fade-in',
  visibleClass = 'visible',
  threshold = 0.1,
  once = true,
  className = '',
  ...props
}) => {
  const ref = useScrollAnimation({
    animationClass,
    visibleClass,
    threshold,
    once
  });

  return (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  );
};

export default ScrollAnimation;