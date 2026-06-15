import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Timeline } from "@/components/Timeline";
import { CustomCursor } from "@/components/CustomCursor";
import { BackToTop } from "@/components/BackToTop";

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <CustomCursor />
      <Navigation />
      <main>
        <Hero />
        <About />

        {/* Interactive Timeline */}
        <section className="py-32 relative" id="journey">
          <div className="container mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <p className="text-xs font-mono tracking-[0.25em] text-primary uppercase mb-4">
                &gt;_ Career
              </p>
              <h2 className="text-3xl md:text-5xl font-serif mb-4">The Journey</h2>
              <div className="h-1 w-20 bg-primary rounded-full mb-4" />
              <p className="text-muted-foreground text-lg max-w-lg">
                A chronological trail of work, milestones, and growth. Click any entry to expand.
              </p>
            </motion.div>
            <Timeline />
          </div>
        </section>

        <Skills />
        <Projects />
        <Testimonials />
        <Contact />
      </main>
      <BackToTop />
    </div>
  );
}
