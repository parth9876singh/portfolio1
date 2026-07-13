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
import { projects } from "../../data/projects";

gsap.registerPlugin(ScrollTrigger);

const categories = ["All", "Frontend", "Full Stack"];

const getGradientPlaceholder = (projectId) => {
  const placeholders = {
    2: {
      gradient: "from-orange-500 to-red-500",
      icon: UtensilsCrossed,
      letter: "C",
    },
    3: {
      gradient: "from-purple-500 to-pink-500",
      icon: PenTool,
      letter: "B",
    },
  };
  return (
    placeholders[projectId] || {
      gradient: "from-indigo-500 to-cyan-500",
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
      className="group relative clay-card hover:border-brand-cyan/40 overflow-hidden shadow-[10px_10px_25px_rgba(0,0,0,0.4)] hover:-translate-y-2 flex flex-col h-full z-10"
    >
      {/* Image Container with inner shadow feel */}
      <div className="relative w-full h-56 overflow-hidden bg-[#0d131f] border-b border-white/5 flex-shrink-0 rounded-t-[30px]">
        {/* Soft color overlay */}
        <div className="absolute inset-0 bg-brand-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-80"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 border border-gray-800">
            {IconComponent && (
              <IconComponent size={45} className="text-brand-cyan/30 mb-4 drop-shadow-[0_2px_5px_rgba(6,182,212,0.3)]" />
            )}
            <span className="text-5xl font-display font-black text-white/[0.04] select-none">
              {placeholder.letter}
            </span>
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between z-20">
          <span className="px-3.5 py-1.5 rounded-full text-[10px] font-sans font-bold tracking-wider text-white bg-[#121625]/90 border border-white/10 backdrop-blur-md shadow-[4px_4px_10px_rgba(0,0,0,0.2),inset_-1px_-1px_2px_rgba(255,255,255,0.05)] uppercase">
            {project.category}
          </span>
          {project.status && (
            <span
              className={`text-[10px] px-3.5 py-1.5 rounded-full border font-sans font-bold tracking-wider uppercase shadow-[4px_4px_10px_rgba(0,0,0,0.2),inset_-1px_-1px_2px_rgba(255,255,255,0.05)] ${project.status === "Live" ? "border-green-500/30 text-green-400 bg-green-500/10" : "border-amber-500/30 text-amber-400 bg-amber-500/10"}`}
            >
              {project.status}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 relative z-20 flex flex-col flex-grow">
        <h3 className="text-xl font-display font-extrabold text-white mb-4 group-hover:text-brand-cyan transition-colors tracking-wide uppercase">
          {project.title}
        </h3>

        <p className="text-gray-400 font-sans text-sm mb-6 leading-relaxed border-l-2 border-brand-cyan/30 group-hover:border-brand-cyan/60 pl-4 transition-colors flex-grow">
          {project.description}
        </p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-2 mb-8 mt-auto">
          {(project.techStack || []).map((t, i) => (
            <span
              key={i}
              className="text-[10px] font-sans font-bold uppercase tracking-wider text-brand-cyan/80 bg-white/5 border border-white/5 px-3 py-1.5 rounded-full shadow-[inset_1.5px_1.5px_3px_rgba(255,255,255,0.03)] hover:text-brand-cyan transition-colors cursor-default"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3.5">
          <a
            href={project.githubURL || "#"}
            target="_blank"
            rel="noreferrer"
            className="flex-1 outline-none focus:outline-none"
          >
            <button className="clay-btn w-full px-4 py-3 bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2 font-sans font-bold text-xs uppercase shadow-[4px_4px_10px_rgba(0,0,0,0.3),inset_-3px_-3px_6px_rgba(0,0,0,0.4),inset_3px_3px_6px_rgba(255,255,255,0.05)] cursor-pointer">
              <Github size={14} /> Src Code
            </button>
          </a>
          {project.liveURL && (
            <a
              href={project.liveURL}
              target="_blank"
              rel="noreferrer"
              className="flex-1 outline-none focus:outline-none"
            >
              <button className="clay-btn w-full px-4 py-3 bg-brand-cyan/15 border border-brand-cyan/25 text-brand-cyan hover:bg-brand-cyan/25 hover:text-white transition-all flex items-center justify-center gap-2 font-sans font-bold text-xs uppercase shadow-[4px_4px_10px_rgba(0,0,0,0.25),inset_-3px_-3px_6px_rgba(0,0,0,0.4),inset_3px_3px_6px_rgba(6,182,212,0.15)] cursor-pointer">
                <ExternalLink size={14} /> Launch
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
        { opacity: 0, y: 30 },
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
      className="py-32 relative w-full border-t border-white/5 bg-[#0a0c14] overflow-hidden"
    >
      {/* Floating Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-[-10%] w-[550px] h-[550px] bg-brand-indigo/5 rounded-full blur-[120px] animate-blob" />
        <div className="absolute bottom-1/4 right-[-10%] w-[500px] h-[500px] bg-brand-cyan/5 rounded-full blur-[120px] animate-blob-reverse" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="project-header flex flex-col items-center text-center mb-20 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center -z-10 opacity-30 pointer-events-none overflow-hidden">
            <span
              className="text-[70px] md:text-[100px] lg:text-[140px] font-black text-transparent whitespace-nowrap"
              style={{ WebkitTextStroke: "2px rgba(6, 182, 212, 0.08)" }}
            >
              PROJECTS
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-5 py-2 bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-xs font-bold rounded-full mb-6 tracking-wide uppercase shadow-[4px_4px_10px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(0,0,0,0.4),inset_3px_3px_6px_rgba(255,255,255,0.05)]">
            <Code2 size={14} className="text-brand-cyan" /> DEPLOYMENTS
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 tracking-wider uppercase">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-indigo">Executables</span>
          </h2>
          <p className="text-gray-400 font-sans max-w-2xl text-sm md:text-base border-l-2 border-brand-cyan/40 pl-4 text-left mx-auto bg-white/[0.01] p-4 rounded-[20px]">
            A compilation of application interfaces and web systems I have designed and hosted, combining responsive design principles with robust engineering.
          </p>
        </div>

        {/* Featured Project Card */}
        {featuredProject && (
          <div className="project-header mb-20">
            <FeaturedProjectCard project={featuredProject} />
          </div>
        )}

        {/* Clay Tab Switcher */}
        <div className="project-header flex flex-wrap justify-center gap-3.5 mb-16 pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`relative px-6 py-3 rounded-full text-xs font-bold tracking-wider transition-all duration-300 outline-none flex items-center gap-2 group cursor-pointer ${
                activeTab === cat
                  ? "bg-brand-cyan border border-cyan-400/20 text-[#0a0c14] shadow-[4px_4px_10px_rgba(0,0,0,0.3),inset_-3px_-3px_6px_rgba(0,0,0,0.4),inset_3px_3px_6px_rgba(255,255,255,0.25)]"
                  : "bg-white/5 text-gray-400 border border-white/5 hover:bg-white/10 hover:text-white rounded-full shadow-[inset_2px_2px_4px_rgba(255,255,255,0.05)]"
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${activeTab === cat ? 'bg-[#0a0c14] shadow-[0_0_8px_rgba(0,0,0,0.4)]' : 'bg-white/20 group-hover:bg-brand-cyan/50'} transition-colors duration-300`} />
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>

        {/* Bento Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative"
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
