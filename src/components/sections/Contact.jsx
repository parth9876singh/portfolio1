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
  Radio,
  Wifi,
  Smile
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

      toast.success("Message sent successfully!");
      reset();
    } catch (error) {
      console.error(error);
      toast.error("Transmission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-32 relative w-full overflow-hidden bg-[#0a0c14] border-t border-white/5"
    >
      {/* Floating Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/2 right-0 w-[550px] h-[550px] bg-brand-cyan/5 rounded-full blur-[110px] animate-blob" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-indigo/5 rounded-full blur-[110px] animate-blob-reverse" />
      </div>

      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center -z-10 opacity-30 pointer-events-none overflow-hidden">
        <span 
          className="text-[80px] md:text-[140px] lg:text-[180px] font-black text-transparent whitespace-nowrap" 
          style={{ WebkitTextStroke: "2px rgba(6, 182, 212, 0.08)" }}
        >
          CONNECT
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10 w-full">
        
        {/* Left Panel */}
        <div className="flex flex-col">
          
          <div className="contact-stagger inline-flex items-center gap-2 px-5 py-2 bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-xs font-bold rounded-full mb-6 tracking-wide uppercase shadow-[4px_4px_10px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(0,0,0,0.4),inset_3px_3px_6px_rgba(255,255,255,0.05)] w-fit">
            <Radio size={14} className="text-brand-cyan animate-pulse" /> GET IN TOUCH
          </div>

          <h2 className="contact-stagger text-4xl md:text-5xl font-display font-extrabold text-white mb-6 leading-snug uppercase tracking-wider relative">
            Let's build <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-indigo">extraordinary</span> things.
          </h2>

          <div className="contact-stagger flex flex-col gap-6 mt-8">
            {[
              {
                icon: <Mail size={20} className="text-brand-cyan" />,
                label: "SMTP Relay",
                value: config.email,
                href: `mailto:${config.email}`,
              },
              {
                icon: <Phone size={20} className="text-brand-indigo" />,
                label: "Voice Line",
                value: config.phone,
                href: `tel:${config.phone}`,
              },
              {
                icon: <MapPin size={20} className="text-brand-cyan" />,
                label: "Geography",
                value: config.location,
                href: null,
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-5 text-gray-300 group">
                {/* Rounded Clay Circle Icon Container */}
                <div className="relative w-12 h-12 rounded-full flex flex-shrink-0 items-center justify-center bg-white/5 border border-white/5 group-hover:bg-brand-cyan/10 group-hover:border-brand-cyan/35 transition-all duration-500 shadow-[inset_1.5px_1.5px_3px_rgba(255,255,255,0.05),4px_4px_12px_rgba(0,0,0,0.3)] group-hover:scale-105">
                   <div className="relative z-10">
                     {item.icon}
                   </div>
                </div>
                
                <div className="pt-1">
                  <p className="text-[10px] text-brand-cyan/80 font-sans font-bold mb-1 tracking-wider uppercase flex items-center gap-1.5">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : "_self"}
                      rel="noreferrer"
                      className="text-base font-sans font-semibold text-white hover:text-brand-cyan transition-colors pointer-events-auto break-all"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-base font-sans font-semibold text-white">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Social Icons */}
          <div className="contact-stagger mt-12 pt-8 border-t border-white/5 relative">
            <p className="text-[10px] font-sans font-bold uppercase tracking-wider text-gray-500 mb-6 flex items-center gap-2">
              <Wifi size={12} className="text-gray-400 animate-pulse" /> Uplinks
            </p>
            <div className="flex gap-4">
              {[
                { icon: Github, href: config.social.github, hoverBorder: "hover:border-brand-indigo/40 hover:bg-brand-indigo/10 hover:text-brand-indigo" },
                { icon: Linkedin, href: config.social.linkedin, hoverBorder: "hover:border-brand-cyan/40 hover:bg-brand-cyan/10 hover:text-brand-cyan" },
                { icon: Code2, href: config.social.leetcode || "https://hackerrank.com", hoverBorder: "hover:border-green-400/40 hover:bg-green-500/10 hover:text-green-400" }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`group w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${social.hoverBorder} shadow-[4px_4px_10px_rgba(0,0,0,0.3),inset_-3px_-3px_6px_rgba(0,0,0,0.4),inset_3px_3px_6px_rgba(255,255,255,0.05)]`}
                >
                  <social.icon size={20} className="text-gray-400 transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Right Form Panel - Puffy Clay Box */}
        <div className="contact-stagger relative w-full mt-8 lg:mt-0">
          <div className="relative clay-card p-8 md:p-10 shadow-[12px_12px_40px_rgba(0,0,0,0.5)] flex flex-col gap-6 w-full hover:border-brand-indigo/35">
            
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6 relative z-10 w-full"
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
                  <label className="text-[10px] font-sans tracking-wider text-gray-400 font-bold group-focus-within:text-brand-cyan transition-colors">
                     YOUR NAME
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      {...register("name")}
                      className={`w-full clay-input px-5 py-4 text-white placeholder:text-gray-600 font-sans text-sm outline-none transition-all pointer-events-auto ${errors.name ? "border-red-500/30 focus:border-red-500/50" : "focus:border-brand-cyan/40"}`}
                      placeholder="e.g. John Doe"
                    />
                  </div>
                  {errors.name && (
                    <span className="text-[10px] font-sans text-red-400 mt-1 pl-1">
                      {errors.name.message}
                    </span>
                  )}
                </div>

                {/* EMAIL INPUT */}
                <div className="flex flex-col gap-2 relative group/input">
                  <label className="text-[10px] font-sans tracking-wider text-gray-400 font-bold group-focus-within:text-brand-cyan transition-colors">
                     EMAIL ADDRESS
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      {...register("email")}
                      className={`w-full clay-input px-5 py-4 text-white placeholder:text-gray-600 font-sans text-sm outline-none transition-all pointer-events-auto ${errors.email ? "border-red-500/30 focus:border-red-500/50" : "focus:border-brand-cyan/40"}`}
                      placeholder="e.g. john@net.com"
                    />
                  </div>
                  {errors.email && (
                    <span className="text-[10px] font-sans text-red-400 mt-1 pl-1">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>

              {/* SUBJECT INPUT */}
              <div className="flex flex-col gap-2 relative group/input">
                <label className="text-[10px] font-sans tracking-wider text-gray-400 font-bold group-focus-within:text-brand-cyan transition-colors">
                   SUBJECT
                </label>
                <div className="relative">
                  <input
                    type="text"
                    {...register("subject")}
                    className={`w-full clay-input px-5 py-4 text-white placeholder:text-gray-600 font-sans text-sm outline-none transition-all pointer-events-auto ${errors.subject ? "border-red-500/30 focus:border-red-500/50" : "focus:border-brand-cyan/40"}`}
                    placeholder="Subject of transmission"
                  />
                </div>
                {errors.subject && (
                  <span className="text-[10px] font-sans text-red-400 mt-1 pl-1">
                    {errors.subject.message}
                  </span>
                )}
              </div>

              {/* MESSAGE INPUT */}
              <div className="flex flex-col gap-2 relative group/input">
                <label className="text-[10px] font-sans tracking-wider text-gray-400 font-bold group-focus-within:text-brand-cyan transition-colors">
                   MESSAGE PAYLOAD
                </label>
                <div className="relative">
                  <textarea
                    {...register("message")}
                    rows="5"
                    className={`w-full clay-input px-5 py-4 text-white placeholder:text-gray-600 font-sans text-sm outline-none transition-all resize-none pointer-events-auto ${errors.message ? "border-red-500/30 focus:border-red-500/50" : "focus:border-brand-cyan/40"}`}
                    placeholder="Enter message details here..."
                  ></textarea>
                </div>
                {errors.message && (
                  <span className="text-[10px] font-sans text-red-400 mt-1 pl-1">
                    {errors.message.message}
                  </span>
                )}
              </div>

              {/* SUBMIT BUTTON */}
              <div className="w-full flex flex-col md:flex-row md:items-center justify-between mt-6 gap-6">
                 {/* Connection Status Bubble */}
                 <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/5 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.05)]">
                   <Smile size={16} className="text-brand-cyan animate-bounce" />
                   <p className="text-[10px] font-sans font-bold text-gray-400 uppercase tracking-wider">
                     Communications Open
                   </p>
                 </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="clay-btn relative px-8 py-4 bg-brand-indigo border border-indigo-400/20 text-white font-bold tracking-wider flex items-center justify-center gap-2 hover:shadow-[0_6px_22px_rgba(99,102,241,0.4)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer uppercase w-full md:w-auto outline-none"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send
                      size={16}
                      className={`${isSubmitting ? "animate-pulse" : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"}`}
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
