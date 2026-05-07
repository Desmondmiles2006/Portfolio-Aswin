import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Trophy, ExternalLink } from "lucide-react";

const achievements = [
  {
    icon: Trophy,
    title: "1st Place – Techathon (Tanrotsav'25)",
    event: "Amrita Vishwa Vidyapeetham, Chennai · Jan 2025",
    description:
      "Achieved 1st place in the Ideathon at Tanrotsav'25, a national-level technical fest. Developed and presented an innovative solution showcasing expertise in problem-solving, critical thinking, and technical implementation.",
    color: "text-amber-400",
    borderColor: "border-amber-400/30",
    link: "#",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.93 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export const AchievementsSection = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="achievements" className="py-28 relative">
      <div className="absolute inset-0 pointer-events-none opacity-10 pcb-grid" />

      <div className="container mx-auto px-6 relative">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-3xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="text-sm font-mono text-primary mb-3 block tracking-widest">// ACHIEVEMENTS</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Recognition &amp;{" "}
              <span className="text-gradient-primary">Awards</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Competitive achievements demonstrating engineering excellence and innovative thinking.
            </p>
          </motion.div>

          {achievements.map((achievement) => {
            const Icon = achievement.icon;
            return (
              <motion.div
                key={achievement.title}
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
                className={`group relative p-8 rounded-2xl border ${achievement.borderColor} bg-card/60 backdrop-blur-sm`}
              >
                <div className="relative flex gap-5">
                  <div className="p-4 rounded-xl border border-border bg-background/60 h-fit">
                    <Icon className={`w-7 h-7 ${achievement.color}`} />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <span className="text-xs font-mono text-muted-foreground">{achievement.event}</span>
                        <h3 className={`text-xl font-bold mt-1 mb-3 group-hover:${achievement.color} transition-colors`}>
                          {achievement.title}
                        </h3>
                      </div>
                      {achievement.link && (
                        <motion.a
                          href={achievement.link}
                          className="p-2 rounded-lg border border-border text-muted-foreground hover:text-primary transition-colors opacity-0 group-hover:opacity-100"
                          whileHover={{ scale: 1.1 }}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </motion.a>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{achievement.description}</p>
                  </div>
                </div>

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-12 h-12 opacity-15">
                  <svg viewBox="0 0 48 48" className={achievement.color}>
                    <path d="M48,0 L48,48 L0,48" fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
