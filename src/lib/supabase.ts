import { createClient } from "@supabase/supabase-js";
import type { Database, Tables, TablesInsert } from "@/types/supabase";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const BLOG_IMAGES_BUCKET = "ARTICLE";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});

export type Post = Tables<"posts">;
export type PostInsert = TablesInsert<"posts">;

export interface CreatePostInput {
  title: string;
  content: string;
  imageUrl: string;
  published: boolean;
  tags?: string[];
}

export interface HandlePublishInput {
  file: File;
  title: string;
  content: string;
  published?: boolean;
  tags?: string[];
}

interface PaginationInput {
  limit: number;
  offset: number;
}

export interface DeletePostResult {
  deletedCount: number;
  ids: string[];
}

const toSlug = (value: string): string =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80)
    .replace(/^-+|-+$/g, "");

const buildExcerpt = (value: string, maxLength = 150): string => {
  const normalized = value.replace(/\s+/g, " ").trim();
  return normalized.length <= maxLength ? normalized : `${normalized.slice(0, maxLength).trimEnd()}...`;
};

const formatSupabaseError = (context: string, error: unknown): Error => {
  if (error && typeof error === "object" && "message" in error) {
    const supabaseError = error as { message: string; code?: string; details?: string; hint?: string };
    const details = [supabaseError.code, supabaseError.details, supabaseError.hint].filter(Boolean).join(" | ");
    return new Error(details ? `${context}: ${supabaseError.message} (${details})` : `${context}: ${supabaseError.message}`);
  }

  return new Error(`${context}: unknown error`);
};

const ensureUniqueSlug = async (baseSlug: string): Promise<string> => {
  const candidate = baseSlug || `post-${Date.now()}`;
  const { data, error: existingSlugError } = await supabase
    .from("posts")
    .select("id")
    .eq("slug", candidate)
    .maybeSingle();

  if (existingSlugError) {
    throw formatSupabaseError("Slug check failed", existingSlugError);
  }

  if (!data) {
    return candidate;
  }

  return `${candidate}-${Date.now()}`;
};

export const uploadImage = async (file: File): Promise<string> => {
  if (!file) {
    throw new Error("Upload image failed: no file provided");
  }

  if (!file.type.startsWith("image/")) {
    throw new Error("Upload image failed: selected file is not an image");
  }

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) {
    throw new Error(`Upload image failed: ${authError.message}`);
  }

  if (!user) {
    throw new Error("Upload image failed: you must be authenticated");
  }

  const fileExt = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const randomPart = Math.random().toString(36).slice(2, 10);
  const fileName = `${Date.now()}-${randomPart}.${fileExt}`;
  const filePath = `${user.id}/posts/${fileName}`;

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from(BLOG_IMAGES_BUCKET)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });

  if (uploadError) {
    throw new Error(`Upload image failed: ${uploadError.message}`);
  }

  if (!uploadData?.path) {
    throw new Error("Upload image failed: uploaded path not returned");
  }

  const { data } = supabase.storage.from(BLOG_IMAGES_BUCKET).getPublicUrl(uploadData.path);
  if (!data?.publicUrl) {
    throw new Error("Upload image failed: public URL generation failed");
  }

  return data.publicUrl;
};

export const createPost = async (input: CreatePostInput): Promise<Post> => {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) {
    throw formatSupabaseError("Auth lookup failed", authError);
  }

  if (!user) {
    throw new Error("You must be authenticated to create a post.");
  }

  const cleanTitle = input.title.trim();
  const cleanContent = input.content.trim();
  const slug = await ensureUniqueSlug(toSlug(cleanTitle));
  const excerpt = buildExcerpt(cleanContent, 150);

  const payload: PostInsert = {
    title: cleanTitle,
    slug,
    content: cleanContent,
    excerpt,
    image_url: input.imageUrl,
    tags: input.tags ?? [],
    published: input.published,
    author_id: user.id,
  };

  const { data, error } = await supabase
    .from("posts")
    .insert([payload])
    .select()
    .single();

  if (error) {
    throw formatSupabaseError("Create post failed", error);
  }

  return data;
};

export const handlePublish = async ({
  file,
  title,
  content,
  published = true,
  tags = [],
}: HandlePublishInput): Promise<Post> => {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) {
    throw new Error(`Auth failed: ${authError.message}`);
  }

  if (!user) {
    throw new Error("Not authenticated");
  }

  // 1) Upload image
  const fileExt = file.name.split(".").pop() ?? "jpg";
  const fileName = `${Date.now()}-${Math.random()
    .toString(36)
    .substring(2, 10)}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from("ARTICLE")
    .upload(fileName, file);

  if (uploadError) {
    throw new Error(`Upload failed: ${uploadError.message}`);
  }

  // 2) Get public URL
  const { data } = supabase.storage
    .from("ARTICLE")
    .getPublicUrl(fileName);

  const imageUrl = data.publicUrl;
  if (!imageUrl) {
    throw new Error("Upload failed: public URL not available");
  }

  // 3) Insert post
  const cleanTitle = title.trim();
  const cleanContent = content.trim();
  const slug = await ensureUniqueSlug(toSlug(cleanTitle));
  const excerpt = buildExcerpt(cleanContent, 150);

  const { data: inserted, error: insertError } = await supabase
    .from("posts")
    .insert([
      {
        title: cleanTitle,
        slug,
        content: cleanContent,
        excerpt,
        image_url: imageUrl,
        published,
        author_id: user.id,
        tags,
      },
    ])
    .select()
    .single();

  if (insertError) {
    throw new Error(`Insert failed: ${insertError.message}`);
  }

  return inserted;
};

export const fetchPublishedPosts = async ({ limit, offset }: PaginationInput): Promise<Post[]> => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    throw formatSupabaseError("Fetch published posts failed", error);
  }

  return data ?? [];
};

export const fetchPostBySlug = async (slug: string): Promise<Post | null> => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    if ((error as { code?: string }).code === "PGRST116") {
      return null;
    }
    throw formatSupabaseError("Fetch post by slug failed", error);
  }

  return data;
};

export const deletePost = async (postId: string | undefined): Promise<DeletePostResult> => {
  console.log("Deleting post ID:", postId);

  if (!postId) {
    throw new Error("Delete failed: postId is undefined");
  }

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) {
    throw new Error(`Delete failed: auth error: ${authError.message}`);
  }

  if (!user) {
    throw new Error("Delete failed: not authenticated");
  }

  const { data, error, count } = await supabase
    .from("posts")
    .delete({ count: "exact" })
    .eq("id", postId)
    .select("id");

  if (error) {
    throw new Error(`Delete failed: ${error.message}`);
  }

  const ids = (data ?? []).map((row) => row.id);
  const deletedCount = count ?? ids.length;

  console.log("Delete result:", { deletedCount, ids, authUserId: user.id });
  return { deletedCount, ids };
};
