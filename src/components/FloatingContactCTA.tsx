import { motion } from "framer-motion";
import { Mail, MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";

export const FloatingContactCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector("section");
      const heroBottom = (heroSection?.getBoundingClientRect().bottom || 0) + window.scrollY;
      setIsVisible(window.scrollY > heroBottom - window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      const top = contactSection.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: Math.max(top - 80, 0), behavior: "smooth" });
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      className="fixed bottom-8 right-8 z-40 p-4 rounded-full bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/40 hover:shadow-xl hover:shadow-primary/60 transition-all duration-300 group"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={isVisible ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Scroll to contact section"
    >
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="relative"
      >
        <Mail className="w-6 h-6 text-white" />
      </motion.div>

      {/* Tooltip */}
      <motion.div
        className="absolute right-full mr-3 px-3 py-2 bg-background border border-border rounded-lg whitespace-nowrap text-sm font-mono opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        initial={{ opacity: 0, x: 10 }}
        whileHover={{ opacity: 1, x: 0 }}
      >
        Get in Touch
        <div className="absolute left-full top-1/2 -translate-y-1/2 w-2 h-2 bg-background border-r border-t border-border rotate-45" />
      </motion.div>

      {/* Pulse effect */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-primary/40"
        animate={{ scale: [1, 1.3], opacity: [0.8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.button>
  );
};
