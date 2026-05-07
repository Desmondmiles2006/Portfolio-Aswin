import { motion } from "framer-motion";
import { Cpu, Github, Linkedin, Mail, Heart, MapPin } from "lucide-react";

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { icon: Github, href: "https://github.com/", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:ak7043@srmist.edu.in", label: "Email" },
];

export const Footer = () => {
  const handleNavClick = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative py-14 border-t border-border bg-surface-overlay">
      <div className="absolute inset-0 pcb-grid opacity-5" />

      <div className="container px-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <a href="#" className="flex items-center gap-2.5 mb-4 w-fit" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
              <div className="p-2 rounded-xl border border-primary/30 bg-primary/8">
                <Cpu className="w-5 h-5 text-primary" />
              </div>
              <span className="font-mono font-bold text-lg">
                <span className="text-primary">&lt;</span>Aswin<span className="text-primary">/&gt;</span>
              </span>
            </a>
            <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
              Full-stack engineer, IoT systems enthusiast, and AI/ML developer based in Trichy, India.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3" />
              Thiruvenkada Nagar, Trichy – 620013
            </div>
          </div>

          <div>
            <h4 className="font-mono font-bold mb-5 text-xs uppercase tracking-widest text-muted-foreground">Navigation</h4>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 font-mono"
                  >
                    <span className="text-primary/50 mr-2">//</span>{link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono font-bold mb-5 text-xs uppercase tracking-widest text-muted-foreground">Connect</h4>
            <div className="flex gap-3 mb-5">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-border bg-card/50 text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-200"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={link.label}
                >
                  <link.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
            <a href="mailto:ak7043@srmist.edu.in" className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono">
              ak7043@srmist.edu.in
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground font-mono">
            © {new Date().getFullYear()} Aswin Kannaa R. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
            Crafted with <Heart className="w-4 h-4 text-copper fill-copper" /> and precision engineering
          </p>
        </div>
      </div>
    </footer>
  );
};
