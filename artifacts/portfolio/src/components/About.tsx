import { motion } from "framer-motion";
import { Code2, Database, Cpu } from "lucide-react";

export function About() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-32 relative" id="about">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl md:text-5xl font-serif mb-6">The Workshop</h2>
              <div className="h-1 w-20 bg-primary mb-8 rounded-full" />
              <div className="space-y-6 text-muted-foreground text-lg font-sans leading-relaxed">
                <p>
                  I approach software engineering like traditional craftsmanship. It's not just about getting it to work; it's about building it right. Every function, every database query, every animation curve matters.
                </p>
                <p>
                  With over 8 years of experience building scalable applications, I've learned that the best code is the code you don't have to write, and the best architectures are the ones that quietly get out of the way.
                </p>
                <p>
                  When I'm not writing code, I'm analyzing distributed systems, roasting coffee, or building mechanical keyboards.
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
              <Code2 className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform duration-500" />
              <h3 className="text-xl font-medium mb-3">Frontend Architecture</h3>
              <p className="text-muted-foreground">Building fluid, state-driven interfaces that feel instant and natural. React, TypeScript, and fine-tuned animations.</p>
            </motion.div>

            <motion.div variants={item} className="p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-colors group md:mt-12">
              <Database className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform duration-500" />
              <h3 className="text-xl font-medium mb-3">Data Systems</h3>
              <p className="text-muted-foreground">Designing resilient database schemas and high-throughput APIs. Postgres, Redis, and optimized query structures.</p>
            </motion.div>

            <motion.div variants={item} className="p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-colors group md:-mt-12">
              <Cpu className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform duration-500" />
              <h3 className="text-xl font-medium mb-3">Infrastructure</h3>
              <p className="text-muted-foreground">Deploying and scaling containerized applications. Docker, CI/CD pipelines, and cloud-native architecture.</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}