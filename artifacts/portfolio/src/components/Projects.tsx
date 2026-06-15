import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "./ui/button";

type Category = "All" | "Web Development" | "Python" | "Power BI" | "Data Analysis";

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
    title: "ShopFlow",
    description:
      "Full-stack e-commerce platform with real-time inventory, Stripe checkout, and an admin dashboard. Built on Next.js with server components and a PostgreSQL backend.",
    tags: ["Next.js", "PostgreSQL", "Stripe", "Tailwind"],
    category: "Web Development",
    link: "#",
    github: "#",
    accent: "from-blue-500/10 to-cyan-500/5",
  },
  {
    title: "Syntax.ui",
    description:
      "A comprehensive headless UI library for highly interactive web applications. Focuses on accessibility, keyboard navigation, and complex animation states.",
    tags: ["TypeScript", "React", "Framer Motion", "A11y"],
    category: "Web Development",
    link: "#",
    github: "#",
    accent: "from-violet-500/10 to-fuchsia-500/5",
  },
  {
    title: "DataCrawl",
    description:
      "Async Python pipeline that scrapes, cleans, and stores structured data from multiple web sources at scale. Uses Playwright for JS-rendered pages and Pydantic for validation.",
    tags: ["Python", "Playwright", "Pydantic", "PostgreSQL"],
    category: "Python",
    link: "#",
    github: "#",
    accent: "from-yellow-500/10 to-amber-500/5",
  },
  {
    title: "ML Monitor",
    description:
      "Lightweight Python service for tracking model drift, feature importance shifts, and prediction distributions in production ML pipelines. Integrates with Grafana for alerting.",
    tags: ["Python", "scikit-learn", "FastAPI", "Grafana"],
    category: "Python",
    link: "#",
    github: "#",
    accent: "from-green-500/10 to-emerald-500/5",
  },
  {
    title: "Executive Sales Dashboard",
    description:
      "Interactive Power BI report delivering real-time KPIs, regional breakdowns, and YoY trend analysis for a multinational retail client with 200+ stores.",
    tags: ["Power BI", "DAX", "SQL Server", "Power Query"],
    category: "Power BI",
    link: "#",
    github: "#",
    accent: "from-orange-500/10 to-red-500/5",
  },
  {
    title: "Supply Chain Visibility",
    description:
      "End-to-end Power BI solution tracking supplier lead times, stock levels, and logistics bottlenecks across 12 warehouses and 4 continents.",
    tags: ["Power BI", "DAX", "Azure Synapse", "Power Automate"],
    category: "Power BI",
    link: "#",
    github: "#",
    accent: "from-rose-500/10 to-pink-500/5",
  },
  {
    title: "Market Pulse",
    description:
      "Financial data analysis toolkit surfacing equity momentum signals. Combines pandas, technical indicators, and automated weekly PDF reports delivered via email.",
    tags: ["Python", "pandas", "NumPy", "Matplotlib"],
    category: "Data Analysis",
    link: "#",
    github: "#",
    accent: "from-teal-500/10 to-cyan-500/5",
  },
  {
    title: "Aura Metrics",
    description:
      "High-performance observability pipeline ingesting and querying millions of events per day. Features real-time anomaly detection and a WebGL-powered live dashboard.",
    tags: ["Rust", "React", "ClickHouse", "WebGL"],
    category: "Data Analysis",
    link: "#",
    github: "#",
    accent: "from-primary/10 to-amber-500/5",
  },
];

const CATEGORIES: Category[] = ["All", "Web Development", "Python", "Power BI", "Data Analysis"];

const CATEGORY_LABELS: Record<Category, string> = {
  All: "All",
  "Web Development": "Web Dev",
  Python: "Python",
  "Power BI": "Power BI",
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

        {/* Project grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: -8 }}
                transition={{ duration: 0.3, delay: i * 0.06, ease: "easeOut" }}
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
                    <span className="text-3xl font-serif text-muted-foreground/20 font-bold leading-none select-none">
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
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full text-xs h-8 px-4 border-border/60 hover:border-primary/50"
                      data-testid={`button-demo-${project.title.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      <ExternalLink className="w-3 h-3 mr-1.5" />
                      Live Demo
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full h-8 w-8"
                      data-testid={`button-github-${project.title.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      <Github className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

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
