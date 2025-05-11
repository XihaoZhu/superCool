'use client'

import { useEffect, useRef, useState } from "react";


export function CursorEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [height, setHeight] = useState(1);
  const [width, setWidth] = useState(1);

  const rows = 50;
  const cellSize = height / rows; 
  const cols = Math.floor(width / cellSize);

  

  
  useEffect(() => {
    const canvas= canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let mouseX = -100;
    let mouseY = -100;

    const updateMousePos = (e: { clientX: number; clientY: number; }) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * cellSize + cellSize / 2;
          const y = row * cellSize + cellSize / 2;
          
          const dx = Math.abs(mouseX - x);
          const dy = Math.abs(mouseY - y);
          const distance = Math.sqrt(dx * dx + dy * dy);

          const scale = Math.max(1 - distance / 10000, 1);
          const opacity = 0.2 + 0.45 * Math.exp(-distance / 100);

          ctx.fillStyle = `rgba(35, 45, 50, ${opacity})`;
          ctx.fillRect(
            x - (cellSize * scale) / 2,
            y - (cellSize * scale) / 2,
            cellSize * scale,
            cellSize * scale
          );
        }
      }
    };

    const renderLoop = () => {
      drawGrid();
      requestAnimationFrame(renderLoop);
    };

    window.addEventListener("mousemove", updateMousePos);
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
    renderLoop();

    return () => window.removeEventListener("mousemove", updateMousePos);
  }, [rows, cols, cellSize]);

  return (
    <canvas 
      ref={canvasRef} 
      width={cols * cellSize} 
      height={rows * cellSize} 
      className="absolute top-0 left-0 w-full h-full"
      style={{zIndex:-1}}
    />
  );
}