import { useQuery } from '@tanstack/react-query';
import { dummyKeys } from './dummy.keys';
import { getPosts, getPostById, getCommentsByPostId } from './dummy.apis';

export const usePostsQuery = () =>
  useQuery({
    queryKey: dummyKeys.posts(),
    queryFn: getPosts,
  });

export const usePostByIdQuery = (id: number) =>
  useQuery({
    queryKey: dummyKeys.postDetail(id),
    queryFn: () => getPostById(id),
    enabled: !!id,
  });

export const usePostCommentsQuery = (postId: number) =>
  useQuery({
    queryKey: dummyKeys.postComments(postId),
    queryFn: () => getCommentsByPostId(postId),
    enabled: !!postId,
  });
