import React from "react";
import {
  Input,
  Navbar,
  NavbarBrand,
  NavbarContent,
} from "@nextui-org/react";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import HeaderAuth from "./HeaderAuth";

export default function Header() {
  return (
    <Navbar className="shadow mb-6">
      <NavbarBrand>
        <Link href="/" className="font-bold text-2xl">
          Disqus
        </Link>
      </NavbarBrand>
      <NavbarContent justify="center">
        <Input
          labelPlacement="outside"
          radius="sm"
          startContent={<CiSearch className="text-xl" />}
        />
      </NavbarContent>
      <NavbarContent justify="end"><HeaderAuth /></NavbarContent>
    </Navbar>
  );
}
