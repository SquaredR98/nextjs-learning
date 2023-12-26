"use client";

import { useSession } from "next-auth/react";
import React from "react";

export default function Profile() {
  const session = useSession();
  
  return session.data?.user ? (
    <div>User Signed In</div>
  ) : (
    <div>Not Signed In</div>
  );
}
