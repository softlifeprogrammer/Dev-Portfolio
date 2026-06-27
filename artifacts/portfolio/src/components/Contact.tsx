import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Twitter, Users } from "lucide-react";

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
          className="max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-8">
            <Mail className="w-6 h-6 text-primary" aria-hidden="true" />
          </div>

          <h2 className="text-4xl md:text-6xl font-serif mb-6">Let's work together.</h2>
          <p className="text-xl text-muted-foreground mb-12">
            Open to new opportunities — IT support roles, software engineering positions, and freelance web projects.
            Drop me an email and I'll get back to you.
          </p>

          <a
            href="mailto:mensahrayshaun@gmail.com"
            className="inline-flex items-center gap-3 rounded-full text-lg px-10 h-16 mb-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 font-medium"
            data-testid="button-say-hello"
          >
            <Mail className="w-5 h-5" aria-hidden="true" />
            Say Hello
          </a>

          <p className="text-sm text-muted-foreground mb-12 font-mono">mensahrayshaun@gmail.com</p>

          <div className="flex items-center justify-center gap-4 mb-12" role="list" aria-label="Social links">
            <a
              href="https://github.com/mensahrayshaun1"
              target="_blank"
              rel="noopener noreferrer"
              role="listitem"
              aria-label="GitHub profile"
              className="p-3 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
              data-testid="link-github"
            >
              <Github className="w-6 h-6" aria-hidden="true" />
            </a>
            <a
              href="https://linkedin.com/in/ray-shaun-mensah"
              target="_blank"
              rel="noopener noreferrer"
              role="listitem"
              aria-label="LinkedIn profile"
              className="p-3 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
              data-testid="link-linkedin"
            >
              <Linkedin className="w-6 h-6" aria-hidden="true" />
            </a>
            <a
              href="https://twitter.com/mensahrayshaun"
              target="_blank"
              rel="noopener noreferrer"
              role="listitem"
              aria-label="Twitter profile"
              className="p-3 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
              data-testid="link-twitter"
            >
              <Twitter className="w-6 h-6" aria-hidden="true" />
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
              aria-label={`${visitors.toLocaleString()} ${visitors === 1 ? "visitor" : "visitors"} since launch`}
            >
              <Users className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
              {visitors.toLocaleString()} {visitors === 1 ? "visitor" : "visitors"} since launch
            </motion.div>
          )}
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-sm text-muted-foreground font-mono">
          © {new Date().getFullYear()} Ray-shaun Adokwei Mensah · Tema, Ghana
        </p>
      </div>
    </section>
  );
}
