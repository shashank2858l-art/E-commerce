"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent, motion, useTransform } from "framer-motion";

const TOTAL_FRAMES = 146;

export default function ChairCanvasScrollSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Preload sequence
  useEffect(() => {
    const loadImagesParallel = async () => {
      const promises = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
        return new Promise<{img: HTMLImageElement, index: number}>((resolve) => {
          const img = new Image();
          const frameIndex = (i + 1).toString().padStart(3, '0');
          // Update frame path specifically to chair-sequence
          img.src = `/images/chair-sequence/ezgif-frame-${frameIndex}.jpg`;
          img.onload = () => resolve({ img, index: i });
          img.onerror = () => resolve({ img, index: i });
        });
      });
      
      const results = await Promise.all(promises);
      results.sort((a, b) => a.index - b.index);
      setImages(results.map(r => r.img));
      setIsLoaded(true);
    };

    loadImagesParallel();
  }, []);

  // Frame rendering context logic
  const renderFrame = (index: number) => {
    if (!canvasRef.current || images.length === 0 || !images[index]) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false }); // alpha false optimizes performance for black bg
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const img = images[index];
    
    // Fill deep dark background to blend JPGs
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Responsive scaling (contain)
    const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
    const x = (canvas.width / 2) - (img.width / 2) * scale;
    const y = (canvas.height / 2) - (img.height / 2) * scale;

    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isLoaded) return;
    const frameIndex = Math.min(
      TOTAL_FRAMES - 1,
      Math.max(0, Math.floor(latest * TOTAL_FRAMES))
    );
    requestAnimationFrame(() => renderFrame(frameIndex));
  });

  useEffect(() => {
    if (isLoaded) {
      renderFrame(0);
      const handleResize = () => requestAnimationFrame(() => renderFrame(Math.floor(scrollYProgress.get() * TOTAL_FRAMES)));
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [isLoaded]);

  return (
    <div ref={containerRef} className="relative w-full h-[400vh] bg-black">
      {!isLoaded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="flex flex-col items-center">
             <div className="w-12 h-12 border-4 border-white/10 border-t-[#00FF9C] rounded-full animate-spin mb-6"></div>
             <div className="text-white text-sm tracking-[0.3em] font-light uppercase">Constructing Frame</div>
          </div>
        </div>
      )}
      
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full block" />
        
        {isLoaded && (
          <div className="absolute inset-0 pointer-events-none">
             <TextOverlay scrollYProgress={scrollYProgress} />
          </div>
        )}
      </div>
    </div>
  );
}

function TextOverlay({ scrollYProgress }: { scrollYProgress: any }) {
  return (
    <div className="w-full h-full relative text-white/90 font-sans mx-auto max-w-7xl px-8 sm:px-12">
      
      {/* 0% Scroll: Hero */}
      <motion.div 
        className="absolute inset-x-0 h-full flex flex-col items-center justify-center mt-[-10vh] text-center"
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.08, 0.15], [1, 1, 0]),
          y: useTransform(scrollYProgress, [0, 0.15], [0, -50])
        }}
      >
        <span className="text-[#00FF9C] tracking-widest text-xs sm:text-sm font-semibold uppercase mb-4 block">
          Ergonomic Mastery
        </span>
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
          Pro Gaming Chair
        </h1>
        <p className="text-lg sm:text-xl text-white/50 font-light max-w-xl mx-auto">
          Built for posture. Engineered for velocity. Scroll to review the anatomy.
        </p>
      </motion.div>

      {/* 30% Scroll: Left align */}
      <motion.div 
        className="absolute left-8 sm:left-16 top-1/2 -translate-y-1/2"
        style={{
          opacity: useTransform(scrollYProgress, [0.2, 0.3, 0.45], [0, 1, 0]),
          x: useTransform(scrollYProgress, [0.2, 0.3, 0.45], [-50, 0, -50])
        }}
      >
        <div className="w-12 h-[2px] bg-[#00FF9C] mb-6"></div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight">Adaptive Lumbar</h2>
        <p className="text-base sm:text-lg text-white/60 max-w-xs leading-relaxed">
          Dynamic multi-axis lower back support that shifts fluidly with your spine's natural curvature.
        </p>
      </motion.div>

      {/* 60% Scroll: Right align */}
      <motion.div 
        className="absolute right-8 sm:right-16 top-1/2 -translate-y-1/2 text-right flex flex-col items-end"
        style={{
          opacity: useTransform(scrollYProgress, [0.45, 0.6, 0.75], [0, 1, 0]),
          x: useTransform(scrollYProgress, [0.45, 0.6, 0.75], [50, 0, 50])
        }}
      >
        <div className="w-12 h-[2px] bg-[#00FF9C] mb-6"></div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight">Zero-G Recline</h2>
        <p className="text-base sm:text-lg text-white/60 max-w-xs leading-relaxed">
          Pneumatic lift cylinders and hyper-responsive tilt lock mechanisms achieving complete weightlessness.
        </p>
      </motion.div>

      {/* 90% Scroll: Ending CTA */}
      <motion.div 
        className="absolute inset-x-0 h-full flex flex-col items-center justify-center text-center mt-[10vh]"
        style={{
          opacity: useTransform(scrollYProgress, [0.75, 0.9, 1], [0, 1, 1]),
          y: useTransform(scrollYProgress, [0.8, 0.9], [50, 0])
        }}
      >
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight mb-10">
          The Ultimate Setup.
        </h1>
        <a href="/" className="px-10 py-5 rounded-full bg-gradient-to-r from-[#00FF9C] to-[#00C97B] text-black font-semibold text-lg hover:scale-105 transition-transform pointer-events-auto shadow-[0_0_40px_rgba(0,255,156,0.5)]">
          Return to Marketplace
        </a>
      </motion.div>
    </div>
  );
}
