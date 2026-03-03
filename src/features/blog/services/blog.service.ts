import { deletePost, fetchPostBySlug, fetchPublishedPosts, supabase, type DeletePostResult, type Post } from "@/lib/supabase";

export interface FetchPublishedPostsInput {
  limit: number;
  offset: number;
}

export const getPublishedPosts = async ({ limit, offset }: FetchPublishedPostsInput): Promise<Post[]> =>
  fetchPublishedPosts({ limit, offset });

export const getPublishedPostBySlug = async (slug: string): Promise<Post | null> => {
  const post = await fetchPostBySlug(slug);
  if (!post || !post.published) return null;
  return post;
};

export const getSession = async () => {
  const { data } = await supabase.auth.getSession();
  return data.session;
};

export const subscribeToAuthChange = (onChange: (isAuthenticated: boolean) => void) => {
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    onChange(!!session?.user);
  });
  return data.subscription;
};

export const removePostById = async (postId: string | undefined): Promise<DeletePostResult> => {
  return deletePost(postId);
};
