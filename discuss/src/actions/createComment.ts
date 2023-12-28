"use server";

import { z } from "zod";
import { auth } from "../auth";
import { dbClient } from "@/db";
import { paths } from "@/paths";
import { revalidatePath } from "next/cache";

const createPostSchema = z.object({
  content: z.string().min(10),
});

interface ICreateCommentFormState {
  error: boolean;
  errors: { title?: string[]; content?: string[]; _form?: string[] };
}

export async function createComment(
  { postId, parentId }: { postId: string; parentId?: string },
  formState: ICreateCommentFormState,
  formData: FormData
): Promise<ICreateCommentFormState> {
  //TODO: revalidate the topic show page
  const content: string = formData.get("content") as string;
  const result = createPostSchema.safeParse({ content });

  if (!result.success) {
    return {
      error: true,
      errors: result.error.flatten().fieldErrors,
    };
  }

  const session = await auth();
  const user = session?.user;
  if (!session || !user) {
    return {
      error: true,
      errors: {
        _form: ["You must be signed in to add a comment"],
      },
    };
  }

  let comment;
  try {
    comment = await dbClient.comment.create({
      data: {
        content: result.data.content,
        postId,
        parentId,
        userId: user.id,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: true,
        errors: {
          _form: ["Server Error:" + error.message],
        },
      };
    } else {
      return {
        error: true,
        errors: {
          _form: ["Server Error: Something went wrong please try again"],
        },
      };
    }
  }

  const topic = await dbClient.topic.findFirst({
    where: { posts: { some: { id: postId } } },
  });

  if (!topic) {
    return {
      error: true,
      errors: {
        _form: ["Failed to revalidate topic"],
      },
    };
  }

  revalidatePath(paths.showPost(topic.slug, postId));
  return {
    error: false,
    errors: {},
  };
}
