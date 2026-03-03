import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun, Languages } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/use-language";


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    setIsDark(shouldBeDark);
    if (shouldBeDark) document.documentElement.classList.add("dark");

    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const toggleLang = () => setLang(lang === "fr" ? "en" : "fr");

  const navLinks = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.projects"), href: "/#articles" },
    { label: t("nav.about"), href: "/about" },
    { label: t("nav.contact"), href: "/contact" },
    { label: t("nav.blog"), href: "/blog" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className="fixed top-4 sm:top-6 left-0 right-0 z-50 flex justify-center px-4"
      >
        <div className={`
          relative rounded-full px-4 sm:px-6 lg:px-8 py-3 sm:py-4
          transition-all duration-500 ease-out
          ${isScrolled
            ? 'bg-background/80 backdrop-blur-xl shadow-elevated border border-border'
            : 'bg-background/50 backdrop-blur-md border border-border/50'
          }
        `}>
          <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
            <motion.a
              href="/"
              className="text-editorial-medium text-lg sm:text-xl tracking-[0.15em]"
              whileHover={{ scale: 1.02 }}
            >
              Michael
            </motion.a>

            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 font-light"
                  whileHover={{ y: -2 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              {/* Language toggle */}
              <motion.button
                onClick={toggleLang}
                className="px-2.5 py-1.5 rounded-full border border-border hover:bg-muted transition-colors text-[10px] font-semibold tracking-wider uppercase flex items-center gap-1.5"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle language"
              >
                <Languages className="h-3.5 w-3.5" />
                {lang === "fr" ? "EN" : "FR"}
              </motion.button>

              <motion.button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-muted transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </motion.button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-40 lg:hidden bg-background/95 backdrop-blur-xl"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="text-editorial text-3xl sm:text-4xl hover:text-accent transition-colors tracking-[0.1em]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;