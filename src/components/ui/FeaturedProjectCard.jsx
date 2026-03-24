import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ExternalLink, Github, Terminal } from "lucide-react";

const FeaturedProjectCard = ({ project }) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.3, 1, 1, 0.3],
  );
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  const cardRef = useRef(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } =
      cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 35;
    const y = -(e.clientY - top - height / 2) / 35;

    cardRef.current.style.transform = `perspective(1200px) rotateX(${y}deg) rotateY(${x}deg) scale3d(1.01, 1.01, 1.01)`;

    mouseX.current = e.clientX - left;
    mouseY.current = e.clientY - top;
    cardRef.current.style.setProperty("--m-x", `${mouseX.current}px`);
    cardRef.current.style.setProperty("--m-y", `${mouseY.current}px`);
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <motion.div
      ref={containerRef}
      style={{ opacity, scale }}
      className="w-full relative group perspective-1000 z-10"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full rounded-xl overflow-hidden border border-white/10 hover:border-brand-cyan/50 transition-all duration-300 ease-out bg-[#0a0f18]/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.8)] hover:shadow-[0_0_50px_rgba(6,182,212,0.2)]"
        style={{
          transformStyle: "preserve-3d",
          "--m-x": "50%",
          "--m-y": "50%",
        }}
      >
        {/* Tech Corner Brackets */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-transparent group-hover:border-brand-cyan transition-colors duration-500 z-40 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-transparent group-hover:border-brand-cyan transition-colors duration-500 z-40 pointer-events-none" />

        {/* Dynamic Interactive Glow */}
        <div
          className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay"
          style={{
            background: `radial-gradient(800px circle at var(--m-x) var(--m-y), rgba(6, 182, 212, 0.15), transparent 40%)`,
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 relative z-10 min-h-[500px]">
          {/* Image Side (7 cols) */}
          <div className="lg:col-span-7 relative min-h-[300px] lg:h-auto overflow-hidden bg-[#050910] flex flex-col items-center justify-center group/image z-0 border-r border-white/5 border-b lg:border-b-0">
            <motion.div
              style={{ y }}
              className="w-full h-full absolute inset-0 origin-center"
            >
              {project.image ? (
                <>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-60 group-hover/image:opacity-80 transition-all duration-700 ease-out group-hover/image:scale-105 filter group-hover/image:contrast-125"
                  />
                  {/* Scanlines over image */}
                  <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] opacity-30 pointer-events-none" />
                  <div className="absolute inset-0 bg-brand-cyan/20 mix-blend-overlay opacity-0 group-hover/image:opacity-100 transition-opacity duration-500 pointer-events-none" />
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
                  className="px-3 py-1.5 rounded-none text-[10px] font-mono tracking-widest uppercase font-bold text-brand-cyan bg-brand-cyan/10 border border-brand-cyan/30 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  [ FEATURED_EXEC ]
                </motion.span>
                <motion.span
                  className="px-3 py-1.5 rounded-none text-[10px] font-mono tracking-widest uppercase font-bold text-brand-indigo bg-brand-indigo/10 border border-brand-indigo/30 backdrop-blur-md flex items-center gap-1.5 shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Terminal size={12} /> SYSTEM_ONLINE
                </motion.span>
              </div>
            </div>
            
            {/* Overlay Gradient to blend with text side */}
            <div className="absolute inset-y-0 right-0 w-8 md:w-16 bg-gradient-to-l from-[#0a0f18] to-transparent hidden lg:block z-30 pointer-events-none" />
          </div>

          {/* Content Side (5 cols) */}
          <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-center bg-transparent relative z-40">
            <div>
              {/* Category + Status */}
              <div className="flex items-center gap-3 mb-6" style={{ transform: "translateZ(30px)" }}>
                <span className="text-brand-cyan font-mono text-[10px] uppercase tracking-widest font-bold">
                  [{project.category}]
                </span>
                <span className="w-8 h-px bg-brand-cyan/30" />
                {project.status && (
                  <span className={`text-[10px] px-2 py-1 border font-mono font-bold tracking-widest uppercase ${project.status === "Live" ? "border-green-500/50 text-green-400 bg-green-500/10" : "border-amber-500/50 text-amber-400 bg-amber-500/10"}`}>
                    {project.status}
                  </span>
                )}
              </div>

              <h3 className="text-3xl lg:text-4xl xl:text-5xl font-display font-bold text-white mb-6 leading-tight break-words tracking-wide uppercase" style={{ transform: "translateZ(40px)" }}>
                {project.title}
              </h3>

              <p className="text-gray-400 font-sans text-sm md:text-base mb-8 leading-relaxed border-l-2 border-brand-cyan/20 pl-4 group-hover:border-brand-cyan/50 transition-colors" style={{ transform: "translateZ(20px)" }}>
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-10" style={{ transform: "translateZ(15px)" }}>
                {(project.techStack || []).map((t, i) => (
                  <span key={i} className="px-2 py-1 bg-brand-cyan/5 border border-brand-cyan/20 font-mono text-[10px] uppercase tracking-widest text-brand-cyan/80 group-hover:text-brand-cyan group-hover:border-brand-cyan/40 transition-colors cursor-default">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 mt-auto" style={{ transform: "translateZ(50px)" }}>
              {project.liveURL && (
                <a href={project.liveURL} target="_blank" rel="noreferrer" className="w-full sm:flex-1 outline-none focus:outline-none group/link">
                  <div className="relative w-full px-6 py-3.5 bg-brand-cyan/10 border border-brand-cyan/40 text-brand-cyan hover:bg-brand-cyan/20 hover:text-white hover:border-brand-cyan transition-all duration-300 flex items-center justify-center gap-3 font-mono text-[11px] tracking-widest uppercase shadow-[0_0_15px_rgba(6,182,212,0.15)] group-hover/link:shadow-[0_0_25px_rgba(6,182,212,0.4)] overflow-hidden">
                     <span className="relative z-10 flex items-center gap-2">INIT_DEPLOY <ExternalLink size={14} /></span>
                  </div>
                </a>
              )}
              <a href={project.githubURL || "#"} target="_blank" rel="noreferrer" className="w-full sm:flex-1 outline-none focus:outline-none hover:-translate-y-1 transition-transform">
                 <div className="w-full px-6 py-3.5 bg-white/5 border border-white/20 text-gray-300 hover:bg-white/10 hover:text-white hover:border-white/30 transition-all duration-300 flex items-center justify-center gap-3 font-mono text-[11px] tracking-widest uppercase shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                   SRC_CODE <Github size={14} />
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
