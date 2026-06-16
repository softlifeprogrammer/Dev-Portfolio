import { lazy, Suspense } from "react";
import { motion, MotionConfig } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { CustomCursor } from "@/components/CustomCursor";
import { BackToTop } from "@/components/BackToTop";
import { ChatBot } from "@/components/ChatBot";

// On touch/mobile devices halve all animation durations to free up the main thread
const isMobile =
  typeof window !== "undefined" &&
  window.matchMedia("(pointer: coarse)").matches;
const mobileTransition = { type: "tween" as const, duration: 0.2, ease: "easeOut" };

const About = lazy(() => import("@/components/About").then((m) => ({ default: m.About })));
const Timeline = lazy(() => import("@/components/Timeline").then((m) => ({ default: m.Timeline })));
const Skills = lazy(() => import("@/components/Skills").then((m) => ({ default: m.Skills })));
const Projects = lazy(() => import("@/components/Projects").then((m) => ({ default: m.Projects })));
const Testimonials = lazy(() => import("@/components/Testimonials").then((m) => ({ default: m.Testimonials })));
const Contact = lazy(() => import("@/components/Contact").then((m) => ({ default: m.Contact })));

function SectionFallback() {
  return <div className="py-32 w-full" aria-hidden="true" />;
}

export default function Portfolio() {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={isMobile ? mobileTransition : undefined}
    >
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <CustomCursor />

      {/* Skip to main content — visible only on keyboard focus */}
      <a
        href="#main-content"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-[9999] focus-visible:px-5 focus-visible:py-3 focus-visible:bg-primary focus-visible:text-primary-foreground focus-visible:rounded-lg focus-visible:font-medium focus-visible:shadow-lg"
      >
        Skip to main content
      </a>

      <Navigation />

      <main id="main-content">
        {/* Hero is eager — it's above the fold and drives LCP */}
        <Hero />

        {/* Everything below the fold is lazily loaded */}
        <Suspense fallback={<SectionFallback />}>
          <About />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
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
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Skills />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Projects />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Testimonials />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
      </main>

      <BackToTop />
      <ChatBot />
    </div>
    </MotionConfig>
  );
}
