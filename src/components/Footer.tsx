import { motion } from "framer-motion";
import { Cpu, Github, Linkedin, Mail, Heart } from "lucide-react";

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Mail, href: "mailto:hello@example.com", label: "Email" },
];

export const Footer = () => {
  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative py-12 border-t border-border bg-surface-overlay">
      <div className="absolute inset-0 pcb-grid opacity-5" />
      
      <div className="container px-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <a href="#" className="flex items-center gap-2 group mb-4">
              <div className="p-2 rounded-lg border border-primary/30 bg-primary/10">
                <Cpu className="w-5 h-5 text-primary" />
              </div>
              <span className="font-mono font-bold text-lg">
                <span className="text-primary">&lt;</span>
                R.Aswin Kannaa
                <span className="text-primary">/&gt;</span>
              </span>
            </a>
            <p className="text-sm text-muted-foreground">
              Engineering intelligent systems across embedded, web, and financial technology domains.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-mono font-bold mb-4 text-sm uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-mono font-bold mb-4 text-sm uppercase tracking-wider">Connect</h4>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="p-2 rounded-lg border border-border bg-card/50 text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={link.label}
                >
                  <link.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Crafted with <Heart className="w-4 h-4 text-copper" /> and precision engineering
          </p>
        </div>
      </div>
    </footer>
  );
};
