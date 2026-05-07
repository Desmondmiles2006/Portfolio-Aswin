import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Github, Linkedin, Send, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";

const socialLinks = [
  { icon: Github, label: "GitHub", href: "#", color: "hover:text-primary" },
  { icon: Linkedin, label: "LinkedIn", href: "#", color: "hover:text-accent" },
  { icon: Mail, label: "Email", href: "mailto:hello@example.com", color: "hover:text-copper" },
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

export const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: "Message sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    });
    
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 pcb-grid opacity-10" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      
      <div className="container px-6 relative">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="text-sm font-mono text-primary mb-4 block">// CONTACT</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Let's <span className="text-gradient-primary">Collaborate</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind or want to discuss engineering challenges?
              I'm always open to new opportunities and collaborations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact form */}
            <motion.div variants={itemVariants}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-mono text-muted-foreground mb-2 block">
                      Name
                    </label>
                    <Input
                      type="text"
                      placeholder="Your name"
                      required
                      className="bg-card/50 border-border focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-mono text-muted-foreground mb-2 block">
                      Email
                    </label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      required
                      className="bg-card/50 border-border focus:border-primary"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-mono text-muted-foreground mb-2 block">
                    Subject
                  </label>
                  <Input
                    type="text"
                    placeholder="Project inquiry, collaboration, etc."
                    required
                    className="bg-card/50 border-border focus:border-primary"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-mono text-muted-foreground mb-2 block">
                    Message
                  </label>
                  <Textarea
                    placeholder="Tell me about your project or idea..."
                    required
                    rows={5}
                    className="bg-card/50 border-border focus:border-primary resize-none"
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full group bg-primary hover:bg-primary/90 text-primary-foreground font-mono"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
            </motion.div>

            {/* Contact info */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="p-6 rounded-xl border border-border bg-card/50">
                <h3 className="text-xl font-bold font-mono mb-4">Get in Touch</h3>
                <p className="text-muted-foreground mb-6">
                  I'm currently open to freelance projects, full-time positions,
                  and interesting engineering collaborations.
                </p>
                
                <div className="space-y-4">
                  {socialLinks.map((link) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      className={`flex items-center gap-3 text-muted-foreground ${link.color} transition-colors group`}
                      whileHover={{ x: 5 }}
                    >
                      <div className="p-2 rounded-lg border border-border bg-surface-elevated group-hover:border-primary/30 transition-colors">
                        <link.icon className="w-5 h-5" />
                      </div>
                      <span className="font-mono">{link.label}</span>
                      <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Availability status */}
              <div className="p-6 rounded-xl border border-primary/30 bg-primary/5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-3 h-3 rounded-full bg-primary animate-glow-pulse" />
                  <span className="font-mono font-bold text-primary">Available for Work</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Currently accepting new projects and opportunities.
                  Response time: within 24 hours.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
