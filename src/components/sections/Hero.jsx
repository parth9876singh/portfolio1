import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Github, Code2, Linkedin, ChevronRight, User } from "lucide-react";
import ParticleField from "../ui/ParticleField";
import useTypewriter from "../../hooks/useTypewriter";
import { config } from "../../data/config";

const NoiseOverlay = () => (
  <div
    className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none"
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
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.2,
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
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-[#0a0c14]"
    >
      {/* 3D Particle Field background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
            <ParticleField count={6000} />
          </Canvas>
        </Suspense>
      </div>

      {/* Claymorphic Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[500px] h-[500px] rounded-full bg-brand-indigo/15 blur-[120px] animate-blob" />
        <div className="absolute bottom-[20%] right-[-5%] w-[450px] h-[450px] rounded-full bg-brand-cyan/10 blur-[130px] animate-blob-reverse" />
      </div>

      <NoiseOverlay />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 w-full flex flex-col items-center md:items-start text-center md:text-left pt-20">
        
        {/* Availability Clay Badge */}
        {config.availability && (
          <div className="hero-element mb-8 inline-flex items-center gap-3 px-5 py-2.5 bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold rounded-full shadow-[6px_6px_15px_rgba(0,0,0,0.3),inset_-4px_-4px_8px_rgba(0,0,0,0.4),inset_4px_4px_8px_rgba(255,255,255,0.05)]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500 shadow-[0_0_8px_#22c55e]"></span>
            </span>
            {config.availabilityText}
          </div>
        )}

        {/* Hello Tag */}
        <div className="hero-element flex flex-col items-center md:items-start mb-6">
           <span className="text-brand-cyan/80 font-sans text-xs font-bold tracking-widest uppercase mb-3 flex items-center gap-2">
              <User size={14} className="text-brand-cyan" /> WELCOME TO MY PORTFOLIO
           </span>
           <div className="relative inline-block">
             <div className="absolute -inset-10 bg-brand-cyan/10 blur-[100px] rounded-full opacity-65 -z-10" />
             <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-white leading-[1.1] tracking-tight drop-shadow-[0_4px_10px_rgba(0,0,0,0.3)]">
               {config.name.split(' ')[0]}<br className="md:hidden" />
               <span className="bg-gradient-to-r from-brand-indigo to-brand-cyan text-transparent bg-clip-text ml-0 md:ml-4">
                 {config.name.split(' ').slice(1).join(' ')}
               </span>
             </h1>
           </div>
        </div>

        {/* Bubbly Role display */}
        <div className="hero-element text-lg md:text-2xl font-sans font-bold text-gray-300 mb-8 flex items-center justify-center md:justify-start gap-2.5 py-3 px-6 bg-white/5 border border-white/10 rounded-full shadow-[4px_4px_10px_rgba(0,0,0,0.3),inset_-3px_-3px_6px_rgba(0,0,0,0.4),inset_3px_3px_6px_rgba(255,255,255,0.05)]">
          <span className="text-brand-cyan">I'm a</span>
          <span className="text-white bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{typeWriterText}</span>
          <span className="animate-pulse text-brand-cyan font-black">|</span>
        </div>

        {/* Tagline */}
        <p className="hero-element text-base md:text-lg text-gray-400 max-w-2xl mb-10 font-sans leading-relaxed">
           {config.tagline}
        </p>

        {/* Call To Actions - Clay Buttons */}
        <div className="hero-element flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto mb-14 relative z-50">
          <button
            onClick={handleScrollToProjects}
            className="clay-btn group relative inline-flex items-center justify-center px-10 py-4.5 bg-gradient-to-r from-brand-indigo to-indigo-500 border border-indigo-400/30 text-white font-bold text-sm tracking-wider uppercase w-full sm:w-auto outline-none focus:outline-none"
          >
            <span className="relative z-10 flex items-center gap-3">
              Explore Projects <ChevronRight size={18} className="group-hover:translate-x-1.5 transition-transform duration-300" />
            </span>
          </button>
        </div>

        {/* Social Spheres */}
        <div className="hero-element flex items-center justify-center md:justify-start gap-4 relative z-50 w-full md:w-auto">
          <a
            href={config.social.github}
            target="_blank"
            rel="noreferrer"
            className="group w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:scale-110 active:scale-95 hover:border-brand-indigo/40 hover:bg-brand-indigo/10 transition-all duration-300 shadow-[4px_4px_12px_rgba(0,0,0,0.3),inset_-3px_-3px_6px_rgba(0,0,0,0.4),inset_3px_3px_6px_rgba(255,255,255,0.05)]"
            title="GitHub"
          >
            <Github
              size={22}
              className="text-gray-300 group-hover:text-brand-indigo transition-colors duration-300"
            />
          </a>
          <a
            href={config.social.linkedin}
            target="_blank"
            rel="noreferrer"
            className="group w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:scale-110 active:scale-95 hover:border-brand-cyan/40 hover:bg-brand-cyan/10 transition-all duration-300 shadow-[4px_4px_12px_rgba(0,0,0,0.3),inset_-3px_-3px_6px_rgba(0,0,0,0.4),inset_3px_3px_6px_rgba(255,255,255,0.05)]"
            title="LinkedIn"
          >
            <Linkedin
              size={22}
              className="text-gray-300 group-hover:text-brand-cyan transition-colors duration-300"
            />
          </a>
          <a
            href={config.social.leetcode || "https://hackerrank.com/"}
            target="_blank"
            rel="noreferrer"
            className="group w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:scale-110 active:scale-95 hover:border-green-400/40 hover:bg-green-500/10 transition-all duration-300 shadow-[4px_4px_12px_rgba(0,0,0,0.3),inset_-3px_-3px_6px_rgba(0,0,0,0.4),inset_3px_3px_6px_rgba(255,255,255,0.05)]"
            title="HackerRank"
          >
            <Code2
              size={22}
              className="text-gray-300 group-hover:text-green-400 transition-colors duration-300"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
