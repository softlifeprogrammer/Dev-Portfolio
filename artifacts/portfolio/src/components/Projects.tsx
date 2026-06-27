import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "./ui/button";

const isMobile =
  typeof window !== "undefined" &&
  window.matchMedia("(pointer: coarse)").matches;

type Category = "All" | "Web Development" | "Python" | "IT & Security" | "Data Analysis";

interface Project {
  title: string;
  description: string;
  tags: string[];
  category: Exclude<Category, "All">;
  link: string;
  github: string;
  accent: string;
}

const PROJECTS: Project[] = [
  {
    title: "Movie Discovery App",
    description:
      "A web app for browsing and discovering movies — search by title, view details, ratings, and cast information. Fetches live data from a movie API and presents it in a clean, responsive interface.",
    tags: ["HTML", "CSS", "JavaScript", "API Integration"],
    category: "Web Development",
    link: "https://replit.com/@mensahrayshaun1/Movie",
    github: "#",
    accent: "from-yellow-500/10 to-orange-500/5",
  },
  {
    title: "Job Seeker Hub",
    description:
      "A job search and listing platform designed to help job seekers find opportunities. Features job listings, filtering by category or location, and a clean dashboard-style layout.",
    tags: ["HTML", "CSS", "JavaScript", "Web App"],
    category: "Web Development",
    link: "https://replit.com/@mensahrayshaun1/Job-Seeker-Hub",
    github: "#",
    accent: "from-green-500/10 to-teal-500/5",
  },
  {
    title: "E-Commerce Suite",
    description:
      "A fully functional e-commerce web application with product listings, a shopping cart, and checkout flow. Designed with a modern storefront layout and interactive product browsing experience.",
    tags: ["HTML", "CSS", "JavaScript", "E-Commerce"],
    category: "Web Development",
    link: "https://replit.com/@mensahrayshaun1/E-Commerce-Suite",
    github: "#",
    accent: "from-pink-500/10 to-rose-500/5",
  },
  {
    title: "Sel Fitness Club Platform",
    description:
      "Final year capstone project. A full fitness management web application for Sel Fitness Club, covering member registration, class scheduling, and session tracking. Built from scratch with HTML, CSS, and JavaScript.",
    tags: ["HTML", "CSS", "JavaScript", "Web App"],
    category: "Web Development",
    link: "#",
    github: "#",
    accent: "from-blue-500/10 to-cyan-500/5",
  },
  {
    title: "Developer Portfolio",
    description:
      "This very site. A performant, fully responsive portfolio with dark/light mode, animated sections, an AI chatbot assistant, visitor counter, tech blog, and interactive career timeline. Built with React, Vite, and Tailwind.",
    tags: ["React", "TypeScript", "Tailwind", "Framer Motion"],
    category: "Web Development",
    link: "#",
    github: "#",
    accent: "from-violet-500/10 to-fuchsia-500/5",
  },
  {
    title: "Python Automation Scripts",
    description:
      "A collection of Python scripts written during certification study and personal projects — including file organizers, web scrapers, and data-cleaning utilities using pandas and the standard library.",
    tags: ["Python", "pandas", "Automation", "Web Scraping"],
    category: "Python",
    link: "#",
    github: "#",
    accent: "from-yellow-500/10 to-amber-500/5",
  },
  {
    title: "IT Network Setup — KKMA",
    description:
      "Designed and implemented a full office network at the Kpone-Katamanso Metropolitan Assembly during national service. Installed routers, switches, and cabling to enable seamless connectivity across multiple workstations.",
    tags: ["Networking", "Routers", "Switches", "Cabling"],
    category: "IT & Security",
    link: "#",
    github: "#",
    accent: "from-green-500/10 to-emerald-500/5",
  },
  {
    title: "Vulnerability Assessment",
    description:
      "Conducted in-depth vulnerability scans across 35+ company devices at KKMA and NAD Security Ltd, identifying and mitigating 95% of potential security risks using professional scanning tools and command-line diagnostics.",
    tags: ["Security", "Vulnerability Scanning", "IT Audit", "CLI"],
    category: "IT & Security",
    link: "#",
    github: "#",
    accent: "from-red-500/10 to-rose-500/5",
  },
  {
    title: "Excel & Power BI Dashboard",
    description:
      "Interactive data dashboard built as part of the NASPA 'Data Analysis with Excel and Power BI' certification. Visualises KPIs, trend lines, and category breakdowns from structured datasets using Power Query and DAX.",
    tags: ["Power BI", "Excel", "DAX", "Power Query"],
    category: "Data Analysis",
    link: "#",
    github: "#",
    accent: "from-orange-500/10 to-amber-500/5",
  },
  {
    title: "SQL Data Analysis",
    description:
      "Hands-on SQL projects completed during the NASPA SQL Database Crash Course — covering complex queries, joins, aggregations, and stored procedures on real-world datasets to surface actionable insights.",
    tags: ["SQL", "Databases", "Data Analysis", "Queries"],
    category: "Data Analysis",
    link: "#",
    github: "#",
    accent: "from-teal-500/10 to-cyan-500/5",
  },
];

