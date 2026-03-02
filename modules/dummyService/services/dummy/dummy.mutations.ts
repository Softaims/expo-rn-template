import { useMutation, useQueryClient } from '@tanstack/react-query';
import { dummyKeys } from './dummy.keys';
import { createPost, updatePost, patchPost, deletePost } from './dummy.apis';
import type {
  CreatePostPayload,
  UpdatePostPayload,
  PatchPostPayload,
} from '../../types';

export const useCreatePostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreatePostPayload) => createPost(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: dummyKeys.posts() });
    },
  });
};

export const useUpdatePostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdatePostPayload) => updatePost(payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: dummyKeys.postDetail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: dummyKeys.posts() });
    },
  });
};

export const usePatchPostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: PatchPostPayload) => patchPost(payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: dummyKeys.postDetail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: dummyKeys.posts() });
    },
  });
};

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: dummyKeys.posts() });
    },
  });
};
