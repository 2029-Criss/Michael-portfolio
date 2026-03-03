import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/use-language";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative rounded-extreme overflow-hidden border border-border/60 card-elevated my-8 md:my-12">
      <div className="grid md:grid-cols-2 gap-0">
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          className="relative aspect-[4/3] md:aspect-auto md:min-h-[600px] overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80"
            alt="Sustainable urban project"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 md:to-transparent" />
        </motion.div>

        <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16 space-y-8 bg-card">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="space-y-6"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
              {t("hero.tagline")}
            </p>
            <h1 className="text-editorial text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-[1.15]">
              {t("hero.title")}
            </h1>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-lg">
              {t("hero.desc")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a href="/contact" className="btn-luxury-primary inline-flex items-center gap-3">
              {t("hero.cta")}
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;