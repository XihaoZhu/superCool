'use client'

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";

export function Balls() {

    const ballRef = useRef<HTMLDivElement>(null)
    const ballRef2 = useRef<HTMLDivElement>(null)

    const handleMove = (e: MouseEvent) => {
        const centerX = window.innerWidth / 2
        const centerY = window.innerHeight / 2
      
        const distanceX = e.clientX - centerX
        const distanceY = e.clientY - centerY
      
        // 计算距离，用于控制衰减
        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2)
      
        // 衰减系数（调整这个值控制“灵敏度”）
        const decayFactor = 1 / (1 + distance / 200)
      
        const moveX = distanceX * decayFactor
        const moveY = distanceY * decayFactor
      
        gsap.to(ballRef.current, {
          x: moveX,
          y: moveY,
          duration: 1,
          ease: 'power3.out',
        })

        gsap.to(ballRef2.current, {
            x: moveX*1.5,
            y: moveY,
            duration: 1,
            ease: 'power3.out',
          })
      }

    useEffect(() => {
  
      window.addEventListener('mousemove', handleMove)
      return () => window.removeEventListener('mousemove', handleMove)
    }, [])
  
    return (<>

      

      <div className="relative h-screen w-screen filter-[#balls] z-[-1] blur-[20px]">
          <div
            className="absolute top-1/2 left-1/2 h-[30rem] aspect-square bg-black rounded-full  transform -translate-x-1/2 -translate-y-1/2"
          />
          <div
            ref={ballRef}
            className="absolute top-1/2 left-1/2 h-[20rem] aspect-square h-1/2 bg-black rounded-full  transform -translate-x-1/2 -translate-y-1/2"
          />
          <div
            ref={ballRef2}
            className="absolute top-1/2 left-1/2 h-[10rem] aspect-square h-1/2 bg-black rounded-full  transform -translate-x-1/2 -translate-y-1/2"
          />
        <svg className="display-none">
          <defs>
            <filter id='balls'>

            <feGaussianBlur in='SourceGraphic' stdDeviation='20' result='blur' />
            <feColorMatrix in='blur' mode='matrix' values='1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 20-10 0' result='color' />
              </filter>
          </defs>

        </svg>

      </div>
      </>
    )
}