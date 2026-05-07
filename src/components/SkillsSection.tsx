import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    title: "Languages",
    skills: ["Python", "C++", "C", "JavaScript", "SQL", "MATLAB"],
    color: "primary",
  },
  {
    title: "Embedded & Hardware",
    skills: ["ESP32", "ESP32-CAM", "Sensor Integration", "Embedded C", "Circuit Debugging"],
    color: "accent",
  },
  {
    title: "Frontend",
    skills: ["React.js", "Tailwind CSS", "HTML/CSS", "Framer Motion"],
    color: "copper",
  },
  {
    title: "Backend & APIs",
    skills: ["Node.js", "Express.js", "Flask", "REST API", "MongoDB", "Firebase"],
    color: "gold",
  },
  {
    title: "AI / ML",
    skills: ["Machine Learning", "Computer Vision", "LSTM", "OpenCV", "NumPy", "Scikit-learn"],
    color: "primary",
  },
  {
    title: "Simulation & Tools",
    skills: ["MATLAB Simulink", "Sensor Fusion", "Git", "GitHub", "Notion API"],
    color: "accent",
  },
];

const colorMap: Record<string, { border: string; bg: string; text: string; header: string }> = {
  primary: {
    border: "border-primary/25",
    bg: "bg-primary/8 border-primary/20 text-primary hover:bg-primary/15",
    text: "text-primary",
    header: "text-primary",
  },
  accent: {
    border: "border-accent/25",
    bg: "bg-accent/8 border-accent/20 text-accent hover:bg-accent/15",
    text: "text-accent",
    header: "text-accent",
  },
  copper: {
    border: "border-copper/25",
    bg: "bg-copper/8 border-copper/20 text-copper hover:bg-copper/15",
    text: "text-copper",
    header: "text-copper",
  },
  gold: {
    border: "border-gold/25",
    bg: "bg-gold/8 border-gold/20 text-gold hover:bg-gold/15",
    text: "text-gold",
    header: "text-gold",
  },
};

const additionalTools = [
  "Git", "GitHub", "VS Code", "Notion", "Postman", "Linux", "Firebase", "Data Analysis",
];

export const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="py-28 relative bg-surface-overlay">
      <div className="absolute inset-0 pcb-grid opacity-15" />

      <div className="container px-6 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-mono text-primary mb-3 block tracking-widest">// TECHNOLOGY STACK</span>
            <h2 className="text-4xl sm:text-5xl font-bold mb-5">
              Tools &amp; <span className="text-gradient-primary">Technologies</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive toolkit from silicon to cloud — hardware to AI.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, catIndex) => {
              const c = colorMap[category.color];
              return (
                <motion.div
                  key={category.title}
                  className={`p-6 rounded-2xl border ${c.border} bg-card/50 backdrop-blur-sm hover:bg-card/75 transition-all duration-300`}
                  initial={{ opacity: 0, y: 22 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: catIndex * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -4, scale: 1.01 }}
                >
                  <h3 className={`text-base font-bold font-mono mb-4 ${c.header}`}>{category.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        className={`px-3 py-1.5 text-sm font-mono rounded-lg border ${c.bg} transition-colors duration-200 cursor-default`}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{
                          duration: 0.3,
                          delay: catIndex * 0.08 + skillIndex * 0.04,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        whileHover={{ scale: 1.06 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            className="mt-10 p-6 rounded-2xl border border-border bg-card/30 text-center"
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.5 }}
          >
            <h3 className="text-base font-bold font-mono mb-4 text-muted-foreground">Additional Tools & Platforms</h3>
            <div className="flex flex-wrap justify-center gap-2.5">
              {additionalTools.map((tool) => (
                <motion.span
                  key={tool}
                  className="px-3 py-1.5 text-sm font-mono rounded-lg border border-border bg-muted/30 text-muted-foreground hover:text-foreground hover:border-border/80 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                >
                  {tool}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
