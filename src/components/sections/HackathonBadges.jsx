import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Trophy,
  Code2,
  Zap,
  Award,
  Terminal,
  Brain,
  ShieldAlert
} from "lucide-react";
import { SiCplusplus, SiPython } from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { FaC } from "react-icons/fa6";
import { config } from "../../data/config";

gsap.registerPlugin(ScrollTrigger);

const hackathonData = [
  {
    id: 1,
    title: "Code-A-Haunt 2.0",
    organizer: "Coding Blocks LPU",
    level: "State Level",
    result: "Advanced to Round 2",
    date: "Feb 2025",
    icon: Trophy,
    color: "amber",
    verifyURL: "",
    highlights: [
      "Competitive coding hackathon among statewide participants",
      "Advanced beyond initial elimination rounds",
      "Built problem-solving skills under time pressure",
    ],
  },
];

const myBadges = [
  { name: "CPP", icon: SiCplusplus, rating: 5 },
  { name: "Java", icon: FaJava, rating: 3 },
  { name: "Python", icon: SiPython, rating: 3 },
  { name: "C language", icon: FaC, rating: 4 },
  { name: "Problem Solving", icon: Brain, rating: 5 },
];

const HackathonBadges = () => {
  const sectionRef = useRef(null);
  const [activeTab, setActiveTab] = useState("hackerrank");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hb-animate",
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
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hackathon-badges"
      ref={sectionRef}
      className="py-32 relative w-full border-t border-white/5 bg-[#050910] overflow-hidden"
    >
      {/* High-tech Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(#f59e0b 1px, transparent 1px), linear-gradient(90deg, #f59e0b 1px, transparent 1px)",
          backgroundSize: "80px 80px"
        }}
      />

      {/* Glow Orbs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-brand-cyan/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">

        {/* Header Section */}
        <div className="hb-animate flex flex-col items-center text-center mb-16 relative">
          {/* Cyberpunk Decorative Huge Background Text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center -z-10 opacity-30 pointer-events-none overflow-hidden">
            <span
              className="text-[50px] md:text-[80px] lg:text-[130px] font-black text-transparent whitespace-nowrap"
              style={{ WebkitTextStroke: "2px rgba(245, 158, 11, 0.1)" }}
            >
              ACHIEVEMENTS
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 text-amber-500 text-[10px] md:text-xs font-mono font-bold rounded-none mb-6 tracking-widest uppercase relative shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            <div className="absolute -left-[1px] -top-[1px] w-2 h-2 border-t border-l border-amber-500" />
            <div className="absolute -right-[1px] -bottom-[1px] w-2 h-2 border-b border-r border-amber-500" />
            <Terminal size={14} /> SYS.COMPUTE.RANK
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 uppercase tracking-wider relative">
            Hackathons & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Badges</span>
          </h2>
          <p className="text-gray-400 font-sans max-w-2xl text-sm md:text-base border-l-2 border-amber-500/50 pl-4 text-left mx-auto bg-white/[0.02] p-4 rounded-r-lg">
            Competitive programming milestones and hackathon achievement data stored on the global network.
          </p>
        </div>

        {/* Sci-Fi Tab Switcher */}
        <div className="hb-animate flex justify-center mb-16 pb-4">
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { id: "hackerrank", label: "HackerRank", icon: Code2, color: "cyan" },
              { id: "hackathon", label: "Hackathons", icon: Trophy, color: "amber" }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              const isCyan = tab.color === "cyan";

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-5 sm:px-8 py-3 text-[10px] sm:text-xs font-mono tracking-widest uppercase transition-all duration-300 outline-none flex items-center gap-2 group overflow-hidden ${isActive
                      ? isCyan
                        ? "bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                        : "bg-amber-500/20 text-amber-400 border border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                      : "bg-black/40 text-gray-400 border border-white/10 hover:border-white/30 hover:text-white"
                    }`}
                >
                  <div className={`w-1.5 h-1.5 rounded-none transition-colors duration-300 ${isActive
                      ? isCyan ? 'bg-brand-cyan shadow-[0_0_8px_#06b6d4]' : 'bg-amber-400 shadow-[0_0_8px_#f59e0b]'
                      : 'bg-white/20 group-hover:bg-white/50'
                    }`} />

                  <tab.icon size={14} className="group-hover:scale-110 transition-transform" />
                  <span className="relative z-10 font-bold">{tab.label}</span>

                  {/* Scanline on active tab */}
                  {isActive && (
                    <motion.div
                      layoutId="activeHackTabScanline"
                      className={`absolute inset-0 bg-gradient-to-b from-transparent to-transparent w-full h-[200%] ${isCyan ? 'via-brand-cyan/10' : 'via-amber-500/10'}`}
                      animate={{ y: ["-50%", "0%"] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <motion.div layout className="relative">
          <AnimatePresence mode="wait">
            {/* HackerRank Tab */}
            {activeTab === "hackerrank" && (
              <motion.div
                key="hackerrank"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="pt-6 pb-2 border-t border-brand-cyan/20 mt-4 relative">
                  <div className="absolute top-0 left-0 w-8 h-px bg-brand-cyan/80" />

                  <h3 className="text-xl font-mono font-bold text-white mb-10 flex items-center gap-3 tracking-widest uppercase">
                    <Award size={20} className="text-brand-cyan" />
                    [ SYS_BADGES ]
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 relative">
                    {/* Scanline Background */}
                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.6)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none mix-blend-overlay -z-10" />

                    {myBadges.map((badge, i) => {
                      const Icon = badge.icon;
                      return (
                        <div
                          key={i}
                          className="group/badge relative w-full aspect-square cursor-default bg-[#0a0f18]/90 border border-white/10 hover:border-brand-cyan/50 hover:-translate-y-2 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(6,182,212,0.2)]"
                        >
                          {/* Corner Brackets */}
                          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-brand-cyan/30 group-hover/badge:border-brand-cyan transition-colors z-20" />
                          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-brand-cyan/30 group-hover/badge:border-brand-cyan transition-colors z-20" />

                          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                            {/* Inner rotation hover accent */}
                            <div className="absolute inset-4 border border-brand-cyan/5 rotate-45 group-hover/badge:rotate-90 group-hover/badge:border-brand-cyan/20 transition-all duration-700 pointer-events-none" />

                            <Icon
                              size={46}
                              className="mb-4 text-gray-300 group-hover/badge:text-brand-cyan group-hover/badge:drop-shadow-[0_0_15px_rgba(6,182,212,0.8)] relative z-10 transition-all duration-300 group-hover/badge:scale-110"
                            />

                            <span className="font-mono font-bold text-[10px] md:text-xs tracking-widest text-white relative z-10 text-center uppercase group-hover/badge:text-brand-cyan transition-colors">
                              {badge.name}
                            </span>

                            {/* High-Tech Segemented Power Rating */}
                            <div className="flex gap-1 mt-3 relative z-10">
                              {[...Array(5)].map((_, idx) => (
                                <div
                                  key={idx}
                                  className={`w-2.5 h-1 rounded-[1px] transition-colors duration-500 ${idx < badge.rating
                                      ? "bg-brand-cyan shadow-[0_0_5px_rgba(6,182,212,0.8)]"
                                      : "bg-white/10"
                                    }`}
                                />
                              ))}
                            </div>
                          </div>

                          {/* Bottom scanning laser */}
                          <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-cyan group-hover/badge:w-full transition-all duration-500 ease-out z-20" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Hackathon Tab */}
            {activeTab === "hackathon" && (
              <motion.div
                key="hackathon"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="pt-4 pb-2 border-t border-amber-500/20 mt-4 relative">
                  <div className="absolute top-0 left-0 w-8 h-px bg-amber-500/80" />
                </div>

                {hackathonData.map((hack) => {
                  const Icon = hack.icon;
                  return (
                    <div
                      key={hack.id}
                      className="group relative bg-[#0a0f18]/90 backdrop-blur-md border border-white/10 hover:border-amber-500/50 transition-all duration-500 overflow-hidden hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] flex flex-col md:flex-row shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
                    >
                      {/* Left border energy line */}
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-400 to-amber-700 shadow-[0_0_10px_rgba(245,158,11,0.5)] z-20" />

                      {/* Dark grid internal */}
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none -z-0" />

                      {/* Tech Corner Brackets */}
                      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-transparent group-hover:border-amber-500 transition-colors duration-500 z-30 pointer-events-none" />
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-transparent group-hover:border-amber-500 transition-colors duration-500 z-30 pointer-events-none" />

                      <div className="p-8 md:p-10 ml-2 w-full relative z-10 flex flex-col md:flex-row md:items-start gap-8">
                        {/* Icon Block */}
                        <div className="relative p-6 bg-amber-500/5 border border-amber-500/20 w-fit group-hover:bg-amber-500/10 group-hover:border-amber-500/40 transition-colors duration-500 flex-shrink-0">
                          {/* Corner notches for icon block */}
                          <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-amber-500" />
                          <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-amber-500" />
                          <Icon size={36} className="text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-2xl font-display font-bold text-white tracking-widest uppercase group-hover:text-amber-400 transition-colors">
                                  {hack.title}
                                </h3>
                              </div>
                              <p className="text-xs font-mono text-gray-400 tracking-wider">
                                [ OP_ORG ]: <span className="text-white">{hack.organizer}</span>
                              </p>
                            </div>

                            <div className="flex flex-col md:items-end gap-2">
                              <span className="px-3 py-1 text-[10px] font-mono font-bold tracking-widest uppercase bg-amber-500/10 text-amber-500 border border-amber-500/30 w-fit">
                                {hack.level}
                              </span>
                              <p className="text-[10px] font-mono text-gray-500 uppercase">
                                TS: {hack.date}
                              </p>
                            </div>
                          </div>

                          {/* Result badge */}
                          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-mono font-bold uppercase tracking-widest mb-6 shadow-[0_0_10px_rgba(34,197,94,0.1)]">
                            <div className="w-1.5 h-1.5 bg-green-400 shadow-[0_0_5px_#4ade80]" />
                            {hack.result}
                          </div>

                          {/* Highlights */}
                          <ul className="space-y-3">
                            {hack.highlights.map((h, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-3 text-xs md:text-sm font-sans text-gray-300 border-l border-white/5 pl-3 group-hover:border-amber-500/30 transition-colors"
                              >
                                <span className="text-amber-500 font-mono mt-0.5">»</span>
                                {h}
                              </li>
                            ))}
                          </ul>

                          {/* Verify link */}
                          {hack.verifyURL && (
                            <a
                              href={hack.verifyURL}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 mt-8 text-[10px] font-mono font-bold tracking-widest uppercase text-amber-500 hover:text-white transition-colors"
                            >
                              <div className="w-1.5 h-1.5 bg-amber-500 shadow-[0_0_8px_#f59e0b]" /> VALIDATE_PAYLOAD
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* More coming soon */}
                <div className="rounded-none p-8 border border-white/10 bg-[#0a0f18]/80 flex flex-col items-center justify-center text-center gap-4 min-h-40 hover:border-amber-500/30 transition-colors shadow-inner relative overflow-hidden group/empty">
                  {/* Warning Striping */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(245,158,11,0.2)_10px,rgba(245,158,11,0.2)_20px)]" />

                  <ShieldAlert size={32} className="text-amber-500/50 group-hover/empty:text-amber-500 transition-colors" />
                  <p className="text-amber-500/80 font-mono font-bold tracking-widest uppercase text-xs">
                    [ SYS.QUEUE.EMPTY ]
                  </p>
                  <p className="text-[10px] font-mono text-gray-500 uppercase">
                    AWAITING_NEW_OBJECTIVES
                  </p>

                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(245,158,11,0.2)_10px,rgba(245,158,11,0.2)_20px)]" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default HackathonBadges;
