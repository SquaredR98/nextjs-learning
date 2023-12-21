"use client";
import { Editor } from "@monaco-editor/react";
import { Snippets } from "@prisma/client";
import React, { useState } from "react";
import { editSnippet } from "../actions";

interface IEditSnippetFormProps {
  snippet: Snippets;
}

export default function EditSnippetForm({ snippet }: IEditSnippetFormProps) {
  const [code, setCode] = useState(snippet.code);
  const handleEditorChange = (value: string = "") => {
    setCode(value);
  };

  const editSnippetAction = editSnippet.bind(null, snippet.id, code);
  return (
    <div>
      <Editor
        height={"40vh"}
        theme="vs-dark"
        language="javascript"
        defaultValue={snippet.code}
        options={{ minimap: { enabled: false } }}
        onChange={handleEditorChange}
      />
      <form action={editSnippetAction}>
        <button
          type="submit"
          className="bg-blue-300 hover:bg-blue-300/70 cursor-pointer py-2 px-4 w-full my-2 rounded border border-black/40"
        >
          Save
        </button>
      </form>
    </div>
  );
}
