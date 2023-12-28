"use server";

import { z } from "zod";
import { auth } from "../auth";
import { dbClient } from "../db";
import { revalidatePath } from "next/cache";
import { paths } from "../paths";
import { redirect } from "next/navigation";

const createPostSchema = z.object({
  title: z.string().min(5),
  content: z.string().min(10),
});

interface ICreatePostFormState {
  error: boolean;
  errors: { title?: string[]; content?: string[]; _form?: string[] };
}

export async function createPost(
  slug: string,
  formState: ICreatePostFormState,
  formData: FormData
): Promise<ICreatePostFormState> {
  //TODO: revalidate the topic show page
  const title: string = formData.get("title") as string;
  const content: string = formData.get("content") as string;
  const result = createPostSchema.safeParse({ title, content });

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
        _form: ["You must be signed in to create post"],
      },
    };
  }

  const topic = await dbClient.topic.findFirst({ where: { slug } });

  if (!topic) {
    return {
      error: true,
      errors: {
        _form: [
          "TOpic not present. Please choose another topic to create post",
        ],
      },
    };
  }

  let post;
  try {
    post = await dbClient.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        topicId: topic.id,
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

  revalidatePath(paths.showTopic(slug));
  redirect(paths.showPost(slug, post.id));
}
