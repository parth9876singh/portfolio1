import { useRef, useEffect } from "react";
import { BookOpen, MapPin, Calendar, Cpu, Hexagon } from "lucide-react";
import { educationData } from "../../data/education";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".edu-animate",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="education" ref={sectionRef} className="py-32 relative w-full border-t border-white/5 bg-[#050910] overflow-hidden">
      {/* High-tech Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(#06b6d4 1px, transparent 1px), linear-gradient(90deg, #06b6d4 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }}
      />

      {/* Glow Orbs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-brand-cyan/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-brand-indigo/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">

        {/* Header Section */}
        <div className="edu-animate flex flex-col items-center text-center mb-24 relative">
          {/* Cyberpunk Decorative Huge Background Text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center -z-10 opacity-30 pointer-events-none overflow-hidden">
            <span
              className="text-[80px] md:text-[140px] font-black text-transparent whitespace-nowrap"
              style={{ WebkitTextStroke: "2px rgba(6, 182, 212, 0.1)" }}
            >
              ACADEMY
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan text-xs font-mono font-bold rounded-none mb-6 tracking-widest uppercase relative shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <div className="absolute -left-[1px] -top-[1px] w-2 h-2 border-t border-l border-brand-cyan" />
            <div className="absolute -right-[1px] -bottom-[1px] w-2 h-2 border-b border-r border-brand-cyan" />
            <Cpu size={14} /> SYS.DB.EDU
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 uppercase tracking-wider relative">
            Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-indigo">Data</span>
          </h2>
        </div>

        {/* Education Timeline / Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {educationData.map((edu, index) => {
            const Icon = edu.icon || BookOpen;
            return (
              <div
                key={edu.id}
                className="edu-animate relative group h-full"
              >
                {/* Sci-fi Hover Glow Card */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/20 to-brand-indigo/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl rounded-xl" />

                <div className="relative h-full bg-[#0a0f18]/80 backdrop-blur-md border border-white/10 group-hover:border-brand-cyan/50 p-8 md:p-10 flex flex-col transition-all duration-500 shadow-[0_0_30px_rgba(0,0,0,0.5)] z-10 overflow-hidden">

                  {/* Hexagon Background Watermark */}
                  <Hexagon className="absolute -bottom-16 -right-16 w-80 h-80 text-brand-cyan/[0.02] group-hover:text-brand-cyan/[0.06] transition-colors duration-700 -rotate-15 stroke-[0.3]" />

                  {/* Cyberpunk Corners */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-transparent group-hover:border-brand-cyan transition-colors duration-500" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-transparent group-hover:border-brand-indigo transition-colors duration-500" />

                  {/* Header / Meta */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-8 gap-6 relative z-10 border-b border-white/5 pb-8">
                    <div className="flex items-center gap-5">
                      {/* Sci-fi Diamond Icon */}
                      <div className="relative w-14 h-14 flex flex-shrink-0 items-center justify-center">
                        <div className="absolute inset-0 bg-brand-cyan/10 border border-brand-cyan/40 rotate-45 group-hover:rotate-90 group-hover:bg-brand-cyan/20 transition-all duration-700 ease-out shadow-[0_0_15px_rgba(6,182,212,0.2)]" />
                        <Icon size={24} className="text-brand-cyan z-10 drop-shadow-[0_0_5px_rgba(6,182,212,0.8)]" />
                      </div>

                      <div>
                        <div className="text-xs font-mono text-brand-indigo mb-2 flex items-center gap-2 tracking-widest uppercase font-bold">
                          <Calendar size={14} className="text-brand-cyan" /> {edu.duration}
                        </div>
                        <h3 className="text-2xl font-display font-bold text-white tracking-wide group-hover:text-brand-cyan transition-colors">
                          {edu.degree}
                        </h3>
                      </div>
                    </div>


                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex-grow">
                    <h4 className="text-lg font-medium text-gray-200 mb-5 flex items-center gap-3">
                      <MapPin size={18} className="text-brand-cyan" /> {edu.institution}
                    </h4>

                    <p className="text-gray-400 text-sm leading-relaxed mb-8 font-sans border-l-2 border-white/10 pl-5 group-hover:border-brand-cyan/50 transition-colors">
                      {edu.description}
                    </p>

                    <div>
                      {/* Cool Data Modules Header */}
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-1.5 h-1.5 bg-brand-cyan shadow-[0_0_5px_rgba(6,182,212,0.8)]" />
                        <span className="text-xs font-mono text-brand-cyan tracking-widest uppercase font-bold drop-shadow-[0_0_5px_rgba(6,182,212,0.4)]">
                          Data Modules
                        </span>
                        <div className="flex-1 h-px bg-gradient-to-r from-brand-cyan/30 to-transparent" />
                      </div>

                      <div className="flex flex-wrap gap-2.5">
                        {edu.coursework.map((course, idx) => (
                          <div
                            key={course}
                            className="text-[11px] font-mono px-3 py-1.5 bg-black/60 border border-white/10 text-gray-300 group-hover:border-brand-cyan/40 hover:!border-brand-cyan hover:!bg-brand-cyan/10 hover:text-brand-cyan transition-all cursor-default"
                          >
                            <span className="text-brand-cyan/50 mr-1.5">[{idx + 1}]</span>
                            {course}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Education;
