import Link from "next/link";
import React from "react";
import { paths } from "@/paths";
import ShowPost from "@/components/posts/ShowPost";
import CommentList from "@/components/comments/ListComment";
import { fetchCommentsByPostId } from "@/db/queries/comments";
import CreateCommentForm from "@/components/comments/CreateCommentForm";

interface IShowPostPageProps {
  params: {
    slug: string;
    postId: string;
  };
}

export default function PostShow({ params }: IShowPostPageProps) {
  const { slug, postId } = params;
  return (
    <div>
      <Link href={paths.showTopic(slug)}>Back to topic: {slug}</Link>
      <ShowPost postId={postId} />
      <CreateCommentForm postId={postId} />
      <CommentList fetchData={() => fetchCommentsByPostId(postId)} />
    </div>
  );
}
