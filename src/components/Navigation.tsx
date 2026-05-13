import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Cpu, Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const navRef = useRef<HTMLElement | null>(null);
  const { theme, setTheme } = useTheme();

  // Throttled scroll handler for header background & scroll progress
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 40);
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const scrolled = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
          setScrollProgress(scrolled);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Observe sections to highlight active nav link
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.35 }
    );
    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMobileMenuOpen]);

  // When the page loads with a hash, scroll to it with offset
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el && navRef.current) {
          const navHeight = navRef.current.offsetHeight || 80;
          const top = el.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: Math.max(top - navHeight - 12, 0), behavior: "smooth" });
        }
      }, 120);
    }
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);

    const target = document.querySelector(href);
    const navHeight = navRef.current?.offsetHeight ?? 80;

    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY;
      const scrollTo = Math.max(top - navHeight - 12, 0);
      window.scrollTo({ top: scrollTo, behavior: "smooth" });
      // update URL hash without jumping
      history.replaceState(null, "", href);
    }
  };

  return (
    <>
      <motion.nav
        ref={(el) => (navRef.current = el)}
        aria-label="Primary"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          isScrolled
            ? "bg-background/85 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-background/20"
            : "bg-transparent"
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center gap-2.5 group"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              history.replaceState(null, "", "#");
            }}
            whileHover={{ scale: 1.04 }}
          >
            <div className="p-2 rounded-xl border border-primary/30 bg-primary/8 group-hover:border-primary/60 group-hover:bg-primary/15 transition-all duration-300">
              <Cpu className="w-5 h-5 text-primary" />
            </div>
            <span className="font-mono font-bold text-lg">
              <span className="text-primary">&lt;</span>
              Aswin
              <span className="text-primary">/&gt;</span>
            </span>
          </motion.a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <motion.button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative px-4 py-2 text-sm font-mono rounded-lg transition-colors duration-200 ${
                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                  whileHover={{ y: -1 }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-primary/10 rounded-lg border border-primary/20"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </motion.button>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {/* Theme toggle */}
            <motion.button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2.5 rounded-xl border border-border bg-card/60 backdrop-blur-sm hover:border-primary/30 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </motion.button>

            <Button
              size="sm"
              className="font-mono bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20 hover:shadow-primary/35 transition-all duration-300"
              onClick={() => handleNavClick("#contact")}
            >
              Get in Touch
            </Button>
          </div>

          {/* Mobile button */}
          <motion.button
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            className="md:hidden p-2.5 rounded-xl border border-border bg-card/60 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div animate={{ rotate: isMobileMenuOpen ? 90 : 0 }} transition={{ duration: 0.25 }}>
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.div>
          </motion.button>
        </div>

        {/* Scroll progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary via-accent to-copper"
          style={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.2 }}
        />
      </motion.nav>

      {/* Mobile menu */}
      <motion.div
        id="mobile-menu"
        role="dialog"
        aria-modal={true}
        className={`fixed inset-0 z-40 bg-background/97 backdrop-blur-xl md:hidden ${
          isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        initial={{ opacity: 0, clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          clipPath: isMobileMenuOpen
            ? "circle(150% at calc(100% - 40px) 40px)"
            : "circle(0% at calc(100% - 40px) 40px)",
        }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container px-6 pt-28 pb-8">
          <div className="space-y-2">
            {navLinks.map((link, index) => (
              <motion.button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                role="menuitem"
                className="block w-full text-left px-4 py-3 text-2xl font-mono font-bold text-foreground hover:text-primary transition-colors rounded-xl hover:bg-primary/5"
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: isMobileMenuOpen ? 1 : 0, x: isMobileMenuOpen ? 0 : -24 }}
                transition={{ duration: 0.35, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="text-primary mr-3 text-lg">//</span>
                {link.label}
              </motion.button>
            ))}
          </div>

          <motion.div className="mt-10" initial={{ opacity: 0 }} animate={{ opacity: isMobileMenuOpen ? 1 : 0 }} transition={{ duration: 0.35, delay: 0.4 }}>
            <Button size="lg" className="w-full font-mono bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => handleNavClick("#contact")}>
              Get in Touch
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};
