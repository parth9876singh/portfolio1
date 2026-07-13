import { useRef } from "react";
import { motion } from "framer-motion";
import { useMagneticEffect } from "../../hooks/useMagneticEffect";

const MagneticButton = ({
  children,
  className = "",
  variant = "primary",
  ...props
}) => {
  const ref = useRef(null);
  const { x, y } = useMagneticEffect(ref);

  const baseStyles =
    "relative inline-flex items-center justify-center rounded-full font-bold transition-all duration-300 overflow-hidden group px-8 py-4 z-10 outline-none focus:outline-none cursor-none";

  const variants = {
    primary:
      "clay-btn bg-brand-cyan text-[#0a0c14] border border-brand-cyan/20 hover:bg-white hover:text-[#0a0c14] shadow-[4px_4px_10px_rgba(0,0,0,0.3),inset_-3px_-3px_6px_rgba(0,0,0,0.4),inset_3px_3px_6px_rgba(255,255,255,0.25)]",
    secondary:
      "clay-btn bg-white/5 border border-white/10 text-white hover:bg-white/10 shadow-[4px_4px_10px_rgba(0,0,0,0.3),inset_-3px_-3px_6px_rgba(0,0,0,0.4),inset_3px_3px_6px_rgba(255,255,255,0.05)]",
    ghost:
      "bg-transparent text-gray-400 hover:text-white",
  };

  return (
    <motion.button
      ref={ref}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2 pointer-events-none">
        {children}
      </span>
      {variant === "primary" && (
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out pointer-events-none" />
      )}
    </motion.button>
  );
};

export default MagneticButton;
