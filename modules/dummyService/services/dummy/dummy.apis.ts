import axiosInstance from '@/lib/axios';
import type {
  Post,
  Comment,
  CreatePostPayload,
  UpdatePostPayload,
  PatchPostPayload,
} from '../../types';

const BASE = 'https://jsonplaceholder.typicode.com';

// ─── GET ────────────────────────────────────────────────────────────────────────

export const getPosts = async (): Promise<Post[]> => {
  const { data } = await axiosInstance.get<Post[]>(`${BASE}/posts`);
  return data;
};

export const getPostById = async (id: number): Promise<Post> => {
  const { data } = await axiosInstance.get<Post>(`${BASE}/posts/${id}`);
  return data;
};

export const getCommentsByPostId = async (postId: number): Promise<Comment[]> => {
  const { data } = await axiosInstance.get<Comment[]>(
    `${BASE}/posts/${postId}/comments`,
  );
  return data;
};

// ─── POST ───────────────────────────────────────────────────────────────────────

export const createPost = async (payload: CreatePostPayload): Promise<Post> => {
  const { data } = await axiosInstance.post<Post>(`${BASE}/posts`, payload);
  return data;
};

// ─── PUT ────────────────────────────────────────────────────────────────────────

export const updatePost = async (payload: UpdatePostPayload): Promise<Post> => {
  const { id, ...body } = payload;
  const { data } = await axiosInstance.put<Post>(`${BASE}/posts/${id}`, body);
  return data;
};

// ─── PATCH ──────────────────────────────────────────────────────────────────────

export const patchPost = async (payload: PatchPostPayload): Promise<Post> => {
  const { id, ...body } = payload;
  const { data } = await axiosInstance.patch<Post>(`${BASE}/posts/${id}`, body);
  return data;
};

// ─── DELETE ─────────────────────────────────────────────────────────────────────

export const deletePost = async (id: number): Promise<void> => {
  await axiosInstance.delete(`${BASE}/posts/${id}`);
};
