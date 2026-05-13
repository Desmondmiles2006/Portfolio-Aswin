import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Microscope, Train, Brain, Droplets, Eye, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "AI-Enabled Digital Microscope",
    subtitle: "Smart Diagnostics",
    period: "Feb 2026 – Present",
    status: "ongoing",
    tags: ["Python", "OpenCV", "ESP32-CAM", "NumPy", "Flask"],
    domain: "Computer Vision",
    description:
      "AI-enabled digital microscope capturing and analyzing microscopic images in real time. Integrated ESP32-CAM for image acquisition with automated detection and classification.",
    outcome: "Low-cost, portable solution for educational and diagnostic assistance.",
    icon: Microscope,
    color: "primary",
    link: "#",
  },
  {
    title: "Intelligent Train Monitoring",
    subtitle: "Decision System",
    period: "Mar 2025 – Present",
    status: "ongoing",
    tags: ["MATLAB Simulink", "Sensor Fusion", "GPS", "INS", "LiDAR", "Radar"],
    domain: "IoT · Embedded · Simulation",
    description:
      "3D train monitoring system using MATLAB Simulink integrating GPS, INS, LiDAR, and radar sensors. Implemented sensor fusion and decision logic for station vs. transit status.",
    outcome: "Real-time signal processing with modular architecture for safe railway ops.",
    icon: Train,
    color: "accent",
    link: null,
  },
  {
    title: "Epilepsy Monitoring & Seizure Prediction",
    subtitle: "IoT Healthcare System",
    period: "Jan 2025 – Apr 2026",
    status: "completed",
    tags: ["Python", "LSTM", "ESP32", "GSR Sensor", "Accelerometer"],
    domain: "ML · IoT · Healthcare",
    description:
      "IoT-based epilepsy monitoring integrating GSR, accelerometer, and gyroscope sensors with ESP32. LSTM model for predictive seizure detection with cloud connectivity.",
    outcome: "Remote monitoring and caregiver alerts via mobile notifications.",
    icon: Brain,
    color: "copper",
    link: null,
  },
  {
    title: "IoT-Based Smart IV Monitoring",
    subtitle: "Healthcare System",
    period: "Feb 2024 – Jul 2024",
    status: "completed",
    tags: ["ESP32", "Sensors", "Embedded C", "IoT Platforms"],
    domain: "IoT · Embedded · Healthcare",
    description:
      "Smart IV monitoring system tracking fluid levels and flow rate in real time. Integrated sensors with ESP32 to detect anomalies like empty bottles or flow interruptions.",
    outcome: "Automated healthcare alerts reducing manual supervision needs.",
    icon: Droplets,
    color: "gold",
    link: "#",
  },
  {
    title: "Stress Detection via Pupillometry",
    subtitle: "Computer Vision",
    period: "May 2025 – Nov 2025",
    status: "completed",
    tags: ["Python", "OpenCV", "NumPy", "Machine Learning"],
    domain: "ML · Computer Vision",
    description:
      "Stress detection system based on pupil dilation analysis using computer vision. Processed eye images to extract features and applied ML models for stress classification.",
    outcome: "Non-invasive physiological signal analysis for mental health monitoring.",
    icon: Eye,
    color: "primary",
    link: "#",
  },
];

const colorMap: Record<string, { border: string; tag: string; text: string; dot: string; glow: string }> = {
  primary: {
    border: "border-primary/25 hover:border-primary/55",
    tag: "bg-primary/8 text-primary border-primary/20",
    text: "text-primary",
    dot: "bg-primary",
    glow: "from-primary/8",
  },
  accent: {
    border: "border-accent/25 hover:border-accent/55",
    tag: "bg-accent/8 text-accent border-accent/20",
    text: "text-accent",
    dot: "bg-accent",
    glow: "from-accent/8",
  },
  copper: {
    border: "border-copper/25 hover:border-copper/55",
    tag: "bg-copper/8 text-copper border-copper/20",
    text: "text-copper",
    dot: "bg-copper",
    glow: "from-copper/8",
  },
  gold: {
    border: "border-gold/25 hover:border-gold/55",
    tag: "bg-gold/8 text-gold border-gold/20",
    text: "text-gold",
    dot: "bg-gold",
    glow: "from-gold/8",
  },
};

export const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="py-28 relative">
      <div className="absolute inset-0 pcb-grid opacity-10" />

      <div className="container px-6 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-20">
            <motion.span
              className="text-sm font-mono text-primary mb-3 block tracking-widest"
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              // PROJECTS
            </motion.span>
            <motion.h2
              className="text-4xl sm:text-5xl font-bold mb-5"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.08 }}
            >
              Engineering <span className="text-gradient-primary">Portfolio</span>
            </motion.h2>
            <motion.p
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.16 }}
            >
              Real academic and research projects spanning computer vision, IoT, ML, and embedded systems.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => {
              const c = colorMap[project.color];
              const Icon = project.icon;
              const statusLabel = project.status === "ongoing" ? "Ongoing" : "Completed";
              const statusColor = project.status === "ongoing" ? "bg-primary/20 text-primary border-primary/30" : "bg-muted/20 text-muted-foreground border-muted/30";
              return (
                <motion.div
                  key={project.title}
                  className={`group relative p-6 rounded-2xl border ${c.border} bg-card/50 backdrop-blur-sm transition-all duration-400 flex flex-col`}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -8, scale: 1.01 }}
                >
                  {/* Hover glow */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${c.glow} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  {/* Top accent */}
                  <div className={`absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent ${c.dot.replace("bg-", "via-")} to-transparent opacity-50`} />

                  <div className="relative flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl border border-border bg-background/60`}>
                        <Icon className={`w-5 h-5 ${c.text}`} />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-mono px-2.5 py-1 rounded-full border ${statusColor}`}>
                          {statusLabel}
                        </span>
                        {project.link && (
                          <motion.div
                            className="p-1.5 rounded-lg border border-border opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                            whileHover={{ scale: 1.15 }}
                          >
                            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                          </motion.div>
                        )}
                      </div>
                    </div>

                    <div className="mb-1">
                      <span className={`text-xs font-mono ${c.text} uppercase tracking-wider`}>{project.domain}</span>
                    </div>
                    <h3 className="text-lg font-bold font-mono mb-1 group-hover:text-primary transition-colors duration-200">{project.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-4 leading-relaxed flex-1">{project.description}</p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.map((tag) => (
                        <span key={tag} className={`px-2 py-0.5 text-[11px] font-mono rounded border ${c.tag}`}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Period & Outcome */}
                    <div className={`pt-4 border-t border-border space-y-2`}>
                      <div>
                        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Period</span>
                        <p className="text-xs font-mono text-muted-foreground">{project.period}</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Impact</span>
                        <p className={`text-sm mt-1 font-medium ${c.text}`}>{project.outcome}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
