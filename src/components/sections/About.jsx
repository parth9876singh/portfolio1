import { useRef, useEffect } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { Terminal, Download, Linkedin, Cpu } from "lucide-react";
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
    whileHover={{ y: -6 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className="group relative w-full bg-[#0a0f18]/90 backdrop-blur-md border border-white/10 p-6 flex flex-col items-center justify-center transition-all duration-300 hover:border-brand-cyan/50 hover:bg-brand-cyan/5 overflow-hidden cursor-none shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
  >
    {/* Tech Corner Brackets */}
    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-brand-cyan/30 group-hover:border-brand-cyan transition-colors duration-500 z-10 pointer-events-none" />
    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-brand-cyan/30 group-hover:border-brand-cyan transition-colors duration-500 z-10 pointer-events-none" />

    {/* Scanline Background */}
    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none mix-blend-overlay z-0" />

    <h3 className="text-3xl md:text-4xl font-mono font-bold text-white group-hover:text-brand-cyan mb-2 relative z-10 drop-shadow-[0_0_10px_rgba(6,182,212,0.4)] transition-colors">
      <AnimatedCounter to={targetValue} decimals={decimals} suffix={suffix} />
    </h3>
    <p className="text-brand-cyan/70 font-mono text-[10px] font-bold uppercase tracking-widest relative z-10 text-center flex items-center gap-2">
      <span className="w-1.5 h-1.5 bg-brand-cyan/50 rounded-full" /> {label}
    </p>

    {/* Bottom scanning laser */}
    <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-cyan group-hover:w-full transition-all duration-500 ease-out z-20" />
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
      className="py-32 relative z-10 w-full overflow-hidden bg-[#050910] border-t border-white/5"
    >
      {/* High-tech Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }}
      />

      {/* Cyberpunk Decorative Huge Background Text */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full flex justify-center -z-10 opacity-[0.03] pointer-events-none overflow-hidden">
        <span className="text-[120px] md:text-[200px] font-black text-transparent whitespace-nowrap" style={{ WebkitTextStroke: "2px #6366f1" }}>
          SYS.USER
        </span>
      </div>

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-brand-indigo/15 blur-[120px]" />
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[60%] rounded-full bg-brand-cyan/10 blur-[120px]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center max-w-7xl mx-auto px-6 lg:px-12 relative z-10"
      >
        {/* Left Column: Tech Photo Display */}
        <motion.div
          variants={fadeLeft}
          className="lg:col-span-5 relative w-full flex items-center justify-center p-4 min-h-[500px]"
        >
          {/* Glowing blob behind image */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-indigo/20 rounded-full blur-[80px] pointer-events-none" />

          {/* Photo Card Container */}
          <motion.div
            whileHover={{ scale: 1.05, rotateY: 5, rotateX: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative w-full max-w-[380px] aspect-[380/460] group mx-auto z-10 perspective-[1000px]"
          >
            {/* Border spin container */}
            <div className="absolute -inset-[2px] overflow-hidden bg-[#0a0f18] border border-white/10 group-hover:border-brand-indigo/50 transition-colors duration-500 shadow-[0_0_30px_rgba(0,0,0,0.8)]">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0_340deg,#6366f1_360deg)] animate-[spin_4s_linear_infinite]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_180deg,transparent_0_340deg,#06b6d4_360deg)] animate-[spin_4s_linear_infinite]" />
            </div>

            {/* Inner background blocking the spin from taking over whole card, showing only border */}
            <div className="absolute inset-0 bg-[#050910] z-10 m-[2px]" />

            {/* Frame with padding */}
            <div className="absolute inset-0 p-3 bg-transparent flex flex-col z-20">
              {/* Image Container */}
              <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-[#0a0f18] to-[#121c2d] flex items-center justify-center border border-white/5">
                {config.profilePhoto ? (
                  <>
                    <img
                      src="/images/parth_img.jpeg"
                      alt={config.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100 filter contrast-125 saturate-100 group-hover:saturate-150"
                    />
                    {/* Scanline overlay over photo */}
                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px] opacity-30 pointer-events-none mix-blend-overlay" />

                    {/* Holographic sweep effect */}
                    <div className="absolute inset-0 bg-brand-cyan/10 opacity-0 group-hover:opacity-100 mix-blend-overlay transition-opacity duration-500" />
                  </>
                ) : (
                  <span className="text-7xl md:text-8xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-indigo to-brand-cyan select-none mix-blend-screen opacity-50">
                    {config.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                )}
                {/* Tech UI HUD overlays on image */}
                <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-brand-cyan/50 z-30" />
                <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-brand-cyan/50 z-30" />

                <div className="absolute bottom-2 left-4 text-[8px] font-mono text-brand-cyan/70 tracking-widest hidden md:block z-30">
                  REC // {new Date().getFullYear()}
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="absolute -top-4 -right-2 md:-right-6 bg-brand-indigo/10 backdrop-blur-md text-brand-indigo text-[10px] font-bold font-mono px-3 py-1.5 border border-brand-indigo/40 shadow-[0_0_15px_rgba(99,102,241,0.2)] z-30 uppercase tracking-widest">
              [ OP_ROLE: MERN_DEV ]
            </div>

            {config.availability && (
              <div className="absolute -bottom-4 -left-2 md:-left-6 bg-green-500/10 backdrop-blur-md border border-green-500/30 px-4 py-2 flex items-center gap-3 shadow-[0_0_15px_rgba(34,197,94,0.2)] z-30">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 bg-green-500 shadow-[0_0_8px_#22c55e]"></span>
                </span>
                <span className="text-[10px] font-mono font-bold text-green-400 tracking-widest uppercase">
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
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-indigo/10 border border-brand-indigo/30 text-brand-indigo text-[10px] sm:text-xs font-mono font-bold mb-6 tracking-widest uppercase shadow-[0_0_15px_rgba(99,102,241,0.2)]">
              <Cpu size={14} /> SYS.USER.PROFILE
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-5xl font-display font-bold text-white leading-tight uppercase tracking-wider">
              Passionate about building <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-indigo to-brand-cyan">things that matter.</span>
            </h2>
          </div>

          {/* Bio (Rendered as HTML from config) */}
          <div className="relative">
            {/* Tech Left Border Accent */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-indigo to-brand-cyan opacity-80" />

            <div
              className="pl-6 text-gray-300 font-sans text-sm md:text-base lg:text-lg leading-relaxed max-w-2xl prose prose-invert prose-p:mb-5 prose-strong:text-brand-cyan prose-strong:font-mono prose-strong:font-normal"
              dangerouslySetInnerHTML={{ __html: config.bioHtml }}
            />
          </div>

          {/* Animated Counter Cards */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 pt-4"
          >
            <CounterCard label="Projects Built" targetValue={5} suffix="+" />
            <CounterCard label="Coding Probleum" targetValue={250} suffix="+" />
            <CounterCard label="Technology" targetValue={7} suffix="+" />
            <CounterCard
              label="CGPA_RATING"
              targetValue={parseFloat(config.cgpa || "7.59")}
              decimals={2}
            />
          </motion.div>

          {/* Download Resume / LinkedIn placed here visually if needed, though they usually sit in Hero */}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
