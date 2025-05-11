'use client';

import { useRef, useEffect } from "react";


import {SpinName} from "@/modules/SpinName";
import {LoadingAni} from "@/modules/loadingAni";
import { MoreThan } from "@/modules/MoreThan";
import { KeyWords } from "@/modules/KeyWords";



export default function Home() {

  useEffect(() => {
    for (let i = 1; i <= 25; i++) {
      const img = document.createElement('img');
      img.src = `moreThanPNG/frame (${i}).png`;
    }
  }, []);

  useEffect(() => {
    // 禁止滚动
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      // 恢复滚动
      document.body.style.overflow = '';
    }, 4000);

    return () => clearTimeout(timer);
  }, []);



  const videoRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      videoRef.current?.style.setProperty('display', 'none');
    }, 6000); 

    return () => clearTimeout(timer);
  }, []); 

  return (
    <>
      <div className="w-screen h-screen fixed top left z-100" ref={videoRef}>
        <LoadingAni/>
      </div>
    <div className="w-screen flex min-h-screen items-center justify-center flex-col relative bg-white">
      {/* spin name */}
      <div className="w-full relative h-[30vh] mt-[20vh] overflow">
        <div className="w-full h-full flex items-center justify-center absolute">
            <SpinName/> 
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center overflow">
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
