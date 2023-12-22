"use server";

import { redirect } from "next/navigation";
import { db } from "../db";
import { revalidatePath } from "next/cache";

export async function editSnippet(id: string, code: string) {
  await db.snippets.update({ where: { id }, data: { code } });
  revalidatePath(`/snippets/${id}`);
  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: string) {
  await db.snippets.delete({ where: { id } });
  revalidatePath('/');
  redirect("/");
}

export async function createSnippet(
  formState: { message: string },
  formData: FormData
) {
  try {
    // Check the user's inputs and make sure they are valid
    const title: string = formData.get("title") as string;
    const code: string = formData.get("code") as string;

    if (typeof title !== 'string' || title.length < 5) {
      return {
        message: 'Validation Error: Title must be longer than 5 characters'
      }
    }
    if (typeof code !== 'string' || code.length < 10) {
      return {
        message: 'Validation Error: Code must be longer than 10 characters'
      }
    }

    // Create a new record in the database
    const snippet = await db.snippets.create({
      data: { title, code },
    });
  } catch (error) {
    if(error instanceof Error) {
      return {
        message: `Server Error: ${error.message}`
      }
    } else {
      return {
        message: "Server Error: Something went wrong on our end. Please try again."
      }
    }
  }
  revalidatePath('/')
  // Redirect user back to the root route
  redirect("/");
}


