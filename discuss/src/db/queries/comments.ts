import { Comment } from "@prisma/client";
import { dbClient } from "..";

export type CommentWithAuthor = Comment & {
  user: { name: string | null; image: string | null };
};

export async function fetchCommentsByPostId(
  postId: string
): Promise<CommentWithAuthor[]> {
  return dbClient.comment.findMany({
    where: { postId },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
}
