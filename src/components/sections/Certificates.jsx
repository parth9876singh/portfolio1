import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, Zap, BookOpen, ShieldCheck } from "lucide-react";
import { certificates } from "../../data/certificates";

gsap.registerPlugin(ScrollTrigger);

const getProviderConfig = (provider) => {
  const config = {
    HackerRank: {
      borderColor: "border-l-brand-cyan group-hover:border-l-brand-cyan shadow-[inset_2px_0_0_rgba(6,182,212,0.8)]",
      bgGlow: "hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]",
      iconBg: "bg-brand-cyan/10 border-brand-cyan/40",
      iconColor: "text-brand-cyan drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]",
      icon: <Zap size={20} />,
    },
    NPTEL: {
      borderColor: "border-l-orange-500 group-hover:border-l-orange-400 shadow-[inset_2px_0_0_rgba(249,115,22,0.8)]",
      bgGlow: "hover:shadow-[0_0_30px_rgba(249,115,22,0.2)]",
      iconBg: "bg-orange-500/10 border-orange-500/40",
      iconColor: "text-orange-400 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]",
      icon: <BookOpen size={20} />,
    },
    "LPU / iamneo": {
      borderColor: "border-l-brand-indigo group-hover:border-l-brand-indigo shadow-[inset_2px_0_0_rgba(99,102,241,0.8)]",
      bgGlow: "hover:shadow-[0_0_30px_rgba(99,102,241,0.2)]",
      iconBg: "bg-brand-indigo/10 border-brand-indigo/40",
      iconColor: "text-brand-indigo drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]",
      icon: <Award size={20} />,
    },
  };
  return config[provider] || {
    borderColor: "border-l-gray-500 group-hover:border-l-gray-400 shadow-[inset_2px_0_0_rgba(107,114,128,0.8)]",
    bgGlow: "hover:shadow-[0_0_30px_rgba(107,114,128,0.2)]",
    iconBg: "bg-gray-500/10 border-gray-500/40",
    iconColor: "text-gray-400",
    icon: <ShieldCheck size={20} />,
  };
};

const Certificates = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".certificate-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="certificates"
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

      {/* Glow Orbs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-brand-cyan/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-brand-indigo/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">

        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-24 relative">
          {/* Cyberpunk Decorative Huge Background Text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center -z-10 opacity-30 pointer-events-none overflow-hidden">
            <span
              className="text-[60px] md:text-[100px] lg:text-[140px] font-black text-transparent whitespace-nowrap"
              style={{ WebkitTextStroke: "2px rgba(6, 182, 212, 0.1)" }}
            >
              CREDENTIALS
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan text-xs font-mono font-bold rounded-none mb-6 tracking-widest uppercase relative shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <div className="absolute -left-[1px] -top-[1px] w-2 h-2 border-t border-l border-brand-cyan" />
            <div className="absolute -right-[1px] -bottom-[1px] w-2 h-2 border-b border-r border-brand-cyan" />
            <ShieldCheck size={14} /> SYS.AUTH.CERT
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 uppercase tracking-wider relative">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-indigo">Certificates</span>
          </h2>
          <p className="text-gray-400 font-sans max-w-2xl text-sm md:text-base border-l-2 border-brand-cyan/50 pl-4 text-left mx-auto bg-white/[0.02] p-4 rounded-r-lg">
            Verified cryptographic certificates and system clearances acquired through advanced technical training and assessment.
          </p>
        </div>

        {/* Certificate Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {certificates.map((cert) => {
            const config = getProviderConfig(cert.provider);
            return (
              <a
                key={cert.id}
                href={cert.credentialURL || undefined}
                target={cert.credentialURL ? "_blank" : undefined}
                rel={cert.credentialURL ? "noreferrer" : undefined}
                className={`certificate-card relative group p-6 bg-[#0a0f18]/90 backdrop-blur-md flex flex-col gap-4 transition-all duration-500 hover:z-50 hover:-translate-y-2 border border-white/5 border-l-4 ${config.borderColor} ${config.bgGlow} ${cert.credentialURL ? "cursor-pointer" : "cursor-default"
                  }`}
              >
                {/* Tech Corner Brackets */}
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/10 group-hover:border-brand-cyan transition-colors duration-500 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/10 group-hover:border-brand-cyan transition-colors duration-500 pointer-events-none" />

                {/* Scanline Background */}
                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none mix-blend-overlay z-0" />

                {/* Pop-out Image Hover Overlay */}
                {cert.image && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[115%] md:w-[130%] opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-500 ease-out z-50 pointer-events-none drop-shadow-[0_0_30px_rgba(6,182,212,0.6)]">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-auto border-2 border-brand-cyan/60 rounded-none shadow-2xl filter contrast-125"
                    />
                    <div className="absolute inset-0 bg-brand-cyan/10 mix-blend-overlay" />
                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px] opacity-30" />
                  </div>
                )}

                {/* Lower Opacity under the image to focus pop-out */}
                <div className="group-hover:opacity-10 group-hover:blur-sm transition-all duration-500 relative z-10 flex flex-col h-full gap-4">
                  <div className="flex items-start gap-4">
                    {/* Hexagon style icon container */}
                    <div className={`relative w-12 h-12 flex items-center justify-center border flex-shrink-0 ${config.iconBg} rotate-45 group-hover:rotate-90 transition-transform duration-700`}>
                      <div className={`-rotate-45 group-hover:-rotate-90 transition-transform duration-700 ${config.iconColor}`}>
                        {config.icon}
                      </div>
                    </div>
                    <div className="text-left flex-1 pt-0">
                      <h3 className="text-lg font-display font-bold text-white leading-tight uppercase tracking-wider">
                        {cert.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <span className="text-[10px] font-mono font-bold tracking-widest text-brand-cyan bg-brand-cyan/10 border border-brand-cyan/30 px-2 py-0.5 uppercase shadow-[0_0_10px_rgba(6,182,212,0.1)]">
                          {cert.provider}
                        </span>
                        <span className="text-[10px] font-mono text-gray-400">
                           // {cert.date}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-400 font-sans leading-relaxed border-l-2 border-white/10 pl-3">
                    {cert.description}
                  </p>

                  {cert.credentialURL && (
                    <span className="text-[10px] font-mono text-brand-cyan font-bold tracking-widest uppercase transition-all inline-flex items-center gap-2 mt-auto">
                      <div className="w-1.5 h-1.5 bg-brand-cyan shadow-[0_0_8px_#06b6d4]" /> VALIDATE_KEY
                    </span>
                  )}
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
