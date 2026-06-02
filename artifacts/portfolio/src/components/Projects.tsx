import { motion } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";

const projects = [
  {
    title: "Aura Metrics",
    description: "A high-performance observability pipeline capable of ingesting and querying millions of events per second. Built with Rust and ClickHouse, featuring a WebGL-powered dashboard for real-time visualization.",
    tags: ["Rust", "React", "WebGL", "ClickHouse"],
    link: "#",
    github: "#"
  },
  {
    title: "Nexus DB",
    description: "An edge-first distributed key-value store optimized for low-latency reads. Implements a custom consensus protocol and features seamless auto-scaling across regions.",
    tags: ["Go", "Distributed Systems", "Raft", "gRPC"],
    link: "#",
    github: "#"
  },
  {
    title: "Syntax.ui",
    description: "A comprehensive headless UI library for highly interactive web applications. Focuses on accessibility, keyboard navigation, and complex animation states while remaining framework agnostic.",
    tags: ["TypeScript", "DOM", "Accessibility", "Framer Motion"],
    link: "#",
    github: "#"
  }
];

export function Projects() {
  return (
    <section className="py-32" id="projects">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex items-end justify-between mb-16">
          <div>
            <h2 className="text-3xl md:text-5xl font-serif mb-4">Selected Work</h2>
            <p className="text-muted-foreground">Recent systems and applications I've built.</p>
          </div>
          <Button variant="ghost" className="hidden md:flex group">
            View All Archive
            <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Button>
        </div>

        <div className="space-y-24">
          {projects.map((project, index) => (
            <motion.div 
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 order-2 lg:order-1 relative">
                  <div className="aspect-[4/3] rounded-2xl bg-muted/30 border border-border overflow-hidden relative group-hover:border-primary/30 transition-colors">
                    <div className="absolute inset-0 bg-gradient-to-tr from-background/80 to-transparent z-10" />
                    {/* Placeholder for project image */}
                    <div className="absolute inset-0 flex items-center justify-center font-mono text-muted-foreground/50 text-9xl font-bold italic tracking-tighter mix-blend-overlay">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>
                </div>
                
                <div className="lg:col-span-5 order-1 lg:order-2 lg:pl-12">
                  <div className="flex gap-3 mb-6 flex-wrap">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs font-mono px-3 py-1 rounded-full border border-border bg-card">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-serif mb-6 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex gap-4">
                    <Button variant="outline" className="rounded-full">
                      <ExternalLink className="mr-2 w-4 h-4" /> Live Demo
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Github className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}