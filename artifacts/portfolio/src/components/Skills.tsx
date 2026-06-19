import { motion } from "framer-motion";
import { BarChart2 } from "lucide-react";
import {
  SiPython,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiReact,
  SiMysql,
  SiGit,
  SiGnubash,
  SiLinux,
} from "react-icons/si";

type SkillIcon =
  | React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  | ((props: { className?: string; style?: React.CSSProperties }) => React.ReactElement);

const skills: { name: string; icon: SkillIcon; color: string }[] = [
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
  { name: "CSS3", icon: SiCss3, color: "#1572B6" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "SQL", icon: SiMysql, color: "#4479A1" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "Excel & Power BI", icon: BarChart2, color: "#217346" },
  { name: "Bash / CLI", icon: SiGnubash, color: "#4EAA25" },
  { name: "Linux", icon: SiLinux, color: "#FCC624" },
];

export function Skills() {
  return (
    <section className="py-24 bg-muted/30" id="skills">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif mb-4">Tools of the Trade</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Languages, frameworks, and tools I use day-to-day across development, data analysis, and IT support.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="flex items-center gap-3 px-6 py-4 rounded-full bg-card border border-border/50 shadow-sm cursor-default"
            >
              <skill.icon className="w-6 h-6" style={{ color: skill.color }} />
              <span className="font-medium font-sans text-sm">{skill.name}</span>
            </motion.div>
          ))}
        </div>

        {/* Certifications strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20"
        >
          <p className="text-center text-xs font-mono tracking-[0.25em] text-primary uppercase mb-8">&gt;_ Certifications</p>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {[
              "Walmart Global Tech — Advanced Software Engineering",
              "Python Masterclass · DevTown",
              "Responsive Web Design · freeCodeCamp",
              "Data Analysis with Excel & Power BI · NASPA",
              "SQL Database Crash Course · NASPA",
            ].map((cert) => (
              <span
                key={cert}
                className="text-xs font-mono px-3 py-1.5 rounded-full border border-border/60 bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors"
              >
                {cert}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
