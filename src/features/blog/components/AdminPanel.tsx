import { useState } from "react";
import { toast } from "sonner";
import { handlePublish } from "@/lib/supabase";

const AdminPanel = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [published, setPublished] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim() || !content.trim() || !imageFile) {
      toast.error("Titre, contenu et image sont obligatoires.");
      return;
    }

    setLoading(true);
    try {
      await handlePublish({
        file: imageFile,
        title,
        content,
        published,
        tags: [],
      });

      toast.success(published ? "Article publié avec succès." : "Brouillon enregistré avec succès.");
      setTitle("");
      setContent("");
      setImageFile(null);
      setPublished(true);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur pendant l'ajout de l'article.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full rounded-extreme border border-border p-6 text-left">
      <h2 className="text-editorial text-2xl mb-4">Composer un article</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="post-title" className="block text-xs tracking-wider uppercase text-muted-foreground">
            Titre
          </label>
          <input
            id="post-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titre de l'article"
            required
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <label className="flex items-center gap-3 text-sm">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="h-4 w-4 rounded border-input"
          />
          Publier immédiatement
        </label>

        <div className="space-y-2">
          <label htmlFor="post-content" className="block text-xs tracking-wider uppercase text-muted-foreground">
            Contenu
          </label>
          <textarea
            id="post-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Contenu de l'article"
            required
            rows={8}
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent resize-y"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="post-image" className="block text-xs tracking-wider uppercase text-muted-foreground">
            Image
          </label>
          <input
            id="post-image"
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
            required
            className="block w-full rounded-xl border border-input bg-background px-4 py-3 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-secondary file:px-3 file:py-2 file:text-xs file:font-medium"
          />
          {imageFile && <p className="text-xs text-muted-foreground">Fichier: {imageFile.name}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-luxury-primary disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Envoi en cours..." : "Publier l'article"}
        </button>
      </form>
    </section>
  );
};

export default AdminPanel;
