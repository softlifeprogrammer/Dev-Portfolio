import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  relationship: string;
  initials: string;
  color: string;
  rating: number;
  quote: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Abena Owusu",
    role: "Product Manager, Meridian Labs",
    relationship: "Direct colleague",
    initials: "AO",
    color: "from-blue-500 to-cyan-500",
    rating: 5,
    quote:
      "Ray-shaun has an extraordinary ability to translate complex technical constraints into language the whole team can act on. He shipped our data pipeline rewrite two weeks ahead of schedule and the P99 latency improvement was immediately felt by every user. One of the most reliable engineers I've worked with.",
  },
  {
    name: "Dr. Kwame Asante",
    role: "Senior Lecturer, University of Ghana",
    relationship: "Academic supervisor",
    initials: "KA",
    color: "from-violet-500 to-purple-500",
    rating: 5,
    quote:
      "Ray-shaun was among the top students in his cohort — curious, precise, and relentlessly thorough. His final-year project on real-time collaborative editing was the most technically sophisticated submission I've reviewed in years. He has a genuine talent for systems thinking.",
  },
  {
    name: "Selasi Agbevanu",
    role: "Frontend Lead, Axiom Technologies",
    relationship: "Teammate for 3 years",
    initials: "SA",
    color: "from-amber-500 to-orange-500",
    rating: 5,
    quote:
      "Working alongside Ray-shaun is a masterclass in engineering discipline. He pushes back on shortcuts that matter and lets go of ego when it doesn't. The component library we built together became the foundation for three subsequent products. I'd join any team he's on without hesitation.",
  },
  {
    name: "Nana Ama Boateng",
    role: "Data Analyst, Ghana Investment Bank",
    relationship: "Client collaboration",
    initials: "NB",
    color: "from-green-500 to-emerald-500",
    rating: 5,
    quote:
      "Ray-shaun built our Power BI reporting suite from scratch in under four weeks. He asked the right questions upfront, understood our reporting needs better than we did, and delivered dashboards our leadership team now uses every single day. He genuinely cares about the outcome, not just the delivery.",
  },
  {
    name: "Emmanuel Ofori",
    role: "CTO, Cobalt Digital",
    relationship: "First engineering hire",
    initials: "EO",
    color: "from-rose-500 to-pink-500",
    rating: 5,
    quote:
      "I hired Ray-shaun as our first engineer. In the first six months he built our entire backend — auth, APIs, data models, CI/CD — and made architectural choices that scaled us well past the startup phase. His technical judgment is rare and his work ethic is exceptional.",
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const total = TESTIMONIALS.length;

  const prev = () => setCurrent((i) => (i - 1 + total) % total);
  const next = () => setCurrent((i) => (i + 1) % total);

  const t = TESTIMONIALS[current];

  return (
    <section className="py-32 relative bg-muted/20" id="testimonials">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-xs font-mono tracking-[0.25em] text-primary uppercase mb-4">
            &gt;_ Social Proof
          </p>
          <h2 className="text-3xl md:text-5xl font-serif mb-4">What People Say</h2>
          <div className="h-1 w-20 bg-primary rounded-full" />
        </motion.div>

        {/* Carousel */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative"
              data-testid={`testimonial-card-${current}`}
            >
              {/* Large quote icon */}
              <Quote className="w-12 h-12 text-primary/20 mb-6" strokeWidth={1} />

              {/* Quote */}
              <blockquote className="text-xl md:text-2xl font-serif leading-relaxed text-foreground/90 mb-10">
                "{t.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center shrink-0`}>
                  <span className="text-white font-semibold text-sm">{t.initials}</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                  <p className="text-xs font-mono text-primary/70 uppercase tracking-wider mt-0.5">{t.relationship}</p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-between mt-12">
            {/* Dot indicators */}
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  data-testid={`button-testimonial-dot-${i}`}
                  className={`transition-all duration-300 rounded-full ${
                    i === current
                      ? "w-6 h-2 bg-primary"
                      : "w-2 h-2 bg-border hover:bg-muted-foreground"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            {/* Prev / Next */}
            <div className="flex gap-2">
              <button
                onClick={prev}
                data-testid="button-testimonial-prev"
                className="w-10 h-10 rounded-full border border-border hover:border-primary/50 hover:text-primary flex items-center justify-center text-muted-foreground transition-all"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                data-testid="button-testimonial-next"
                className="w-10 h-10 rounded-full border border-border hover:border-primary/50 hover:text-primary flex items-center justify-center text-muted-foreground transition-all"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Counter */}
          <p className="text-xs font-mono text-muted-foreground/50 text-center mt-6">
            {current + 1} / {total}
          </p>
        </div>
      </div>
    </section>
  );
}
