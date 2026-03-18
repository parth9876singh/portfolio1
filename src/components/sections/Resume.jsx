import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, FileText, ExternalLink, Briefcase, GraduationCap, Code2, Award } from 'lucide-react';
import { config } from '../../data/config';

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  {
    icon: Briefcase,
    label: 'Experience',
    value: 'Training & Projects',
    color: 'text-brand-cyan',
    bgColor: 'bg-brand-cyan/10 border-brand-cyan/20',
  },
  {
    icon: GraduationCap,
    label: 'Education',
    value: 'B.Tech CSE',
    color: 'text-brand-indigo',
    bgColor: 'bg-brand-indigo/10 border-brand-indigo/20',
  },
  {
    icon: Code2,
    label: 'Focus',
    value: 'Full Stack (MERN)',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-400/10 border-emerald-400/20',
  },
  {
    icon: Award,
    label: 'Problems Solved',
    value: '200+ on LeetCode',
    color: 'text-amber-400',
    bgColor: 'bg-amber-400/10 border-amber-400/20',
  },
];

const Resume = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.resume-animate',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      // Floating animation on the document icon
      gsap.to('.resume-float', {
        y: -10,
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: 'sine.inOut',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const resumeURL = '/documents/RakeshRanjan_CV.pdf';

  return (
    <section
      id="resume"
      ref={sectionRef}
      className="py-32 px-6 lg:px-12 relative w-full border-t border-white/5"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-indigo/8 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="resume-animate flex flex-col items-center text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4">
            My <span className="text-brand-cyan text-glow">Resume</span>.
          </h2>
          <p className="text-gray-400 font-sans max-w-xl text-base">
            A quick snapshot of my education, skills, and projects. Download for the full details.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left – Visual Card */}
          <div className="resume-animate flex justify-center">
            <div className="relative group">
              {/* Outer glow */}
              <div className="absolute -inset-4 bg-gradient-to-br from-brand-indigo/30 via-brand-cyan/20 to-brand-indigo/30 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Card */}
              <div className="relative w-72 md:w-80 h-96 md:h-[28rem] bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 group-hover:border-brand-indigo/40 transition-all duration-500 p-8 flex flex-col items-center justify-center gap-6 overflow-hidden">
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-brand-indigo/40 rounded-tl-2xl" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-brand-cyan/40 rounded-br-2xl" />

                {/* Floating doc icon */}
                <div className="resume-float p-5 rounded-2xl bg-gradient-to-br from-brand-indigo/20 to-brand-cyan/20 border border-white/10">
                  <FileText size={48} className="text-brand-cyan" />
                </div>

                <div className="text-center">
                  <h3 className="text-xl font-display font-bold text-white mb-1">
                    {config.name}
                  </h3>
                  <p className="text-sm text-gray-400">{config.role}</p>
                </div>

                {/* Mini stats */}
                <div className="flex gap-6 text-center">
                  <div>
                    <p className="text-2xl font-display font-bold text-brand-cyan">3+</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider">Projects</p>
                  </div>
                  <div className="w-px bg-white/10" />
                  <div>
                    <p className="text-2xl font-display font-bold text-brand-indigo">200+</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider">Problems</p>
                  </div>
                  <div className="w-px bg-white/10" />
                  <div>
                    <p className="text-2xl font-display font-bold text-emerald-400">{config.cgpa}</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider">CGPA</p>
                  </div>
                </div>

                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>
            </div>
          </div>

          {/* Right – Highlights + Buttons */}
          <div className="flex flex-col gap-8">
            {/* Highlight Cards */}
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item, i) => (
                <div
                  key={i}
                  className={`resume-animate p-4 rounded-xl border ${item.bgColor} backdrop-blur-xl hover:-translate-y-1 transition-all duration-300`}
                >
                  <item.icon size={20} className={`${item.color} mb-2`} />
                  <p className="text-xs text-gray-500 font-mono uppercase tracking-wider">
                    {item.label}
                  </p>
                  <p className="text-sm font-semibold text-white mt-1">{item.value}</p>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="resume-animate flex flex-col sm:flex-row gap-4">
              <a
                href={resumeURL}
                download
                className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-brand-indigo text-white font-display font-semibold rounded-xl transition-all duration-300 hover:bg-indigo-600 hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <Download size={20} className="relative z-10 group-hover:animate-bounce" />
                <span className="relative z-10">Download CV</span>
              </a>

              <a
                href={resumeURL}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-white font-display font-semibold rounded-xl transition-all duration-300 hover:bg-white/10 hover:border-white/20"
              >
                <ExternalLink size={20} className="group-hover:rotate-12 transition-transform" />
                <span>View Online</span>
              </a>
            </div>

            {/* Subtle note */}
            <p className="resume-animate text-xs text-gray-500">
              📄 Last updated: March 2026 · PDF format
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
