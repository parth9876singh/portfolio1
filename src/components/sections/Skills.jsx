import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Terminal, Award } from "lucide-react";

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
    <div className="relative w-full aspect-square group cursor-default clay-card flex flex-col items-center justify-center p-4 hover:border-brand-cyan/40 shadow-[10px_10px_25px_rgba(0,0,0,0.4)] hover:-translate-y-2">
      {/* Index Number */}
      <div className="absolute top-3 left-3 text-[10px] font-mono text-gray-500 font-bold">
        {(index + 1).toString().padStart(2, '0')}
      </div>

      {/* Card Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-4">
        
        {/* Puffy 3D icon display */}
        <div className="relative group-hover:scale-110 transition-transform duration-500 flex items-center justify-center w-14 h-14 rounded-full bg-white/5 shadow-[inset_2px_2px_4px_rgba(255,255,255,0.05),4px_4px_10px_rgba(0,0,0,0.3)]">
          {IconComponent ? (
            <IconComponent
              size={32}
              color={skill.color || "#e2e8f0"}
              className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)] group-hover:drop-shadow-[0_0_12px_rgba(6,182,212,0.4)] transition-all duration-300"
            />
          ) : (
            <div className="w-[32px] h-[32px] bg-white/10 rounded-full" />
          )}
        </div>

        <div className="flex flex-col items-center gap-2.5">
          <h3 className="font-sans font-bold text-gray-200 text-xs text-center tracking-wider group-hover:text-brand-cyan transition-colors">
            {skill.name}
          </h3>

          {/* Liquid Clay Progress Bar */}
          <div className="w-16 h-2 bg-black/40 rounded-full p-[1.5px] shadow-[inset_2px_2px_4px_rgba(0,0,0,0.5)] overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-brand-indigo to-brand-cyan rounded-full transition-all duration-500 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.2)]" 
              style={{ width: `${(segments / 4) * 100}%` }}
            />
          </div>
        </div>
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
        { opacity: 0, y: 30 },
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
      className="py-32 relative z-10 w-full min-h-screen border-t border-white/5 bg-[#0a0c14] overflow-hidden"
    >
      {/* Floating Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/3 left-[-5%] w-[450px] h-[450px] bg-brand-indigo/5 rounded-full blur-[110px] animate-blob" />
        <div className="absolute bottom-1/3 right-[-5%] w-[450px] h-[450px] bg-brand-cyan/5 rounded-full blur-[110px] animate-blob-reverse" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">

        {/* Header */}
        <div className="skills-animate flex flex-col items-center text-center mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center -z-10 opacity-30 pointer-events-none overflow-hidden">
            <span
              className="text-[60px] md:text-[80px] lg:text-[120px] font-black text-transparent whitespace-nowrap"
              style={{ WebkitTextStroke: "2px rgba(99, 102, 241, 0.08)" }}
            >
              TECHNOLOGY
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-5 py-2 bg-brand-indigo/10 border border-brand-indigo/20 text-brand-indigo text-xs font-bold rounded-full mb-6 tracking-wide uppercase shadow-[4px_4px_10px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(0,0,0,0.4),inset_3px_3px_6px_rgba(255,255,255,0.05)]">
            <Award size={14} className="text-brand-indigo" /> TECH STACK
          </div>

          <h2 className="text-4xl md:text-5xl font-display font-extrabold text-white mb-6 uppercase tracking-wider">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-indigo to-brand-cyan">Inventory</span>
          </h2>

          <p className="text-gray-400 max-w-xl font-sans text-sm md:text-base border-l-2 border-brand-indigo/40 pl-4 text-left mx-auto bg-white/[0.01] p-4 rounded-[20px]">
            A compilation of frameworks, languages, and technical protocols I leverage to deploy optimized code structures.
          </p>
        </div>

        {/* Clay Pills Tabs */}
        <div className="skills-animate flex flex-wrap justify-center gap-3.5 mb-16 pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`relative px-6 py-3 rounded-full text-xs font-bold tracking-wider transition-all duration-300 outline-none flex items-center gap-2 group cursor-pointer ${
                activeTab === cat
                  ? "bg-brand-indigo border border-indigo-400/20 text-white shadow-[4px_4px_10px_rgba(0,0,0,0.3),inset_-3px_-3px_6px_rgba(0,0,0,0.4),inset_3px_3px_6px_rgba(255,255,255,0.15)]"
                  : "bg-white/5 text-gray-400 border border-white/5 hover:bg-white/10 hover:text-white rounded-full shadow-[inset_2px_2px_4px_rgba(255,255,255,0.05)]"
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${activeTab === cat ? 'bg-white shadow-[0_0_8px_#fff]' : 'bg-white/20 group-hover:bg-brand-indigo/50'} transition-colors duration-300`} />
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>

        {/* Bouncy skill tiles */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 relative"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => (
              <motion.div
                layout
                key={skill.id || skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
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
