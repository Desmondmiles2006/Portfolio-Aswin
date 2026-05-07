import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, Cpu } from "lucide-react";
import { Button } from "./ui/button";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-lg border-b border-border"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.05 }}
          >
            <div className="p-2 rounded-lg border border-primary/30 bg-primary/10 group-hover:border-primary/50 transition-colors">
              <Cpu className="w-5 h-5 text-primary" />
            </div>
            <span className="font-mono font-bold text-lg">
              <span className="text-primary">&lt;</span>
              R.Aswin Kannaa
              <span className="text-primary">/&gt;</span>
            </span>
          </motion.a>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-mono text-muted-foreground hover:text-primary transition-colors relative group"
                whileHover={{ y: -2 }}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
              </motion.button>
            ))}
          </div>

          {/* CTA button */}
          <div className="hidden md:block">
            <Button
              size="sm"
              className="font-mono bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => handleNavClick("#contact")}
            >
              Get in Touch
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg border border-border bg-card/50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <motion.div
        className={`fixed inset-0 z-40 bg-background/95 backdrop-blur-lg md:hidden ${
          isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isMobileMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container px-6 pt-24 pb-8">
          <div className="space-y-6">
            {navLinks.map((link, index) => (
              <motion.button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="block w-full text-left text-2xl font-mono font-bold text-foreground hover:text-primary transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: isMobileMenuOpen ? 1 : 0,
                  x: isMobileMenuOpen ? 0 : -20,
                }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <span className="text-primary mr-2">//</span>
                {link.label}
              </motion.button>
            ))}
          </div>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: isMobileMenuOpen ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <Button
              size="lg"
              className="w-full font-mono bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => handleNavClick("#contact")}
            >
              Get in Touch
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};
