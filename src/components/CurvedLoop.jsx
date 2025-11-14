import { useRef, useEffect, useState, useMemo, useId, memo } from 'react';

const CurvedLoop = ({
  marqueeText = '',
  speed = 2,
  className,
  curveAmount = 400,
  direction = 'left',
  interactive = true,
  highlightWord = '',
  highlightColor = '#EFCB7B'
}) => {
  const text = useMemo(() => {
    const hasTrailing = /\s|\u00A0$/.test(marqueeText);
    return (hasTrailing ? marqueeText.replace(/\s+$/, '') : marqueeText) + '\u00A0';
  }, [marqueeText]);

  // Split text to highlight specific word
  const splitText = useMemo(() => {
    if (!highlightWord) return null;
    const regex = new RegExp(`(${highlightWord})`, 'gi');
    return marqueeText.split(regex);
  }, [marqueeText, highlightWord]);

  const measureRef = useRef(null);
  const textPathRef = useRef(null);
  const pathRef = useRef(null);
  const [spacing, setSpacing] = useState(0);
  const [offset, setOffset] = useState(0);
  const uid = useId();
  const pathId = `curve-${uid}`;
  const pathD = `M-100,40 Q500,${40 + curveAmount} 1540,40`;

  const dragRef = useRef(false);
  const lastXRef = useRef(0);
  const dirRef = useRef(direction);
  const velRef = useRef(0);

  const textLength = spacing;
  const totalText = textLength
    ? Array(Math.ceil(1800 / textLength) + 2)
        .fill(text)
        .join('')
    : text;
  const ready = spacing > 0;

  useEffect(() => {
    if (measureRef.current) setSpacing(measureRef.current.getComputedTextLength());
  }, [text, className]);

  useEffect(() => {
    if (!spacing) return;
    if (textPathRef.current) {
      const initial = -spacing;
      textPathRef.current.setAttribute('startOffset', initial + 'px');
      setOffset(initial);
    }
  }, [spacing]);

  const containerRef = useRef(null);
  const isVisibleRef = useRef(true);

  // Pause animation when off-screen using IntersectionObserver
  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );
    
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!spacing || !ready) return;
    let frame = 0;
    const step = () => {
      // Only animate when visible
      if (isVisibleRef.current && !dragRef.current && textPathRef.current) {
        const delta = dirRef.current === 'right' ? speed : -speed;
        const currentOffset = parseFloat(textPathRef.current.getAttribute('startOffset') || '0');
        let newOffset = currentOffset + delta;
        const wrapPoint = spacing;
        if (newOffset <= -wrapPoint) newOffset += wrapPoint;
        if (newOffset > 0) newOffset -= wrapPoint;
        textPathRef.current.setAttribute('startOffset', newOffset + 'px');
        setOffset(newOffset);
      }
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [spacing, speed, ready]);

  const onPointerDown = e => {
    if (!interactive) return;
    dragRef.current = true;
    lastXRef.current = e.clientX;
    velRef.current = 0;
    e.target.setPointerCapture(e.pointerId);
  };

  const onPointerMove = e => {
    if (!interactive || !dragRef.current || !textPathRef.current) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    velRef.current = dx;
    const currentOffset = parseFloat(textPathRef.current.getAttribute('startOffset') || '0');
    let newOffset = currentOffset + dx;
    const wrapPoint = spacing;
    if (newOffset <= -wrapPoint) newOffset += wrapPoint;
    if (newOffset > 0) newOffset -= wrapPoint;
    textPathRef.current.setAttribute('startOffset', newOffset + 'px');
    setOffset(newOffset);
  };

  const endDrag = () => {
    if (!interactive) return;
    dragRef.current = false;
    dirRef.current = velRef.current > 0 ? 'right' : 'left';
  };

  const cursorStyle = interactive ? (dragRef.current ? 'grabbing' : 'grab') : 'auto';

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center w-full py-8 md:py-12"
      style={{ 
        visibility: ready ? 'visible' : 'hidden', 
        cursor: cursorStyle,
        pointerEvents: interactive ? 'auto' : 'none',
        willChange: 'transform'
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
    >
      <svg
        className="select-none w-full overflow-visible block aspect-[100/12] font-bold uppercase leading-none"
        viewBox="0 0 1440 120"
        style={{ 
          height: 'auto', 
          maxHeight: '100px',
          pointerEvents: 'none'
        }}
      >
        <text 
          ref={measureRef} 
          xmlSpace="preserve" 
          style={{ 
            visibility: 'hidden', 
            opacity: 0, 
            pointerEvents: 'none',
            fontSize: 'clamp(2.5rem, 3.5vw, 3.5rem)'
          }}
        >
          {text}
        </text>
        <defs>
          <path ref={pathRef} id={pathId} d={pathD} fill="none" stroke="transparent" />
        </defs>
        {ready && (
          <text 
            xmlSpace="preserve" 
            className={className ?? 'fill-[#443592]'}
            style={{ fontSize: 'clamp(2.5rem, 3.5vw, 3.5rem)' }}
          >
            <textPath ref={textPathRef} href={`#${pathId}`} startOffset={offset + 'px'} xmlSpace="preserve">
              {splitText && highlightWord ? (
                Array(Math.ceil(1800 / spacing) + 2).fill(null).map((_, i) => (
                  splitText.map((part, idx) => 
                    part.toLowerCase() === highlightWord.toLowerCase() ? (
                      <tspan key={`${i}-${idx}`} fill={highlightColor}>{part}</tspan>
                    ) : (
                      <tspan key={`${i}-${idx}`}>{part}</tspan>
                    )
                  )
                ))
              ) : (
                totalText
              )}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  );
};

export default memo(CurvedLoop);

