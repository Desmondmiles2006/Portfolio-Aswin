import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, CircuitBoard, Cpu, Zap, Github } from "lucide-react";
import { CircuitBackground } from "./CircuitBackground";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

const roles = [
  "Full-Stack Developer",
  "IoT Systems Engineer",
  "AI/ML Engineer",
  "Embedded Systems Dev",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

function TypewriterText({ texts }: { texts: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (prefersReducedMotion) {
      // If user prefers reduced motion, just show the first text
      setDisplayed(texts[0]);
      return;
    }

    const current = texts[currentIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayed.length < current.length) {
          setDisplayed(current.slice(0, displayed.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        if (displayed.length > 0) {
          setDisplayed(displayed.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? 45 : 90);
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, currentIndex, texts, prefersReducedMotion]);

  return (
    <span className="text-gradient-primary">
      {displayed}
      <span
        className="inline-block w-0.5 h-[0.85em] ml-1 bg-primary align-middle"
        style={{ animation: "blink 1s step-end infinite" }}
      />
    </span>
  );
}

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <CircuitBackground />

      <div className="container relative z-10 px-6 py-20">
        <motion.div
          className="max-w-5xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Status pill */}
          <motion.div
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-primary/25 bg-primary/5 mb-10 backdrop-blur-sm"
            variants={itemVariants}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-sm font-mono text-primary">B.Tech CSE · SRM IST-Trichy · CGPA 9.39/10</span>
          </motion.div>

          {/* Name */}
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 leading-[1.05] tracking-tight"
            variants={itemVariants}
          >
            <span className="text-foreground">Aswin Kannaa R</span>
          </motion.h1>

          {/* Typewriter role */}
          <motion.div
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-7 min-h-[1.4em]"
            variants={itemVariants}
          >
            <TypewriterText texts={roles} />
          </motion.div>

          {/* Bio */}
          <motion.p
            className="text-base sm:text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Bridging{" "}
            <span className="text-primary font-medium">embedded hardware</span>,{" "}
            <span className="text-accent font-medium">full-stack web</span>, and{" "}
            <span className="text-copper font-medium">AI/ML systems</span> — building
            real-world solutions with measurable impact. Interned at French Institute of Pondicherry &amp; Lenovo India.
          </motion.p>

          {/* Icon tags */}
          <motion.div className="flex justify-center gap-6 mb-12" variants={itemVariants}>
            {[
              { icon: Cpu, label: "Embedded", color: "text-primary", hover: "hover:border-primary/60" },
              { icon: CircuitBoard, label: "IoT", color: "text-accent", hover: "hover:border-accent/60" },
              { icon: Zap, label: "AI/ML", color: "text-copper", hover: "hover:border-copper/60" },
            ].map((item) => (
              <motion.div
                key={item.label}
                className="flex flex-col items-center gap-2 group"
                whileHover={{ scale: 1.08, y: -4 }}
                transition={{ type: "spring", stiffness: 350, damping: 18 }}
              >
                <div className={`p-3.5 rounded-xl border border-border bg-card/60 backdrop-blur-sm ${item.hover} transition-all duration-300`}>
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <span className="text-xs font-mono text-muted-foreground">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" variants={itemVariants}>
            <Button
              size="lg"
              className="group px-8 py-6 text-base font-mono bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              View Projects
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-base font-mono border-copper/40 text-copper hover:bg-copper/10 hover:border-copper/70 transition-all duration-300"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Github className="mr-2 w-4 h-4" />
              Collaborate
            </Button>
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
          >
            <motion.div
              className="flex flex-col items-center gap-1.5 cursor-pointer"
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-5 h-8 rounded-full border-2 border-primary/30 flex justify-center pt-1.5">
                <motion.div
                  className="w-1 h-2 rounded-full bg-primary"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <span className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-widest">Scroll</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </section>
  );
};
