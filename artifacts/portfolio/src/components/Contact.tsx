import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Twitter, Users } from "lucide-react";
import { Button } from "./ui/button";

export function Contact() {
  const [visitors, setVisitors] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/visitors/visit", { method: "POST" })
      .then((r) => r.json())
      .then((d) => setVisitors(d.count))
      .catch(() => {});
  }, []);

  return (
    <section className="py-32 relative bg-card/50" id="contact">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-8">
            <Mail className="w-6 h-6 text-primary" />
          </div>

          <h2 className="text-4xl md:text-6xl font-serif mb-6">Let's build something.</h2>
          <p className="text-xl text-muted-foreground mb-12">
            Currently open for new opportunities. Whether you have a question or just want to say hi, my inbox is open.
          </p>

          <Button
            size="lg"
            className="rounded-full text-lg px-10 h-16 mb-16"
            data-testid="button-say-hello"
          >
            Say Hello
          </Button>

          <div className="flex items-center justify-center gap-6 mb-12">
            <a href="#" className="p-3 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-all" data-testid="link-github">
              <Github className="w-6 h-6" />
            </a>
            <a href="#" className="p-3 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-all" data-testid="link-linkedin">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="#" className="p-3 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-all" data-testid="link-twitter">
              <Twitter className="w-6 h-6" />
            </a>
          </div>

          {/* Visitor counter */}
          {visitors !== null && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/60 border border-border/40 text-sm text-muted-foreground font-mono mb-8"
              data-testid="text-visitor-count"
            >
              <Users className="w-3.5 h-3.5 text-primary" />
              {visitors.toLocaleString()} {visitors === 1 ? "visitor" : "visitors"} since launch
            </motion.div>
          )}
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-sm text-muted-foreground font-mono">
          © {new Date().getFullYear()} Ray-shaun Adokwei Mensah. Crafted with precision.
        </p>
      </div>
    </section>
  );
}
