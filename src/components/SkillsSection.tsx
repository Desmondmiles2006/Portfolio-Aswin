import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    title: "Languages",
    skills: ["Python", "TypeScript", "C/C++", "Rust", "SQL", "Go"],
    color: "primary",
  },
  {
    title: "Embedded",
    skills: ["Arduino", "ESP32", "Raspberry Pi", "MQTT", "LoRaWAN", "FreeRTOS"],
    color: "accent",
  },
  {
    title: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS", "D3.js", "Framer Motion", "WebGL"],
    color: "copper",
  },
  {
    title: "Backend",
    skills: ["Node.js", "FastAPI", "PostgreSQL", "Redis", "GraphQL", "gRPC"],
    color: "gold",
  },
  {
    title: "DevOps",
    skills: ["Docker", "Kubernetes", "Terraform", "AWS", "GitHub Actions", "Prometheus"],
    color: "primary",
  },
  {
    title: "AI/ML",
    skills: ["TensorFlow", "PyTorch", "scikit-learn", "Pandas", "Apache Spark", "MLflow"],
    color: "accent",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const getColorClasses = (color: string) => {
  switch (color) {
    case "primary":
      return { border: "border-primary/30", bg: "bg-primary/10", text: "text-primary" };
    case "accent":
      return { border: "border-accent/30", bg: "bg-accent/10", text: "text-accent" };
    case "copper":
      return { border: "border-copper/30", bg: "bg-copper/10", text: "text-copper" };
    case "gold":
      return { border: "border-gold/30", bg: "bg-gold/10", text: "text-gold" };
    default:
      return { border: "border-primary/30", bg: "bg-primary/10", text: "text-primary" };
  }
};

export const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 relative bg-surface-overlay">
      <div className="absolute inset-0 pcb-grid opacity-15" />
      
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
            <span className="text-sm font-mono text-primary mb-4 block">// TECHNOLOGY STACK</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Tools & <span className="text-gradient-primary">Technologies</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive toolkit for building systems from silicon to cloud.
            </p>
          </motion.div>

          {/* Skills grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, categoryIndex) => {
              const colors = getColorClasses(category.color);
              return (
                <motion.div
                  key={category.title}
                  variants={itemVariants}
                  className={`p-6 rounded-xl border ${colors.border} bg-card/50 backdrop-blur-sm`}
                >
                  <h3 className={`text-lg font-bold font-mono mb-4 ${colors.text}`}>
                    {category.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        className={`px-3 py-1.5 text-sm font-mono rounded-md border ${colors.border} ${colors.bg}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{
                          duration: 0.3,
                          delay: categoryIndex * 0.1 + skillIndex * 0.05,
                        }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Additional tools */}
          <motion.div
            variants={itemVariants}
            className="mt-12 p-6 rounded-xl border border-border bg-card/30"
          >
            <h3 className="text-lg font-bold font-mono mb-4 text-center">Additional Tools</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Git", "Linux", "Vim", "VS Code", "Figma", "Notion", "Jira",
                "Postman", "Wireshark", "Oscilloscope", "Logic Analyzer"
              ].map((tool) => (
                <span
                  key={tool}
                  className="px-3 py-1.5 text-sm font-mono rounded-md border border-border bg-muted/30 text-muted-foreground"
                >
                  {tool}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
