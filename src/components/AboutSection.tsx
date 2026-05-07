import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Cpu, Globe, Brain, FlaskConical } from "lucide-react";

const domains = [
  {
    icon: Cpu,
    title: "Embedded & IoT",
    description: "Designing firmware and hardware interfaces for real-time sensor networks, edge computing, and IoT-based healthcare systems using ESP32 and sensor fusion.",
    color: "text-primary",
    borderColor: "border-primary/25",
    hover: "hover:border-primary/50",
  },
  {
    icon: Globe,
    title: "Full-Stack Web",
    description: "Building scalable platforms with React.js, Node.js, Express.js, MongoDB and Firebase — from responsive UIs to robust REST APIs.",
    color: "text-accent",
    borderColor: "border-accent/25",
    hover: "hover:border-accent/50",
  },
  {
    icon: Brain,
    title: "AI/ML & Computer Vision",
    description: "Implementing ML models (LSTM, classification, CV) for real-world applications in healthcare, stress detection, and microscopic diagnostics.",
    color: "text-copper",
    borderColor: "border-copper/25",
    hover: "hover:border-copper/50",
  },
  {
    icon: FlaskConical,
    title: "Research & Innovation",
    description: "Published internship research at French Institute of Pondicherry, 1st place at national Ideathon, and multiple ongoing SRM research projects.",
    color: "text-gold",
    borderColor: "border-gold/25",
    hover: "hover:border-gold/50",
  },
];

const stats = [
  { value: "9.39", label: "CGPA / 10" },
  { value: "5+", label: "Projects" },
  { value: "4+", label: "Internships" },
  { value: "1st", label: "National Place" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.13 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="py-28 relative">
      <div className="absolute inset-0 pcb-grid opacity-20" />

      <div className="container px-6 relative">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-20">
            <span className="text-sm font-mono text-primary mb-3 block tracking-widest">// ABOUT</span>
            <h2 className="text-4xl sm:text-5xl font-bold mb-5">
              Cross-Domain <span className="text-gradient-primary">Engineering</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Innovative and tech-savvy developer with expertise in full-stack development, IoT, AI, and database management. Passionate about building efficient, user-friendly applications with real-world impact.
            </p>
          </motion.div>

          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
            {domains.map((domain) => (
              <motion.div
                key={domain.title}
                variants={itemVariants}
                className={`group relative p-6 rounded-2xl border ${domain.borderColor} ${domain.hover} bg-card/50 backdrop-blur-sm transition-all duration-350`}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                <div className="relative flex items-start gap-4">
                  <div className="p-3 rounded-xl border border-border bg-background/60 flex-shrink-0">
                    <domain.icon className={`w-5 h-5 ${domain.color}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 font-mono">{domain.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{domain.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-5"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                className="text-center p-6 rounded-2xl border border-border bg-card/30 backdrop-blur-sm hover:border-primary/30 hover:bg-card/50 transition-all duration-300"
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                <div className="text-3xl font-bold text-gradient-primary mb-1.5 font-mono">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
