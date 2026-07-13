import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, Zap, BookOpen, ShieldCheck } from "lucide-react";
import { certificates } from "../../data/certificates";

gsap.registerPlugin(ScrollTrigger);

const getProviderConfig = (provider) => {
  const config = {
    HackerRank: {
      clayClass: "clay-card-cyan hover:border-brand-cyan/40",
      iconBg: "bg-brand-cyan/15 border-brand-cyan/25 shadow-[inset_1.5px_1.5px_3px_rgba(255,255,255,0.15)]",
      iconColor: "text-brand-cyan",
      icon: <Zap size={20} />,
    },
    NPTEL: {
      clayClass: "clay-card-amber hover:border-orange-500/40",
      iconBg: "bg-orange-500/15 border-orange-500/25 shadow-[inset_1.5px_1.5px_3px_rgba(255,255,255,0.15)]",
      iconColor: "text-orange-400",
      icon: <BookOpen size={20} />,
    },
    "LPU / iamneo": {
      clayClass: "clay-card-indigo hover:border-brand-indigo/40",
      iconBg: "bg-brand-indigo/15 border-brand-indigo/25 shadow-[inset_1.5px_1.5px_3px_rgba(255,255,255,0.15)]",
      iconColor: "text-brand-indigo",
      icon: <Award size={20} />,
    },
  };
  return config[provider] || {
    clayClass: "clay-card hover:border-gray-400/40",
    iconBg: "bg-gray-500/15 border-gray-500/25",
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
      className="py-32 relative w-full border-t border-white/5 bg-[#0a0c14] overflow-hidden"
    >
      {/* Floating Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[550px] h-[550px] bg-brand-cyan/5 rounded-full blur-[110px] animate-blob" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-indigo/5 rounded-full blur-[110px] animate-blob-reverse" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">

        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-24 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center -z-10 opacity-30 pointer-events-none overflow-hidden">
            <span
              className="text-[60px] md:text-[100px] lg:text-[140px] font-black text-transparent whitespace-nowrap"
              style={{ WebkitTextStroke: "2px rgba(6, 182, 212, 0.08)" }}
            >
              CREDENTIALS
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-5 py-2 bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-xs font-bold rounded-full mb-6 tracking-wide uppercase shadow-[4px_4px_10px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(0,0,0,0.4),inset_3px_3px_6px_rgba(255,255,255,0.05)]">
            <ShieldCheck size={14} className="text-brand-cyan" /> VERIFIED CREDENTIALS
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 uppercase tracking-wider relative">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-indigo">Certificates</span>
          </h2>
          <p className="text-gray-400 font-sans max-w-2xl text-sm md:text-base border-l-2 border-brand-cyan/40 pl-4 text-left mx-auto bg-white/[0.01] p-4 rounded-[20px]">
            Verified courses and professional certifications acquired through technical training and developer assessments.
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
                className={`certificate-card relative group p-6 flex flex-col gap-5 border border-white/5 transition-all duration-300 hover:z-50 hover:-translate-y-2 ${config.clayClass} ${cert.credentialURL ? "cursor-pointer" : "cursor-default"
                  }`}
              >
                {/* Pop-out Image Hover Overlay */}
                {cert.image && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[115%] md:w-[130%] opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-500 ease-out z-50 pointer-events-none drop-shadow-[0_15px_35px_rgba(0,0,0,0.7)]">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-auto border-4 border-[#121625] rounded-[24px]"
                    />
                    <div className="absolute inset-0 bg-brand-cyan/5 rounded-[24px] pointer-events-none" />
                  </div>
                )}

                {/* Content opacity triggers on hover for image focus */}
                <div className="group-hover:opacity-10 group-hover:blur-xs transition-all duration-500 relative z-10 flex flex-col h-full gap-4">
                  <div className="flex items-start gap-4">
                    {/* Rounded Clay Circle Icon */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border flex-shrink-0 ${config.iconBg} ${config.iconColor} transition-transform duration-500 group-hover:scale-110`}>
                      {config.icon}
                    </div>
                    <div className="text-left flex-1 pt-0.5">
                      <h3 className="text-base font-display font-extrabold text-white leading-snug uppercase tracking-wide">
                        {cert.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 mt-2.5">
                        <span className="text-[10px] font-sans font-bold px-3 py-1 bg-white/5 border border-white/5 text-brand-cyan rounded-full shadow-[inset_1px_1px_2px_rgba(255,255,255,0.05)] uppercase">
                          {cert.provider}
                        </span>
                        <span className="text-[10px] font-sans text-gray-400 font-semibold">
                          • {cert.date}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-400 font-sans leading-relaxed border-l-2 border-white/10 pl-4">
                    {cert.description}
                  </p>

                  {cert.credentialURL && (
                    <span className="text-[10px] font-sans text-brand-cyan font-bold tracking-widest uppercase transition-all inline-flex items-center gap-1.5 mt-auto px-4 py-2 bg-brand-cyan/10 border border-brand-cyan/20 rounded-full shadow-[inset_1px_1px_2px_rgba(255,255,255,0.05)] hover:bg-brand-cyan hover:text-[#0a0c14] hover:shadow-[0_4px_12px_rgba(6,182,212,0.2)]">
                      Verify Credentials
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
