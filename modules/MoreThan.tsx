'use client'

import { div } from 'framer-motion/client'
import { useEffect, useRef, useState } from 'react'


export function MoreThan() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [frameIndex, setFrameIndex] = useState(`moreThanPNG/frame (1).png`)


  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;
    
      const rect = container.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
    
      const progress = (window.innerHeight / 2 - centerY) / (window.innerHeight/3.5);
      const clampedProgress = Math.max(-1, Math.min(1, progress)); // 保证范围 [-1, 1]
    
      const frame = 25 - Math.floor(Math.abs(clampedProgress) * 24); // [1, 25]
    
      setFrameIndex(`moreThanPNG/frame (${frame}).png`);
    };

    const onScroll = () => requestAnimationFrame(handleScroll)

    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
    }

  }, [])

  return (
    <div className="h-full">
      <div ref={containerRef} className="h-full">
        <img
        key={frameIndex}
          src={frameIndex}
          alt={`frame ${frameIndex}`}
          className="object-scale-down w-full h-full"
        />
      </div>
    </div>
  )
}
