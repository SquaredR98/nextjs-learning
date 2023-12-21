import React from "react";
import { db } from "@/db";
import { redirect } from "next/navigation";

export default function CreateSnippet() {
  async function createSnippet(formData: FormData) {
    // Adding following string in any function will let nextjs know
    // that the code can only be run on server also known as
    // Server actions
    "use server";
    // Check the user's inputs and make sure they are valid
    const title: string = formData.get("title") as string;
    const code: string = formData.get("code") as string;
    // Create a new record in the database
    const snippet = await db.snippets.create({
      data: { title, code },
    });
    console.log(console.log(snippet));
    // Redirect user back to the root route
    redirect('/');
  }

  return (
    <div className="w-11/12 md:w-1/2 lg:w-1/3 my-16 mx-auto">
      <form className="border rounded p-4" action={createSnippet}>
        <h3 className="font-bold text-3xl my-2">Create a new Snippet</h3>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-start gap-2">
            <label className="w-12 " htmlFor="title">
              Title
            </label>
            <input
              type="text"
              className="border rounded p-1 w-full"
              name="title"
              id="title"
            />
          </div>
          <div className="flex flex-col items-start gap-2">
            <label className="w-12 " htmlFor="code">
              Code
            </label>
            <textarea
              className="border rounded p-1 w-full"
              name="code"
              id="code"
            />
          </div>
          <button type="submit" className="rounded bg-blue-200 p-2">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
