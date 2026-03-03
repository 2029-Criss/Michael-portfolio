import Header from "@/components/Header";
import { Mail, MapPin, Phone, Send, CheckCircle } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/context/use-language";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const { t } = useLanguage();

  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const formInView = useInView(formRef, { once: true, margin: "-100px" });
  const infoInView = useInView(infoRef, { once: true, margin: "-100px" });
  const mapInView = useInView(mapRef, { once: true, margin: "-100px" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    toast.success(t("contact.form.sent"));
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const contactInfo = [
    { icon: Mail, title: t("about.email"), value: "michael@perspective.studio", sub: "Response within 24h" },
    { icon: Phone, title: t("about.phone"), value: "+254 712 345 678", sub: "Mon-Fri, 9am-5pm EAT" },
    { icon: MapPin, title: t("about.location"), value: "Nairobi, Kenya", sub: "Westlands, Nairobi" },
  ];

  const inputClasses = (field: string) => `
    w-full px-6 py-4 rounded-extreme bg-background border 
    transition-all duration-400 text-sm sm:text-base
    ${focusedField === field ? 'border-foreground shadow-sm' : 'border-border hover:border-foreground/30'}
    focus:outline-none focus:border-foreground
    placeholder:text-muted-foreground/60
  `;

  return (
    <div className="min-h-screen bg-background">
      <div className="grain-overlay" />
      <Header />
      <main className="pt-28 sm:pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="mb-16 sm:mb-20 text-center space-y-6">
            <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-muted-foreground">{t("contact.tag")}</p>
            <h1 className="text-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block">{t("contact.title1")}</span>
              <span className="block text-editorial-italic text-foreground/80">{t("contact.title2")}</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base leading-relaxed">{t("contact.desc")}</p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
            <motion.div ref={formRef} initial={{ opacity: 0, y: 40 }} animate={formInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="lg:col-span-3">
              <div className="card-elevated rounded-extreme p-8 sm:p-10">
                <h2 className="text-editorial text-2xl sm:text-3xl mb-8">{t("contact.form.title")}</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {[
                    { name: "name", label: t("contact.form.name"), placeholder: t("contact.form.name.placeholder"), type: "text" },
                    { name: "email", label: t("contact.form.email"), placeholder: "your@email.com", type: "email" },
                    { name: "subject", label: t("contact.form.subject"), placeholder: t("contact.form.subject.placeholder"), type: "text" },
                  ].map((field, i) => (
                    <motion.div key={field.name} initial={{ opacity: 0, y: 20 }} animate={formInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 * (i + 1) }}>
                      <label className="block text-sm font-medium mb-2 tracking-wide">{field.label}</label>
                      <input type={field.type} name={field.name} value={formData[field.name as keyof typeof formData]} onChange={handleChange}
                        onFocus={() => setFocusedField(field.name)} onBlur={() => setFocusedField(null)} required
                        className={inputClasses(field.name)} placeholder={field.placeholder} />
                    </motion.div>
                  ))}
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={formInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4 }}>
                    <label className="block text-sm font-medium mb-2 tracking-wide">{t("contact.form.message")}</label>
                    <textarea name="message" value={formData.message} onChange={handleChange}
                      onFocus={() => setFocusedField("message")} onBlur={() => setFocusedField(null)} required rows={5}
                      className={`${inputClasses("message")} resize-none rounded-3xl`} placeholder={t("contact.form.message.placeholder")} />
                  </motion.div>
                  <motion.button type="submit" initial={{ opacity: 0, y: 20 }} animate={formInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }}
                    whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }} disabled={isSubmitted}
                    className="w-full btn-luxury-primary flex items-center justify-center gap-3 disabled:opacity-70">
                    {isSubmitted ? <><CheckCircle className="w-5 h-5" />{t("contact.form.sent")}</> : <><Send className="w-5 h-5" />{t("contact.form.send")}</>}
                  </motion.button>
                </form>
              </div>
            </motion.div>

            <motion.div ref={infoRef} initial={{ opacity: 0, y: 40 }} animate={infoInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }} className="lg:col-span-2 space-y-6">
              <div className="card-elevated rounded-extreme p-8">
                <h2 className="text-editorial text-xl sm:text-2xl mb-6">{t("contact.info.title")}</h2>
                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <motion.div key={item.title} initial={{ opacity: 0, x: 20 }} animate={infoInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 + index * 0.1 }} className="flex items-start gap-4 group">
                      <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-0.5 text-sm tracking-wide uppercase">{item.title}</h3>
                        <p className="text-foreground">{item.value}</p>
                        <p className="text-muted-foreground text-sm">{item.sub}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="rounded-extreme card-elevated p-8 section-alt">
                <h3 className="text-editorial text-lg mb-4">{t("contact.reply.title")}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{t("contact.reply.desc")}</p>
              </div>
            </motion.div>
          </div>

          <motion.div ref={mapRef} initial={{ opacity: 0, y: 40 }} animate={mapInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="mt-14 sm:mt-20">
            <div className="text-center mb-8">
              <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">{t("contact.map.tag")}</p>
              <h2 className="text-editorial text-2xl sm:text-3xl">Nairobi, Kenya</h2>
            </div>
            <div className="rounded-extreme overflow-hidden card-elevated">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255282.35853731544!2d36.68218105!3d-1.3028617749999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1172d84d49a7%3A0xf7cf0254b297924c!2sNairobi%2C%20Kenya!5e0!3m2!1sfr!2sfr!4v1700000000000!5m2!1sfr!2sfr"
                width="100%" height="450" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Nairobi location"
                className="w-full h-[300px] sm:h-[400px] lg:h-[450px]" />
            </div>
          </motion.div>
        </div>
      </main>

      <footer className="border-t border-border section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2026 Michael. All rights reserved.</p>
            <p className="text-editorial-italic">Built with passion</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;