import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ExternalLink, Github, Sparkles } from "lucide-react";

const FeaturedProjectCard = ({ project }) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.3, 1, 1, 0.3],
  );
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 0.96]);

  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } =
      cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 40;
    const y = -(e.clientY - top - height / 2) / 40;

    // Smooth 3D tilt interaction which works great with puffy clay shapes
    cardRef.current.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <motion.div
      ref={containerRef}
      style={{ opacity, scale }}
      className="w-full relative group z-10"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full clay-card overflow-hidden hover:border-brand-cyan/40 shadow-[12px_12px_40px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 relative z-10 min-h-[500px]">
          {/* Image Side (7 cols) */}
          <div className="lg:col-span-7 relative min-h-[320px] lg:h-auto overflow-hidden bg-[#0d131f] flex flex-col items-center justify-center group/image z-0 border-r border-white/5 border-b lg:border-b-0 rounded-t-[34px] lg:rounded-tr-none lg:rounded-l-[34px]">
            <motion.div
              style={{ y }}
              className="w-full h-full absolute inset-0 origin-center"
            >
              {project.image ? (
                <>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-60 group-hover/image:opacity-80 transition-all duration-700 ease-out group-hover/image:scale-105"
                  />
                  {/* Puffy cyan overlay on hover */}
                  <div className="absolute inset-0 bg-brand-cyan/15 opacity-0 group-hover/image:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
                  <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}>
                     <span className="text-[200px] md:text-[300px] font-black text-white/[0.03]">?</span>
                  </motion.div>
                </div>
              )}
            </motion.div>

            {/* Top Badges over image */}
            <div className="absolute top-6 left-6 right-6 flex justify-between z-40">
              <div className="flex flex-wrap gap-2">
                <motion.span
                  className="px-4 py-2 rounded-full text-xs font-bold text-brand-cyan bg-[#121625]/90 border border-brand-cyan/20 backdrop-blur-md shadow-[4px_4px_10px_rgba(0,0,0,0.3),inset_-2px_-2px_4px_rgba(0,0,0,0.4),inset_2px_2px_4px_rgba(255,255,255,0.05)] flex items-center gap-1.5"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Sparkles size={12} className="text-brand-cyan animate-pulse" /> Featured Project
                </motion.span>
              </div>
            </div>
            
            {/* Soft blend overlay to text side */}
            <div className="absolute inset-y-0 right-0 w-8 md:w-16 bg-gradient-to-l from-[#121625]/30 to-transparent hidden lg:block z-30 pointer-events-none" />
          </div>

          {/* Content Side (5 cols) */}
          <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-center bg-transparent relative z-40">
            <div>
              {/* Category + Status */}
              <div className="flex items-center gap-3.5 mb-6" style={{ transform: "translateZ(20px)" }}>
                <span className="text-brand-cyan font-sans text-xs font-bold tracking-wider uppercase">
                  {project.category}
                </span>
                <span className="w-6 h-[2px] bg-brand-cyan/25 rounded-full" />
                {project.status && (
                  <span className={`text-[10px] px-3 py-1 rounded-full border font-bold tracking-wider uppercase shadow-[inset_1px_1px_2px_rgba(255,255,255,0.05)] ${project.status === "Live" ? "border-green-500/30 text-green-400 bg-green-500/10" : "border-amber-500/30 text-amber-400 bg-amber-500/10"}`}>
                    {project.status}
                  </span>
                )}
              </div>

              <h3 className="text-3xl lg:text-4xl font-display font-extrabold text-white mb-6 leading-tight break-words uppercase" style={{ transform: "translateZ(30px)" }}>
                {project.title}
              </h3>

              <p className="text-gray-400 font-sans text-sm leading-relaxed mb-8 border-l-2 border-brand-cyan/30 pl-4 group-hover:border-brand-cyan/60 transition-colors duration-300" style={{ transform: "translateZ(10px)" }}>
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2.5 mb-10" style={{ transform: "translateZ(10px)" }}>
                {(project.techStack || []).map((t, i) => (
                  <span key={i} className="px-3.5 py-1.5 bg-white/5 border border-white/5 font-sans text-[10px] font-bold uppercase tracking-wider text-brand-cyan/85 rounded-full shadow-[inset_1.5px_1.5px_3px_rgba(255,255,255,0.03)] transition-colors cursor-default">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 mt-auto" style={{ transform: "translateZ(40px)" }}>
              {project.liveURL && (
                <a href={project.liveURL} target="_blank" rel="noreferrer" className="w-full sm:flex-1 outline-none focus:outline-none">
                  <div className="clay-btn relative w-full px-6 py-4 bg-brand-cyan border border-brand-cyan/20 text-[#0a0c14] font-bold text-xs md:text-sm tracking-wider uppercase hover:shadow-[0_6px_20px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2 cursor-pointer">
                     <span>Launch App</span> <ExternalLink size={14} />
                  </div>
                </a>
              )}
              <a href={project.githubURL || "#"} target="_blank" rel="noreferrer" className="w-full sm:flex-1 outline-none focus:outline-none">
                 <div className="clay-btn w-full px-6 py-4 bg-white/5 border border-white/10 text-white hover:bg-white/10 font-bold text-xs md:text-sm tracking-wider uppercase shadow-[4px_4px_10px_rgba(0,0,0,0.3),inset_-3px_-3px_6px_rgba(0,0,0,0.4),inset_3px_3px_6px_rgba(255,255,255,0.05)] flex items-center justify-center gap-2 cursor-pointer">
                   <span>Source Code</span> <Github size={14} />
                 </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedProjectCard;
