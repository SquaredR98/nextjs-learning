import { auth } from "@/auth";
import CreateTopicForm from "@/components/topics/CreateTopicForm";
import TopicList from "../components/topics/TopicList";
import { Divider } from "@nextui-org/react";

export default async function Home() {
  const session = await auth();
  const user = session?.user;
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-xl font-bold">Top Post</h1>
      </div>
      <div className="border shadow-lg py-3 px-2 rounded-lg">
        <CreateTopicForm />
        <Divider className="my-2" />
        <h1 className="text-xl font-medium mb-2">Topics</h1>
        <TopicList />
      </div>
    </div>
  );
}
