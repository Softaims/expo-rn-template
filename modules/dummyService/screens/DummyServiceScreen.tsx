import { useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { wp } from "@/lib/responsive";
import { Text, Button, TextInput } from "@/components";
import { ScreenWrapper } from "@/components/wrappers/ScreenWrapper";
import { Tabs } from "@/components/tabs";
import { Stack } from "expo-router";
import {
    usePostsQuery,
    usePostByIdQuery,
    usePostCommentsQuery,
    useCreatePostMutation,
    useUpdatePostMutation,
    usePatchPostMutation,
    useDeletePostMutation,
} from "../services/dummy";
import type { Post, Comment as PostComment } from "../types";

const PLAYGROUND_TABS = [
    { label: "Queries", value: "queries" },
    { label: "Mutations", value: "mutations" },
];

function Section({
    title,
    hook,
    children,
}: {
    title: string;
    hook: string;
    children: React.ReactNode;
}) {
    return (
        <View className="rounded-xl border border-border bg-muted p-4 mb-4 gap-3">
            <View>
                <Text variant="subheading3">{title}</Text>
                <Text variant="bodyText4" className="text-muted-foreground mt-0.5">
                    {hook}
                </Text>
            </View>
            {children}
        </View>
    );
}

function QueryStatusRow({
    isLoading,
    isFetching,
    isError,
    isSuccess,
    error,
    onRefetch,
    refetchDisabled,
}: {
    isLoading: boolean;
    isFetching: boolean;
    isError: boolean;
    isSuccess: boolean;
    error: Error | null;
    onRefetch?: () => void;
    refetchDisabled?: boolean;
}) {
    return (
        <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
                {isLoading && <ActivityIndicator size="small" />}
                {isFetching && !isLoading && <ActivityIndicator size="small" />}
                <Text variant="bodyText3" className={
                    isLoading ? "text-yellow-600" :
                        isFetching ? "text-blue-500" :
                            isError ? "text-destructive" :
                                isSuccess ? "text-green-600" :
                                    "text-muted-foreground"
                }>
                    {isLoading ? "Loading..." :
                        isFetching ? "Refetching..." :
                            isError ? `Error: ${error?.message ?? "Unknown"}` :
                                isSuccess ? "Loaded" :
                                    "Idle"}
                </Text>
            </View>
            {onRefetch && (
                <Button
                    title="Refetch"
                    size="sm"
                    variant="text"
                    onPress={onRefetch}
                    disabled={refetchDisabled}
                />
            )}
        </View>
    );
}

function PostCard({ post }: { post: Post }) {
    return (
        <View className="rounded-lg border border-border bg-background p-3">
            <Text variant="bodyText4" className="text-muted-foreground">
                #{post.id} · userId: {post.userId}
            </Text>
            <Text variant="subheading4" className="mt-1" numberOfLines={1}>
                {post.title}
            </Text>
            <Text
                variant="bodyText3"
                className="text-muted-foreground mt-1"
                numberOfLines={2}
            >
                {post.body}
            </Text>
        </View>
    );
}

function CommentCard({ comment }: { comment: PostComment }) {
    return (
        <View className="rounded-lg border border-border bg-background p-3">
            <Text variant="bodyText4" className="text-muted-foreground">
                #{comment.id} · {comment.email}
            </Text>
            <Text variant="subheading4" className="mt-1" numberOfLines={1}>
                {comment.name}
            </Text>
            <Text
                variant="bodyText3"
                className="text-muted-foreground mt-1"
                numberOfLines={2}
            >
                {comment.body}
            </Text>
        </View>
    );
}

function MutationResult({
    isPending,
    isSuccess,
    isError,
    data,
    error,
}: {
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
    data: unknown;
    error: Error | null;
}) {
    if (isPending) {
        return (
            <View className="items-center py-2">
                <ActivityIndicator size="small" />
            </View>
        );
    }
    if (isError) {
        return (
            <View className="rounded-lg bg-destructive/10 p-3">
                <Text variant="bodyText3" className="text-destructive">
                    Error: {error?.message ?? "Something went wrong"}
                </Text>
            </View>
        );
    }
    if (isSuccess && data) {
        return (
            <View className="rounded-lg bg-green-100 p-3">
                <Text variant="bodyText4" className="text-green-800 mb-1">
                    Response:
                </Text>
                <Text variant="bodyText3" className="text-green-700">
                    {JSON.stringify(data, null, 2)}
                </Text>
            </View>
        );
    }
    if (isSuccess) {
        return (
            <View className="rounded-lg bg-green-100 p-3">
                <Text variant="bodyText3" className="text-green-700">Done</Text>
            </View>
        );
    }
    return null;
}

// ─── Queries Tab ────────────────────────────────────────────────────────────────

function QueriesTab() {
    const [detailId, setDetailId] = useState("");
    const [commentsPostId, setCommentsPostId] = useState("");

    const posts = usePostsQuery();
    const postDetail = usePostByIdQuery(Number(detailId) || 0);
    const comments = usePostCommentsQuery(Number(commentsPostId) || 0);

    return (
        <>
            <Section title="List Posts" hook="usePostsQuery() → GET /posts">
                <QueryStatusRow
                    isLoading={posts.isLoading}
                    isFetching={posts.isFetching}
                    isError={posts.isError}
                    isSuccess={posts.isSuccess}
                    error={posts.error}
                    onRefetch={() => posts.refetch()}
                    refetchDisabled={posts.isFetching}
                />
                {posts.data && (
                    <View className="gap-2">
                        {posts.data.slice(0, 5).map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                        {posts.data.length > 5 && (
                            <Text
                                variant="bodyText3"
                                className="text-muted-foreground text-center"
                            >
                                + {posts.data.length - 5} more posts
                            </Text>
                        )}
                    </View>
                )}
            </Section>

            <Section
                title="Post Detail"
                hook="usePostByIdQuery(id) → GET /posts/:id"
            >
                <TextInput
                    placeholder="Enter post ID (1–100)"
                    value={detailId}
                    onChangeText={setDetailId}
                    keyboardType="number-pad"
                />
                {detailId !== "" && (
                    <>
                        <QueryStatusRow
                            isLoading={postDetail.isLoading}
                            isFetching={postDetail.isFetching}
                            isError={postDetail.isError}
                            isSuccess={postDetail.isSuccess}
                            error={postDetail.error}
                        />
                        {postDetail.data && <PostCard post={postDetail.data} />}
                    </>
                )}
            </Section>

            <Section
                title="Post Comments"
                hook="usePostCommentsQuery(postId) → GET /posts/:postId/comments"
            >
                <TextInput
                    placeholder="Enter post ID (1–100)"
                    value={commentsPostId}
                    onChangeText={setCommentsPostId}
                    keyboardType="number-pad"
                />
                {commentsPostId !== "" && (
                    <>
                        <QueryStatusRow
                            isLoading={comments.isLoading}
                            isFetching={comments.isFetching}
                            isError={comments.isError}
                            isSuccess={comments.isSuccess}
                            error={comments.error}
                        />
                        {comments.data && (
                            <View className="gap-2">
                                {comments.data.slice(0, 3).map((c) => (
                                    <CommentCard key={c.id} comment={c} />
                                ))}
                                {comments.data.length > 3 && (
                                    <Text
                                        variant="bodyText3"
                                        className="text-muted-foreground text-center"
                                    >
                                        + {comments.data.length - 3} more comments
                                    </Text>
                                )}
                            </View>
                        )}
                    </>
                )}
            </Section>
        </>
    );
}

// ─── Mutations Tab ──────────────────────────────────────────────────────────────

function MutationsTab() {
    const [createTitle, setCreateTitle] = useState("");
    const [createBody, setCreateBody] = useState("");

    const [updateId, setUpdateId] = useState("");
    const [updateTitle, setUpdateTitle] = useState("");
    const [updateBody, setUpdateBody] = useState("");

    const [patchId, setPatchId] = useState("");
    const [patchTitle, setPatchTitle] = useState("");

    const [deleteId, setDeleteId] = useState("");

    const createPost = useCreatePostMutation();
    const updatePost = useUpdatePostMutation();
    const patchPost = usePatchPostMutation();
    const deletePost = useDeletePostMutation();

    return (
        <>
            {/* CREATE */}
            <Section
                title="Create Post"
                hook="useCreatePostMutation() → POST /posts"
            >
                <TextInput
                    label="Title"
                    placeholder="New post title"
                    value={createTitle}
                    onChangeText={setCreateTitle}
                    editable={!createPost.isPending}
                />
                <TextInput
                    label="Body"
                    placeholder="New post body"
                    value={createBody}
                    onChangeText={setCreateBody}
                    type="textarea"
                    editable={!createPost.isPending}
                />
                <Button
                    title={createPost.isPending ? "Creating..." : "Create Post"}
                    onPress={() =>
                        createPost.mutate({
                            userId: 1,
                            title: createTitle,
                            body: createBody,
                        })
                    }
                    disabled={createPost.isPending || !createTitle.trim()}
                />
                <MutationResult
                    isPending={createPost.isPending}
                    isSuccess={createPost.isSuccess}
                    isError={createPost.isError}
                    data={createPost.data}
                    error={createPost.error}
                />
            </Section>

            {/* UPDATE (PUT) */}
            <Section
                title="Update Post (PUT)"
                hook="useUpdatePostMutation() → PUT /posts/:id"
            >
                <TextInput
                    label="Post ID"
                    placeholder="ID of post to update (1–100)"
                    value={updateId}
                    onChangeText={setUpdateId}
                    keyboardType="number-pad"
                    editable={!updatePost.isPending}
                />
                <TextInput
                    label="Title"
                    placeholder="Updated title"
                    value={updateTitle}
                    onChangeText={setUpdateTitle}
                    editable={!updatePost.isPending}
                />
                <TextInput
                    label="Body"
                    placeholder="Updated body"
                    value={updateBody}
                    onChangeText={setUpdateBody}
                    type="textarea"
                    editable={!updatePost.isPending}
                />
                <Button
                    title={updatePost.isPending ? "Updating..." : "Update Post"}
                    onPress={() =>
                        updatePost.mutate({
                            id: Number(updateId),
                            userId: 1,
                            title: updateTitle,
                            body: updateBody,
                        })
                    }
                    disabled={
                        updatePost.isPending || !Number(updateId) || !updateTitle.trim()
                    }
                />
                <MutationResult
                    isPending={updatePost.isPending}
                    isSuccess={updatePost.isSuccess}
                    isError={updatePost.isError}
                    data={updatePost.data}
                    error={updatePost.error}
                />
            </Section>

            {/* PATCH */}
            <Section
                title="Patch Post"
                hook="usePatchPostMutation() → PATCH /posts/:id"
            >
                <TextInput
                    label="Post ID"
                    placeholder="ID of post to patch (1–100)"
                    value={patchId}
                    onChangeText={setPatchId}
                    keyboardType="number-pad"
                    editable={!patchPost.isPending}
                />
                <TextInput
                    label="Title (partial update)"
                    placeholder="Patched title"
                    value={patchTitle}
                    onChangeText={setPatchTitle}
                    editable={!patchPost.isPending}
                />
                <Button
                    title={patchPost.isPending ? "Patching..." : "Patch Post"}
                    onPress={() =>
                        patchPost.mutate({
                            id: Number(patchId),
                            ...(patchTitle ? { title: patchTitle } : {}),
                        })
                    }
                    disabled={patchPost.isPending || !Number(patchId)}
                />
                <MutationResult
                    isPending={patchPost.isPending}
                    isSuccess={patchPost.isSuccess}
                    isError={patchPost.isError}
                    data={patchPost.data}
                    error={patchPost.error}
                />
            </Section>

            {/* DELETE */}
            <Section
                title="Delete Post"
                hook="useDeletePostMutation() → DELETE /posts/:id"
            >
                <TextInput
                    label="Post ID"
                    placeholder="ID of post to delete (1–100)"
                    value={deleteId}
                    onChangeText={setDeleteId}
                    keyboardType="number-pad"
                    editable={!deletePost.isPending}
                />
                <Button
                    title={deletePost.isPending ? "Deleting..." : "Delete Post"}
                    variant="secondary"
                    onPress={() => deletePost.mutate(Number(deleteId))}
                    disabled={deletePost.isPending || !Number(deleteId)}
                />
                <MutationResult
                    isPending={deletePost.isPending}
                    isSuccess={deletePost.isSuccess}
                    isError={deletePost.isError}
                    data={deletePost.data}
                    error={deletePost.error}
                />
            </Section>
        </>
    );
}

// ─── Screen ─────────────────────────────────────────────────────────────────────

export default function DummyServiceScreen() {
    const [activeTab, setActiveTab] = useState("queries");

    return (
        <ScreenWrapper scrollEnabled headerTransparent>
            <Stack.Screen
                options={{ headerShown: true, headerTransparent: true, headerTitle: "API Playground" }}
            />

            <Text variant="bodyText2" className="text-muted-foreground mb-4">
                Demonstrates TanStack Query hooks with JSONPlaceholder API. Each section
                maps to a hook in the service layer.
            </Text>

            <Tabs
                tabs={PLAYGROUND_TABS}
                defaultValue="queries"
                variant="filled-rounded"
                onValueChange={setActiveTab}
                style={{ marginBottom: wp(4) }}
            />

            {activeTab === "queries" ? <QueriesTab /> : <MutationsTab />}
        </ScreenWrapper>
    );
}
