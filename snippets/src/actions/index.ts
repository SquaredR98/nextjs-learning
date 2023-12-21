"use server";

import { redirect } from "next/navigation";
import { db } from "../db";

export async function editSnippet(id: string, code: string) {
  await db.snippets.update({ where: { id }, data: { code } });

  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: string) {
  await db.snippets.delete({ where: { id } });

  redirect("/");
}

export async function createSnippet(
  formState: { message: string },
  formData: FormData
) {
  // Check the user's inputs and make sure they are valid
  const title: string = formData.get("title") as string;
  const code: string = formData.get("code") as string;

  if(typeof title !== 'string' || title.length < 5) {
    return {
      message: 'Title must be longer'
    }
  }
  if(typeof code !== 'string' || code.length < 10) {
    return {
      message: 'Code must be longer than 10 characters'
    }
  }

  // Create a new record in the database
  const snippet = await db.snippets.create({
    data: { title, code },
  });
  console.log(console.log(snippet));
  // Redirect user back to the root route
  redirect("/");
}
