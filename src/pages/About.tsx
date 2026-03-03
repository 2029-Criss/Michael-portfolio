import Header from "@/components/Header";
import { motion } from "framer-motion";
import { Download, MapPin, Globe, Mail, Phone, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/context/use-language";

const services = [
  { title: { fr: "Conseil Stratégique", en: "Strategic Consulting" }, desc: { fr: "Définition de feuilles de route RSE et stratégies de développement durable sur mesure.", en: "Defining CSR roadmaps and tailored sustainable development strategies." }, image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80" },
  { title: { fr: "Audit Environnemental", en: "Environmental Audit" }, desc: { fr: "Évaluation complète de l'empreinte carbone et des pratiques environnementales.", en: "Complete assessment of carbon footprint and environmental practices." }, image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80" },
  { title: { fr: "Coaching & Formation", en: "Coaching & Training" }, desc: { fr: "Programmes de formation pour sensibiliser et engager les équipes.", en: "Training programs to raise awareness and engage teams." }, image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80" },
  { title: { fr: "Gestion de Projets", en: "Project Management" }, desc: { fr: "Pilotage de projets à impact social et environnemental positif.", en: "Managing projects with positive social and environmental impact." }, image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80" },
];

const portfolio = [
  { title: { fr: "Projet Baie des Rois", en: "Bay of Kings Project" }, sub: { fr: "Réalisation majeure avec le FGIS", en: "Major achievement with FGIS" }, image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80" },
  { title: { fr: "Engagement ONG", en: "NGO Engagement" }, sub: { fr: "Soutien aux initiatives locales", en: "Supporting local initiatives" }, image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80" },
  { title: { fr: "Conseil Écoresponsable", en: "Eco-responsible Consulting" }, sub: { fr: "Accompagnement des particuliers", en: "Individual guidance" }, image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80" },
];

const testimonials = [
  { name: "Sophie L.", role: { fr: "Directrice RSE", en: "CSR Director" }, quote: { fr: "Michael a transformé notre approche du développement durable. Son expertise et son engagement sont remarquables.", en: "Michael transformed our approach to sustainable development. His expertise and commitment are remarkable." } },
  { name: "Jean-Pierre M.", role: { fr: "Fondateur ONG", en: "NGO Founder" }, quote: { fr: "Un accompagnement exceptionnel qui a permis à notre organisation de structurer ses projets d'impact.", en: "Exceptional guidance that enabled our organization to structure its impact projects." } },
  { name: "Amina K.", role: { fr: "Entrepreneuse", en: "Entrepreneur" }, quote: { fr: "Grâce à Michael, j'ai pu intégrer des pratiques écoresponsables dans mon business de manière concrète.", en: "Thanks to Michael, I was able to integrate eco-responsible practices into my business in a concrete way." } },
];

const timeline = [
  { step: "01", title: { fr: "Diagnostic", en: "Diagnosis" }, desc: { fr: "Analyse approfondie de votre situation actuelle", en: "In-depth analysis of your current situation" } },
  { step: "02", title: { fr: "Stratégie", en: "Strategy" }, desc: { fr: "Définition d'objectifs clairs et mesurables", en: "Defining clear and measurable objectives" } },
  { step: "03", title: { fr: "Planification", en: "Planning" }, desc: { fr: "Élaboration d'une feuille de route détaillée", en: "Developing a detailed roadmap" } },
  { step: "04", title: { fr: "Mise en œuvre", en: "Implementation" }, desc: { fr: "Déploiement des actions avec suivi continu", en: "Deploying actions with continuous monitoring" } },
  { step: "05", title: { fr: "Mesure", en: "Measurement" }, desc: { fr: "Évaluation de l'impact et des résultats", en: "Evaluating impact and results" } },
  { step: "06", title: { fr: "Optimisation", en: "Optimization" }, desc: { fr: "Ajustements et amélioration continue", en: "Adjustments and continuous improvement" } },
];

function useCarousel(length: number, auto = true) {
  const [index, setIndex] = useState(0);
  const next = useCallback(() => setIndex((i) => (i + 1) % length), [length]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + length) % length), [length]);
  useEffect(() => {
    if (!auto) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next, auto]);
  return { index, next, prev, setIndex };
}

const CarouselNav = ({ index, total, prev, next }: { index: number; total: number; prev: () => void; next: () => void }) => (
  <div className="flex items-center justify-center gap-4 mt-8">
    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={prev} className="p-2 rounded-full border border-border hover:bg-muted transition-colors">
      <ChevronLeft className="w-5 h-5" />
    </motion.button>
    <div className="flex gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={`w-2 h-2 rounded-full transition-all duration-300 ${i === index ? "bg-foreground w-6" : "bg-muted-foreground/30"}`} />
      ))}
    </div>
    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={next} className="p-2 rounded-full border border-border hover:bg-muted transition-colors">
      <ChevronRight className="w-5 h-5" />
    </motion.button>
  </div>
);

const About = () => {
  const svc = useCarousel(services.length);
  const port = useCarousel(portfolio.length);
  const test = useCarousel(testimonials.length);
  const { lang, t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <div className="grain-overlay" />
      <Header />

      <main className="pt-28 sm:pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="mb-20 text-center space-y-4">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground">{t("about.tag")}</p>
            <h1 className="text-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl">Michael</h1>
          </motion.div>

          {/* Section 1 — Présentation */}
          <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="grid md:grid-cols-2 gap-12 md:gap-16 items-center mb-32 pb-20 section-divider">
            <div className="relative">
              <div className="aspect-[3/4] rounded-[2rem] overflow-hidden bg-muted border border-border/60">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80" alt="Michael portrait" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 card-elevated rounded-2xl p-5 hidden md:block">
                <p className="text-editorial text-3xl">3+</p>
                <p className="text-xs text-muted-foreground tracking-wider uppercase">{t("about.experience")}</p>
              </div>
            </div>
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground">{t("about.mission.tag")}</p>
                <h2 className="text-editorial text-3xl md:text-4xl leading-[1.2]">{t("about.mission.title")}</h2>
              </div>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>{t("about.mission.p1")}</p>
                <p>{t("about.mission.p2")}</p>
                <p>{t("about.mission.p3")}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                {["RSE", lang === "fr" ? "Stratégie" : "Strategy", "Impact Social", lang === "fr" ? "Environnement" : "Environment"].map((tag) => (
                  <span key={tag} className="px-4 py-2 rounded-full border border-border text-xs tracking-wider bg-card">{tag}</span>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Section 2 — Services */}
          <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-32 pb-20 section-divider section-alt -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-16 rounded-extreme">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground text-center mb-4">{t("about.services.tag")}</p>
            <h2 className="text-editorial text-3xl md:text-4xl text-center mb-12">{t("about.services.title")}</h2>
            <div className="relative overflow-hidden">
              <motion.div key={svc.index} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.5 }} className="grid md:grid-cols-2 gap-8 items-center">
                <div className="aspect-[4/3] rounded-[2rem] overflow-hidden bg-muted border border-border/60">
                  <img src={services[svc.index].image} alt={services[svc.index].title[lang]} className="w-full h-full object-cover" />
                </div>
                <div className="space-y-6 p-4">
                  <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">{String(svc.index + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}</span>
                  <h3 className="text-editorial text-3xl">{services[svc.index].title[lang]}</h3>
                  <p className="text-muted-foreground leading-relaxed">{services[svc.index].desc[lang]}</p>
                </div>
              </motion.div>
            </div>
            <CarouselNav index={svc.index} total={services.length} prev={svc.prev} next={svc.next} />
          </motion.section>

          {/* Section 3 — Portfolio */}
          <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-32 pb-20 section-divider">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground text-center mb-4">{t("about.portfolio.tag")}</p>
            <h2 className="text-editorial text-3xl md:text-4xl text-center mb-12">{t("about.portfolio.title")}</h2>
            <div className="relative overflow-hidden">
              <motion.div key={port.index} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="relative aspect-[16/9] rounded-[2rem] overflow-hidden bg-muted border border-border/60">
                <img src={portfolio[port.index].image} alt={portfolio[port.index].title[lang]} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <h3 className="text-white text-editorial text-3xl mb-2">{portfolio[port.index].title[lang]}</h3>
                  <p className="text-white/70 text-sm">{portfolio[port.index].sub[lang]}</p>
                </div>
              </motion.div>
            </div>
            <CarouselNav index={port.index} total={portfolio.length} prev={port.prev} next={port.next} />
          </motion.section>

          {/* Section 4 — Testimonials & Method */}
          <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-32">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground text-center mb-4">{t("about.testimonials.tag")}</p>
            <h2 className="text-editorial text-3xl md:text-4xl text-center mb-12">{t("about.testimonials.title")}</h2>
            <div className="max-w-2xl mx-auto">
              <motion.div key={test.index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="card-elevated rounded-extreme p-10 text-center space-y-6">
                <Quote className="w-10 h-10 text-accent/30 mx-auto" />
                <p className="text-lg leading-relaxed text-editorial-italic">"{testimonials[test.index].quote[lang]}"</p>
                <div>
                  <p className="font-medium">{testimonials[test.index].name}</p>
                  <p className="text-sm text-muted-foreground">{testimonials[test.index].role[lang]}</p>
                </div>
              </motion.div>
              <CarouselNav index={test.index} total={testimonials.length} prev={test.prev} next={test.next} />
            </div>

            {/* Timeline */}
            <div className="mt-24 section-alt -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-16 rounded-extreme">
              <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground text-center mb-4">{t("about.process.tag")}</p>
              <h3 className="text-editorial text-3xl text-center mb-12">{t("about.process.title")}</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {timeline.map((item, i) => (
                  <motion.div key={item.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} className="p-8 rounded-extreme card-elevated space-y-3">
                    <span className="text-editorial text-4xl text-accent/30">{item.step}</span>
                    <h4 className="text-editorial text-xl">{item.title[lang]}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc[lang]}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Section 5 — Info & CV */}
          <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground text-center mb-4">{t("about.info.tag")}</p>
            <h2 className="text-editorial text-3xl md:text-4xl text-center mb-12">{t("about.info.title")}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="card-elevated rounded-extreme p-10 space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0"><MapPin className="w-5 h-5 text-foreground" /></div>
                  <div><h4 className="font-semibold text-sm tracking-wide uppercase mb-1">{t("about.location")}</h4><p className="text-muted-foreground">Nairobi, Kenya</p></div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0"><Globe className="w-5 h-5 text-foreground" /></div>
                  <div><h4 className="font-semibold text-sm tracking-wide uppercase mb-1">{t("about.languages")}</h4><p className="text-muted-foreground">Français, English, Swahili</p></div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0"><Mail className="w-5 h-5 text-foreground" /></div>
                  <div><h4 className="font-semibold text-sm tracking-wide uppercase mb-1">{t("about.email")}</h4><p className="text-muted-foreground">michael@perspective.studio</p></div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0"><Phone className="w-5 h-5 text-foreground" /></div>
                  <div><h4 className="font-semibold text-sm tracking-wide uppercase mb-1">{t("about.phone")}</h4><p className="text-muted-foreground">+254 712 345 678</p></div>
                </div>
              </div>
              <div className="card-elevated rounded-extreme p-10 flex flex-col items-center justify-center text-center space-y-6 section-alt">
                <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center">
                  <Download className="w-8 h-8 text-foreground" />
                </div>
                <h3 className="text-editorial text-2xl">{t("about.cv.title")}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">{t("about.cv.desc")}</p>
                <motion.a
                  href="/cv.pdf"
                  download
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-luxury-primary inline-flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  {t("about.cv.cta")}
                </motion.a>
              </div>
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  );
};

export default About;