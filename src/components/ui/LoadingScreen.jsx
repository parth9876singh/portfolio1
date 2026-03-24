import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const loadingMessages = [
  "INITIALIZING NEURAL LINK...",
  "BYPASSING SECURITY PROTOCOLS...",
  "DECRYPTING PORTFOLIO DATA...",
  "ASSEMBLING UI COMPONENTS...",
  "ESTABLISHING SECURE CONNECTION...",
  "SYSTEM ONLINE.",
];

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const duration = 2500; // Increased slightly for tech feel
    const interval = 20;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min((currentStep / steps) * 100, 100);
      const easedProgress = 100 - Math.pow(1 - newProgress / 100, 3) * 100;
      
      setProgress(easedProgress);
      
      // Update message based on progress
      const nextMessageIdx = Math.floor((easedProgress / 100) * (loadingMessages.length - 1));
      setMessageIndex(Math.min(nextMessageIdx, loadingMessages.length - 1));

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(onComplete, 500);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[99999] bg-[#0a0f16] flex flex-col items-center justify-center pointer-events-none overflow-hidden"
    >
      {/* High-tech Background Grid */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "linear-gradient(#06b6d4 1px, transparent 1px), linear-gradient(90deg, #06b6d4 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}
      />
      
      {/* Scanline Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none" />

      {/* Futuristic Corners */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-brand-cyan/70" />
      <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-brand-cyan/70" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-brand-cyan/70" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-brand-cyan/70" />

      {/* Decorative Binary / Code strings */}
      <div className="absolute top-12 right-12 text-xs font-mono text-brand-cyan/40 text-right hidden md:block">
        SYS.REQ.0x9A4F<br/>
        PORT: 8080[SECURE]<br/>
        MEM: {Math.floor(progress * 1.24)} MB
      </div>
      <div className="absolute bottom-12 left-12 text-xs font-mono text-brand-indigo/40 hidden md:block">
        V 2.0.4.19<br/>
        ENCRYPTION: SHIELDED
      </div>

      <div className="relative flex flex-col items-center z-10 w-full max-w-md px-8">
        {/* Animated SVG Logo */}
        <motion.div className="mb-14 relative w-36 h-36 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0 filter drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]">
            
            {/* 🔤 Letter P */}
            <motion.path
              d="M 25,70 L 25,30 L 45,30 
                 C 60,30 60,50 45,50 
                 L 25,50"
              fill="transparent"
              strokeWidth="4"
              stroke="url(#gradient)"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2 }}
            />

            {/* 🔤 Letter S (Properly Fixed Bezier) */}
            <motion.path
              d="M 95,38 
                 C 95,26 65,26 65,40 
                 C 65,55 95,45 95,60 
                 C 95,74 65,74 65,62"
              fill="transparent"
              strokeWidth="4"
              stroke="url(#gradient)"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
            />

            {/* Gradient */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Subtle Glitch Overlay on Logo */}
          <motion.div 
            className="absolute inset-0 bg-brand-cyan/10 mix-blend-overlay rounded-full"
            animate={{ 
              opacity: [0, 0.3, 0, 0.5, 0],
              x: [-1, 2, -1, 1, 0],
            }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
          />
        </motion.div>

        {/* Dynamic Loading Text */}
        <div className="w-full flex justify-between items-end mb-3">
          <div className="text-brand-cyan font-mono text-xs tracking-widest uppercase">
            {loadingMessages[messageIndex]}
            <motion.span 
              animate={{ opacity: [0, 1, 0] }} 
              transition={{ repeat: Infinity, duration: 0.8 }}
            >_</motion.span>
          </div>
          <div className="text-brand-cyan font-mono text-sm tracking-widest font-bold drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
            {Math.floor(progress)}%
          </div>
        </div>

        {/* High-tech Segmented Progress Bar */}
        <div className="w-full h-1.5 bg-brand-cyan/10 rounded-full overflow-hidden relative flex">
          <motion.div
            className="absolute top-0 left-0 h-full bg-brand-cyan w-full origin-left shadow-[0_0_10px_#06b6d4]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress / 100 }}
            transition={{ type: "tween", ease: "linear", duration: 0.1 }}
          />
          {/* Tick marks to make it look segmented */}
          <div className="absolute inset-0 w-full h-full flex justify-between px-[2px]">
            {[...Array(30)].map((_, i) => (
               <div key={i} className="w-[1px] h-full bg-[#0a0f16]" />
            ))}
          </div>
        </div>

        {/* Bottom decorative bar */}
        <div className="w-full flex justify-between items-center mt-4 opacity-50">
           <div className="h-px w-10 bg-brand-cyan" />
           <div className="text-[10px] text-brand-cyan font-mono tracking-widest uppercase">
              System Boot Sequence
           </div>
           <div className="h-px w-10 bg-brand-cyan" />
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