const CATEGORIES: Category[] = ["All", "Web Development", "Python", "IT & Security", "Data Analysis"];

const CATEGORY_LABELS: Record<Category, string> = {
  All: "All",
  "Web Development": "Web Dev",
  Python: "Python",
  "IT & Security": "IT & Security",
  "Data Analysis": "Data Analysis",
};

export function Projects() {
  const [active, setActive] = useState<Category>("All");

  const filtered = active === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  return (
    <section className="py-32" id="projects">
      <div className="container mx-auto px-6 md:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="text-xs font-mono tracking-[0.25em] text-primary uppercase mb-4">&gt;_ Selected Work</p>
          <h2 className="text-3xl md:text-5xl font-serif mb-4">Projects</h2>
          <div className="h-1 w-20 bg-primary rounded-full" />
        </motion.div>

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-12"
          data-testid="project-filter-group"
        >
          {CATEGORIES.map((cat) => {
            const isActive = active === cat;
            const count = cat === "All" ? PROJECTS.length : PROJECTS.filter((p) => p.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                data-testid={`button-filter-${cat.toLowerCase().replace(/\s+/g, "-")}`}
                className={`relative px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 flex items-center gap-2 ${
                  isActive
                    ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20"
                    : "bg-transparent border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {CATEGORY_LABELS[cat]}
                <span
                  className={`text-[10px] font-mono rounded-full px-1.5 py-0.5 min-w-[18px] text-center ${
                    isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Project grid — no layout/FLIP animations; opacity+transform only for mobile perf */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {filtered.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: -8 }}
                transition={{
                  duration: isMobile ? 0.15 : 0.3,
                  delay: isMobile ? 0 : i * 0.06,
                  ease: "easeOut",
                }}
                className="group relative rounded-2xl border border-border/50 bg-card overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
                data-testid={`card-project-${project.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative p-7 flex flex-col h-full">
                  {/* Category badge + number */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-primary px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20">
                      {project.category}
                    </span>
                    <span aria-hidden="true" className="text-3xl font-serif text-muted-foreground/20 font-bold leading-none select-none">
                      {String(PROJECTS.indexOf(project) + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-serif font-medium mb-3 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded border border-border/60 bg-background/50 text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    {project.link !== "#" ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid={`button-demo-${project.title.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-full text-xs h-11 px-4 border-border/60 hover:border-primary/50"
                        >
                          <ExternalLink className="w-3 h-3 mr-1.5" aria-hidden="true" />
                          View Project
                        </Button>
                      </a>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full text-xs h-8 px-4 border-border/60 hover:border-primary/50 opacity-50 cursor-default"
                        data-testid={`button-demo-${project.title.toLowerCase().replace(/\s+/g, "-")}`}
                        disabled
                      >
                        <ExternalLink className="w-3 h-3 mr-1.5" />
                        View Details
                      </Button>
                    )}
                    {project.github !== "#" && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid={`button-github-${project.title.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                          <Github className="w-4 h-4" />
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        <AnimatePresence>
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-24 text-muted-foreground"
            >
              No projects in this category yet.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
