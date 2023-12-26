"use client";

import React, { Fragment, ReactNode } from "react";
import {
  Button,
  NavbarItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  User,
} from "@nextui-org/react";
import { User as UserProps } from "next-auth";
import { signIn, signOut } from "@/actions";
import { CiLogout } from "react-icons/ci";
import { useSession } from "next-auth/react";

export default function HeaderAuth() {
  const session = useSession();
  let authContent: ReactNode;
  const user: UserProps = session.data?.user as UserProps;
  if (session.status === "loading") {
    authContent = null;
  } else if (user) {
    authContent = (
      <Popover radius="sm" placement="bottom">
        <PopoverTrigger>
          <User
            className="hover:cursor-pointer hover:bg-gray-200 p-1 px-2"
            name={user.name}
            avatarProps={{ src: user.image || "" }}
          >
            User Image
          </User>
        </PopoverTrigger>
        <PopoverContent>
          <div className="p-2 px-1">
            <form action={signOut}>
              <Button
                type="submit"
                radius="sm"
                startContent={<CiLogout className="text-xl" />}
              >
                Sign Out
              </Button>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    );
  } else {
    authContent = (
      <Fragment>
        <NavbarItem>
          <form action={signIn}>
            <Button
              type="submit"
              color="default"
              variant="bordered"
              radius="full"
            >
              Login
            </Button>
          </form>
        </NavbarItem>
        <NavbarItem>
          <form action={signIn}>
            <Button type="submit" color="primary" variant="flat" radius="full">
              Sign Up
            </Button>
          </form>
        </NavbarItem>
      </Fragment>
    );
  }

  return authContent;
}
