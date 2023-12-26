import { signIn, signOut } from "@/actions";

import Button from "@/components/Button";
import { auth } from "@/auth";
import Profile from "../components/Profile";

export default async function Home() {
  const session = await auth();
  const user = session?.user;
  return (
    <div>
      <form action={signIn}>
        <Button type="submit">Sign In</Button>
      </form>
      <form action={signOut}>
        <Button type="submit">Logout</Button>
      </form>
      {user ? <div>{JSON.stringify(user)}</div> : <div> Signed Out</div>}

      <Profile />
    </div>
  );
}
