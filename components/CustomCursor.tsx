import React, { useState, useEffect, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);

  // State for things that cause re-renders (like class changes for opacity)
  const [isHovering, setIsHovering] = useState(false);

  // Refs for values used inside the animation loop to avoid stale closures
  const mousePos = useRef({ x: -100, y: -100 });
  const outlinePos = useRef({ x: -100, y: -100 });
  const outlineScale = useRef(1);
  const hoverTargetRef = useRef(false);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePos.current.x = event.clientX;
      mousePos.current.y = event.clientY;
    };

    const updateHoverState = (hovering: boolean) => {
        setIsHovering(hovering);
        hoverTargetRef.current = hovering;
    };

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as Element;
      if (
        target.matches(
          'a, button, input, textarea, [role="button"], [class*="cursor-pointer"]'
        )
      ) {
        updateHoverState(true);
      }
    };

    const handleMouseOut = (event: MouseEvent) => {
      const target = event.target as Element;
       if (
        target.matches(
          'a, button, input, textarea, [role="button"], [class*="cursor-pointer"]'
        )
      ) {
        updateHoverState(false);
      }
    };

    const animate = () => {
      const dot = cursorDotRef.current;
      const outline = cursorOutlineRef.current;

      if (dot) {
          dot.style.transform = `translate(${mousePos.current.x}px, ${mousePos.current.y}px)`;
      }
      
      if(outline) {
        // Lerp position for smooth trailing effect
        const dx = mousePos.current.x - outlinePos.current.x;
        const dy = mousePos.current.y - outlinePos.current.y;
        outlinePos.current.x += dx * 0.15;
        outlinePos.current.y += dy * 0.15;

        // Lerp scale for smooth size change on hover
        const targetScale = hoverTargetRef.current ? 1.5 : 1;
        const dScale = targetScale - outlineScale.current;
        outlineScale.current += dScale * 0.2;

        outline.style.transform = `translate(${outlinePos.current.x}px, ${outlinePos.current.y}px) scale(${outlineScale.current})`;
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    
    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once.

  return (
    <>
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 -translate-x-1/2 -translate-y-1/2 bg-primary rounded-full pointer-events-none z-[100]"
      />
      <div
        ref={cursorOutlineRef}
        style={{
          boxShadow: '0 0 12px var(--primary-glow)',
        }}
        className={`fixed top-0 left-0 w-10 h-10 -translate-x-1/2 -translate-y-1/2 border-2 border-primary rounded-full pointer-events-none z-[100] transition-opacity duration-300 ${
          isHovering ? 'opacity-50' : 'opacity-30'
        }`}
      />
    </>
  );
};

export default CustomCursor;