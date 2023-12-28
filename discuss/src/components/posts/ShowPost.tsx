import { notFound } from "next/navigation";
import { dbClient } from "../../db";
import CreateCommentForm from "../comments/CreateCommentForm";

interface IPostShowProps {
  postId: string;
}

export default async function PostShow({ postId }: IPostShowProps) {
  const post = await dbClient.post.findFirst({ where: { id: postId } });

  if (!post) {
    return notFound();
  }

  return (
    <div className="my-4">
      <h1 className="text-2xl font-bold my-2">{post.title}</h1>
      <p className="p-4 border rounded">{post.content}</p>
    </div>
  );
}
