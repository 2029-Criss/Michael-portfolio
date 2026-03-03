import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Header from "@/components/Header";
import ArticleCard from "@/components/ArticleCard";
import { ArrowLeft, Link2 } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import type { BlogPost } from "@/features/blog/types";
import { getPublishedPostBySlug } from "@/features/blog/services/blog.service";
import { articles } from "@/features/projects/data/articles";

const Article = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const projectArticle = articles.find((a) => a.id === slug);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (projectArticle) {
        setLoading(false);
        setNotFound(false);
        return;
      }

      if (!slug) {
        setNotFound(true);
        setLoading(false);
        return;
      }
      try {
        const data = await getPublishedPostBySlug(slug);
        if (!data) {
          setNotFound(true);
        } else {
          setPost(data);
        }
      } catch {
        toast.error("Impossible de charger l'article.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug, projectArticle]);

  if (notFound) return <Navigate to="/404" replace />;

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="grain-overlay" />
        <Header />
        <main className="pt-32 text-center">
          <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin mx-auto" />
        </main>
      </div>
    );
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Lien copié !");
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate(projectArticle ? "/" : "/blog");
  };

  if (projectArticle) {
    const relatedArticles = articles.filter((a) => a.id !== projectArticle.id).slice(0, 3);

    return (
      <div className="min-h-screen bg-background">
        <div className="grain-overlay" />
        <Header />

        <main className="pt-28 sm:pt-32">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <button onClick={handleBack} className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Retour
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] mb-12"
          >
            <img src={projectArticle.image} alt={projectArticle.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          </motion.div>

          <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="px-4 py-1.5 rounded-full text-xs bg-secondary text-secondary-foreground">{projectArticle.category}</span>
                <span className="text-xs text-muted-foreground">{projectArticle.date}</span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">{projectArticle.readTime}</span>
              </div>

              <h1 className="text-editorial text-4xl md:text-5xl lg:text-6xl mb-4">{projectArticle.title}</h1>
              <p className="text-lg text-muted-foreground mb-8">{projectArticle.subtitle}</p>

              <div className="flex items-center justify-between border-t border-b border-border py-6">
                <div className="flex items-center gap-4">
                  <img src={projectArticle.author.avatar} alt={projectArticle.author.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-medium">{projectArticle.author.name}</p>
                    <p className="text-xs text-muted-foreground">{projectArticle.author.bio}</p>
                  </div>
                </div>
                <button onClick={handleCopyLink} className="floating-button" aria-label="Copier le lien">
                  <Link2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

            <div className="mb-16 space-y-8">
              <p className="text-base leading-relaxed text-muted-foreground">{projectArticle.content.introduction}</p>
              {projectArticle.content.sections.map((section, index) => (
                <div key={index}>
                  <h2 className="text-editorial text-2xl md:text-3xl mb-4">{section.heading}</h2>
                  <p className="text-base leading-relaxed text-muted-foreground">{section.content}</p>
                </div>
              ))}
              <div className="p-8 rounded-extreme bg-card border-l-4 border-foreground/20">
                <p className="text-editorial-italic text-lg leading-relaxed">{projectArticle.content.conclusion}</p>
              </div>
            </div>

            <div className="mb-12 pb-12 border-b border-border flex flex-wrap gap-3">
              {projectArticle.tags.map((tag) => (
                <span key={tag} className="px-4 py-2 rounded-full text-xs bg-muted text-foreground">#{tag}</span>
              ))}
            </div>
          </article>

          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-editorial text-3xl mb-8">Autres réalisations</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedArticles.map((a) => (
                  <ArticleCard key={a.id} {...a} size="small" />
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }

  if (!post) return <Navigate to="/404" replace />;

  return (
    <div className="min-h-screen bg-background">
      <div className="grain-overlay" />
      <Header />

      <main className="pt-28 sm:pt-32">
        {/* Back */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button onClick={handleBack} className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Retour
          </button>
        </div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] mb-12"
        >
          {post.image_url ? (
            <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-muted" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </motion.div>

        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="px-4 py-1.5 rounded-full text-xs bg-secondary text-secondary-foreground">Blog</span>
              <span className="text-xs text-muted-foreground">{new Date(post.created_at).toLocaleDateString()}</span>
            </div>

            <h1 className="text-editorial text-4xl md:text-5xl lg:text-6xl mb-4">{post.title}</h1>
            <p className="text-lg text-muted-foreground mb-8">{post.excerpt}</p>

            <div className="flex items-center justify-between border-t border-b border-border py-6">
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-sm font-medium">Michael</p>
                  <p className="text-xs text-muted-foreground">Article de blog</p>
                </div>
              </div>
              <button onClick={handleCopyLink} className="floating-button" aria-label="Copier le lien">
                <Link2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Content */}
          <div className="mb-16 space-y-8">
            <p className="text-base leading-relaxed text-muted-foreground whitespace-pre-line">{post.content}</p>
          </div>

          {/* Tags */}
          <div className="mb-12 pb-12 border-b border-border flex flex-wrap gap-3">
            {post.tags.map((tag) => (
              <span key={tag} className="px-4 py-2 rounded-full text-xs bg-muted text-foreground">#{tag}</span>
            ))}
          </div>
        </article>
      </main>
    </div>
  );
};

export default Article;
