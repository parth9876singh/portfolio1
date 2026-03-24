import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import {
  Send,
  MapPin,
  Phone,
  Mail,
  Github,
  Linkedin,
  Code2,
  Terminal,
  Radio,
  Wifi
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";

gsap.registerPlugin(ScrollTrigger);

import { config } from "../../data/config";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  honeypot: z.string().optional(),
});

const Contact = () => {
  const sectionRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-stagger",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const onSubmit = async (data) => {
    if (data.honeypot) return;
    setIsSubmitting(true);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: data.name,
          name: data.name,
          reply_to: data.email,
          email: data.email,
          subject: data.subject,
          message: data.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );

      toast.success("TRANSMISSION_SUCCESSFUL");
      reset();
    } catch (error) {
      console.error(error);
      toast.error("TRANSMISSION_FAILED. RETRY.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-32 relative w-full overflow-hidden bg-[#050910] border-t border-white/5"
    >
      {/* High-tech Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(#06b6d4 1px, transparent 1px), linear-gradient(90deg, #06b6d4 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }}
      />

      {/* Background glow and watermark */}
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-brand-cyan/10 blur-[150px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center -z-10 opacity-30 pointer-events-none overflow-hidden">
        <span
          className="text-[80px] md:text-[140px] lg:text-[180px] font-black text-transparent whitespace-nowrap"
          style={{ WebkitTextStroke: "2px rgba(6, 182, 212, 0.1)" }}
        >
          COMM_LINK
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10 w-full">

        {/* Left Panel */}
        <div className="flex flex-col">

          <div className="contact-stagger inline-flex items-center gap-2 px-4 py-2 bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan text-xs font-mono font-bold rounded-none mb-6 tracking-widest uppercase relative shadow-[0_0_15px_rgba(6,182,212,0.2)] w-fit">
            <div className="absolute -left-[1px] -top-[1px] w-2 h-2 border-t border-l border-brand-cyan" />
            <div className="absolute -right-[1px] -bottom-[1px] w-2 h-2 border-b border-r border-brand-cyan" />
            <Radio size={14} className="animate-pulse" /> SYS.COMMS.OPEN
          </div>

          <h2 className="contact-stagger text-4xl md:text-5xl lg:text-5xl font-display font-bold text-white mb-6 leading-[1.2] uppercase tracking-wider relative">
            Let's build something extraordinary together.
          </h2>

          <div className="contact-stagger flex flex-col gap-6 mt-8">
            {[
              {
                icon: <Mail size={20} className="text-brand-cyan drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" />,
                label: "SMTP_RELAY",
                value: config.email,
                href: `mailto:${config.email}`,
              },
              {
                icon: <Phone size={20} className="text-brand-indigo drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]" />,
                label: "VOICE_COMMS",
                value: config.phone,
                href: `tel:${config.phone}`,
              },
              {
                icon: <MapPin size={20} className="text-brand-cyan drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" />,
                label: "GEO_LOC",
                value: config.location,
                href: null,
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-5 text-gray-300 group">
                <div className="relative w-12 h-12 flex flex-shrink-0 items-center justify-center border border-white/10 bg-[#0a0f18]/80 group-hover:border-brand-cyan/50 group-hover:bg-brand-cyan/10 transition-colors duration-500 overflow-hidden">
                  {/* Corner notches */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-brand-cyan/30 group-hover:border-brand-cyan transition-colors" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-brand-cyan/30 group-hover:border-brand-cyan transition-colors" />

                  {/* Icon */}
                  <div className="relative z-10 group-hover:scale-110 transition-transform duration-500">
                    {item.icon}
                  </div>

                  {/* Scanline */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-cyan/20 to-transparent -translate-y-full group-hover:animate-[shimmerY_2s_infinite]" />
                </div>

                <div className="pt-1">
                  <p className="text-[10px] text-brand-cyan/70 font-mono mb-1 tracking-widest uppercase flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-brand-cyan/50 rounded-none shadow-[0_0_5px_rgba(6,182,212,0.5)]" />
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : "_self"}
                      rel="noreferrer"
                      className="text-base md:text-lg font-mono text-white hover:text-brand-cyan transition-colors pointer-events-auto break-all tracking-wide drop-shadow-md relative overflow-hidden group/link inline-block"
                    >
                      {item.value}
                      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-cyan scale-x-0 group-hover/link:scale-x-100 origin-left transition-transform duration-300" />
                    </a>
                  ) : (
                    <p className="text-base md:text-lg font-mono text-white tracking-wide">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Social Icons */}
          <div className="contact-stagger mt-12 pt-8 border-t border-white/10 relative">
            <div className="absolute top-0 left-0 w-16 h-px bg-brand-cyan/50" />
            <p className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
              <Wifi size={12} className="text-gray-400" /> [ NETWORK_UPLINKS ]
            </p>
            <div className="flex gap-4">
              {[
                { icon: Github, href: config.social.github, color: "text-gray-400", hoverColor: "group-hover:text-brand-indigo", hoverBorder: "group-hover:border-brand-indigo", hoverBg: "group-hover:bg-brand-indigo/10" },
                { icon: Linkedin, href: config.social.linkedin, color: "text-gray-400", hoverColor: "group-hover:text-brand-cyan", hoverBorder: "group-hover:border-brand-cyan", hoverBg: "group-hover:bg-brand-cyan/10" },
                { icon: Code2, href: config.social.leetcode || "https://hackerrank.com", color: "text-gray-400", hoverColor: "group-hover:text-green-400", hoverBorder: "group-hover:border-green-500", hoverBg: "group-hover:bg-green-500/10" }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`group relative w-12 h-12 bg-[#0a0f18]/80 border border-white/10 flex items-center justify-center transition-all duration-300 ${social.hoverBg} ${social.hoverBorder} hover:-translate-y-1 shadow-[0_4px_15px_rgba(0,0,0,0.3)]`}
                >
                  <div className={`absolute -top-[1px] -left-[1px] w-2 h-2 border-t border-l border-transparent ${social.hoverBorder} transition-colors duration-300`} />
                  <div className={`absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b border-r border-transparent ${social.hoverBorder} transition-colors duration-300`} />
                  <social.icon size={20} className={`${social.color} ${social.hoverColor} transition-colors duration-300`} />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Right Form Panel */}
        <div className="contact-stagger relative perspective-[1000px] w-full mt-8 lg:mt-0">

          {/* Form container - Tactical Terminal Window */}
          <div className="relative border border-white/10 bg-[#0a0f18]/90 backdrop-blur-xl p-8 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.8)] flex flex-col gap-6 w-full">

            {/* Terminal Header Bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-indigo via-brand-cyan to-brand-indigo opacity-80" />
            <div className="absolute top-0 left-0 w-full h-8 bg-white/5 border-b border-white/5 flex items-center px-4 justify-between pointer-events-none">
              <div className="text-[10px] font-mono text-gray-500 tracking-widest uppercase">SECURE_TRANSMISSION_PROTOCOL</div>
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500/50" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                <div className="w-2 h-2 rounded-full bg-green-500/50" />
              </div>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6 mt-6 relative z-10 w-full"
            >
              <input
                type="text"
                {...register("honeypot")}
                className="hidden"
                aria-hidden="true"
                tabIndex="-1"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                {/* NAME INPUT */}
                <div className="flex flex-col gap-2 relative group/input">
                  <label className="text-[10px] font-mono tracking-widest text-[#6c7280] font-bold group-focus-within:text-brand-cyan transition-colors flex items-center gap-2">
                    <Terminal size={12} className="text-brand-cyan/50" /> [ REQ_DATA ]: NAME
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      {...register("name")}
                      className={`w-full bg-black/40 border-l-2 border-y border-r ${errors.name ? "border-red-500/50" : "border-white/10 border-l-white/20 focus:border-brand-cyan/50 focus:border-l-brand-cyan"} rounded-none px-4 py-3 text-white placeholder:text-gray-600 font-mono text-sm outline-none transition-all pointer-events-auto focus:shadow-[inset_4px_0_0_rgba(6,182,212,0.8)]`}
                      placeholder="_john_doe"
                    />
                    <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-cyan group-focus-within/input:w-full transition-all duration-500" />
                  </div>
                  {errors.name && (
                    <span className="absolute -bottom-5 left-0 text-[10px] font-mono text-red-400 bg-red-500/10 px-1 border border-red-500/30">
                      ERR: {errors.name.message}
                    </span>
                  )}
                </div>

                {/* EMAIL INPUT */}
                <div className="flex flex-col gap-2 relative group/input">
                  <label className="text-[10px] font-mono tracking-widest text-[#6c7280] font-bold group-focus-within:text-brand-cyan transition-colors flex items-center gap-2">
                    <Terminal size={12} className="text-brand-cyan/50" /> [ REQ_DATA ]: EMAIL
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      {...register("email")}
                      className={`w-full bg-black/40 border-l-2 border-y border-r ${errors.email ? "border-red-500/50" : "border-white/10 border-l-white/20 focus:border-brand-cyan/50 focus:border-l-brand-cyan"} rounded-none px-4 py-3 text-white placeholder:text-gray-600 font-mono text-sm outline-none transition-all pointer-events-auto focus:shadow-[inset_4px_0_0_rgba(6,182,212,0.8)]`}
                      placeholder="_john@net.com"
                    />
                    <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-cyan group-focus-within/input:w-full transition-all duration-500" />
                  </div>
                  {errors.email && (
                    <span className="absolute -bottom-5 left-0 text-[10px] font-mono text-red-400 bg-red-500/10 px-1 border border-red-500/30">
                      ERR: {errors.email.message}
                    </span>
                  )}
                </div>
              </div>

              {/* SUBJECT INPUT */}
              <div className="flex flex-col gap-2 relative group/input">
                <label className="text-[10px] font-mono tracking-widest text-[#6c7280] font-bold group-focus-within:text-brand-cyan transition-colors flex items-center gap-2">
                  <Terminal size={12} className="text-brand-cyan/50" /> [ REQ_DATA ]: SUBJECT
                </label>
                <div className="relative">
                  <input
                    type="text"
                    {...register("subject")}
                    className={`w-full bg-black/40 border-l-2 border-y border-r ${errors.subject ? "border-red-500/50" : "border-white/10 border-l-white/20 focus:border-brand-cyan/50 focus:border-l-brand-cyan"} rounded-none px-4 py-3 text-white placeholder:text-gray-600 font-mono text-sm outline-none transition-all pointer-events-auto focus:shadow-[inset_4px_0_0_rgba(6,182,212,0.8)]`}
                    placeholder="_operation_details"
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-cyan group-focus-within/input:w-full transition-all duration-500" />
                </div>
                {errors.subject && (
                  <span className="absolute -bottom-5 left-0 text-[10px] font-mono text-red-400 bg-red-500/10 px-1 border border-red-500/30">
                    ERR: {errors.subject.message}
                  </span>
                )}
              </div>

              {/* MESSAGE INPUT */}
              <div className="flex flex-col gap-2 relative group/input">
                <label className="text-[10px] font-mono tracking-widest text-[#6c7280] font-bold group-focus-within:text-brand-cyan transition-colors flex items-center gap-2">
                  <Terminal size={12} className="text-brand-cyan/50" /> [ REQ_DATA ]: PAYLOAD
                </label>
                <div className="relative">
                  <textarea
                    {...register("message")}
                    rows="5"
                    className={`w-full bg-black/40 border-l-2 border-y border-r ${errors.message ? "border-red-500/50" : "border-white/10 border-l-white/20 focus:border-brand-cyan/50 focus:border-l-brand-cyan"} rounded-none px-4 py-3 text-white placeholder:text-gray-600 font-mono text-sm outline-none transition-all resize-none pointer-events-auto focus:shadow-[inset_4px_0_0_rgba(6,182,212,0.8)]`}
                    placeholder="_enter_data_sequence..."
                  ></textarea>
                  <div className="absolute bottom-[2px] left-0 w-0 h-[1px] bg-brand-cyan group-focus-within/input:w-full transition-all duration-500" />
                </div>
                {errors.message && (
                  <span className="absolute -bottom-5 left-0 text-[10px] font-mono text-red-400 bg-red-500/10 px-1 border border-red-500/30">
                    ERR: {errors.message.message}
                  </span>
                )}
              </div>

              {/* SUBMIT BUTTON */}
              <div className="w-full flex flex-col md:flex-row md:items-center justify-between mt-6 gap-6">
                {/* System Status Readout */}
                <div className="flex items-center gap-3 border border-white/5 bg-black/30 px-3 py-2">
                  <div className="flex items-end gap-[2px] h-3">
                    <motion.div animate={{ height: ["40%", "100%", "60%"] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1 bg-brand-cyan/50" />
                    <motion.div animate={{ height: ["80%", "30%", "100%"] }} transition={{ repeat: Infinity, duration: 1.1 }} className="w-1 bg-brand-cyan/50" />
                    <motion.div animate={{ height: ["50%", "90%", "20%"] }} transition={{ repeat: Infinity, duration: 0.9 }} className="w-1 bg-brand-cyan/50" />
                  </div>
                  <p className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">
                    CONNECTION_SECURE <br /> <span className="text-brand-cyan/50">AWAITING_EXECUTION</span>
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative px-8 py-4 bg-brand-indigo/10 hover:bg-brand-indigo/20 border border-brand-indigo text-brand-indigo hover:text-white font-mono font-bold tracking-widest flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_0_20px_rgba(99,102,241,0.2)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden pointer-events-auto uppercase w-full md:w-auto outline-none"
                >
                  <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-brand-indigo group-hover:border-white transition-colors" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-brand-indigo group-hover:border-white transition-colors" />

                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-indigo/30 to-transparent -translate-x-[150%] group-hover:animate-[shimmer_1.5s_infinite]" />

                  <span className="relative z-10 flex items-center gap-3 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]">
                    {isSubmitting ? "TRANSMITTING..." : "INIT_TRANSMIT"}
                    <Send
                      size={18}
                      className={`${isSubmitting ? "animate-pulse" : "group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"}`}
                    />
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
