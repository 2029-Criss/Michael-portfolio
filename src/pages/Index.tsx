import Header from "@/components/Header";
import ArticleCard from "@/components/ArticleCard";
import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import { articles } from "@/features/projects/data/articles";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/use-language";

const Index = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <div className="grain-overlay" />
      <Header />

      <main className="pt-20 sm:pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <HeroSection />
          <IntroSection />

          {/* Projects */}
          <section id="articles" className="py-12 section-divider">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex items-center justify-between mb-12"
            >
              <h2 className="text-editorial text-3xl md:text-4xl">{t("projects.title")}</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <ArticleCard {...article} size="small" />
                </motion.div>
              ))}
            </div>
          </section>

          {/* Newsletter */}
          <motion.section
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="my-20 rounded-extreme card-elevated p-12 md:p-16 text-center section-alt"
          >
            <div className="max-w-2xl mx-auto space-y-8">
              <h2 className="text-editorial text-4xl md:text-5xl">{t("newsletter.title")}</h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                {t("newsletter.desc")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder={t("newsletter.placeholder")}
                  className="flex-1 px-6 py-4 rounded-full border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-all text-sm"
                />
                <button className="btn-luxury-primary">
                  {t("newsletter.cta")}
                </button>
              </div>
            </div>
          </motion.section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16 section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-medium mb-4 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{t("footer.explore")}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/" className="hover:text-foreground transition-colors">{t("nav.home")}</a></li>
                <li><a href="/#articles" className="hover:text-foreground transition-colors">{t("nav.projects")}</a></li>
                <li><a href="/blog" className="hover:text-foreground transition-colors">{t("nav.blog")}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{t("footer.about")}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/about" className="hover:text-foreground transition-colors">{t("footer.story")}</a></li>
                <li><a href="/contact" className="hover:text-foreground transition-colors">{t("footer.contact")}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{t("footer.contact")}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Nairobi, Kenya</li>
                <li>michael@example.com</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{t("footer.legal")}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/privacy" className="hover:text-foreground transition-colors">{t("footer.privacy")}</a></li>
                <li><a href="/terms" className="hover:text-foreground transition-colors">{t("footer.terms")}</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>{t("footer.rights")}</p>
            <p className="text-editorial-italic text-xs">{t("footer.tagline")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;