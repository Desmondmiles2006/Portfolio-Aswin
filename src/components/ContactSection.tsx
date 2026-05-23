import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Github, Linkedin, Send, ArrowRight, Phone, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/Desmondmiles2006",
    sub: "github.com/aswin",
    color: "hover:text-primary",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/aswin-kannaa-56b3ab2b4",
    sub: "linkedin.com/in/aswin",
    color: "hover:text-accent",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:ak7043@srmist.edu.in",
    sub: "ak7043@srmist.edu.in",
    color: "hover:text-copper",
  },
  {
    icon: Phone,
    label: "Phone",
    href: "tel:+917397088140",
    sub: "+91 7397088140",
    color: "hover:text-gold",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }

    if (!formData.subject.trim()) {
      errors.subject = "Subject is required";
    } else if (formData.subject.trim().length < 3) {
      errors.subject = "Subject must be at least 3 characters";
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
    }

    return errors;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      toast({
        title: "Validation Error",
        description: "Please fill in all fields correctly.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: "Success! ✨",
        description: "Thanks for reaching out. I'll get back to you within 24 hours.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
      setFormErrors({});
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-28 relative">
      <div className="absolute inset-0 pcb-grid opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

      <div className="container px-6 relative">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-20">
            <span className="text-sm font-mono text-primary mb-3 block tracking-widest">// CONTACT</span>
            <h2 className="text-4xl sm:text-5xl font-bold mb-5">
              Let's <span className="text-gradient-primary">Connect</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Open to collaborations, internships, and engineering projects. Let's build something great together.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Form */}
            <motion.div variants={itemVariants} className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-muted-foreground mb-2 block uppercase tracking-wider">Name</label>
                    <div>
                      <Input
                        type="text"
                        name="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`bg-card/50 border-border focus:border-primary transition-colors h-11 ${
                          formErrors.name ? "border-destructive focus:border-destructive" : ""
                        }`}
                        disabled={isSubmitting}
                      />
                      {formErrors.name && (
                        <motion.p
                          className="text-xs text-destructive mt-1"
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          {formErrors.name}
                        </motion.p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-mono text-muted-foreground mb-2 block uppercase tracking-wider">Email</label>
                    <div>
                      <Input
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`bg-card/50 border-border focus:border-primary transition-colors h-11 ${
                          formErrors.email ? "border-destructive focus:border-destructive" : ""
                        }`}
                        disabled={isSubmitting}
                      />
                      {formErrors.email && (
                        <motion.p
                          className="text-xs text-destructive mt-1"
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          {formErrors.email}
                        </motion.p>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-muted-foreground mb-2 block uppercase tracking-wider">Subject</label>
                  <div>
                    <Input
                      type="text"
                      name="subject"
                      placeholder="Project inquiry, collaboration, etc."
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={`bg-card/50 border-border focus:border-primary transition-colors h-11 ${
                        formErrors.subject ? "border-destructive focus:border-destructive" : ""
                      }`}
                      disabled={isSubmitting}
                    />
                    {formErrors.subject && (
                      <motion.p
                        className="text-xs text-destructive mt-1"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {formErrors.subject}
                      </motion.p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-muted-foreground mb-2 block uppercase tracking-wider">Message</label>
                  <div>
                    <Textarea
                      name="message"
                      placeholder="Tell me about your project or idea..."
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className={`bg-card/50 border-border focus:border-primary resize-none transition-colors ${
                        formErrors.message ? "border-destructive focus:border-destructive" : ""
                      }`}
                      disabled={isSubmitting}
                    />
                    {formErrors.message && (
                      <motion.p
                        className="text-xs text-destructive mt-1"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {formErrors.message}
                      </motion.p>
                    )}
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full group bg-primary hover:bg-primary/90 text-primary-foreground font-mono shadow-lg shadow-primary/20 hover:shadow-primary/35 transition-all duration-300 h-12 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </>
                  )}
                </Button>
              </form>
            </motion.div>

            {/* Info */}
            <motion.div variants={itemVariants} className="lg:col-span-2 space-y-5">
              {/* Social links */}
              <div className="p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm">
                <h3 className="text-base font-bold font-mono mb-5">Get in Touch</h3>
                <div className="space-y-3">
                  {socialLinks.map((link) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 text-muted-foreground ${link.color} transition-all duration-200 group`}
                      whileHover={{ x: 5 }}
                    >
                      <div className="p-2 rounded-lg border border-border bg-background/60 group-hover:border-primary/30 transition-colors">
                        <link.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-mono font-medium">{link.label}</div>
                        <div className="text-xs text-muted-foreground truncate">{link.sub}</div>
                      </div>
                      <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="p-5 rounded-2xl border border-border bg-card/30">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-mono font-medium">Based in Trichy, TN</span>
                </div>
                <p className="text-xs text-muted-foreground">Thiruvenkada Nagar, Thiruverambur, Trichy – 620013</p>
              </div>

              {/* Availability */}
              <div className="p-5 rounded-2xl border border-primary/30 bg-primary/5 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
                  </span>
                  <span className="font-mono font-bold text-primary text-sm">Open to Opportunities</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Actively looking for internships and collaborative projects. Response within 24 hours.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
