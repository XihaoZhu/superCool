'use client'
import gsap from "gsap";
import { useEffect,useState, useRef } from "react";

export function Horizen() {


    const contentRef = useRef<HTMLDivElement>(null);
    const img1Ref = useRef<HTMLImageElement>(null);
    const img2Ref = useRef<HTMLImageElement>(null);

    const [progress, setProgress] = useState(0);

    useEffect(() => {0
        gsap.fromTo(img1Ref.current, {y:'-500%'}, {y:0, duration: 1, ease: "power2.out"});
        gsap.fromTo(img2Ref.current, {y:'500%'}, {y:0, duration: 1, ease: "power2.out"});
    },[])


    useEffect(() => {
        const handleScroll = (e: WheelEvent) => {
          const delta = e.deltaY * 0.02;
          setProgress((prev) => Math.min(Math.max(prev + delta, 0), 66.666)); 
    
          gsap.to(contentRef.current, {
            x: `-${progress}%`,
            duration: 1,
            ease: "power2.out",
          });

          gsap.to(img1Ref.current, {
            y: `-${progress*15}%`,
            duration: 1,
            ease: "power2.out",
          });

          gsap.to(img2Ref.current, {
            y: `${progress*15}%`,
            duration: 1,
            ease: "power2.out",
          });
        }

        window.addEventListener("wheel", handleScroll, { passive: false });
        return () => window.removeEventListener("wheel", handleScroll);
    },[progress])




  return (
    <div className="w-full h-full overflow-x-hidden">
        <div className="w-[300vw] h-full flex flex-row" ref={contentRef}>
            <div className="w-screen h-full relative overflow-hidden flex items-center justify-center">
              <img ref={img1Ref} src="images/University_of_Nottingham_logo.png" alt="Nottingham_University_Logo" className="w-1/3 h-auto opacity-50 absolute top-1/6   left-1/2 -translate-x-1/2 " />
              <img ref={img2Ref} src="images/Manchester_University_Logo.png" alt="Manchester_University_Logo" className="w-1/3 h-auto opacity-50 absolute bottom-1/6 left-1/2 -translate-x-1/2"/>
              <div>
                location test
              </div>
            </div>
            <div className="w-screen h-full bg-pink-200">

            </div>
            <div className="w-screen h-full bg-blue-200">

            </div>
        </div>
    </div>
  );
}
