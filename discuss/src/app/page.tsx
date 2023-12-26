import { auth } from "@/auth";
import CreateTopicForm from "@/components/topics/CreateTopicForm";

export default async function Home() {
  const session = await auth();
  const user = session?.user;
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-xl font-bold">Top Post</h1>
      </div>
      <div className="col-span-1">
        <CreateTopicForm />
      </div>
    </div>
  );
}
