import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Download,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Code2,
  Award,
  Terminal,
  Database
} from "lucide-react";
import { config } from "../../data/config";

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  {
    icon: Briefcase,
    label: "Experience",
    value: "Training & Projects",
    color: "text-brand-cyan",
    clayClass: "clay-card-cyan hover:border-brand-cyan/40",
  },
  {
    icon: GraduationCap,
    label: "Education",
    value: "B.Tech CSE",
    color: "text-brand-indigo",
    clayClass: "clay-card-indigo hover:border-brand-indigo/40",
  },
  {
    icon: Code2,
    label: "Focus",
    value: "Full Stack (MERN)",
    color: "text-emerald-400",
    clayClass: "clay-card-emerald hover:border-emerald-400/40",
  },
  {
    icon: Award,
    label: "Problems",
    value: "250+ Algorithms",
    color: "text-amber-400",
    clayClass: "clay-card-amber hover:border-amber-400/40",
  },
];

const Resume = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".resume-animate",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        },
      );

      // Gentle floating animation for datapad logo
      gsap.to(".resume-float", {
        y: -8,
        repeat: -1,
        yoyo: true,
        duration: 2.2,
        ease: "sine.inOut",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const resumeURL = "/documents/Parth_SinghCV.pdf";

  return (
    <section
      id="resume"
      ref={sectionRef}
      className="py-32 relative w-full border-t border-white/5 bg-[#0a0c14] overflow-hidden"
    >
      {/* Floating Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-brand-cyan/5 rounded-full blur-[100px] animate-blob" />
        <div className="absolute top-1/3 right-0 -translate-y-1/2 w-[450px] h-[450px] bg-brand-indigo/5 rounded-full blur-[120px] animate-blob-reverse" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="resume-animate flex flex-col items-center text-center mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center -z-10 opacity-30 pointer-events-none overflow-hidden">
            <span 
              className="text-[60px] md:text-[100px] lg:text-[140px] font-black text-transparent whitespace-nowrap" 
              style={{ WebkitTextStroke: "2px rgba(99, 102, 241, 0.08)" }}
            >
              RESUME
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-5 py-2 bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-xs font-bold rounded-full mb-6 tracking-wide uppercase shadow-[4px_4px_10px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(0,0,0,0.4),inset_3px_3px_6px_rgba(255,255,255,0.05)]">
            <Terminal size={14} className="text-brand-cyan" /> MY DOSSIER
          </div>

          <h2 className="text-4xl md:text-5xl font-display font-extrabold text-white mb-6 uppercase tracking-wider relative">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-indigo to-brand-cyan">Snapshots</span>
          </h2>
          <p className="text-gray-400 font-sans max-w-xl text-sm md:text-base border-l-2 border-brand-indigo/40 pl-4 text-left mx-auto bg-white/[0.01] p-4 rounded-[20px]">
            A summary of my academic progress and engineering credentials. Download the full CV below for detailed operations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center xl:px-8">
          
          {/* Left – Clay Datapad */}
          <div className="resume-animate flex justify-center relative">
            <div className="relative group w-full max-w-[340px] md:max-w-[360px]">
              {/* Soft background glow */}
              <div className="absolute -inset-4 bg-gradient-to-br from-brand-indigo/10 via-brand-cyan/10 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              {/* Clay Datapad */}
              <div className="relative w-full h-[29rem] md:h-[31rem] clay-card p-8 flex flex-col items-center justify-between overflow-hidden hover:border-brand-cyan/35">
                
                {/* Floating Core Indicator */}
                <div className="resume-float relative mt-6 z-10">
                  <div className="relative w-28 h-28 flex items-center justify-center rounded-full bg-[#121625] border border-white/10 shadow-[8px_8px_20px_rgba(0,0,0,0.4),inset_-6px_-6px_12px_rgba(0,0,0,0.5),inset_6px_6px_12px_rgba(255,255,255,0.08)]">
                    <Database size={36} className="text-brand-cyan drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]" />
                  </div>
                </div>

                {/* Name & Role */}
                <div className="text-center z-10 w-full mt-auto mb-6 flex flex-col items-center">
                  <h3 className="text-2xl font-display font-extrabold text-white tracking-wide mb-2">
                    {config.name}
                  </h3>
                  <div className="px-4 py-1.5 bg-brand-cyan/10 border border-brand-cyan/20 rounded-full shadow-[inset_2px_2px_4px_rgba(255,255,255,0.05)]">
                    <p className="text-[10px] font-sans font-bold text-brand-cyan tracking-widest uppercase">
                      {config.role}
                    </p>
                  </div>

                  {/* Horizontal Divider */}
                  <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-white/15 to-transparent my-6 relative">
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-[#121625] border border-brand-cyan/30" />
                  </div>
                </div>

                {/* Clay Mini-stats */}
                <div className="flex justify-between items-center w-full z-10 px-2 pb-2">
                  <div className="flex flex-col items-center w-1/3">
                    <p className="text-2xl font-display font-extrabold text-brand-cyan mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                      5+
                    </p>
                    <p className="text-[9px] text-gray-500 uppercase tracking-wider font-bold">
                      Projects
                    </p>
                  </div>
                  <div className="w-[1.5px] h-8 bg-white/10 rounded-full" />
                  <div className="flex flex-col items-center w-1/3">
                    <p className="text-2xl font-display font-extrabold text-brand-indigo mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                      250+
                    </p>
                    <p className="text-[9px] text-gray-500 uppercase tracking-wider font-bold">
                      Algos
                    </p>
                  </div>
                  <div className="w-[1.5px] h-8 bg-white/10 rounded-full" />
                  <div className="flex flex-col items-center w-1/3">
                    <p className="text-2xl font-display font-extrabold text-emerald-400 mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                      {config.cgpa}
                    </p>
                    <p className="text-[9px] text-gray-500 uppercase tracking-wider font-bold">
                      CGPA
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right – Highlights + Buttons */}
          <div className="flex flex-col gap-8 lg:pl-4">
            {/* Highlight Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((item, i) => (
                <div
                  key={i}
                  className={`resume-animate group relative p-5 ${item.clayClass} rounded-[24px] border transition-all duration-300 flex flex-col gap-2.5 shadow-[8px_8px_20px_rgba(0,0,0,0.3)]`}
                >
                  <div className="flex items-center gap-3 relative z-10">
                     <item.icon size={18} className={`${item.color}`} />
                     <p className="text-[10px] text-gray-400 flex-1 font-bold uppercase tracking-wider">
                       {item.label}
                     </p>
                  </div>
                  
                  <p className="text-sm font-sans font-bold text-white relative z-10 mt-1 uppercase tracking-wide">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="resume-animate flex flex-col sm:flex-row gap-4 mt-4 relative z-20">
              <a
                href={resumeURL}
                download
                className="clay-btn group relative flex items-center justify-center gap-3 px-8 py-4.5 bg-brand-cyan border border-brand-cyan/20 text-[#0a0c14] font-bold text-xs md:text-sm tracking-wider uppercase hover:shadow-[0_6px_20px_rgba(6,182,212,0.4)] w-full sm:w-auto outline-none"
              >
                <Download size={18} className="relative z-10 group-hover:-translate-y-0.5 transition-transform duration-300" />
                <span className="relative z-10">Download CV</span>
              </a>

              <a
                href={resumeURL}
                target="_blank"
                rel="noreferrer"
                className="clay-btn group relative flex items-center justify-center gap-3 px-8 py-4.5 bg-white/5 border border-white/10 text-white font-bold text-xs md:text-sm tracking-wider uppercase hover:bg-white/10 shadow-[4px_4px_10px_rgba(0,0,0,0.3),inset_-3px_-3px_6px_rgba(0,0,0,0.4),inset_3px_3px_6px_rgba(255,255,255,0.05)] w-full sm:w-auto outline-none"
              >
                <ExternalLink size={18} className="relative z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                <span className="relative z-10">View Online</span>
              </a>
            </div>

            {/* Subtle note */}
            <p className="resume-animate text-[10px] font-sans font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2 border-t border-white/5 pt-4">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan/50 animate-pulse" />
              Sync Source: cv_secure // updated_2026
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Resume;
