import { useLayoutEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';

export const ScrollStackItem = ({ children, itemClassName = '', style = {} }) => (
  <div
    className={`scroll-stack-card relative w-full h-auto min-h-[320px] md:h-80 my-4 md:my-6 p-6 md:p-12 box-border origin-top will-change-transform ${itemClassName}`.trim()}
    style={{
      backfaceVisibility: 'hidden',
      transformStyle: 'preserve-3d',
      pointerEvents: "auto",               // ✅ FIX 1 — العناصر تستقبل اللمس
      ...style
    }}
  >
    {children}
  </div>
);

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 20,
  itemScale = 0.03,
  itemStackDistance = 20,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete
}) => {
  const scrollerRef = useRef(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef(null);
  const lenisRef = useRef(null);
  const cardsRef = useRef([]);
  const lastTransformsRef = useRef(new Map());
  const isUpdatingRef = useRef(false);
  const rafIdRef = useRef(null);

  const calculateProgress = useCallback((scrollTop, start, end) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY,
        containerHeight: window.innerHeight,
        scrollContainer: document.documentElement
      };
    } else {
      const scroller = scrollerRef.current;
      return {
        scrollTop: scroller.scrollTop,
        containerHeight: scroller.clientHeight,
        scrollContainer: scroller
      };
    }
  }, [useWindowScroll]);

  const getElementOffset = useCallback(
    element => {
      if (useWindowScroll) {
        const rect = element.getBoundingClientRect();
        return rect.top + window.scrollY;
      } else {
        return element.offsetTop;
      }
    },
    [useWindowScroll]
  );

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScrollData();

    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

    const endElement = useWindowScroll
      ? document.querySelector('.scroll-stack-end')
      : scrollerRef.current?.querySelector('.scroll-stack-end');

    const endElementTop = endElement ? getElementOffset(endElement) : 0;
    const pinEnd = endElementTop - containerHeight / 2;

    const cardPositions = cardsRef.current.map(card => 
      card ? getElementOffset(card) : null
    );

    let topCardIndex = 0;

    if (blurAmount) {
      for (let j = 0; j < cardsRef.current.length; j++) {
        if (cardPositions[j] !== null) {
          const jTriggerStart = cardPositions[j] - stackPositionPx - itemStackDistance * j;
          if (scrollTop >= jTriggerStart) {
            topCardIndex = j;
          }
        }
      }
    }

    cardsRef.current.forEach((card, i) => {
      if (!card || cardPositions[i] === null) return;

      const cardTop = cardPositions[i];

      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = triggerStart;

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);

      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);

      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount && i < topCardIndex) {
        const depthInStack = topCardIndex - i;
        blur = Math.max(0, depthInStack * blurAmount);
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      const newTransform = {
        translateY,
        scale,
        rotation,
        blur
      };

      const transform = `translate3d(0, ${translateY}px, 0) scale(${scale})${rotation ? ` rotate(${rotation}deg)` : ''}`;
      const filter = blur > 0 ? `blur(${blur}px)` : '';

      card.style.transform = transform;
      card.style.filter = filter;
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    calculateProgress,
    parsePercentage,
    getScrollData,
    getElementOffset
  ]);

  const handleScroll = useCallback(() => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }
    rafIdRef.current = requestAnimationFrame(() => {
      updateCardTransforms();
    });
  }, [updateCardTransforms]);

  const setupLenis = useCallback(() => {
    const lenis = new Lenis({
      duration: 1.0,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
      syncTouch: true
    });

    lenis.on('scroll', handleScroll);

    const raf = time => {
      lenis.raf(time);
      animationFrameRef.current = requestAnimationFrame(raf);
    };

    animationFrameRef.current = requestAnimationFrame(raf);
    lenisRef.current = lenis;
  }, [handleScroll]);

  useLayoutEffect(() => {
    cardsRef.current = Array.from(
      useWindowScroll
        ? document.querySelectorAll('.scroll-stack-card')
        : scrollerRef.current?.querySelectorAll('.scroll-stack-card')
    );

    setupLenis();
    updateCardTransforms();

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      if (lenisRef.current) lenisRef.current.destroy();
    };
  }, [
    updateCardTransforms,
    setupLenis,
    useWindowScroll
  ]);

  return (
    <div
      className={`relative w-full ${className}`.trim()}
      ref={scrollerRef}

      style={{
        pointerEvents: "none",   // ✅ FIX 2 — ScrollStack ما يستقبل لمسات
        touchAction: "auto",
        overscrollBehavior: "contain",
        WebkitOverflowScrolling: "touch",
        WebkitTransform: "translateZ(0)",
        transform: "translateZ(0)"
      }}
    >
      <div
        className="scroll-stack-inner pt-[2vh] md:pt-[3vh] px-6 md:px-12 lg:px-20 pb-[8rem] md:pb-[10rem]"
        style={{
          minHeight: "calc(var(--vh, 1vh) * 100)",
          pointerEvents: "auto"  //  ✅ FIX 3 — الداخلي فقط يستقبل اللمس
        }}
      >
        {children}
        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  );
};

export default ScrollStack;