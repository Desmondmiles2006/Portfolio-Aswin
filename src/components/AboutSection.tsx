import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Cpu, Globe, Brain, Wallet } from "lucide-react";

const domains = [
  {
    icon: Cpu,
    title: "Embedded & IoT",
    description: "Designing firmware and hardware interfaces for real-time sensor networks, edge computing, and industrial automation systems.",
    color: "text-primary",
    borderColor: "border-primary/30",
  },
  {
    icon: Globe,
    title: "Web & Automation",
    description: "Building scalable full-stack platforms with automated pipelines, real-time data processing, and intelligent workflow orchestration.",
    color: "text-accent",
    borderColor: "border-accent/30",
  },
  {
    icon: Brain,
    title: "AI Analytics",
    description: "Implementing machine learning models for predictive analytics, anomaly detection, and decision-support intelligence systems.",
    color: "text-copper",
    borderColor: "border-copper/30",
  },
  {
    icon: Wallet,
    title: "FinTech Systems",
    description: "Engineering secure, reliable financial automation tools with compliance-aware architecture and operational efficiency focus.",
    color: "text-gold",
    borderColor: "border-gold/30",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 relative">
      <div className="absolute inset-0 pcb-grid opacity-20" />
      
      <div className="container px-6 relative">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="text-sm font-mono text-primary mb-4 block">// ABOUT</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Cross-Domain <span className="text-gradient-primary">Engineering</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A systems engineer with deep expertise spanning hardware interfaces to cloud infrastructure,
              focused on building reliable, scalable solutions with measurable real-world impact.
            </p>
          </motion.div>

          {/* Domain cards */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {domains.map((domain, index) => (
              <motion.div
                key={domain.title}
                variants={itemVariants}
                className={`group relative p-6 rounded-lg border ${domain.borderColor} bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300`}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg border border-border bg-surface-elevated`}>
                      <domain.icon className={`w-6 h-6 ${domain.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 font-mono">{domain.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {domain.description}
                      </p>
                    </div>
                  </div>

                  {/* Circuit trace decoration */}
                  <div className="absolute bottom-0 right-0 w-24 h-24 opacity-10">
                    <svg viewBox="0 0 100 100" className={domain.color}>
                      <path
                        d="M0,50 L30,50 L40,30 L60,30 L70,50 L100,50"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <circle cx="30" cy="50" r="3" fill="currentColor" />
                      <circle cx="70" cy="50" r="3" fill="currentColor" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
          >
            {[
              { value: "5+", label: "Years Experience" },
              { value: "20+", label: "Projects Delivered" },
              { value: "10+", label: "Tech Stack" },
              { value: "100%", label: "System Uptime" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center p-6 rounded-lg border border-border bg-card/30"
              >
                <div className="text-3xl font-bold text-gradient-primary mb-2 font-mono">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
