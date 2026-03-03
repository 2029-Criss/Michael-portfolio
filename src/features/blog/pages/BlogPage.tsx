import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { BlogPost } from "@/features/blog/types";
import { getPublishedPosts, getSession, removePostById, subscribeToAuthChange } from "@/features/blog/services/blog.service";
import { useLanguage } from "@/context/use-language";

const Blog = () => {
  const PAGE_SIZE = 6;
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    loadInitialPosts();
    checkAuth();
    const subscription = subscribeToAuthChange(setIsAdmin);
    return () => subscription.unsubscribe();
  }, []);

  const checkAuth = async () => {
    const session = await getSession();
    setIsAdmin(!!session?.user);
  };

  const loadInitialPosts = async () => {
    try {
      const data = await getPublishedPosts({ limit: PAGE_SIZE, offset: 0 });
      setPosts(data);
      setOffset(data.length);
      setHasMore(data.length === PAGE_SIZE);
    } catch {
      toast.error("Error loading articles");
    }
    setLoading(false);
  };

  const loadMorePosts = async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    try {
      const nextPage = await getPublishedPosts({ limit: PAGE_SIZE, offset });
      setPosts((current) => [...current, ...nextPage]);
      setOffset((current) => current + nextPage.length);
      setHasMore(nextPage.length === PAGE_SIZE);
    } catch {
      toast.error("Error loading more articles");
    } finally {
      setLoadingMore(false);
    }
  };

  const handleDelete = async (postId: string) => {
    try {
      const result = await removePostById(postId);
      if (result.deletedCount === 0) {
        toast.error("Aucun article supprimé. Vérifie tes droits admin/session.");
        return;
      }

      toast.success("Article supprimé.");
      setPosts((current) => current.filter((post) => post.id !== postId));
    } catch (error) {
      const message = error instanceof Error ? error.message : "Delete failed";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="grain-overlay" />
      <Header />
      <main className="pt-28 sm:pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="mb-16 text-center space-y-4">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground">{t("blog.tag")}</p>
            <h1 className="text-editorial text-4xl sm:text-5xl md:text-6xl">{t("blog.title")}</h1>
          </motion.div>

          {loading && (
            <div className="text-center py-20">
              <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin mx-auto" />
            </div>
          )}

          <div className="space-y-8">
            {posts.map((post, index) => (
              <motion.article key={post.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group grid md:grid-cols-3 gap-6 items-center p-6 rounded-extreme card-elevated"
              >
                <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-muted border border-border/60">
                  {post.image_url ? (
                    <img src={post.image_url} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-full bg-muted" />
                  )}
                </div>
                <div className="md:col-span-2 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground font-medium">Blog</span>
                    <p className="text-xs text-muted-foreground tracking-wider">{new Date(post.created_at).toLocaleDateString()}</p>
                  </div>
                  <h2 className="text-editorial text-2xl md:text-3xl leading-tight">{post.title}</h2>
                  {post.excerpt && <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{post.excerpt}</p>}
                  <div className="flex items-center gap-4 pt-1">
                    <a href={`/article/${post.slug}`} className="inline-flex items-center gap-2 text-xs text-foreground hover:text-foreground/70 transition-colors">
                      Lire l'article
                    </a>
                    {isAdmin && (
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="inline-flex items-center gap-2 text-xs text-destructive hover:text-destructive/80 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        {t("blog.delete")}
                      </button>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {hasMore && !loading && (
            <div className="mt-10 flex justify-center">
              <button onClick={loadMorePosts} disabled={loadingMore} className="btn-luxury-primary text-xs disabled:opacity-60">
                {loadingMore ? "Chargement..." : "Charger plus"}
              </button>
            </div>
          )}

          {!loading && posts.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-editorial text-2xl mb-2">{t("blog.empty.title")}</p>
              <p className="text-sm">{t("blog.empty.desc")}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Blog;
