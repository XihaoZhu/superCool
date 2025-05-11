'use client'

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const cards = ['Card 1', 'Card 2', 'Card 3'];

export function TextSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const slideTo = (index: number) => {
    const newIndex = (index + cards.length) % cards.length; 
    setCurrentIndex(newIndex);

    const offset = -newIndex * 100;

    gsap.to(containerRef.current, {
      xPercent: offset,
      duration: 0.8,
      ease: "power2.inOut",
    });
  };

  const next = () => {
    const newIndex = (currentIndex + 1 + cards.length) % cards.length;
    slideTo(newIndex);
    console.log('当前索引:', newIndex);
  };
  
  const prev = () => {
    const newIndex = (currentIndex - 1 + cards.length) % cards.length;
    slideTo(newIndex);
    console.log('当前索引:', newIndex);
  };
  return (
    <div className="relative w-[300px] overflow-hidden">
      <div
        ref={containerRef}
        className="flex w-[900px]" 
      >
        {cards.map((text, i) => (
          <div
            key={i}
            className="w-[300px] h-[200px] bg-white/10 text-neutral border border-white/30 flex items-center justify-center text-2xl font-bold backdrop-blur-lg"
          >
            {text}
          </div>
        ))}
      </div>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-4">
        <button onClick={prev}>⬅️</button>
        <span className="text-neutral">第 {currentIndex + 1} 张</span>
        <button onClick={next}>➡️</button>
      </div>
    </div>
  );
}
