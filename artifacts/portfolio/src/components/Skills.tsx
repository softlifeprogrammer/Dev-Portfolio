import { motion } from "framer-motion";
import { SiReact, SiTypescript, SiNodedotjs, SiPostgresql, SiRedis, SiDocker, SiNextdotjs, SiTailwindcss, SiRust, SiGo } from "react-icons/si";

const skills = [
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "Redis", icon: SiRedis, color: "#DC382D" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Rust", icon: SiRust, color: "#000000" },
  { name: "Go", icon: SiGo, color: "#00ADD8" },
];

export function Skills() {
  return (
    <section className="py-24 bg-muted/30" id="skills">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif mb-4">Tools of the Trade</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I select tools based on resilience, performance, and developer experience. Here is my core stack.
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
              <skill.icon className="w-6 h-6 text-foreground" style={{ color: skill.name === 'Next.js' || skill.name === 'Rust' ? 'currentColor' : skill.color }} />
              <span className="font-medium font-sans text-sm">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}