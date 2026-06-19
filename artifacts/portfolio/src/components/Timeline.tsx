import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Briefcase, GraduationCap, Award } from "lucide-react";

interface TimelineEvent {
  year: string;
  title: string;
  org: string;
  type: "work" | "edu" | "award";
  description: string;
  tags: string[];
}

const events: TimelineEvent[] = [
  {
    year: "2026",
    title: "Control Room Officer",
    org: "Ghana Steel Ltd, Tema",
    type: "work",
    description:
      "Monitor CCTV surveillance systems and control room operations to ensure site security. Troubleshoot CCTV cameras, network devices, and related IT equipment. Monitor network connectivity and maintain incident logs while coordinating with security personnel during system alerts.",
    tags: ["CCTV", "Networking", "IT Support", "Incident Management"],
  },
  {
    year: "2024–2025",
    title: "National Service Personnel",
    org: "Kpone-Katamanso Metropolitan Assembly",
    type: "work",
    description:
      "Configured and networked office systems by installing routers, switches, and cabling across multiple workstations. Diagnosed and resolved technical issues for 35+ devices, reducing downtime by 25%. Conducted vulnerability scans identifying and mitigating 95% of potential security risks. Provided IT training to staff, improving in-house technical capabilities.",
    tags: ["Networking", "Vulnerability Scanning", "Hardware Support", "IT Training"],
  },
  {
    year: "2024",
    title: "B.Sc. Information Technology Management",
    org: "University of Professional Studies, Accra",
    type: "edu",
    description:
      "Graduated with a B.Sc. in Information Technology Management. Coursework covered Programming, Web Development, Database Management, Computer Networks, Hardware Systems, Software Quality Management, and Automation of Business Processes. Final year project: built a fitness management platform for Sel Fitness Club.",
    tags: ["Programming", "Web Development", "Databases", "Networking"],
  },
  {
    year: "2024",
    title: "Final Year Project — Sel Fitness Club",
    org: "University of Professional Studies",
    type: "award",
    description:
      "Designed and developed a full fitness management platform for Sel Fitness Club as my final year capstone project. The platform handles member registration, class scheduling, and session tracking, with a clean web interface built using HTML, CSS, and JavaScript.",
    tags: ["HTML", "CSS", "JavaScript", "Web Development"],
  },
  {
    year: "2023",
    title: "Junior Computer Support Specialist",
    org: "NAD Security Ltd, Accra",
    type: "work",
    description:
      "Resolved hardware, software, and printer issues, improving operational efficiency. Planned and undertook scheduled maintenance and upgrades on company systems. Conducted vulnerability scans, identifying and mitigating potential security risks across company infrastructure.",
    tags: ["IT Support", "Hardware", "Vulnerability Scanning", "Maintenance"],
  },
  {
    year: "2020",
    title: "Started B.Sc. — Information Technology Management",
    org: "University of Professional Studies, Accra",
    type: "edu",
    description:
      "Began a four-year programme in Information Technology Management, building a strong foundation in programming, web development, database systems, and computer networks.",
    tags: ["Python", "JavaScript", "SQL", "Networking"],
  },
];

const iconMap = { work: Briefcase, edu: GraduationCap, award: Award };

export function Timeline() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="relative">
      {/* Animated vertical line */}
      <motion.div
        className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/70 via-primary/25 to-transparent -translate-x-1/2"
        initial={{ scaleY: 0, originY: "0%" }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="space-y-5 md:space-y-0">
        {events.map((event, i) => {
          const Icon = iconMap[event.type];
          const isOpen = openIndex === i;
          const isLeft = i % 2 === 0;

          return (
            <motion.div
              key={i}
              className={`relative flex items-start gap-6 md:gap-0 ${
                isLeft ? "md:flex-row" : "md:flex-row-reverse"
              }`}
              initial={{ opacity: 0, x: isLeft ? -28 : 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
            >
              {/* Card */}
              <div
                className={`pl-12 md:pl-0 md:w-[calc(50%-52px)] ${
                  isLeft ? "md:pr-10" : "md:pl-10"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  data-testid={`button-timeline-${i}`}
                  className="w-full text-left"
                >
                  <div
                    className={`p-5 rounded-xl border transition-all duration-300 ${
                      isOpen
                        ? "border-primary/40 bg-card shadow-md shadow-primary/5"
                        : "border-border/40 bg-card hover:border-primary/25"
                    }`}
                  >
                    <div className={`flex items-center gap-2 mb-1.5 ${isLeft ? "md:justify-end" : ""}`}>
                      <span className="text-[11px] font-mono text-primary tracking-widest">{event.year}</span>
                      <span className="text-[11px] text-muted-foreground uppercase tracking-wide">· {event.org}</span>
                    </div>

                    <div className={`flex items-center justify-between gap-2 ${isLeft ? "md:flex-row-reverse" : ""}`}>
                      <h3 className="font-medium text-foreground group-hover:text-primary transition-colors text-sm md:text-base">
                        {event.title}
                      </h3>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="shrink-0"
                      >
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      </motion.div>
                    </div>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.28, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <p className={`text-sm text-muted-foreground leading-relaxed mt-3 ${isLeft ? "md:text-right" : ""}`}>
                            {event.description}
                          </p>
                          <div className={`flex flex-wrap gap-1.5 mt-3 ${isLeft ? "md:justify-end" : ""}`}>
                            {event.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </button>
              </div>

              {/* Center icon dot */}
              <div className="absolute left-0 md:relative md:left-auto md:shrink-0 md:w-[104px] flex items-start md:items-center justify-center pt-3 md:pt-0">
                <motion.div
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center z-10 transition-all duration-300 ${
                    isOpen
                      ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/30"
                      : "bg-background border-border/60 text-muted-foreground"
                  }`}
                  whileHover={{ scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Icon className="w-4 h-4" />
                </motion.div>
              </div>

              {/* Spacer */}
              <div className="hidden md:block md:w-[calc(50%-52px)]" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
