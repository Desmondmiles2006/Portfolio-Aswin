import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Trophy, Award, Star, Medal } from "lucide-react";

const achievements = [
  {
    icon: Trophy,
    title: "1st Place – Smart City Hackathon",
    event: "TechFest 2023",
    description:
      "Built an IoT-based traffic optimization system using real-time sensor data and ML predictions.",
    color: "text-amber-400",
    borderColor: "border-amber-400/30",
  },
  {
    icon: Award,
    title: "Best Hardware Hack",
    event: "HackMIT 2022",
    description:
      "Developed a low-cost environmental monitoring device for industrial safety applications.",
    color: "text-cyan-300",
    borderColor: "border-cyan-300/30",
  },
  {
    icon: Star,
    title: "Innovation Award",
    event: "FinTech Summit 2022",
    description:
      "Recognized for automated compliance reporting system that reduced audit time by 80%.",
    color: "text-rose-300",
    borderColor: "border-rose-300/30",
  },
  {
    icon: Medal,
    title: "Top 10 Finalist",
    event: "Global IoT Challenge 2021",
    description:
      "Selected among 500+ teams for smart agriculture solution deployed in 3 pilot farms.",
    color: "text-teal-300",
    borderColor: "border-teal-300/30",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export const AchievementsSection = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="achievements" className="py-24 relative bg-slate-900">
      {/* optional themed grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10 pcb-grid" />

      <div className="container mx-auto px-6 relative">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="text-sm font-mono text-cyan-300 mb-3 block">
              // ACHIEVEMENTS
            </span>

            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Recognition &{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
                Awards
              </span>
            </h2>

            <p className="text-slate-300 max-w-2xl mx-auto">
              Competitive achievements and engineering recognition across IoT,
              embedded systems, and intelligent automation projects.
            </p>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;

              return (
                <motion.div
                  key={achievement.title}
                  variants={itemVariants}
                  whileHover={{ y: -6 }}
                  className={`group relative p-6 rounded-xl border ${achievement.borderColor} bg-slate-800/60 backdrop-blur-sm transition-transform`}
                >
                  <div className="relative flex gap-4">
                    <div className="p-3 rounded-lg border bg-slate-900">
                      <Icon className={`w-6 h-6 ${achievement.color}`} />
                    </div>

                    <div>
                      <span className="text-xs font-mono text-slate-400">
                        {achievement.event}
                      </span>

                      <h3 className="text-lg font-bold mt-1 mb-2 group-hover:text-cyan-300 transition-colors">
                        {achievement.title}
                      </h3>

                      <p className="text-slate-400 text-sm">
                        {achievement.description}
                      </p>
                    </div>
                  </div>

                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-10 h-10 opacity-20">
                    <svg viewBox="0 0 48 48" className={achievement.color}>
                      <path
                        d="M48,0 L48,48 L0,48"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
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
