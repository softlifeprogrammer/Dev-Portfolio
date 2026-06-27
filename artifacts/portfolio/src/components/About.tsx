import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Monitor, ShieldCheck, BarChart2 } from "lucide-react";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

const STATS: StatItem[] = [
  { value: 4, suffix: "+", label: "Years in tech" },
  { value: 35, suffix: "+", label: "Devices supported" },
  { value: 5, suffix: "+", label: "Certifications" },
  { value: 95, suffix: "%", label: "Security risks mitigated" },
];

function Counter({ value, suffix, label }: StatItem) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const totalFrames = Math.round(60 * 1.6);
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = () => {
      frame++;
      const progress = easeOut(Math.min(frame / totalFrames, 1));
      setCount(Math.round(value * progress));
      if (frame < totalFrames) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-1">
      <span className="text-3xl md:text-4xl font-serif font-semibold text-foreground tabular-nums">
        {count.toLocaleString()}{suffix}
      </span>
      <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">{label}</span>
    </div>
  );
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  // No explicit transition — MotionConfig controls duration (0.2s on mobile, default on desktop)
  show: { opacity: 1, y: 0 },
};

export function About() {
  return (
    <section className="py-32 relative" id="about">
      <div className="container mx-auto px-6 md:px-12">

        {/* Main two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              >
              <h2 className="text-3xl md:text-5xl font-serif mb-6">The Workshop</h2>
              <div className="h-1 w-20 bg-primary mb-8 rounded-full" />
              <div className="space-y-6 text-muted-foreground text-lg font-sans leading-relaxed">
                <p>
                  I'm an IT Support Specialist and Software Engineer with hands-on experience in
                  technical support, web development, system diagnostics, and IT security. I hold a
                  B.Sc. in Information Technology Management from the University of Professional
                  Studies, Accra.
                </p>
                <p>
                  During my national service at the Kpone-Katamanso Metropolitan Assembly, I
                  diagnosed and resolved issues across 35+ devices, reduced downtime by 25%, and
                  mitigated 95% of identified security risks through in-depth vulnerability scans.
                </p>
                <p>
                  Outside of work I'm building web projects, exploring data analysis with Python
                  and Power BI, and continuously adding to my skill set through certifications.
                  Fluent in English, Ga, and Twi.
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={item} className="p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-colors group">
              <Monitor className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform duration-500" />
              <h3 className="text-xl font-medium mb-3">Web Development</h3>
              <p className="text-muted-foreground">Building responsive frontends and backend APIs with Python, JavaScript, HTML, and CSS. Focused on clean, maintainable code that solves real problems.</p>
            </motion.div>

            <motion.div variants={item} className="p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-colors group md:mt-12">
              <ShieldCheck className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform duration-500" />
              <h3 className="text-xl font-medium mb-3">IT Support & Security</h3>
              <p className="text-muted-foreground">Diagnosing hardware and software faults, configuring networks, running vulnerability scans, and keeping systems secure and operational.</p>
            </motion.div>

            <motion.div variants={item} className="p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-colors group md:-mt-12">
              <BarChart2 className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform duration-500" />
              <h3 className="text-xl font-medium mb-3">Data Analysis</h3>
              <p className="text-muted-foreground">Turning raw data into clear insights using Excel, Power BI, and Python. From building dashboards to automating reports and processes.</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Animated counter stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-b border-border/40"
        >
          {STATS.map((stat) => (
            <Counter key={stat.label} {...stat} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
