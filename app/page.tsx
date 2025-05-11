'use client';

import { useState, useRef, useEffect } from "react";
import Image from "next/image";


import {SpinName} from "@/modules/SpinName";
import {Horizen} from "@/modules/Horizen";
import {LoadingAni} from "@/modules/loadingAni";
import {CursorEffect} from "@/modules/CrusorEffect";
import {TextSection} from "@/modules/TextSection";
import { MoreThan } from "@/modules/MoreThan";
import { KeyWords } from "@/modules/KeyWords";
import { Balls } from "@/modules/Balls";



export default function Home() {

  useEffect(() => {
    for (let i = 1; i <= 25; i++) {
      const img = document.createElement('img');
      img.src = `moreThanPNG/frame (${i}).png`;
    }
  }, []);

  const [isBlocked, setIsBlocked] = useState(true);

  useEffect(() => {
    // 禁止滚动
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      // 恢复滚动
      document.body.style.overflow = '';
      setIsBlocked(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);



  const videoRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      videoRef.current?.style.setProperty('display', 'none');
    }, 7000); 

    return () => clearTimeout(timer);
  }, []); 

  return (
    <>
      <div className="w-screen h-screen fixed top left z-100" ref={videoRef}>
        <LoadingAni/>
      </div>
    <div className="w-screen flex min-h-screen items-center justify-center flex-col relative bg-white">
      {/* <CursorEffect/> */}
      {/* loading animation */}
      {/* spin name */}
      <div className="w-full relative h-[30vh] mt-[20vh] overflow">
        <div className="w-full h-full flex items-center justify-center absolute">
            <SpinName/> 
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center overflow">
              {/* <Balls/> */}
            </div>
        </div>
      </div>
      {/* more than */}
      <div className="h-[80vh] flex items-center justify-center z-1">
        <MoreThan/>
      </div>
      {/* keywords section */}
      <div className="h-[80vh] w-full mt-[-30vh] z-10">
        <KeyWords/>
      </div>
    </div>
    </>
  );
}
