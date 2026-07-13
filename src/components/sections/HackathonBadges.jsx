import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Trophy,
  Code2,
  Award,
  Terminal,
  Brain,
  ShieldAlert
} from "lucide-react";
import { SiCplusplus, SiPython } from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { FaC } from "react-icons/fa6";

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
      className="py-32 relative w-full border-t border-white/5 bg-[#0a0c14] overflow-hidden"
    >
      {/* Floating Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[550px] h-[550px] bg-brand-cyan/5 rounded-full blur-[110px] animate-blob" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-indigo/5 rounded-full blur-[110px] animate-blob-reverse" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Header Section */}
        <div className="hb-animate flex flex-col items-center text-center mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center -z-10 opacity-30 pointer-events-none overflow-hidden">
            <span 
              className="text-[50px] md:text-[80px] lg:text-[130px] font-black text-transparent whitespace-nowrap" 
              style={{ WebkitTextStroke: "2px rgba(245, 158, 11, 0.08)" }}
            >
              ACHIEVEMENTS
            </span>
          </div>
          
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold rounded-full mb-6 tracking-wide uppercase shadow-[4px_4px_10px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(0,0,0,0.4),inset_3px_3px_6px_rgba(255,255,255,0.05)]">
            <Terminal size={14} className="text-amber-500" /> BADGES & RANKS
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 uppercase tracking-wider relative">
            Hackathons & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Badges</span>
          </h2>
          <p className="text-gray-400 font-sans max-w-2xl text-sm md:text-base border-l-2 border-amber-500/40 pl-4 text-left mx-auto bg-white/[0.01] p-4 rounded-[20px]">
            Competitive programming credentials and hackathon participation history.
          </p>
        </div>

        {/* Clay Tab Switcher */}
        <div className="hb-animate flex justify-center mb-16 pb-4">
          <div className="flex flex-wrap justify-center gap-3.5">
            {[
              { id: "hackerrank", label: "HackerRank", icon: Code2, activeClass: "bg-brand-cyan border-cyan-400/25 text-[#0a0c14] shadow-[4px_4px_10px_rgba(0,0,0,0.3),inset_-3px_-3px_6px_rgba(0,0,0,0.4),inset_3px_3px_6px_rgba(255,255,255,0.25)]" },
              { id: "hackathon", label: "Hackathons", icon: Trophy, activeClass: "bg-amber-500 border-amber-400/25 text-[#0a0c14] shadow-[4px_4px_10px_rgba(0,0,0,0.3),inset_-3px_-3px_6px_rgba(0,0,0,0.4),inset_3px_3px_6px_rgba(255,255,255,0.25)]" }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-6 py-3 rounded-full text-xs font-bold tracking-wider transition-all duration-300 outline-none flex items-center gap-2 group cursor-pointer ${
                    isActive
                      ? tab.activeClass
                      : "bg-white/5 text-gray-400 border border-white/5 hover:bg-white/10 hover:text-white rounded-full shadow-[inset_2px_2px_4px_rgba(255,255,255,0.05)]"
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    isActive ? 'bg-[#0a0c14] shadow-[0_0_8px_rgba(0,0,0,0.4)]' : 'bg-white/20 group-hover:bg-white/50'
                  }`} />
                  
                  <tab.icon size={14} className="group-hover:scale-110 transition-transform" />
                  <span className="relative z-10">{tab.label}</span>
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
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="pt-6 pb-2 border-t border-white/5 mt-4 relative">
                  <h3 className="text-lg font-sans font-bold text-white mb-10 flex items-center gap-2.5 uppercase tracking-wide">
                    <Award size={20} className="text-brand-cyan" />
                    Acquired Badges
                  </h3>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {myBadges.map((badge, i) => {
                      const Icon = badge.icon;
                      return (
                        <div
                          key={i}
                          className="group/badge relative w-full aspect-square clay-card-cyan flex flex-col items-center justify-center p-4 hover:-translate-y-2 transition-all duration-300 shadow-[8px_8px_20px_rgba(0,0,0,0.4)] cursor-default"
                        >
                          <div className="absolute inset-3 rounded-[24px] bg-brand-cyan/5 opacity-0 group-hover/badge:opacity-100 transition-opacity pointer-events-none" />

                          {/* Bouncy Circle Icon Container */}
                          <div className="w-14 h-14 rounded-full bg-[#121625] border border-white/10 flex items-center justify-center shadow-[4px_4px_10px_rgba(0,0,0,0.3),inset_-3px_-3px_6px_rgba(0,0,0,0.4),inset_3px_3px_6px_rgba(255,255,255,0.08)] mb-4 transition-transform duration-500 group-hover/badge:scale-105">
                            <Icon
                              size={28}
                              className="text-gray-300 group-hover/badge:text-brand-cyan group-hover/badge:drop-shadow-[0_2px_5px_rgba(6,182,212,0.4)] transition-all duration-300"
                            />
                          </div>
                          
                          <span className="font-sans font-bold text-xs tracking-wide text-white group-hover/badge:text-brand-cyan transition-colors">
                            {badge.name}
                          </span>
                          
                          {/* Segmented Soft Dots Rating */}
                          <div className="flex gap-1.5 mt-3">
                            {[...Array(5)].map((_, idx) => (
                              <div 
                                key={idx} 
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-500 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.2)] ${
                                  idx < badge.rating 
                                    ? "bg-yellow-400 shadow-[0_0_6px_#facc15]" 
                                    : "bg-white/10"
                                }`}
                              />
                            ))}
                          </div>
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
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                 <div className="pt-4 pb-2 border-t border-white/5 mt-4" />

                {hackathonData.map((hack) => {
                  const Icon = hack.icon;
                  return (
                    <div
                      key={hack.id}
                      className="group relative clay-card-amber hover:border-amber-500/40 transition-all duration-500 hover:-translate-y-1.5 flex flex-col md:flex-row shadow-[12px_12px_35px_rgba(0,0,0,0.5)] p-8 md:p-10 z-10 w-full gap-8"
                    >
                      {/* Bouncy Circle Icon Block */}
                      <div className="relative p-5 rounded-full bg-amber-500/10 border border-amber-500/20 w-fit h-fit flex-shrink-0 transition-transform duration-500 group-hover:scale-110 shadow-[inset_2px_2px_4px_rgba(255,255,255,0.05),4px_4px_10px_rgba(0,0,0,0.3)]">
                        <Icon size={32} className="text-amber-400 drop-shadow-[0_2px_5px_rgba(245,158,11,0.4)]" />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
                          <div>
                            <h3 className="text-2xl font-display font-extrabold text-white tracking-wide uppercase group-hover:text-amber-400 transition-colors">
                              {hack.title}
                            </h3>
                            <p className="text-xs font-semibold text-gray-400 mt-1">
                              Organized by: <span className="text-white">{hack.organizer}</span>
                            </p>
                          </div>
                          
                          <div className="flex flex-col md:items-end gap-2">
                             <span className="px-3.5 py-1.5 text-[10px] font-bold tracking-wider uppercase bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-full shadow-[inset_1px_1px_2px_rgba(255,255,255,0.05)]">
                               {hack.level}
                             </span>
                             <p className="text-[10px] font-sans text-gray-500 font-semibold uppercase">
                               Date: {hack.date}
                             </p>
                          </div>
                        </div>

                        {/* Result badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold rounded-full mb-6 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.05)] uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                          {hack.result}
                        </div>

                        {/* Highlights */}
                        <ul className="space-y-3">
                          {hack.highlights.map((h, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-3 text-xs md:text-sm font-sans text-gray-300 border-l border-white/5 pl-3 group-hover:border-amber-500/30 transition-colors duration-300"
                            >
                              <span className="text-amber-500 font-bold">»</span>
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
                            className="inline-flex items-center gap-2 mt-8 text-[10px] font-sans font-bold tracking-widest uppercase text-amber-500 hover:text-white transition-colors"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Validate Payload
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* More coming soon */}
                <div className="rounded-[32px] p-8 border border-dashed border-white/20 bg-white/[0.01] flex flex-col items-center justify-center text-center gap-4 min-h-40 hover:border-amber-500/30 transition-all shadow-[inset_3px_3px_6px_rgba(0,0,0,0.4)]">
                  <ShieldAlert size={30} className="text-amber-500/50" />
                  <p className="text-amber-500/80 font-sans font-bold tracking-wider uppercase text-xs">
                    Queue Empty
                  </p>
                  <p className="text-[10px] font-sans text-gray-500 font-semibold uppercase">
                    Awaiting New Hackathon Missions
                  </p>
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
