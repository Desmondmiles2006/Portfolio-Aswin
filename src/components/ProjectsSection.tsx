import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Cpu, Globe, Wallet, Radio, Server, BarChart3, Shield, Zap, Database } from "lucide-react";
import { ProjectCard } from "./ProjectCard";

const embeddedProjects = [
  {
    title: "Industrial Sensor Network",
    problem: "Legacy factory equipment lacked real-time monitoring, causing unplanned downtime and maintenance delays.",
    objective: "Design a low-power mesh sensor network for continuous machine health monitoring.",
    technologies: ["ESP32", "MQTT", "LoRaWAN", "C++", "PCB Design"],
    outcome: "Reduced unplanned downtime by 40% through predictive maintenance alerts.",
    icon: Radio,
    accentColor: "via-primary",
  },
  {
    title: "Smart Agriculture Controller",
    problem: "Manual irrigation systems wasted water and required constant human supervision.",
    objective: "Build an automated irrigation system with soil moisture sensing and weather integration.",
    technologies: ["Arduino", "Sensors", "Solar Power", "REST API", "React Native"],
    outcome: "Achieved 35% water savings with fully autonomous operation.",
    icon: Cpu,
    accentColor: "via-accent",
  },
  {
    title: "Edge Computing Gateway",
    problem: "Cloud-dependent IoT systems suffered from latency and connectivity issues in remote locations.",
    objective: "Develop an edge gateway for local data processing with cloud sync capabilities.",
    technologies: ["Raspberry Pi", "Docker", "Python", "TensorFlow Lite", "Redis"],
    outcome: "Enabled offline operation with 99.9% data integrity on reconnection.",
    icon: Server,
    accentColor: "via-copper",
  },
];

const webProjects = [
  {
    title: "Real-Time Analytics Dashboard",
    problem: "Operations teams struggled with fragmented data across multiple monitoring tools.",
    objective: "Create a unified dashboard aggregating metrics from 15+ data sources in real-time.",
    technologies: ["React", "Node.js", "WebSockets", "PostgreSQL", "D3.js"],
    outcome: "Consolidated monitoring reduced incident response time by 60%.",
    icon: BarChart3,
    accentColor: "via-primary",
  },
  {
    title: "Automated CI/CD Pipeline",
    problem: "Manual deployment processes caused frequent errors and slow release cycles.",
    objective: "Design a fully automated pipeline with testing, security scanning, and staged rollouts.",
    technologies: ["GitHub Actions", "Docker", "Kubernetes", "Terraform", "ArgoCD"],
    outcome: "Deployment frequency increased 5x with zero-downtime releases.",
    icon: Zap,
    accentColor: "via-accent",
  },
  {
    title: "Enterprise Data Platform",
    problem: "Siloed databases prevented cross-functional analytics and reporting.",
    objective: "Build a centralized data lake with automated ETL pipelines and access controls.",
    technologies: ["Python", "Apache Airflow", "Snowflake", "dbt", "FastAPI"],
    outcome: "Enabled self-service analytics for 200+ users across departments.",
    icon: Database,
    accentColor: "via-copper",
  },
];

const fintechProjects = [
  {
    title: "Transaction Anomaly Detection",
    problem: "Manual fraud review processes couldn't scale with increasing transaction volumes.",
    objective: "Implement ML-based anomaly detection for real-time transaction screening.",
    technologies: ["Python", "scikit-learn", "Kafka", "Redis", "FastAPI"],
    outcome: "Detected 95% of fraudulent transactions with 0.1% false positive rate.",
    icon: Shield,
    accentColor: "via-primary",
  },
  {
    title: "Automated Reconciliation Engine",
    problem: "Daily reconciliation of financial records took 8+ hours of manual work.",
    objective: "Build an automated system for multi-source financial data reconciliation.",
    technologies: ["Python", "Pandas", "PostgreSQL", "Celery", "React"],
    outcome: "Reduced reconciliation time to 15 minutes with 99.99% accuracy.",
    icon: BarChart3,
    accentColor: "via-accent",
  },
  {
    title: "Compliance Reporting Automation",
    problem: "Regulatory reporting required extensive manual data gathering and formatting.",
    objective: "Create automated pipelines for generating compliance reports from source systems.",
    technologies: ["Python", "SQL", "Airflow", "LaTeX", "AWS Lambda"],
    outcome: "Automated 90% of quarterly reporting, eliminating manual errors.",
    icon: Wallet,
    accentColor: "via-copper",
  },
];

const SectionTitle = ({ tag, title, description }: { tag: string; title: string; description: string }) => (
  <div className="text-center mb-12">
    <span className="text-sm font-mono text-primary mb-4 block">{tag}</span>
    <h3 className="text-2xl sm:text-3xl font-bold mb-4 font-mono">{title}</h3>
    <p className="text-muted-foreground max-w-2xl mx-auto">{description}</p>
  </div>
);

export const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 relative">
      <div className="absolute inset-0 pcb-grid opacity-10" />
      
      <div className="container px-6 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Main section header */}
          <div className="text-center mb-20">
            <span className="text-sm font-mono text-primary mb-4 block">// PROJECTS</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Engineering <span className="text-gradient-primary">Portfolio</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A selection of projects spanning embedded systems, web platforms, and intelligent automation—each solving real engineering challenges.
            </p>
          </div>

          {/* Embedded & IoT */}
          <div className="mb-20">
            <SectionTitle
              tag="// EMBEDDED & IoT"
              title="Hardware Systems"
              description="Firmware, sensors, and edge computing solutions for industrial and consumer applications."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {embeddedProjects.map((project, index) => (
                <ProjectCard key={project.title} {...project} index={index} />
              ))}
            </div>
          </div>

          {/* Web & Automation */}
          <div className="mb-20">
            <SectionTitle
              tag="// WEB & AUTOMATION"
              title="Platform Engineering"
              description="Scalable web applications, data pipelines, and infrastructure automation."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {webProjects.map((project, index) => (
                <ProjectCard key={project.title} {...project} index={index} />
              ))}
            </div>
          </div>

          {/* FinTech */}
          <div>
            <SectionTitle
              tag="// FINTECH & INTELLIGENCE"
              title="Financial Systems"
              description="Secure, compliant automation tools for financial operations and decision support."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fintechProjects.map((project, index) => (
                <ProjectCard key={project.title} {...project} index={index} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
