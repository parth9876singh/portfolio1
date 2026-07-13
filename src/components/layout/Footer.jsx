import { useState, useEffect } from "react";
import { config } from "../../data/config";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const konamiCode = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

const Footer = () => {
  const [keys, setKeys] = useState([]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      setKeys((prev) => {
        const newKeys = [...prev, e.key];
        if (newKeys.length > konamiCode.length) {
          newKeys.shift();
        }

        if (newKeys.join(",") === konamiCode.join(",")) {
          toast("🎮 Konami Code Activated!", {
            description:
              "You found the secret easter egg. You must be a true geek!",
            icon: "👾",
            duration: 8000,
          });
          document.body.style.animation = "spin 2s linear";
          setTimeout(() => (document.body.style.animation = ""), 2000);
          return [];
        }

        return newKeys;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <footer className="relative bg-[#0a0c14] text-center py-12 px-6 border-t border-white/5 mt-20 overflow-hidden">
      {/* Background blobs in footer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-brand-indigo/5 rounded-full blur-[80px] animate-pulse" />
      </div>

      <div className="max-w-4xl mx-auto flex flex-col items-center gap-8 relative z-10">
        {/* Social Links with soft clay feels */}
        <div className="flex gap-8">
          {[
            { icon: Github, href: config.social.github, hoverColor: "hover:text-white hover:bg-white/10 hover:border-white/30" },
            { icon: Linkedin, href: config.social.linkedin, hoverColor: "hover:text-brand-cyan hover:bg-brand-cyan/10 hover:border-brand-cyan/35" },
            { icon: Mail, href: `mailto:${config.email}`, hoverColor: "hover:text-brand-indigo hover:bg-brand-indigo/10 hover:border-brand-indigo/35" }
          ].map((social, idx) => (
            <motion.a
              key={idx}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
              className={`group w-12 h-12 rounded-full bg-white/5 border border-white/5 flex items-center justify-center transition-all duration-300 ${social.hoverColor} shadow-[4px_4px_10px_rgba(0,0,0,0.3),inset_-3px_-3px_6px_rgba(0,0,0,0.4),inset_3px_3px_6px_rgba(255,255,255,0.05)] cursor-none`}
            >
              <social.icon size={20} className="text-gray-400 group-hover:scale-105 transition-all duration-300" />
            </motion.a>
          ))}
        </div>

        {/* Text */}
        <div className="flex flex-col gap-3">
          <p className="text-gray-300 font-sans text-base">
            Designed & Developed by{" "}
            <span className="bg-gradient-to-r from-brand-indigo via-brand-cyan to-brand-indigo text-transparent bg-clip-text font-bold uppercase tracking-wider">
              {config.name}
            </span>
          </p>
        </div>

        {/* Back to Top Clay Button */}
        <motion.button
          onClick={scrollToTop}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="group relative mt-2 w-12 h-12 rounded-full bg-white/5 border border-white/5 flex items-center justify-center hover:bg-brand-indigo/15 hover:border-brand-indigo/35 transition-all duration-300 pointer-events-auto shadow-[4px_4px_10px_rgba(0,0,0,0.3),inset_-3px_-3px_6px_rgba(0,0,0,0.4),inset_3px_3px_6px_rgba(255,255,255,0.05)] cursor-none"
        >
          <ArrowUp
            size={18}
            className="text-gray-300 group-hover:text-brand-indigo transition-colors"
          />
        </motion.button>

        {/* Legal */}
        <div className="pt-8 w-full border-t border-white/5 flex flex-col md:flex-row justify-center items-center gap-2 text-[10px] font-mono text-gray-600">
          <p>© 2026 {config.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
