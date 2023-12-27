import React from "react";
import CreatePostForm from "../../../components/posts/CreatePostForm";

interface IShowTopicProps {
  params: {
    slug: string;
  };
}

export default function ShowTopic({ params }: IShowTopicProps) {
  const { slug } = params;
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold mb-2">{slug}</h1>
      </div>
      <div>
        <CreatePostForm />
      </div>
    </div>
  );
}
