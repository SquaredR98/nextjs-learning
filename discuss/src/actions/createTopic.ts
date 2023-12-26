"use server";

import { z } from "zod";
import { auth } from "../auth";
import { Topic } from "@prisma/client";
import { dbClient } from "../db";
import { redirect } from "next/navigation";
import { paths } from "../paths";
import { revalidatePath } from "next/cache";

interface ICreateTopicFormState {
  error: boolean;
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
}

const createTopicSchema = z.object({
  name: z
    .string()
    .min(5)
    .regex(/[a-z-]/, {
      message: "Must be lowercase letters with dashes and without spaces",
    }),
  description: z.string().min(15),
});

export async function createTopic(
  formState: ICreateTopicFormState,
  formData: FormData
): Promise<ICreateTopicFormState> {
  //TODO: Revalidate the homepage after creating the topic
  const name = formData.get("name");
  const description = formData.get("description");
  const session = await auth();
  const user = session?.user;

  const result = createTopicSchema.safeParse({
    name,
    description,
  });

  if (!result.success) {
    return {
      error: true,
      errors: result.error.flatten().fieldErrors,
    };
  }

  if (!session || !user) {
    return {
      error: true,
      errors: {
        _form: ["You must have to be signed in in order to create a topic"],
      },
    };
  }

  let topic: Topic;

  try {
    topic = await dbClient.topic.findFirst({ where: { slug: result.data.name } }) as Topic;

    if(topic) {
      throw new Error('Topic already exist. Please enter another topic.')
    }

    topic = await dbClient.topic.create({
      data: { slug: result.data.name, description: result.data.description },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: true,
        errors: {
          _form: [`Server Error: ${error.message}`],
        },
      };
    } else {
      return {
        error: true,
        errors: {
          _form: ["Server Error: Something went wrong. Please try again"],
        },
      };
    }
  }

  revalidatePath("/");
  redirect(paths.showTopic(topic.slug));
}
