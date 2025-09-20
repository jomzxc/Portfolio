import React, { useState, useEffect, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);

  const [isHovering, setIsHovering] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const mousePos = useRef({ x: -100, y: -100 });
  const outlinePos = useRef({ x: -100, y: -100 });
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      mousePos.current.x = event.clientX;
      mousePos.current.y = event.clientY;
    };

    const updateHoverState = (hovering: boolean) => {
        setIsHovering(hovering);
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
    
    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    const animate = () => {
      const dot = cursorDotRef.current;
      const outline = cursorOutlineRef.current;

      if (dot) {
          dot.style.transform = `translate(${mousePos.current.x}px, ${mousePos.current.y}px)`;
      }
      
      if(outline) {
        const dx = mousePos.current.x - outlinePos.current.x;
        const dy = mousePos.current.y - outlinePos.current.y;
        outlinePos.current.x += dx * 0.15;
        outlinePos.current.y += dy * 0.15;

        outline.style.transform = `translate(${outlinePos.current.x}px, ${outlinePos.current.y}px)`;
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);
  
  if (isTouchDevice) {
    return null;
  }

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
        className={`fixed top-0 left-0 w-10 h-10 -translate-x-1/2 -translate-y-1/2 border-2 border-primary rounded-full pointer-events-none z-[100] transition-transform,opacity duration-300 ${
          isHovering ? 'opacity-50 scale-150' : 'opacity-30'
        } ${isMouseDown ? 'scale-[2.5] !opacity-0' : ''}`}
      />
    </>
  );
};

export default CustomCursor;