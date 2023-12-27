import React from "react";
import { dbClient } from "../../db";
import { paths } from "../../paths";
import Link from "next/link";
import { Chip } from "@nextui-org/react";

export default async function TopicList() {
  const topics = await dbClient.topic.findMany();

  const renderedTopics = topics.map((topic) => (
    <Link key={topic.id} href={paths.showTopic(topic.slug)}>
      <Chip className="bg-amber-200 hover:shadow-md hover:bg-amber-300">{topic.slug}</Chip>
    </Link>
  ));

  return (
    <div>
      <div className="flex flex-row gap-2 flex-wrap">{renderedTopics}</div>
    </div>
  );
}
