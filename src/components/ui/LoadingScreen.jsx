import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const loadingMessages = [
  "Forming clay modules...",
  "Baking layout blocks...",
  "Rounding card edges...",
  "Applying 3D highlights...",
  "Inflating components...",
  "System ready.",
];

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const duration = 2500;
    const interval = 20;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min((currentStep / steps) * 100, 100);
      // Ease progress for a smoother build-up
      const easedProgress = 100 - Math.pow(1 - newProgress / 100, 3) * 100;
      
      setProgress(easedProgress);
      
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
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }} // Snappy elastic feel
      className="fixed inset-0 z-[99999] bg-[#090b11] flex flex-col items-center justify-center pointer-events-none overflow-hidden"
    >
      {/* Soft Bubbly Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-brand-indigo/20 blur-[100px] animate-blob" />
        <div className="absolute bottom-[10%] right-[5%] w-[450px] h-[450px] rounded-full bg-brand-cyan/15 blur-[120px] animate-blob-reverse" />
      </div>

      <div className="relative flex flex-col items-center z-10 w-full max-w-sm px-8">
        
        {/* Bouncy Clay Badge Logo */}
        <motion.div 
          animate={{ 
            y: [0, -12, 0],
            scale: [1, 1.03, 1],
            rotate: [0, 2, -2, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 3.5, 
            ease: "easeInOut" 
          }}
          className="mb-14 relative w-36 h-36 rounded-full bg-gradient-to-tr from-brand-indigo to-indigo-500 border border-white/20 flex items-center justify-center shadow-[10px_10px_25px_rgba(0,0,0,0.4),inset_-8px_-8px_16px_rgba(0,0,0,0.5),inset_8px_8px_16px_rgba(255,255,255,0.2)]"
        >
          {/* Inner Glow Aura */}
          <div className="absolute inset-2 rounded-full bg-indigo-400/10 blur-md pointer-events-none" />
          
          <svg viewBox="0 0 100 100" className="w-20 h-20 filter drop-shadow-[2px_4px_6px_rgba(0,0,0,0.3)]">
            {/* Letter P */}
            <motion.path
              d="M 30,70 L 30,30 L 50,30 
                 C 62,30 62,48 50,48 
                 L 30,48"
              fill="transparent"
              strokeWidth="7"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />

            {/* Letter S */}
            <motion.path
              d="M 80,38 
                 C 80,28 58,28 58,40 
                 C 58,52 80,46 80,58 
                 C 80,70 58,70 58,60"
              fill="transparent"
              strokeWidth="7"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            />
          </svg>
        </motion.div>

        {/* Loading Progress Info */}
        <div className="w-full flex justify-between items-end mb-3 px-1">
          <div className="text-gray-300 font-sans text-xs font-semibold tracking-wide flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan shadow-[0_0_8px_#06b6d4] animate-ping" />
            {loadingMessages[messageIndex]}
          </div>
          <div className="text-brand-cyan font-mono text-sm font-black tracking-wider">
            {Math.floor(progress)}%
          </div>
        </div>

        {/* Soft Clay Progress Bar Track */}
        <div className="w-full h-5 bg-black/45 rounded-full p-1 shadow-[inset_4px_4px_8px_rgba(0,0,0,0.5),inset_-4px_-4px_8px_rgba(255,255,255,0.02)] border border-white/5 relative overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-brand-indigo via-brand-cyan to-brand-cyan rounded-full relative"
            style={{
              boxShadow: "inset -2px -2px 5px rgba(0,0,0,0.4), inset 2px 2px 5px rgba(255,255,255,0.3), 0 0 10px rgba(6,182,212,0.15)"
            }}
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "tween", ease: "linear" }}
          />
        </div>

        {/* Bottom design accent */}
        <div className="w-full flex justify-between items-center mt-5 opacity-40 px-2">
           <div className="h-[2px] w-6 bg-white/20 rounded-full" />
           <div className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">
              Claymorphic Boot Load
           </div>
           <div className="h-[2px] w-6 bg-white/20 rounded-full" />
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
