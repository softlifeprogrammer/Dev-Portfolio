import { motion } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";
import { Button } from "./ui/button";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden" id="home">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-50 dark:opacity-20" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-2 mb-6"
          >
            <Terminal className="w-5 h-5 text-primary" />
            <span className="font-mono text-sm text-primary tracking-wider uppercase">Systems Engineer</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium leading-[1.1] tracking-tight mb-8"
          >
            Building software <br className="hidden md:block" />
            that feels <span className="italic text-muted-foreground">alive</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed font-sans"
          >
            I'm Ray-shaun Adokwei Mensah. I craft resilient backend systems and fluid interfaces 
            for the modern web. Obsessed with performance, architecture, and the invisible details.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <Button size="lg" className="rounded-full text-base px-8 h-14 group">
              View Work
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full text-base px-8 h-14 border-border/50 hover:bg-muted/50 backdrop-blur-sm">
              Contact Me
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Decorative lines */}
      <div className="absolute left-0 bottom-0 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </section>
  );
}