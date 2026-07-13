import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useScrollSpy } from "../../hooks/useScrollSpy";
import MagneticButton from "../ui/MagneticButton";
import { config } from "../../data/config";

const defaultNavLinks = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Resume", id: "resume" },
  { name: "Education", id: "education" },
  { name: "Skills", id: "skills" },
  { name: "Projects", id: "projects" },
  { name: "Certificates", id: "certificates" },
  { name: "Achievements", id: "achievements" },
  { name: "Training", id: "training" },
  { name: "Badges", id: "hackathon-badges" },
  { name: "Contact", id: "contact" },
];

const Navbar = ({ navLinks = defaultNavLinks }) => {
  const profileName = config.name;
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeSection = useScrollSpy(
    navLinks.map((link) => link.id),
    120,
  );

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setScrollProgress((window.scrollY / windowHeight) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const initials = profileName
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 pointer-events-auto ${
          isScrolled
            ? "py-4 bg-[#0a0c14]/85 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_25px_rgba(0,0,0,0.4)]"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
          {/* Logo Bouncy Button */}
          <MagneticButton
            className="!px-0 !py-0 !bg-transparent group"
            onClick={() => handleScrollTo("home")}
            variant="ghost"
          >
            <div className="text-xl font-display font-extrabold text-white relative flex items-center h-11 w-11 justify-center rounded-full bg-white/5 border border-white/10 group-hover:border-brand-indigo/40 transition-colors shadow-[4px_4px_10px_rgba(0,0,0,0.3),inset_-3px_-3px_6px_rgba(0,0,0,0.4),inset_3px_3px_6px_rgba(255,255,255,0.05)]">
              <span className="text-brand-indigo group-hover:scale-105 transition-transform duration-300">
                {initials[0]}
              </span>
              <span>{initials.substring(1)}</span>
            </div>
          </MagneticButton>

          {/* Desktop Carved Links Deck */}
          <div className="hidden lg:flex space-x-6 items-center bg-black/45 border border-white/5 px-8 py-2.5 rounded-full backdrop-blur-md shadow-[inset_2.5px_2.5px_5px_rgba(0,0,0,0.5),inset_-2.5px_-2.5px_5px_rgba(255,255,255,0.02)]">
            {navLinks.map((link) => (
              <div
                key={link.id}
                onClick={() => handleScrollTo(link.id)}
                className={`relative text-xs font-sans font-bold uppercase tracking-wider transition-colors duration-300 pointer-events-auto cursor-pointer ${
                  activeSection === link.id
                    ? "text-brand-cyan"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <div className="px-1.5 py-0.5 relative">
                  <span className="relative z-10">{link.name}</span>
                  {activeSection === link.id && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-2 h-2 rounded-full bg-brand-cyan shadow-[0_0_8px_#06b6d4,inset_1px_1px_2px_rgba(255,255,255,0.4)]"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="hidden lg:block relative z-20">
            <MagneticButton
              onClick={() => handleScrollTo("contact")}
              variant="primary"
              className="py-2.5! px-6! text-xs font-bold tracking-wider uppercase"
            >
              Hire Me
            </MagneticButton>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-white relative z-[60] w-11 h-11 flex items-center justify-center rounded-full bg-white/5 border border-white/10 shadow-[4px_4px_10px_rgba(0,0,0,0.3),inset_-3px_-3px_6px_rgba(0,0,0,0.4),inset_3px_3px_6px_rgba(255,255,255,0.05)] cursor-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Scroll Progress Bar */}
        <div className="absolute bottom-0 left-0 h-[2px] w-full bg-white/5">
          <motion.div
            className="h-full bg-gradient-to-r from-brand-cyan to-brand-indigo"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[55] bg-[#0a0c14]/98 backdrop-blur-2xl lg:hidden flex flex-col items-center justify-center space-y-8"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-indigo/10 blur-[100px] rounded-full pointer-events-none animate-pulse" />

            {navLinks.map((link, i) => (
              <motion.div
                key={link.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                onClick={() => handleScrollTo(link.id)}
                className={`text-2xl font-display font-bold uppercase tracking-wider relative cursor-none ${
                  activeSection === link.id ? "text-brand-cyan" : "text-gray-500"
                }`}
              >
                {link.name}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="mobileActiveIndicator"
                    className="absolute -left-6 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-brand-cyan shadow-[0_0_8px_#06b6d4,inset_1px_1px_2px_rgba(255,255,255,0.4)]"
                  />
                )}
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + navLinks.length * 0.05 }}
              className="pt-8"
            >
              <MagneticButton
                onClick={() => handleScrollTo("contact")}
                variant="primary"
                className="px-8 py-4.5 text-xs font-bold tracking-wider uppercase"
              >
                Let's Talk
              </MagneticButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
