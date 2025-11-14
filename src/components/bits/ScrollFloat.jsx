import { useEffect, useMemo, useRef, memo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollFloat = ({
  children,
  scrollContainerRef,
  containerClassName = '',
  textClassName = '',
  animationDuration = 1,
  ease = 'back.inOut(2)',
  scrollStart = 'center bottom+=50%',
  scrollEnd = 'bottom bottom-=40%',
  stagger = 0.03
}) => {
  const containerRef = useRef(null);
  const scrollTriggerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split('').map((char, index) => (
      <span 
        className="inline-block word" 
        key={index}
        style={{
          willChange: 'opacity, transform',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden'
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

    const charElements = el.querySelectorAll('.inline-block');
    if (!charElements.length) return;

    // Clean up previous ScrollTrigger if it exists
    if (scrollTriggerRef.current) {
      scrollTriggerRef.current.kill();
      scrollTriggerRef.current = null;
    }

    // Optimize ScrollTrigger settings for performance
    ScrollTrigger.config({
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
      ignoreMobileResize: true
    });

    const animation = gsap.fromTo(
      charElements,
      {
        willChange: 'opacity, transform',
        opacity: 0,
        yPercent: 100,
        scaleY: 1.5,
        scaleX: 0.9,
        transformOrigin: '50% 0%',
        force3D: true
      },
      {
        duration: animationDuration,
        ease: ease,
        opacity: 1,
        yPercent: 0,
        scaleY: 1,
        scaleX: 1,
        stagger: stagger,
        force3D: true,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: scrollStart,
          end: scrollEnd,
          scrub: 0.5, // Smoothed scrub instead of true for better performance
          markers: false,
          refreshPriority: -1, // Lower priority for better performance
          invalidateOnRefresh: false
        }
      }
    );

    // Store ScrollTrigger reference for cleanup
    scrollTriggerRef.current = animation.scrollTrigger;

    // Cleanup function
    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
      animation.kill();
    };
  }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger]);

  return (
    <h2 
      ref={containerRef} 
      className={`my-5 overflow-hidden ${containerClassName}`}
      style={{
        willChange: 'transform',
        transform: 'translateZ(0)',
        pointerEvents: 'auto',
        touchAction: 'auto'
      }}
    >
      <span className={`inline-block whitespace-nowrap text-[clamp(1.6rem,4vw,3rem)] leading-[1.5] ${textClassName}`}>{splitText}</span>
    </h2>
  );
};

export default memo(ScrollFloat);


