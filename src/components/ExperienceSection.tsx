import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar } from "lucide-react";

const experiences = [
  {
    title: "Senior Systems Engineer",
    company: "TechCorp Industries",
    period: "2022 – Present",
    description: "Leading embedded systems development for industrial IoT products. Architecting real-time data pipelines and edge computing solutions.",
    highlights: [
      "Designed firmware for 10+ production devices",
      "Reduced system latency by 60%",
      "Mentored team of 5 junior engineers",
    ],
  },
  {
    title: "Full-Stack Developer",
    company: "FinTech Solutions Inc.",
    period: "2020 – 2022",
    description: "Built automated financial reporting systems and compliance tools. Developed real-time transaction monitoring dashboards.",
    highlights: [
      "Automated 90% of compliance reporting",
      "Built ML-based fraud detection system",
      "Processed $10M+ daily transactions",
    ],
  },
  {
    title: "Software Engineering Intern",
    company: "Innovation Labs",
    period: "2019 – 2020",
    description: "Contributed to R&D projects in IoT and machine learning. Developed prototypes for smart agriculture systems.",
    highlights: [
      "Built sensor network proof-of-concept",
      "Implemented data visualization tools",
      "Published internal technical documentation",
    ],
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
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24 relative">
      <div className="absolute inset-0 pcb-grid opacity-10" />
      
      <div className="container px-6 relative">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="text-sm font-mono text-primary mb-4 block">// EXPERIENCE</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Professional <span className="text-gradient-primary">Journey</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Building expertise across embedded systems, web platforms, and financial technology.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-copper transform md:-translate-x-1/2" />

            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                variants={itemVariants}
                className={`relative mb-12 md:mb-16 ${
                  index % 2 === 0 ? "md:pr-1/2 md:text-right" : "md:pl-1/2 md:ml-auto"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 top-0 w-4 h-4 rounded-full bg-primary border-4 border-background transform -translate-x-1/2 z-10">
                  <div className="absolute inset-0 rounded-full bg-primary animate-glow-pulse" />
                </div>

                {/* Content card */}
                <div
                  className={`ml-8 md:ml-0 ${
                    index % 2 === 0 ? "md:mr-8" : "md:ml-8"
                  } p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-colors`}
                >
                  <div className={`flex items-center gap-2 mb-2 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                    <Briefcase className="w-4 h-4 text-primary" />
                    <span className="text-sm font-mono text-copper">{exp.company}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold font-mono mb-2">{exp.title}</h3>
                  
                  <div className={`flex items-center gap-2 text-sm text-muted-foreground mb-4 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                    <Calendar className="w-4 h-4" />
                    <span>{exp.period}</span>
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-4">{exp.description}</p>
                  
                  <ul className={`space-y-2 ${index % 2 === 0 ? "md:text-right" : ""}`}>
                    {exp.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className={`flex items-center gap-2 text-sm ${
                          index % 2 === 0 ? "md:flex-row-reverse" : ""
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        <span className="text-foreground/80">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
