import { useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { Moon, Sun, Menu, X, Download } from "lucide-react";
import { Button } from "./ui/button";
import { Link, useLocation } from "wouter";

interface NavLink {
  name: string;
  href: string;
  page?: boolean;
}

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const { theme, setTheme } = useTheme();
  const [location] = useLocation();

  const onBlogPage = location === "/blog";

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const links: NavLink[] = onBlogPage
    ? [{ name: "Portfolio", href: "/", page: true }]
    : [
        { name: "About", href: "#about" },
        { name: "Skills", href: "#skills" },
        { name: "Projects", href: "#projects" },
        { name: "Contact", href: "#contact" },
        { name: "Blog", href: "/blog", page: true },
      ];

  function NavAnchor({ link, mobile }: { link: NavLink; mobile?: boolean }) {
    const base = mobile
      ? "text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
      : "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors";

    if (link.page) {
      return (
        <Link
          href={link.href}
          onClick={() => setMenuOpen(false)}
          className={`${base} ${location === link.href ? "text-primary" : ""}`}
          data-testid={`link-${mobile ? "mobile-" : ""}${link.name.toLowerCase()}`}
        >
          {link.name}
        </Link>
      );
    }
    return (
      <a
        href={link.href}
        onClick={() => setMenuOpen(false)}
        className={base}
        data-testid={`link-${mobile ? "mobile-" : ""}${link.name.toLowerCase()}`}
      >
        {link.name}
      </a>
    );
  }

  const ThemeToggle = () => (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-full"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/95 md:bg-background/80 md:backdrop-blur-md border-b border-border/50 py-3 shadow-sm"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="text-xl font-serif font-bold tracking-tight text-primary">
            Ray-shaun.dev
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
            {links.map((link) => (
              <NavAnchor key={link.name} link={link} />
            ))}
            <a
              href="/cv.pdf"
              download="Ray-shaun-Adokwei-Mensah-CV.pdf"
              data-testid="link-download-cv"
              className="inline-flex items-center gap-1.5 text-sm font-medium px-3.5 py-1.5 rounded-full border border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200"
            >
              <Download className="w-3.5 h-3.5" />
              CV
            </a>
            <ThemeToggle />
          </nav>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMenuOpen((o) => !o)}
              className="rounded-full"
              data-testid="button-mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed top-[64px] left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-b border-border/50 md:hidden"
          >
            <nav id="mobile-nav" className="container mx-auto px-6 py-6 flex flex-col gap-5" aria-label="Mobile navigation">
              {links.map((link) => (
                <NavAnchor key={link.name} link={link} mobile />
              ))}
              <a
                href="/cv.pdf"
                download="Ray-shaun-Adokwei-Mensah-CV.pdf"
                onClick={() => setMenuOpen(false)}
                data-testid="link-mobile-download-cv"
                className="inline-flex items-center gap-2 text-lg font-medium text-primary"
              >
                <Download className="w-5 h-5" />
                Download CV
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
