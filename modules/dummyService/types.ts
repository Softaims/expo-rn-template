export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export type CreatePostPayload = Omit<Post, 'id'>;
export type UpdatePostPayload = Post;
export type PatchPostPayload = Partial<Post> & { id: number };
