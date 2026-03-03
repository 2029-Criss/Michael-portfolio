import { motion } from "framer-motion";
import { useLanguage } from "@/context/use-language";

const IntroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="section-alt -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 section-divider">
      <div className="max-w-4xl mx-auto py-16 md:py-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          className="text-center space-y-6"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
            {t("intro.tag")}
          </p>
          <h2 className="text-editorial text-3xl md:text-4xl lg:text-5xl leading-[1.2]">
            {t("intro.title")}
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {t("intro.desc")}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default IntroSection;