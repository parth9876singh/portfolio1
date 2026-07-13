import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Trophy, Code2, Award } from "lucide-react";
import { achievements } from "../../data/achievements";

const getAchievementConfig = (id) => {
  const configs = {
    1: {
      clayClass: "clay-card-amber hover:border-orange-500/40",
      badge: "DSA",
      badgeColor: "bg-orange-500/10 border-orange-500/20 text-orange-400 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.05)]",
      icon: Code2,
      iconBg: "bg-orange-500/15 border-orange-500/25 shadow-[inset_1.5px_1.5px_3px_rgba(255,255,255,0.15)]",
      iconColor: "text-orange-400",
      metric: "200+",
    },
    2: {
      clayClass: "clay-card-indigo hover:border-brand-indigo/40",
      badge: "Hackathon",
      badgeColor: "bg-brand-indigo/10 border-brand-indigo/20 text-brand-indigo shadow-[inset_1px_1px_2px_rgba(255,255,255,0.05)]",
      icon: Trophy,
      iconBg: "bg-brand-indigo/15 border-brand-indigo/25 shadow-[inset_1.5px_1.5px_3px_rgba(255,255,255,0.15)]",
      iconColor: "text-brand-indigo",
      stateTag: "State Level",
    },
  };
  return configs[id] || configs[1];
};

const Achievements = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".achieve-card",
        { opacity: 0, scale: 0.9, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: ".achieve-grid",
            start: "top 80%",
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="py-32 px-6 lg:px-12 relative w-full bg-[#0a0c14] overflow-hidden"
    >
      {/* Floating Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-brand-cyan/5 rounded-full blur-[110px] animate-blob" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-indigo/5 rounded-full blur-[110px] animate-blob-reverse" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center -z-10 opacity-30 pointer-events-none overflow-hidden">
            <span
              className="text-[60px] md:text-[100px] lg:text-[140px] font-black text-transparent whitespace-nowrap"
              style={{ WebkitTextStroke: "2px rgba(6, 182, 212, 0.08)" }}
            >
              MILESTONES
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-5 py-2 bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-xs font-bold rounded-full mb-6 tracking-wide uppercase shadow-[4px_4px_10px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(0,0,0,0.4),inset_3px_3px_6px_rgba(255,255,255,0.05)]">
            <Award size={14} className="text-brand-cyan" /> KEY RECOGNITIONS
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            Key <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-indigo">Milestones</span>
          </h2>
          <p className="text-gray-300 font-sans max-w-2xl text-base border-l-2 border-brand-cyan/40 pl-4 text-left mx-auto bg-white/[0.01] p-4 rounded-[20px]">
            Recognitions, competitive development achievements, and project growth milestones.
          </p>
        </div>

        {/* Grid layout - 3 columns */}
        <div className="achieve-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((item) => {
            const config = getAchievementConfig(item.id);
            const Icon = config.icon;

            return (
              <a
                key={item.id}
                href={item.verifyURL || undefined}
                target={item.verifyURL ? "_blank" : undefined}
                rel={item.verifyURL ? "noreferrer" : undefined}
                className={`achieve-card relative group p-6 md:p-8 transition-all duration-300 flex flex-col justify-between border border-white/5 shadow-[10px_10px_25px_rgba(0,0,0,0.4)] ${config.clayClass} ${item.verifyURL ? "cursor-pointer" : "cursor-default"}`}
              >
                <div className="flex flex-col h-full justify-between">
                  {/* Top Section */}
                  <div>
                    {/* Badge */}
                    <div
                      className={`inline-block px-4 py-1.5 rounded-full border text-xs font-semibold mb-4 ${config.badgeColor}`}
                    >
                      {config.badge || config.stateTag}
                    </div>

                    {/* Metric (for LeetCode) */}
                    {config.metric && (
                      <div className="mb-4">
                        <div className="text-5xl font-display font-black text-orange-400 leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                          {config.metric}
                        </div>
                        <p className="text-[10px] font-sans text-gray-400 mt-1.5 uppercase font-bold tracking-wider">
                          problems solved
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Middle Section */}
                  <div className="my-6 flex-grow">
                    {/* Rounded Circle Icon Container */}
                    <div
                      className={`p-4 w-14 h-14 rounded-full border mb-4 flex items-center justify-center shadow-[4px_4px_10px_rgba(0,0,0,0.3)] ${config.iconBg} transition-transform duration-500 group-hover:scale-110`}
                    >
                      <Icon size={24} className={config.iconColor} />
                    </div>

                    <h3 className="text-xl font-display font-extrabold text-white mb-2 leading-snug">
                      {item.title}
                    </h3>

                    {config.stateTag && (
                      <span className="inline-block text-[10px] font-bold text-amber-300 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full uppercase tracking-wider shadow-[inset_1px_1px_2px_rgba(255,255,255,0.05)] mt-1.5">
                        {config.stateTag}
                      </span>
                    )}

                    <p className="text-xs font-sans font-bold text-gray-500 mt-2">
                      {item.issuer}
                    </p>
                    <p className="text-[10px] font-mono text-gray-400 mt-1">
                      {item.date}
                    </p>
                  </div>

                  {/* Bottom Section */}
                  <div>
                    {item.description && (
                      <p className="text-xs text-gray-400 mt-4 leading-relaxed border-t border-white/5 pt-4">
                        {item.description}
                      </p>
                    )}
                    {item.verifyURL && (
                      <span className="text-[10px] font-sans text-brand-cyan font-bold tracking-widest uppercase transition-all inline-flex items-center gap-1.5 mt-4 px-4 py-2 bg-brand-cyan/10 border border-brand-cyan/20 rounded-full shadow-[inset_1px_1px_2px_rgba(255,255,255,0.05)] hover:bg-brand-cyan hover:text-[#0a0c14] hover:shadow-[0_4px_12px_rgba(6,182,212,0.2)]">
                        View Details
                      </span>
                    )}
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
