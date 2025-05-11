'use client'

import * as THREE from "three";
import { GLTFLoader, GLTF } from 'three/addons/loaders/GLTFLoader.js';
import { useEffect, useRef, useState } from "react";
import { div, g } from "framer-motion/client";
import { gsap } from "gsap";
import { mod } from "three/tsl";

export function KeyWords() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);


  const text = [
    "This original website was built using React, GSAP, Three.js, TypeScript, and TailwindCSS. In addition to this project, my past work has also explored React Native and Vue, among other technologies. You can find further examples of these in the project section of my CV.",
    "Beyond web development, I have also gained hands-on experience in 3D modeling through academic training in 3DExperience, as well as self-learning SolidWorks and Blender. My personal projects showcase my application of these tools, including various models and animations. I'm also proficient in Photoshop, and have working knowledge of Premiere Pro and After Effects.",
    "Beyond technical skills, I’m a dedicated and responsible individual with strong self-discipline. I’m naturally curious, eager to learn, and highly motivated to explore new tools and knowledge. I take pride in consistently improving myself and taking initiative in every project I pursue."  ]

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 创建场景、相机、渲染器
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0,0,0)
    camera.lookAt(0, 0, 0);

    cameraRef.current = camera; 

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // 添加光照
    const light = new THREE.DirectionalLight(0xffffff, 3);
    light.position.set(5, 5, 5);
    scene.add(light);

    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambient);

    // 加载模型
    const loader = new GLTFLoader();
    loader.load("/gbl/planto.glb", (gltf) => {
      const model = gltf.scene;
      scene.add(model);
      modelRef.current = model; // ✅ 保存模型引用
    })

    // 动画循环
    const animate = () => {
      requestAnimationFrame(animate);

      if (modelRef.current) {
        modelRef.current.rotation.y += 0.005;
      }
      renderer.render(scene, camera);
    };
    animate();

    // 清理
    return () => {
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);


  // handle hover
  const keywords = [
    { text: (<><span style={{ color: "transparent", WebkitTextStroke: "2px black" }}>B</span></>), fulltext:'eginner' },
    { text: (<><span style={{ color: "transparent", WebkitTextStroke: "2px black" }}>W</span></>),  fulltext:'eb' },
    { text: (<><span style={{ color: "transparent", WebkitTextStroke: "2px black" }}>S</span></>), fulltext:'hown'  }
  ];
  
    const refs = useRef<HTMLSpanElement[]>([]);
    const textRefs = useRef<HTMLDivElement[]>([]);
  
    const handleMouseEnter = (index: number) => {
      const target = refs.current[index];
      const targetText = textRefs.current[index];
      gsap.fromTo(target, { x:-20, opacity:0,},{x:0, opacity:1, duration: 0.5, ease: "power2.out"});
      gsap.fromTo(targetText, { opacity:0, y:-20},{y:0, opacity:1, duration: 0.5, ease: "power2.out"});
      if (cameraRef.current) {
        if (index === 0){
        const cam = cameraRef.current;
        gsap.to(cam.position, {
          x: 0,
          y: -10,
          z: 0,
          duration: 1,
          ease: "power2.out",
          onUpdate: () => {
            cam.lookAt(0, 0, 0); // lookAt 也要实时更新
          },
        });
      }else if (index === 1){
        const cam = cameraRef.current;
        gsap.to(cam.position, {
          x: 0,
          y: 10,
          z: 0,
          duration: 1,
          ease: "power2.out",
          onUpdate: () => {
            cam.lookAt(0, 0, 0); // lookAt 也要实时更新
          },
        });
      }else if (index === 2){
        const cam = cameraRef.current;
        gsap.to(cam.position, {
          x: 0,
          y: 6,
          z: 9,
          duration: 1,
          ease: "power2.out",
          onUpdate: () => {
            cam.lookAt(0, 0, 0); // lookAt 也要实时更新
          },
        });
      }
    }

    };
  
    const handleMouseLeave = (index: number) => {
      const target = refs.current[index];
      const targetText = textRefs.current[index];
      gsap.fromTo(targetText, {y:0, opacity:1, duration: 0.5, ease: "power2.out"},{ opacity:0, y:-20});
      gsap.fromTo(target, {x:0, opacity:1,},{ x:-20, opacity:0, duration: 0.5, ease: "power2.out"});
      if (cameraRef.current) {
        const cam = cameraRef.current;
          gsap.to(cam.position, {
            x: 0,
            y: 0,
            z: 0,
            duration: 1,
            ease: "power2.out",
            onUpdate: () => {
              cam.lookAt(0, 0, 0); // lookAt 也要实时更新
            },
          });
      }
    };


    // show when croll to bottom
    const keyWordsRef = useRef<HTMLDivElement>(null);
    const isVisibleRef = useRef(false);

    useEffect(() => {
      const handleScroll = () => {
        const scrollTop = window.scrollY;  // 滚动了多少
        const windowHeight = window.innerHeight;  // 视口高度
        const fullHeight = document.body.scrollHeight;  // 整个页面高度
    
        if ((scrollTop + windowHeight >= fullHeight - 10)&&!isVisibleRef.current) {  // 到底了，留一点容错
          isVisibleRef.current=true;
          if (keyWordsRef.current) {
            gsap.fromTo(keyWordsRef.current,{opacity:0, y:"2rem"}, { duration: 1, opacity: 1, ease: "power2.in",y:0 });
          }
        }

        if ((scrollTop + windowHeight < fullHeight - 10) && isVisibleRef.current) {  // 滚回去
          isVisibleRef.current=false;
          if (keyWordsRef.current) {
            gsap.to(keyWordsRef.current, { duration: 1, opacity: 0, ease: "power2.out",y:"5rem" });
          }
        }
      };
    
      window.addEventListener('scroll', handleScroll);
    
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
    return (
      <div className="w-full h-[75vh] items-center justify-between relative flex-col opacity-0 flex relative" ref={keyWordsRef}>
        <div className="flex justify-between flex-col text-[4rem] w-2/3">
          {keywords.map((item, index) => (
            <div
              key={index}
              className="whitespace-nowrap w-1/3 relative crusor-pointer"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
             {item.text}
             <span  ref={el => {
                refs.current[index] = el!;
              }} 
              className="opacity-0 absolute"
              >{item.fulltext}</span>
            </div>
          ))}
        </div>
        <div ref={containerRef} className="w-1/4 h-2/5 absolute top right-0 mr-[20vw]" />
        <div className="w-1/2 h-1/2 relative">
        {text.map((item, index) => (
            <div
              key={index}
              ref={el =>{textRefs.current[index] = el!}}
              className="text-[1.5rem] text-justify text-black opacity-0 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full
              text-gray-800 tracking-[0.08em] leading-relaxed font-light uppercase"
            >
             {item}
            </div>
          ))}</div>
      </div>
  );
}