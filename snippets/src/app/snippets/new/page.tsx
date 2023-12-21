"use client";

import React from "react";
import { useFormState } from "react-dom";
import { createSnippet } from "../../../actions";

export default function CreateSnippet() {
  const [formState, action] = useFormState(createSnippet, { message: "" });

  return (
    <div className="w-11/12 md:w-1/2 lg:w-1/3 my-16 mx-auto">
      <form className="border rounded p-4" action={action}>
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
          {formState.message.length !== 0 ? (
            <div className="border border-red-800 bg-red-300 rounded py-1 px-2 text-red-900 text-sm">
              {formState.message}
            </div>
          ) : null}
          <button type="submit" className="rounded bg-blue-200 p-2">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
