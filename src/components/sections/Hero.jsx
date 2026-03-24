import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Github, Code2, Linkedin, Terminal, ChevronRight } from "lucide-react";
import ParticleField from "../ui/ParticleField";
import useTypewriter from "../../hooks/useTypewriter";
import { config } from "../../data/config";

const NoiseOverlay = () => (
  <div
    className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
    style={{
      backgroundImage:
        'url(\'data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E\')',
    }}
  />
);

const Hero = () => {
  const containerRef = useRef(null);
  const typeWriterText = useTypewriter(config.roles, 80, 40, 2500);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-element",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.2, // Fast boot sequence feel
        },
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleScrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-[#050910]"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
            <ParticleField count={6000} />
          </Canvas>
        </Suspense>
      </div>

      {/* High-tech Background Grid Layer */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none z-0"
        style={{
          backgroundImage: "linear-gradient(#06b6d4 1px, transparent 1px), linear-gradient(90deg, #06b6d4 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }}
      />

      <NoiseOverlay />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 w-full flex flex-col items-center md:items-start text-center md:text-left pt-20">
        
        {/* Availability Terminal Status */}
        {config.availability && (
          <div className="hero-element mb-10 inline-flex items-center gap-3 px-4 py-2 bg-green-500/10 border border-green-500/30 text-green-400 text-[10px] md:text-xs font-mono font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(34,197,94,0.15)] relative">
            <div className="absolute -left-[1px] -top-[1px] w-2 h-2 border-t border-l border-green-500" />
            <div className="absolute -right-[1px] -bottom-[1px] w-2 h-2 border-b border-r border-green-500" />
            
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 bg-green-500 shadow-[0_0_8px_#22c55e]"></span>
            </span>
            [ SYS.STATUS: {config.availabilityText} ]
          </div>
        )}

        {/* Greeting / Name */}
        <div className="hero-element flex flex-col items-center md:items-start mb-6">
           <span className="text-brand-cyan/70 font-mono text-[10px] md:text-xs tracking-widest uppercase mb-4 flex items-center gap-2">
              <Terminal size={14} /> SYS.LOGIN_AUTH /// {config.name.replace(/\s+/g, "_").toUpperCase()}
           </span>
           <div className="relative inline-block">
             <div className="absolute -inset-12 bg-brand-cyan/10 blur-[100px] rounded-full opacity-60 -z-10" />
             <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-white leading-[1.1] tracking-tighter drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]">
               {config.name.split(' ')[0]}<br className="md:hidden" />
               <span className="bg-gradient-to-r from-brand-indigo to-brand-cyan text-transparent bg-clip-text">
                 {" " + config.name.split(' ').slice(1).join(' ')}
               </span>
             </h1>
           </div>
        </div>

        {/* Dynamic TypeWriter */}
        <div className="hero-element text-lg md:text-2xl lg:text-3xl font-mono font-bold text-gray-400 mb-10 flex items-center justify-center md:justify-start gap-3 h-8 md:h-12 border-l-2 border-brand-cyan/50 pl-4 bg-white/[0.02] py-2 pr-6 rounded-r-lg">
          <span className="text-brand-cyan hidden sm:inline-block">OP_ROLE</span>
          <span className="text-gray-500 hidden sm:inline-block">::</span>
          <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] tracking-wide">{typeWriterText}</span>
          <span className="animate-pulse text-brand-cyan opacity-80 shadow-[0_0_8px_#06b6d4]">_</span>
        </div>

        {/* Tagline */}
        <p className="hero-element text-base md:text-lg text-gray-400 max-w-2xl mb-12 font-sans leading-relaxed">
           <span className="text-brand-indigo font-mono mr-2 font-bold">»</span>
           {config.tagline}
        </p>

        {/* Call To Actions */}
   

        {/* Social Icons Row */}
        <div className="hero-element flex items-center justify-center md:justify-start gap-4 relative z-50 w-full md:w-auto">
           <div className="text-[10px] font-mono text-gray-500 tracking-widest uppercase mr-2 hidden sm:block border-r border-white/10 pr-4">
             [ UPLINKS ]
           </div>
          
          <a
            href={config.social.github}
            target="_blank"
            rel="noreferrer"
            className="group relative w-12 h-12 bg-[#0a0f18]/80 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-all duration-300 hover:bg-brand-indigo/20 hover:border-brand-indigo/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:-translate-y-1"
            title="GitHub"
          >
            <div className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t border-l border-brand-indigo/0 group-hover:border-brand-indigo transition-colors" />
            <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b border-r border-brand-indigo/0 group-hover:border-brand-indigo transition-colors" />
            <Github
              size={20}
              className="text-gray-400 group-hover:text-brand-indigo transition-colors"
            />
          </a>
          <a
            href={config.social.linkedin}
            target="_blank"
            rel="noreferrer"
            className="group relative w-12 h-12 bg-[#0a0f18]/80 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-all duration-300 hover:bg-brand-cyan/20 hover:border-brand-cyan/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:-translate-y-1"
            title="LinkedIn"
          >
            <div className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t border-l border-brand-cyan/0 group-hover:border-brand-cyan transition-colors" />
            <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b border-r border-brand-cyan/0 group-hover:border-brand-cyan transition-colors" />
            <Linkedin
              size={20}
              className="text-gray-400 group-hover:text-brand-cyan transition-colors"
            />
          </a>

        </div>
      </div>
    </section>
  );
};

export default Hero;
