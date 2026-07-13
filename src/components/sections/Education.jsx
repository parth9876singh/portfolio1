import { useRef, useEffect } from "react";
import { BookOpen, MapPin, Calendar, GraduationCap } from "lucide-react";
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
        { opacity: 0, y: 30 },
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
    <section id="education" ref={sectionRef} className="py-32 relative w-full border-t border-white/5 bg-[#0a0c14] overflow-hidden">
      {/* Floating Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-[-5%] w-[450px] h-[450px] bg-brand-indigo/5 rounded-full blur-[110px] animate-blob" />
        <div className="absolute bottom-1/4 right-[-5%] w-[450px] h-[450px] bg-brand-cyan/5 rounded-full blur-[110px] animate-blob-reverse" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">

        {/* Header Section */}
        <div className="edu-animate flex flex-col items-center text-center mb-20 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center -z-10 opacity-30 pointer-events-none overflow-hidden">
            <span
              className="text-[80px] md:text-[140px] font-black text-transparent whitespace-nowrap"
              style={{ WebkitTextStroke: "2px rgba(6, 182, 212, 0.08)" }}
            >
              ACADEMY
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-5 py-2 bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-xs font-bold rounded-full mb-6 tracking-wide uppercase shadow-[4px_4px_10px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(0,0,0,0.4),inset_3px_3px_6px_rgba(255,255,255,0.05)]">
            <GraduationCap size={14} className="text-brand-cyan" /> ACADEMICS
          </div>

          <h2 className="text-4xl md:text-5xl font-display font-extrabold text-white mb-6 uppercase tracking-wider relative">
            Education <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-indigo">Milestones</span>
          </h2>
        </div>

        {/* Education Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {educationData.map((edu) => {
            const Icon = edu.icon || BookOpen;
            return (
              <div
                key={edu.id}
                className="edu-animate relative group h-full"
              >
                {/* Soft background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/10 to-brand-indigo/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl rounded-[32px]" />

                <div className="relative h-full clay-card p-8 md:p-10 flex flex-col transition-all duration-500 hover:border-brand-cyan/35 z-10">

                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-6 relative z-10 border-b border-white/5 pb-6">
                    <div className="flex items-center gap-5">
                      {/* Bubbly Clay Circle Icon */}
                      <div className="w-14 h-14 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center shadow-[6px_6px_15px_rgba(0,0,0,0.3),inset_-4px_-4px_8px_rgba(0,0,0,0.4),inset_4px_4px_8px_rgba(255,255,255,0.05)] transition-transform duration-500 group-hover:scale-110">
                        <Icon size={24} className="text-brand-cyan drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]" />
                      </div>

                      <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-indigo/10 border border-brand-indigo/20 text-brand-indigo text-[10px] font-bold rounded-full mb-1 uppercase tracking-wider shadow-[inset_1px_1px_2px_rgba(255,255,255,0.05)]">
                          <Calendar size={12} className="text-brand-indigo" /> {edu.duration}
                        </div>
                        <h3 className="text-xl md:text-2xl font-display font-bold text-white tracking-wide group-hover:text-brand-cyan transition-colors">
                          {edu.degree}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex-grow flex flex-col justify-between">
                    <div>
                      <h4 className="text-base md:text-lg font-medium text-gray-200 mb-4 flex items-center gap-2.5">
                        <MapPin size={16} className="text-brand-cyan" /> {edu.institution}
                      </h4>

                      <p className="text-gray-400 text-sm leading-relaxed mb-8 font-sans border-l-2 border-brand-cyan/30 pl-5 group-hover:border-brand-cyan/60 transition-colors duration-300">
                        {edu.description}
                      </p>
                    </div>

                    <div>
                      {/* Data Modules Header */}
                      <div className="flex items-center gap-3 mb-5">
                        <span className="text-xs font-sans text-brand-cyan tracking-wider uppercase font-bold">
                          Course Modules
                        </span>
                        <div className="flex-1 h-[2px] bg-gradient-to-r from-brand-cyan/20 to-transparent rounded-full" />
                      </div>

                      <div className="flex flex-wrap gap-2.5">
                        {edu.coursework.map((course) => (
                          <div
                            key={course}
                            className="text-xs font-medium px-4 py-2 bg-white/5 border border-white/10 text-gray-300 rounded-full hover:bg-brand-cyan/10 hover:border-brand-cyan/30 hover:text-brand-cyan transition-all cursor-default shadow-[2px_2px_6px_rgba(0,0,0,0.2),inset_-2px_-2px_4px_rgba(0,0,0,0.4),inset_2px_2px_4px_rgba(255,255,255,0.05)]"
                          >
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
