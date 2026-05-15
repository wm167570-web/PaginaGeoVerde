import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [isInteractive, setIsInteractive] = useState(false);
  const [isText, setIsText] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300 };
  const ringSpringConfig = { damping: 30, stiffness: 150 };

  const springCursorX = useSpring(cursorX, springConfig);
  const springCursorY = useSpring(cursorY, springConfig);
  const springRingX = useSpring(ringX, ringSpringConfig);
  const springRingY = useSpring(ringY, ringSpringConfig);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouch(isTouchDevice);
    if (isTouchDevice) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 5);
      cursorY.set(e.clientY - 5);
      ringX.set(e.clientX - 15);
      ringY.set(e.clientY - 15);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check for interactive elements
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsInteractive(true);
      }
      
      // Check for text elements
      if (
        target.tagName === 'P' || 
        target.tagName === 'H1' || 
        target.tagName === 'H2' || 
        target.tagName === 'H3' ||
        target.tagName === 'SPAN'
      ) {
        setIsText(true);
      }
    };

    const handleMouseOut = () => {
      setIsInteractive(false);
      setIsText(false);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, [cursorX, cursorY, ringX, ringY]);

  if (isTouch) return null;

  return (
    <>
      {/* Inner Circle / Text Line */}
      <motion.div
        className={`fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-brand-primary ${isText ? 'w-[2px] h-[20px] rounded-sm' : 'w-[10px] h-[10px]'}`}
        style={{
          x: springCursorX,
          y: springCursorY,
        }}
      />
      
      {/* Outer Ring */}
      <motion.div
        className={`fixed top-0 left-0 pointer-events-none z-[9998] border-2 border-brand-primary rounded-full transition-colors duration-300 ${isInteractive ? 'w-[50px] h-[50px] mix-blend-difference bg-white' : 'w-[30px] h-[30px]'}`}
        style={{
          x: springRingX,
          y: springRingY,
        }}
      />
    </>
  );
}
