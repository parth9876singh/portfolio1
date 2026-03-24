import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ExternalLink,
  Github,
  UtensilsCrossed,
  PenTool,
  Terminal,
  Code2
} from "lucide-react";
import FeaturedProjectCard from "../ui/FeaturedProjectCard";

gsap.registerPlugin(ScrollTrigger);

import { projects } from "../../data/projects";

const categories = ["All", "Frontend", "Full Stack"];

const getGradientPlaceholder = (projectId) => {
  const placeholders = {
    2: {
      gradient: "from-orange-600 via-red-500 to-orange-600",
      icon: UtensilsCrossed,
      letter: "C",
    },
    3: {
      gradient: "from-purple-600 via-indigo-500 to-pink-600",
      icon: PenTool,
      letter: "B",
    },
  };
  return (
    placeholders[projectId] || {
      gradient: "from-indigo-600 via-cyan-500 to-indigo-600",
      icon: null,
      letter: "?",
    }
  );
};

const RegularProjectCard = ({ project }) => {
  const placeholder = getGradientPlaceholder(project.id);
  const IconComponent = placeholder.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="group relative bg-[#0a0f18]/80 backdrop-blur-md border border-white/10 hover:border-brand-cyan/50 transition-all duration-500 overflow-hidden hover:-translate-y-2 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] z-10 flex flex-col h-full"
    >
      {/* Decor Corners */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-transparent group-hover:border-brand-cyan transition-colors duration-500 z-30 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-transparent group-hover:border-brand-cyan transition-colors duration-500 z-30 pointer-events-none" />

      {/* Image Container */}
      <div className="relative w-full h-56 overflow-hidden bg-[#0d131f] border-b border-white/5 flex-shrink-0">
        <div className="absolute inset-0 bg-brand-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none mix-blend-overlay" />

        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-90 filter group-hover:contrast-125"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 border border-gray-800">
            {IconComponent && (
              <IconComponent size={50} className="text-brand-cyan/40 mb-4 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
            )}
            <span className="text-6xl font-display font-black text-white/[0.05]">
              {placeholder.letter}
            </span>
          </div>
        )}

        {/* Scanline overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.6)_50%)] bg-[length:100%_4px] opacity-[0.35] z-10 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between z-20">
          <span className="px-3 py-1 text-[9px] sm:text-[10px] font-mono tracking-widest font-bold text-white border border-white/20 bg-black/60 backdrop-blur-md uppercase">
            {project.category}
          </span>
          {project.status && (
            <span
              className={`text-[9px] sm:text-[10px] px-3 py-1 border font-mono font-bold tracking-widest uppercase ${project.status === "Live" ? "border-green-500/50 text-green-400 bg-green-500/10 shadow-[0_0_10px_rgba(34,197,94,0.2)]" : "border-amber-500/50 text-amber-400 bg-amber-500/10 shadow-[0_0_10px_rgba(245,158,11,0.2)]"}`}
            >
              {project.status}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 relative z-20 flex flex-col flex-grow">
        <h3 className="text-xl font-display font-bold text-white mb-4 group-hover:text-brand-cyan transition-colors tracking-wide uppercase">
          {project.title}
        </h3>

        <p className="text-gray-400 font-sans text-sm mb-6 leading-relaxed border-l-2 border-white/10 group-hover:border-brand-cyan/50 pl-4 transition-colors flex-grow">
          {project.description}
        </p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-2 mb-8 mt-auto">
          {(project.techStack || []).map((t, i) => (
            <span
              key={i}
              className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-brand-cyan/80 bg-brand-cyan/5 border border-brand-cyan/20 px-2 py-1 hover:bg-brand-cyan/10 hover:text-brand-cyan hover:border-brand-cyan/40 transition-colors cursor-default"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <a
            href={project.githubURL || "#"}
            target="_blank"
            rel="noreferrer"
            className="flex-1 group/btn outline-none focus:outline-none"
          >
            <button className="w-full px-0 py-3 rounded-none bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 flex items-center justify-center gap-2 font-mono text-[10px] sm:text-[11px] tracking-widest uppercase shadow-[0_0_15px_rgba(255,255,255,0.05)]">
              <Github size={14} /> SRC
            </button>
          </a>
          {project.liveURL && (
            <a
              href={project.liveURL}
              target="_blank"
              rel="noreferrer"
              className="flex-1 group/btn outline-none focus:outline-none"
            >
              <button className="w-full px-0 py-3 rounded-none bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan hover:bg-brand-cyan/20 hover:border-brand-cyan/50 transition-all duration-300 flex items-center justify-center gap-2 font-mono text-[10px] sm:text-[11px] tracking-widest uppercase shadow-[0_0_15px_rgba(6,182,212,0.15)] group-hover/btn:shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                <ExternalLink size={14} /> LAUNCH
              </button>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [activeTab, setActiveTab] = useState("All");
  const sectionRef = useRef(null);

  const featuredProject = projects.find((p) => p.featured);
  const regularProjects = projects.filter(
    (p) =>
      !p.featured &&
      (activeTab === "All" ||
        p.category.toLowerCase().replace(" ", "") ===
        activeTab.toLowerCase().replace(" ", "")),
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-header",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-32 relative w-full border-t border-white/5 bg-[#050910] overflow-hidden"
    >
      {/* High-tech Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(#06b6d4 1px, transparent 1px), linear-gradient(90deg, #06b6d4 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }}
      />

      {/* Background Glow Blobs */}
      <div className="absolute top-40 -left-60 w-[800px] h-[800px] bg-brand-indigo/10 rounded-full blur-[150px] opacity-40 pointer-events-none -z-10" />
      <div className="absolute bottom-40 -right-60 w-[800px] h-[800px] bg-brand-cyan/10 rounded-full blur-[150px] opacity-30 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="project-header flex flex-col items-center text-center mb-24 relative">

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center -z-10 opacity-30 pointer-events-none overflow-hidden">
            <span
              className="text-[70px] md:text-[100px] lg:text-[140px] font-black text-transparent whitespace-nowrap"
              style={{ WebkitTextStroke: "2px rgba(6, 182, 212, 0.1)" }}
            >
              DEPLOYMENTS
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan text-xs font-mono font-bold rounded-none mb-6 tracking-widest uppercase shadow-[0_0_15px_rgba(6,182,212,0.2)] relative">
            <div className="absolute -left-[1px] -top-[1px] w-2 h-2 border-t border-l border-brand-cyan" />
            <div className="absolute -right-[1px] -bottom-[1px] w-2 h-2 border-b border-r border-brand-cyan" />
            <Terminal size={14} /> SYS.APP.DEPL
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 tracking-wider uppercase">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-indigo">Executables</span>
          </h2>
          <p className="text-gray-400 font-sans max-w-2xl text-sm md:text-base border-l-2 border-brand-cyan/50 pl-4 text-left mx-auto bg-white/[0.02] p-4 rounded-r-lg">
            A selection of my best deployed applications. Balancing highly scalable system architecture with premium user interfaces.
          </p>
        </div>

        {/* Cinematic Featured Project */}
        {featuredProject && (
          <div className="project-header mb-16">
            <FeaturedProjectCard project={featuredProject} />
          </div>
        )}

        {/* Interactive Tabs - Sci-Fi Style */}
        <div className="project-header flex flex-wrap justify-center gap-3 mb-16 pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`relative px-5 sm:px-8 py-2 sm:py-3 text-[10px] sm:text-xs md:text-sm font-mono tracking-widest uppercase transition-all duration-300 outline-none flex items-center gap-2 group overflow-hidden ${activeTab === cat
                  ? "bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                  : "bg-black/40 text-gray-400 border border-white/10 hover:border-brand-cyan/30 hover:text-white"
                }`}
            >
              <div className={`w-1.5 h-1.5 rounded-none ${activeTab === cat ? 'bg-brand-cyan shadow-[0_0_8px_#06b6d4]' : 'bg-white/20 group-hover:bg-brand-cyan/50'} transition-colors duration-300`} />
              <span className="relative z-10">{cat}</span>

              {/* Scanline on active tab */}
              {activeTab === cat && (
                <motion.div
                  layoutId="activeProjTabScanline"
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-cyan/10 to-transparent w-full h-[200%]"
                  animate={{ y: ["-50%", "0%"] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Bento Grid layout for regular projects */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 xl:gap-10 relative"
        >
          <AnimatePresence mode="popLayout">
            {regularProjects.map((project) => (
              <RegularProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
