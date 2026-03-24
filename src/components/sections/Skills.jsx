import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Terminal } from "lucide-react";

// Import specific icons
import {
  SiCplusplus,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiGit,
  SiGithub,
  SiPostman,
} from "react-icons/si";
import { FaJava, FaBrain, FaUsers, FaTasks } from "react-icons/fa";
import { FaC, FaPeopleArrows } from "react-icons/fa6";

import { skills } from "../../data/skills";

// Map string names from data to actual React components
const iconMap = {
  FaJava,
  SiCplusplus,
  FaC,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiGit,
  SiGithub,
  SiPostman,
  FaBrain,
  FaUsers,
  FaPeopleArrows,
  FaTasks,
};

const categories = [
  "All",
  "Languages",
  "Frameworks",
  "Tools/Platforms",
  "Soft Skills",
];

const getLevelSegments = (level) => {
  switch (level) {
    case "Expert": return 4;
    case "Advanced": return 3;
    case "Intermediate": return 2;
    case "Beginner":
    default: return 1;
  }
};

const SkillCard = ({ skill, index }) => {
  const IconComponent = iconMap[skill.icon];
  const segments = getLevelSegments(skill.level);

  return (
    <div className="relative w-full aspect-square group cursor-default">
      {/* Target Crosshair Corners */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-brand-cyan/20 group-hover:border-brand-cyan transition-colors duration-300 z-20" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-brand-cyan/20 group-hover:border-brand-cyan transition-colors duration-300 z-20" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-brand-cyan/20 group-hover:border-brand-cyan transition-colors duration-300 z-20" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-brand-cyan/20 group-hover:border-brand-cyan transition-colors duration-300 z-20" />

      {/* Outer Sci-fi Container */}
      <div className="absolute inset-0 bg-[#0a0f18]/80 backdrop-blur-md border border-white/5 group-hover:border-brand-cyan/40 transition-all duration-500 flex flex-col items-center justify-center p-4 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] group-hover:-translate-y-2">

        {/* Animated Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:10px_10px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {/* Floating Hexagon Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border border-brand-cyan/10 rotate-45 group-hover:rotate-90 group-hover:border-brand-cyan/30 group-hover:bg-brand-cyan/5 transition-all duration-700 ease-out z-0" />

        {/* Index Number */}
        <div className="absolute top-2 left-2 text-[10px] font-mono text-brand-cyan/30 group-hover:text-brand-cyan/80 transition-colors">
          {(index + 1).toString().padStart(2, '0')}
        </div>

        {/* Card Content */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-4">

          <div className="relative group-hover:scale-110 transition-transform duration-500">
            {IconComponent ? (
              <IconComponent
                size={40}
                color={skill.color || "#e2e8f0"} // fallback
                className="drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] group-hover:drop-shadow-[0_0_15px_rgba(6,182,212,0.6)] transition-all duration-300"
              />
            ) : (
              <div className="w-[40px] h-[40px] bg-white/10 rounded-sm outline outline-1 outline-white/20" />
            )}
          </div>

          <div className="flex flex-col items-center gap-2">
            <h3 className="font-mono font-bold text-gray-200 text-[10px] sm:text-[11px] md:text-xs text-center tracking-widest uppercase group-hover:text-brand-cyan transition-colors">
              {skill.name}
            </h3>

            {/* Segmented Power Bar */}
            <div className="flex gap-1 mt-1">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`w-3 sm:w-4 h-1 rounded-[1px] transition-colors duration-500 ${i < segments
                      ? "bg-brand-cyan/70 shadow-[0_0_5px_rgba(6,182,212,0.8)]"
                      : "bg-white/10"
                    }`}
                />
              ))}
            </div>

          </div>
        </div>

        {/* Bottom glowing accent line */}
        <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-cyan group-hover:w-full transition-all duration-500 ease-out" />
      </div>
    </div>
  );
};

const Skills = () => {
  const [activeTab, setActiveTab] = useState("All");
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".skills-animate",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
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

  const filteredSkills = skills.filter((skill) =>
    activeTab === "All"
      ? true
      : skill.category.toLowerCase() === activeTab.toLowerCase(),
  );

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-32 relative z-10 w-full min-h-screen border-t border-white/5 bg-[#050910] overflow-hidden"
    >
      {/* High-tech Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)",
          backgroundSize: "80px 80px"
        }}
      />

      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-indigo/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">

        {/* Header */}
        <div className="skills-animate flex flex-col items-center text-center mb-16 relative">
          {/* Cyberpunk Decorative Huge Background Text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center -z-10 opacity-30 pointer-events-none overflow-hidden">
            <span
              className="text-[60px] md:text-[80px] lg:text-[120px] font-black text-transparent whitespace-nowrap"
              style={{ WebkitTextStroke: "2px rgba(99, 102, 241, 0.1)" }}
            >
              TECHNOLOGY
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-indigo/10 border border-brand-indigo/30 text-brand-indigo text-xs font-mono font-bold rounded-none mb-6 tracking-widest uppercase shadow-[0_0_15px_rgba(99,102,241,0.2)] relative">
            <div className="absolute -left-[1px] -top-[1px] w-2 h-2 border-t border-l border-brand-indigo" />
            <div className="absolute -right-[1px] -bottom-[1px] w-2 h-2 border-b border-r border-brand-indigo" />
            <Terminal size={14} /> SYS.CORE.MODULES
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 uppercase tracking-wider">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-indigo to-brand-cyan">Matrix</span>
          </h2>

          <p className="text-gray-400 max-w-xl font-sans text-sm md:text-base border-l-2 border-brand-indigo/50 pl-4 text-left mx-auto md:mx-0 bg-white/[0.02] p-4 rounded-r-lg">
            Curated selection of technologies and protocols I employ to architect scalable, high-performance systems.
          </p>
        </div>

        {/* Interactive Tabs - Sci-Fi Style */}
        <div className="skills-animate flex flex-wrap justify-center gap-3 mb-16 pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`relative px-4 sm:px-6 py-2 sm:py-3 text-[10px] sm:text-xs md:text-sm font-mono tracking-widest uppercase transition-all duration-300 outline-none flex items-center gap-2 group overflow-hidden ${activeTab === cat
                  ? "bg-brand-indigo/20 text-brand-indigo border border-brand-indigo/50 shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                  : "bg-black/40 text-gray-400 border border-white/10 hover:border-brand-indigo/30 hover:text-white"
                }`}
            >
              <div className={`w-1.5 h-1.5 rounded-none ${activeTab === cat ? 'bg-brand-indigo shadow-[0_0_8px_#6366f1]' : 'bg-white/20 group-hover:bg-brand-indigo/50'} transition-colors duration-300`} />
              <span className="relative z-10">{cat}</span>

              {/* Scanline on active tab */}
              {activeTab === cat && (
                <motion.div
                  layoutId="activeTabScanline"
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-indigo/10 to-transparent w-full h-[200%]"
                  animate={{ y: ["-50%", "0%"] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Grid with Grid specific animations */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 relative"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => (
              <motion.div
                layout
                key={skill.id || skill.name}
                initial={{ opacity: 0, scale: 0.8, filter: "brightness(0.5)" }}
                animate={{ opacity: 1, scale: 1, filter: "brightness(1)" }}
                exit={{ opacity: 0, scale: 0.8, filter: "brightness(0)" }}
                transition={{
                  layout: { type: "spring", stiffness: 300, damping: 25 },
                  opacity: { duration: 0.2 }
                }}
                className="w-full"
              >
                <SkillCard skill={skill} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
