"use client";

import { useFormState } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { Textarea, Button } from "@nextui-org/react";
import { createComment } from "@/actions";

interface CommentCreateFormProps {
  postId: string;
  parentId?: string;
  startOpen?: boolean;
}

export default function CreateCommentForm({
  postId,
  parentId,
  startOpen,
}: CommentCreateFormProps) {
  const [open, setOpen] = useState(startOpen);
  const ref = useRef<HTMLFormElement | null>(null);
  const [formState, action] = useFormState(
    createComment.bind(null, { postId, parentId }),
    { error: false, errors: {} }
  );

  useEffect(() => {
    if (!formState.error) {
      ref.current?.reset();

      if (!startOpen) {
        setOpen(false);
      }
    }
  }, [formState, startOpen]);
  console.log(formState);
  

  const form = (
    <form action={action} ref={ref}>
      <div className="space-y-2 px-1 my-4">
        <Textarea
          name="content"
          variant="bordered"
          label="Reply"
          placeholder="Enter your comment"
          isInvalid={formState.error}
          errorMessage={formState.errors.content?.join(", ")}
        />

        {formState.errors._form ? (
          <div className="p-2 bg-red-200 border rounded border-red-400">
            {formState.errors._form?.join(", ")}
          </div>
        ) : null}

        <Button type="submit">Create Comment</Button>
      </div>
    </form>
  );

  return (
    <div>
      <p className="text-sm hover:cursor-pointer text-gray-700 my-2" onClick={() => setOpen(!open)}>
        Reply
      </p>
      {open && form}
    </div>
  );
}
