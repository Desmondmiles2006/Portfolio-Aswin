import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar, ExternalLink, MapPin } from "lucide-react";

const experiences = [
  {
    title: "Software Developer Intern",
    company: "French Institute of Pondicherry",
    period: "May 2024 – Jun 2024",
    location: "11, St Louis St, White Town, Puducherry",
    link: "#",
    description:
      "Developed an interactive and responsive mobile application for Mangrove Species Identification under the Departments of Geomatics and Ecology.",
    highlights: [
      "Built user-friendly identification kit tool for ecological research",
      "Improved species documentation efficiency",
      "Collaborated with software & ecology research teams",
      "Delivered formal internship research report",
    ],
    color: "primary",
  },
  {
    title: "In-Plant Training Intern",
    company: "Lenovo (India) Private Limited",
    period: "Jun 2025 – Jul 2025",
    location: "Pondicherry, India",
    link: "#",
    description:
      "Completed an in-plant training program gaining hands-on exposure to Manufacturing Operations within a leading global technology environment.",
    highlights: [
      "Hands-on exposure to manufacturing operations",
      "Engaged with operational processes at scale",
      "Experience in global tech manufacturing environment",
    ],
    color: "accent",
  },
  {
    title: "AI-ML Virtual Intern",
    company: "AICTE EduSkills",
    period: "Jul 2024 – Sep 2024",
    location: "Remote (India)",
    link: "#",
    description:
      "Completed a 10-week AI-ML Virtual Internship under the AICTE-EduSkills program supported by Google for Developers India Edu Program.",
    highlights: [
      "10-week AI/ML intensive program — Grade B",
      "Hands-on with ML concepts and applications",
      "Conducted via National Internship Portal, Govt of India",
    ],
    color: "copper",
  },
  {
    title: "Artificial Intelligence Intern",
    company: "Btech Walleh",
    period: "Jun 2024",
    location: "Remote (India)",
    link: "#",
    description:
      "Completed a one-month AI Mentorship Internship program focused on core concepts and practical applications of Artificial Intelligence.",
    highlights: [
      "Core AI concepts and practical applications",
      "Structured mentorship sessions with industry experts",
      "Strong aptitude demonstrated throughout program",
    ],
    color: "gold",
  },
];

const colorMap: Record<string, { dot: string; line: string; text: string; tag: string }> = {
  primary: { dot: "bg-primary shadow-primary/50", line: "from-primary", text: "text-primary", tag: "bg-primary/10 text-primary border-primary/20" },
  accent: { dot: "bg-accent shadow-accent/50", line: "from-accent", text: "text-accent", tag: "bg-accent/10 text-accent border-accent/20" },
  copper: { dot: "bg-copper shadow-copper/50", line: "from-copper", text: "text-copper", tag: "bg-copper/10 text-copper border-copper/20" },
  gold: { dot: "bg-gold shadow-gold/50", line: "from-gold", text: "text-gold", tag: "bg-gold/10 text-gold border-gold/20" },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.18 } },
};

const cardVariants = {
  hidden: { opacity: 0, x: -28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="py-28 relative">
      <div className="absolute inset-0 pcb-grid opacity-10" />

      <div className="container px-6 relative">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={cardVariants} className="text-center mb-20">
            <span className="text-sm font-mono text-primary mb-3 block tracking-widest">// EXPERIENCE</span>
            <h2 className="text-4xl sm:text-5xl font-bold mb-5">
              Professional <span className="text-gradient-primary">Journey</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Real-world internships spanning mobile development, manufacturing, and AI/ML.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative pl-8">
            {/* Vertical line */}
            <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-accent/50 to-transparent" />

            <div className="space-y-10">
              {experiences.map((exp, index) => {
                const c = colorMap[exp.color];
                return (
                  <motion.div key={exp.title} variants={cardVariants} className="relative">
                    {/* Timeline dot */}
                    <div className={`absolute -left-8 top-6 w-3.5 h-3.5 rounded-full ${c.dot} shadow-lg border-2 border-background z-10 -translate-x-1/2`} />

                    {/* Card */}
                    <motion.div
                      className="group p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:bg-card/80 transition-all duration-400"
                      whileHover={{ y: -4, scale: 1.005 }}
                      transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    >
                      {/* Subtle top glow line */}
                      <div className={`absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent ${c.line} to-transparent opacity-40`} />

                      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Briefcase className={`w-4 h-4 ${c.text}`} />
                            <span className={`text-sm font-mono font-semibold ${c.text}`}>{exp.company}</span>
                          </div>
                          <h3 className="text-xl font-bold font-mono">{exp.title}</h3>
                        </div>
                        <div className="flex flex-col items-end gap-1 text-right">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono border ${c.tag}`}>
                            <Calendar className="w-3 h-3" />
                            {exp.period}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            {exp.location}
                          </span>
                        </div>
                      </div>

                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{exp.description}</p>

                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {exp.highlights.map((h) => (
                          <li key={h} className="flex items-start gap-2 text-sm text-foreground/75">
                            <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.dot}`} />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
