import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface ProjectCardProps {
  title: string;
  problem: string;
  objective: string;
  technologies: string[];
  outcome: string;
  icon: LucideIcon;
  accentColor: string;
  index: number;
}

export const ProjectCard = ({
  title,
  problem,
  objective,
  technologies,
  outcome,
  icon: Icon,
  accentColor,
  index,
}: ProjectCardProps) => {
  return (
    <motion.div
      className="group relative p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-500"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] as const }}
      whileHover={{ y: -8 }}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 via-transparent to-copper/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Top accent line */}
      <div className={`absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent ${accentColor} to-transparent opacity-50`} />

      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-lg border border-border bg-surface-elevated`}>
            <Icon className={`w-5 h-5 ${accentColor.replace('via-', 'text-').split(' ')[0]}`} />
          </div>
          <motion.div
            className="p-2 rounded-lg border border-border bg-surface-elevated opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            whileHover={{ scale: 1.1 }}
          >
            <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
          </motion.div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold mb-3 font-mono group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Problem */}
        <div className="mb-4">
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Challenge</span>
          <p className="text-sm text-foreground/80 mt-1">{problem}</p>
        </div>

        {/* Objective */}
        <div className="mb-4">
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Objective</span>
          <p className="text-sm text-foreground/80 mt-1">{objective}</p>
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs font-mono rounded border border-primary/20 bg-primary/5 text-primary"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Outcome */}
        <div className="pt-4 border-t border-border">
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Impact</span>
          <p className="text-sm text-copper mt-1 font-medium">{outcome}</p>
        </div>

        {/* Circuit decoration */}
        <svg className="absolute bottom-4 right-4 w-16 h-16 opacity-5" viewBox="0 0 64 64">
          <path
            d="M0,32 L16,32 L24,16 L40,16 L48,32 L64,32"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle cx="24" cy="32" r="2" fill="currentColor" />
          <circle cx="48" cy="32" r="2" fill="currentColor" />
        </svg>
      </div>
    </motion.div>
  );
};
