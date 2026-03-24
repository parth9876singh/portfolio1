import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Download,
  FileText,
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
    bgColor: "bg-brand-cyan/5 border-brand-cyan/30",
    hoverColor: "group-hover:bg-brand-cyan/20 group-hover:border-brand-cyan",
  },
  {
    icon: GraduationCap,
    label: "Education",
    value: "B.Tech CSE",
    color: "text-brand-indigo",
    bgColor: "bg-brand-indigo/5 border-brand-indigo/30",
    hoverColor: "group-hover:bg-brand-indigo/20 group-hover:border-brand-indigo",
  },
  {
    icon: Code2,
    label: "Focus",
    value: "Full Stack (MERN)",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/5 border-emerald-500/30",
    hoverColor: "group-hover:bg-emerald-500/20 group-hover:border-emerald-500",
  },

];

const Resume = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".resume-animate",
        { opacity: 0, y: 40 },
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

      // Holographic floating animation for data core
      gsap.to(".resume-float", {
        y: -10,
        repeat: -1,
        yoyo: true,
        duration: 2.5,
        ease: "sine.inOut",
      });

      // Rotate data core rings
      gsap.to(".resume-ring", {
        rotate: 360,
        repeat: -1,
        duration: 10,
        ease: "linear",
      });
      gsap.to(".resume-ring-reverse", {
        rotate: -360,
        repeat: -1,
        duration: 15,
        ease: "linear",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const resumeURL = "/documents/Parth_SinghCV.pdf";

  return (
    <section
      id="resume"
      ref={sectionRef}
      className="py-32 relative w-full border-t border-white/5 bg-[#050910] overflow-hidden"
    >
      {/* High-tech Background Grid Layer */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage: "linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }}
      />

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-cyan/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">

        {/* Header */}
        <div className="resume-animate flex flex-col items-center text-center mb-16 relative">
          {/* Cyberpunk Decorative Huge Background Text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center -z-10 opacity-30 pointer-events-none overflow-hidden">
            <span
              className="text-[60px] md:text-[100px] lg:text-[140px] font-black text-transparent whitespace-nowrap"
              style={{ WebkitTextStroke: "2px rgba(6, 182, 212, 0.1)" }}
            >
              DOSSIER
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan text-xs font-mono font-bold rounded-none mb-6 tracking-widest uppercase relative shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <div className="absolute -left-[1px] -top-[1px] w-2 h-2 border-t border-l border-brand-cyan" />
            <div className="absolute -right-[1px] -bottom-[1px] w-2 h-2 border-b border-r border-brand-cyan" />
            <Terminal size={14} /> SYS.DOC.RESUME
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 uppercase tracking-wider relative">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-indigo to-brand-cyan">Resume.</span>
          </h2>
          <p className="text-gray-400 font-sans max-w-2xl text-sm md:text-base border-l-2 border-brand-cyan/50 pl-4 text-left mx-auto bg-white/[0.02] p-4 rounded-r-lg">
            System snapshot of operational parameters, acquired skills, and project history. Select download to access full secure PDF block.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center xl:px-8">

          {/* Left – Visual Data Pad */}
          <div className="resume-animate flex justify-center relative perspective-[1000px]">
            <div className="relative group w-full max-w-[320px] md:max-w-[360px]">
              {/* Outer glow */}
              <div className="absolute -inset-4 bg-gradient-to-br from-brand-indigo/30 via-brand-cyan/20 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              {/* Holographic Datapad */}
              <div className="relative w-full h-[28rem] md:h-[32rem] bg-[#0a0f18]/90 backdrop-blur-md border border-white/10 group-hover:border-brand-cyan/50 transition-all duration-500 flex flex-col items-center justify-between p-8 overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.8)]">

                {/* Scanline Background */}
                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] opacity-30 pointer-events-none mix-blend-overlay z-0" />

                {/* Tech Corner Brackets */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-brand-cyan/40 group-hover:border-brand-cyan transition-colors z-20 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-brand-indigo/40 group-hover:border-brand-indigo transition-colors z-20 pointer-events-none" />

                <div className="absolute top-0 right-0 w-24 h-24 border-t border-r border-white/5 bg-[linear-gradient(135deg,transparent_50%,rgba(255,255,255,0.02)_50%)] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-24 h-24 border-b border-l border-white/5 bg-[linear-gradient(-45deg,transparent_50%,rgba(255,255,255,0.02)_50%)] pointer-events-none" />

                {/* Floating doc icon container */}
                <div className="resume-float relative mt-6 z-10">
                  <div className="relative w-28 h-28 flex items-center justify-center">
                    {/* Holographic Rings */}
                    <div className="resume-ring absolute inset-0 rounded-full border border-dashed border-brand-cyan/30" />
                    <div className="resume-ring-reverse absolute -inset-2 rounded-full border border-brand-indigo/20 border-t-brand-cyan shadow-[0_0_15px_rgba(6,182,212,0.2)]" />

                    <div className="w-16 h-16 rounded-none bg-brand-cyan/10 border border-brand-cyan/50 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)] rotate-45 group-hover:rotate-0 transition-transform duration-700">
                      <Database size={32} className="text-brand-cyan -rotate-45 group-hover:rotate-0 transition-transform duration-700" />
                    </div>
                  </div>

                  {/* Glowing overlapping dot */}
                  <div className="absolute -bottom-4 -right-4 bg-[#0a0f18] p-2 rounded-none z-20 border border-brand-indigo/30">
                    <div className="w-2 h-2 rounded-none bg-brand-indigo shadow-[0_0_10px_rgba(99,102,241,1)] animate-pulse" />
                  </div>
                </div>

                {/* Name & Role */}
                <div className="text-center z-10 w-full mt-auto mb-6 flex flex-col items-center">
                  <h3 className="text-2xl font-mono font-bold text-white tracking-widest uppercase mb-2 group-hover:text-brand-cyan transition-colors drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">
                    {config.name}
                  </h3>
                  <div className="px-3 py-1 bg-brand-cyan/10 border border-brand-cyan/30 w-fit">
                    <p className="text-[10px] font-mono text-brand-cyan font-bold tracking-widest uppercase">
                      [ {config.role} ]
                    </p>
                  </div>

                  {/* Horizontal Divider */}
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-6 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 border border-brand-cyan rotate-45 bg-[#0a0f18]" />
                  </div>
                </div>

                {/* Mini stats */}
                <div className="flex justify-between items-center w-full z-10 px-2 pb-2">
                  <div className="flex flex-col items-center w-1/3 group/stat">
                    <p className="text-2xl font-mono font-bold text-brand-cyan mb-1 drop-shadow-[0_0_5px_rgba(6,182,212,0.8)] glow-cyan">
                      5+
                    </p>
                    <p className="text-[8px] text-brand-cyan/70 uppercase tracking-widest font-mono">
                      PROJECTS
                    </p>
                  </div>
                  <div className="w-px h-8 bg-brand-indigo/30" />
                  <div className="flex flex-col items-center w-1/3 group/stat">
                    <p className="text-2xl font-mono font-bold text-brand-indigo mb-1 drop-shadow-[0_0_5px_rgba(99,102,241,0.8)] glow-indigo">
                      250+
                    </p>
                    <p className="text-[8px] text-brand-indigo/70 uppercase tracking-widest font-mono">
                      PROBLEM SOLVED
                    </p>
                  </div>
                  <div className="w-px h-8 bg-emerald-500/30" />
                  <div className="flex flex-col items-center w-1/3 group/stat">
                    <p className="text-2xl font-mono font-bold text-emerald-400 mb-1 drop-shadow-[0_0_5px_rgba(52,211,153,0.8)] glow-emerald">
                      {config.cgpa}
                    </p>
                    <p className="text-[8px] text-emerald-400/70 uppercase tracking-widest font-mono">
                      CGPA
                    </p>
                  </div>
                </div>

                {/* Shimmer / Laser Sweep */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-cyan/10 to-transparent -translate-y-full group-hover:animate-[shimmerY_2s_infinite] pointer-events-none z-30" />
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
                  className={`resume-animate group relative p-5 bg-[#0a0f18]/80 border ${item.bgColor} ${item.hoverColor} transition-all duration-300 overflow-hidden flex flex-col gap-3 shadow-[0_4px_15px_rgba(0,0,0,0.3)]`}
                >
                  {/* Left Accent Strip */}
                  <div className={`absolute top-0 left-0 bottom-0 w-1 ${item.color.replace('text-', 'bg-')} opacity-50 group-hover:opacity-100 shadow-[0_0_10px_currentColor]`} />

                  {/* Tech Background Grid Lines */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none -z-0" />

                  <div className="flex items-center gap-3 relative z-10">
                    <item.icon size={18} className={`${item.color} drop-shadow-[0_0_8px_currentColor]`} />
                    <p className="text-[10px] text-gray-400 flex-1 font-mono uppercase tracking-widest">
                      {item.label}
                    </p>
                  </div>

                  <p className={`text-sm font-mono font-bold text-white relative z-10 mt-1 uppercase tracking-wide group-hover:${item.color} transition-colors`}>
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
                className="group relative flex items-center justify-center gap-3 px-8 py-4 font-mono font-bold text-xs md:text-sm tracking-widest uppercase transition-all duration-300 overflow-hidden bg-brand-cyan/20 border border-brand-cyan text-brand-cyan hover:bg-brand-cyan hover:text-[#050910] shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] w-full sm:w-auto outline-none"
              >
                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white group-hover:border-[#050910] transition-colors" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white group-hover:border-[#050910] transition-colors" />

                <Download size={18} className="relative z-10 group-hover:-translate-y-1 transition-transform" />
                <span className="relative z-10">INIT_DOWNLOAD</span>

                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              </a>

              <a
                href={resumeURL}
                target="_blank"
                rel="noreferrer"
                className="group relative flex items-center justify-center gap-3 px-8 py-4 font-mono font-bold text-xs md:text-sm tracking-widest uppercase transition-all duration-300 overflow-hidden bg-[#0a0f18]/80 border border-white/20 text-white hover:border-brand-indigo hover:bg-brand-indigo/10 hover:text-brand-indigo shadow-[0_4px_15px_rgba(0,0,0,0.3)] hover:shadow-[0_0_25px_rgba(99,102,241,0.3)] w-full sm:w-auto outline-none"
              >
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-brand-indigo/0 group-hover:border-brand-indigo transition-colors" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-brand-indigo/0 group-hover:border-brand-indigo transition-colors" />

                <ExternalLink size={18} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                <span className="relative z-10">EXEC_VIEW</span>
              </a>
            </div>

            {/* Subtle note */}
            <p className="resume-animate text-[10px] font-mono text-gray-500 uppercase tracking-widest flex items-center gap-2 border-t border-white/5 pt-4">
              <span className="w-1.5 h-1.5 bg-brand-cyan/50 animate-pulse" />
              [ SYS_LOG ]: LAST_SYNC: 2026_03 // FORMAT: PDF_SECURE
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Resume;
