import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Award, Calendar, MapPin } from "lucide-react";
import { trainingData } from "../../data/experience";

gsap.registerPlugin(ScrollTrigger);

const CheckIcon = () => (
  <svg
    className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.5"
      d="M5 13l4 4L19 7"
    />
  </svg>
);

const getTechClayClass = (tech) => {
  const colorMap = {
    MongoDB: "bg-green-500/10 border-green-500/20 text-green-300 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.05)]",
    "React.js": "bg-cyan-500/10 border-cyan-500/20 text-brand-cyan shadow-[inset_1px_1px_2px_rgba(255,255,255,0.05)]",
    "Node.js": "bg-green-500/10 border-green-500/20 text-green-300 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.05)]",
    JWT: "bg-amber-500/10 border-amber-500/20 text-amber-300 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.05)]",
    Vercel: "bg-white/5 border-white/10 text-white/80 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.05)]",
    "Express.js": "bg-green-500/10 border-green-500/20 text-green-300 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.05)]",
    Render: "bg-blue-500/10 border-blue-500/20 text-blue-300 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.05)]",
  };
  return (colorMap[tech] || "bg-white/5 border-white/5 text-gray-300 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.05)]") + " rounded-full px-4 py-1.5 text-xs font-bold hover:scale-105 duration-300 border cursor-default";
};

const Training = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      tl.fromTo(
        ".training-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
      );

      tl.fromTo(
        ".training-bullet",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.4",
      );

      tl.fromTo(
        ".tech-badge",
        { opacity: 0, scale: 0.6 },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.05,
          duration: 0.6,
          ease: "back.out(1.7)",
        },
        "-=0.2",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="training"
      ref={sectionRef}
      className="py-32 px-6 lg:px-12 relative w-full border-t border-white/5 bg-[#0a0c14] overflow-hidden"
    >
      {/* Floating Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[550px] h-[550px] bg-brand-indigo/5 rounded-full blur-[110px] animate-blob" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-cyan/5 rounded-full blur-[110px] animate-blob-reverse" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-display font-extrabold text-white mb-16 inline-block relative group">
          Training
          <span className="absolute -bottom-2 left-0 w-full h-[3px] bg-gradient-to-r from-brand-indigo to-brand-cyan rounded-full transform origin-left transition-transform group-hover:scale-x-110" />
        </h2>

        <div className="grid grid-cols-1 gap-8">
          {trainingData.map((item) => (
            <div
              key={item.id}
              className="training-card relative group clay-card p-8 flex flex-col md:flex-row gap-8 hover:border-brand-indigo/40 shadow-[12px_12px_35px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-2 z-10"
            >
              {/* Left Side: Header Info */}
              <div className="md:w-1/3 flex flex-col gap-4">
                <div>
                  <p className="text-xl text-gray-100 font-extrabold mb-4 group-hover:text-brand-cyan transition-colors duration-300">
                    {item.program}
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-display font-bold text-white tracking-wide">
                    {item.organization}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 mt-4">
                    <span className="px-3.5 py-1.5 text-[10px] font-bold bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan rounded-full shadow-[inset_1px_1px_2px_rgba(255,255,255,0.05)] uppercase">
                      {item.industry}
                    </span>
                    {item.certified &&
                      (item.certificateLink ? (
                        <a
                          href={item.certificateLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="clay-btn group relative px-4 py-1.5 text-[10px] font-bold text-white bg-indigo-600 border border-indigo-400/20 rounded-full flex items-center gap-2 shadow-[4px_4px_10px_rgba(0,0,0,0.3),inset_-3px_-3px_6px_rgba(0,0,0,0.4),inset_3px_3px_6px_rgba(255,255,255,0.15)] cursor-pointer"
                        >
                          <span>Certificate</span>
                          <ExternalLink
                            size={12}
                            className="opacity-90 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                          />
                        </a>
                      ) : (
                        <span className="px-3.5 py-1.5 text-[10px] font-bold bg-green-500/10 border border-green-500/20 text-green-400 rounded-full flex items-center gap-1 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.05)]">
                          ✓ Certified
                        </span>
                      ))}
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-white/5">
                  <p className="text-xs font-bold text-gray-400 flex items-center gap-2">
                    <Calendar size={14} className="text-brand-cyan" />
                    {item.duration}
                  </p>
                  <p className="text-xs font-bold text-gray-400 flex items-center gap-2 mt-2">
                    <MapPin size={14} className="text-brand-cyan" />
                    {item.location}
                  </p>
                </div>
              </div>

              {/* Right Side: Details & Achievements */}
              <div className="md:w-2/3 flex flex-col gap-6 md:border-l md:border-white/5 md:pl-8">
                {/* Description */}
                {item.description && (
                  <div className="text-gray-300 text-sm leading-relaxed space-y-4 font-sans">
                    {item.description.map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                )}

                {/* Achievements List */}
                <ul className="space-y-3">
                  {item.achievements.map((achievement, idx) => {
                    const parts = achievement.split(/(30%)/gi);
                    return (
                      <li
                        key={idx}
                        className="training-bullet flex items-start gap-3 text-gray-300 text-sm font-sans"
                      >
                        <CheckIcon />
                        <span>
                          {parts.map((part, i) =>
                            part.match(/30%/) ? (
                              <strong
                                key={i}
                                className="text-brand-cyan font-bold"
                              >
                                {part}
                              </strong>
                            ) : (
                              part
                            ),
                          )}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                {/* Metric Box */}
                {item.metric && (
                  <div className="metric-box mt-2 inline-flex items-center gap-2 bg-brand-indigo border border-brand-indigo/20 text-white px-5 py-3 rounded-full shadow-[6px_6px_15px_rgba(0,0,0,0.3),inset_-4px_-4px_8px_rgba(0,0,0,0.4),inset_4px_4px_8px_rgba(255,255,255,0.15)] font-bold text-xs uppercase tracking-wider self-start select-none">
                    <Award size={14} /> {item.metric}
                  </div>
                )}

                {/* Tech Stack Pills */}
                <div className="mt-auto pt-6 border-t border-white/5 flex flex-wrap gap-2.5">
                  {item.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className={`tech-badge ${getTechClayClass(tech)}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Training;
