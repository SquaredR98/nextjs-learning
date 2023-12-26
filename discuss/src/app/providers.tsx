"use client";

import { ReactNode } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";

interface IProviderProps {
  children: ReactNode;
}

export default function Providers({ children }: IProviderProps) {
  return (
    <SessionProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </SessionProvider>
  );
}
