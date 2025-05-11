'use client';

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useState } from "react";


export function SpinName() {

  // balls 
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
        const decayFactor = 1 / (1 + distance / 300)
      
        const moveX = distanceX * decayFactor
        const moveY = distanceY * decayFactor
      
        gsap.to(ballRef.current, {
          x: moveX,
          y: moveY,
          duration: 2,
          ease: 'power3.out',
        })

        gsap.to(ballRef2.current, {
            x: moveX*1.5,
            y: moveY,
            duration: 2,
            ease: 'power3.out',
          })
      }

    useEffect(() => {
  
      window.addEventListener('mousemove', handleMove)
      return () => window.removeEventListener('mousemove', handleMove)
    }, [])
    // balls end


    const alphaAN = useRef<HTMLDivElement>(null);

    const alphaName = useRef<HTMLDivElement>(null);

    const bar = useRef<HTMLDivElement>(null);

    const [text, setText] = useState<string>('ick');

    useGSAP(() => {
      gsap.to(alphaAN.current, {rotate: -90 , duration: 2, repeat: -1, ease: "back.inOut(2)", yoyo: true, yoyoEase: "back.inOut(2)",repeatDelay: 2})
      const t1=gsap.timeline({repeat: -1, repeatDelay: 2})
      t1.to(bar.current, {scaleX: 2, duration: 1, ease: "back.inOut(2)" })
      .call(()=>{
        setText((prevText) => prevText === 'ick' ? 'xihao' : 'ick')
      })
      .to(bar.current, {scaleX: 1, duration: 1, ease: "back.inOut(2)" })
  },[])

    // useEffect(() => {

    //     const setBHeight = () => {
    //       if (alphaAN.current && alphaCon.current && alphaName.current) {
    //         const aHeight = alphaAN.current.offsetHeight;
    //         alphaCon.current.style.height = `${aHeight*2}px`;
    //         alphaName.current.style.lineHeight = `${aHeight*2}px`;
    //       }
    //     };
    
    //     setBHeight();
    
    //     window.addEventListener("resize", setBHeight);
    
    //     return () => {
    //       window.removeEventListener("resize", setBHeight);
    //     };
    //   }, []);

    return (
        <div className="w-screen justify-center items-center flex flex-row align-center">
                <span ref={alphaAN} className="text-[10rem] font-black text-center inline-block text-transparent" style={{WebkitTextStroke:`5px orange`, WebkitTextFillColor: 'transparent',textShadow:'5px 5px 20px rgba(255, 255, 105, 0.5)'}}>N</span>
                <div ref={bar} className="w-[20rem] h-[8rem] rounded-2xl bg-gradient-to-l from-[#e0e7ff] via-[#fdf2f8] to-[#e0f2fe] shadow-xl origin-left ml-5 z-5" />
                <div className="w-[12rem] ml-5 overflow-show text-left">
                    <div className="text-[8rem] ml-5 z-5" ref={alphaName}>
                        <span className="text-black">{text}</span>
                    </div>
                </div>
          <div className="absolute h-screen w-screen filter-[#balls] z-1 mix-blend-difference blur-2xl">
          <div
            className="absolute top-1/2 left-1/2 h-[30rem] aspect-square bg-white rounded-full  transform -translate-x-1/2 -translate-y-1/2"
          />
          <div
            ref={ballRef}
            className="absolute top-1/2 left-1/2 h-[20rem] aspect-square h-1/2 bg-white rounded-full  transform -translate-x-1/2 -translate-y-1/2"
          />
          <div
            ref={ballRef2}
            className="absolute top-1/2 left-1/2 h-[10rem] aspect-square h-1/2 bg-white rounded-full  transform -translate-x-1/2 -translate-y-1/2"
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
      </div>
        );
  }