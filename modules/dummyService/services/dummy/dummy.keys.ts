export const dummyKeys = {
  all: ['dummy'] as const,

  posts: () => [...dummyKeys.all, 'posts'] as const,
  postDetail: (id: number) => [...dummyKeys.posts(), id] as const,
  postComments: (postId: number) =>
    [...dummyKeys.posts(), postId, 'comments'] as const,
};
