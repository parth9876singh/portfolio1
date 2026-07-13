import { useRef, useEffect } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { User, Cpu } from "lucide-react";
import { config } from "../../data/config";

// Animated Counter Component
const AnimatedCounter = ({
  from = 0,
  to,
  duration = 2,
  decimals = 0,
  suffix = "",
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const motionValue = useSpring(from, {
    duration: duration * 1000,
    bounce: 0,
  });

  useEffect(() => {
    if (inView) {
      motionValue.set(to);
    }
  }, [inView, motionValue, to]);

  const rounded = useTransform(motionValue, (latest) => {
    if (decimals > 0) {
      return latest.toFixed(decimals) + suffix;
    }
    return Math.floor(latest) + suffix;
  });

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

const CounterCard = ({ label, targetValue, decimals = 0, suffix = "" }) => (
  <motion.div
    whileHover={{ y: -6, scale: 1.03 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className="group relative w-full clay-card p-6 flex flex-col items-center justify-center hover:border-brand-cyan/30 shadow-[10px_10px_25px_rgba(0,0,0,0.4)]"
  >
    {/* Inner glow accent */}
    <div className="absolute inset-2 rounded-[24px] bg-brand-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    
    <h3 className="text-3xl md:text-4xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-indigo to-brand-cyan mb-2 relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] group-hover:scale-105 transition-transform duration-300">
      <AnimatedCounter to={targetValue} decimals={decimals} suffix={suffix} />
    </h3>
    <p className="text-gray-400 font-sans text-xs font-bold uppercase tracking-wider relative z-10 text-center flex items-center gap-2">
      <span className="w-2 h-2 rounded-full bg-brand-cyan/60" /> {label}
    </p>
  </motion.div>
);

const About = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-32 relative z-10 w-full overflow-hidden bg-[#0a0c14] border-t border-white/5"
    >
      {/* Floating Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[5%] w-[450px] h-[450px] rounded-full bg-brand-indigo/10 blur-[100px] animate-blob" />
        <div className="absolute bottom-[20%] right-[5%] w-[400px] h-[400px] rounded-full bg-brand-cyan/10 blur-[110px] animate-blob-reverse" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center max-w-7xl mx-auto px-6 lg:px-12 relative z-10"
      >
        {/* Left Column: Bubbly Photo Frame */}
        <motion.div
          variants={fadeLeft}
          className="lg:col-span-5 relative w-full flex items-center justify-center p-4 min-h-[480px]"
        >
          {/* Outer clay background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-brand-indigo/10 rounded-full blur-[80px] pointer-events-none" />

          {/* Photo Card Container */}
          <motion.div
            whileHover={{ scale: 1.05, rotateY: 3, rotateX: 3 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="relative w-full max-w-[360px] aspect-[360/440] group mx-auto z-10"
          >
            {/* 3D Clay Frame Wrapper */}
            <div className="absolute inset-0 rounded-[36px] bg-[#121625] p-4 shadow-[12px_12px_30px_rgba(0,0,0,0.5),inset_-10px_-10px_20px_rgba(0,0,0,0.6),inset_10px_10px_20px_rgba(255,255,255,0.06)] border border-white/10 flex flex-col justify-center">
              
              {/* Image Container with Inner Carved Shadow */}
              <div className="relative w-full h-full overflow-hidden rounded-[26px] bg-[#090b11] shadow-[inset_6px_6px_12px_rgba(0,0,0,0.7)] flex items-center justify-center">
                {config.profilePhoto ? (
                  <>
                    <img
                      src="/images/parth_img.jpeg"
                      alt={config.name}
                      className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-105 group-hover:rotate-1"
                    />
                    
                    {/* Bubbly Overlay reflection */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
                  </>
                ) : (
                  <span className="text-7xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-indigo to-brand-cyan select-none opacity-40">
                    {config.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                )}
              </div>
            </div>

            {/* Clay Pill Role Badge */}
            <div className="absolute -top-4 -right-2 md:-right-4 bg-brand-indigo border border-indigo-400/30 text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-[6px_6px_15px_rgba(0,0,0,0.4),inset_-4px_-4px_8px_rgba(0,0,0,0.4),inset_4px_4px_8px_rgba(255,255,255,0.15)] tracking-wide uppercase">
               MERN DEVELOPER
            </div>

            {/* Clay Pill Availability Badge */}
            {config.availability && (
              <div className="absolute -bottom-4 -left-2 md:-left-4 bg-[#111928] border border-green-500/30 px-5 py-2.5 rounded-full flex items-center gap-3 shadow-[6px_6px_15px_rgba(0,0,0,0.4),inset_-4px_-4px_8px_rgba(0,0,0,0.5),inset_4px_4px_8px_rgba(255,255,255,0.05)]">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex h-2.5 w-2.5 bg-green-500 shadow-[0_0_8px_#22c55e]"></span>
                </span>
                <span className="text-[10px] font-sans font-bold text-green-400 tracking-wider uppercase">
                  {config.availabilityText}
                </span>
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Right Column: Content */}
        <motion.div
          variants={fadeRight}
          className="lg:col-span-7 flex flex-col space-y-8 relative z-10"
        >
          {/* Header */}
          <div>
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-brand-indigo/10 border border-brand-indigo/20 text-brand-indigo text-xs font-bold rounded-full mb-6 tracking-wider uppercase shadow-[4px_4px_10px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(0,0,0,0.4),inset_3px_3px_6px_rgba(255,255,255,0.05)]">
               <User size={14} className="text-brand-indigo" /> ABOUT ME
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-extrabold text-white leading-tight">
              Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-indigo to-brand-cyan">Digital Spaces.</span>
            </h2>
          </div>

          {/* Bio on soft clay panel */}
          <div className="relative p-6 md:p-8 bg-white/[0.02] border border-white/5 rounded-[32px] shadow-[inset_4px_4px_8px_rgba(0,0,0,0.5),inset_-4px_-4px_8px_rgba(255,255,255,0.02)]">
            <div
              className="text-gray-300 font-sans text-sm md:text-base leading-relaxed max-w-2xl prose prose-invert prose-p:mb-5 prose-strong:text-brand-cyan prose-strong:font-bold"
              dangerouslySetInnerHTML={{ __html: config.bioHtml }}
            />
          </div>

          {/* Clay Counter Cards */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 sm:grid-cols-4 gap-5 pt-4"
          >
            <CounterCard label="Projects" targetValue={5} suffix="+" />
            <CounterCard label="Algos" targetValue={350} suffix="+" />
            <CounterCard label="Languages" targetValue={7} suffix="+" />
            <CounterCard
              label="CGPA Rating"
              targetValue={parseFloat(config.cgpa || "7.59")}
              decimals={2}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
